// app/context/UserContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserProgress {
  completedTests: number[];
  unlockedTests: number[];
  scores: Record<number, number>; // testId => score в процентах
}

interface UserContextType {
  studentName: string;
  setStudentName: (name: string) => void;
  clearStudentName: () => void;
  isNameSet: boolean;
  isLoading: boolean;
  // Добавляем методы для работы с прогрессом
  progress: UserProgress;
  unlockTest: (testId: number) => void;
  isTestUnlocked: (testId: number) => boolean;
  completeTest: (testId: number, score: number) => void;
  isTestCompleted: (testId: number) => boolean;
  getTestScore: (testId: number) => number | null;
}

const defaultProgress: UserProgress = {
  completedTests: [],
  unlockedTests: [10], // "1 Бөлім Компьютерлік жүйелер" (ID=10) - первый тест всегда разблокирован
  scores: {},
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [studentName, setStudentName] = useState<string>('');
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [isLoading, setIsLoading] = useState<boolean>(true); 
  const isNameSet = !!studentName;

  // Загрузка данных из localStorage при инициализации
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedName = localStorage.getItem('studentName');
      if (savedName) {
        setStudentName(savedName);
      }
      setIsLoading(false);
      const savedProgress = localStorage.getItem('userProgress');
      if (savedProgress) {
        try {
          setProgress(JSON.parse(savedProgress));
        } catch (e) {
          console.error('Failed to parse user progress:', e);
        }
      }
    }
  }, []);

  
    // В UserContext.tsx добавьте:
  useEffect(() => {
    if (typeof window !== 'undefined' && !isLoading && isNameSet) {
      // Сохраняем текущий путь
      localStorage.setItem('lastPath', window.location.pathname);
    }
  }, [isLoading, isNameSet]);


  // Сохранение данных в localStorage при изменении
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (studentName) {
        localStorage.setItem('studentName', studentName);
      }
      
      localStorage.setItem('userProgress', JSON.stringify(progress));
    }
  }, [studentName, progress]);
  
  const clearStudentName = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('studentName');
      localStorage.removeItem('userProgress');
    }
    setStudentName('');
    setProgress(defaultProgress);
  };
  
  // Методы для работы с прогрессом
  const unlockTest = (testId: number) => {
    setProgress(prev => {
      if (prev.unlockedTests.includes(testId)) {
        return prev;
      }
      return {
        ...prev,
        unlockedTests: [...prev.unlockedTests, testId],
      };
    });
  };
  
  const isTestUnlocked = (testId: number) => {
    return progress.unlockedTests.includes(testId);
  };
  
  
  // ПРАВИЛЬНАЯ карта последовательности тестов на основе реальных ID
  const getNextTestId = (currentTestId: number): number => {
    // Карта соответствия: текущий тест ID -> следующий тест ID
    // Порядок по логической последовательности бөлімов (1->2->3->4->...)
    const testSequence: Record<number, number> = {
      10: 3,  // "1 Бөлім" (ID=10) -> "2 бөлім" (ID=3)
      3: 1,   // "2 бөлім" (ID=3) -> "3 Бөлім" (ID=1)
      1: 5,   // "3 Бөлім" (ID=1) -> "4 бөлім" (ID=5)
      5: 9,   // "4 бөлім" (ID=5) -> "5 бөлім" (ID=9)
      9: 6,   // "5 бөлім" (ID=9) -> "6 бөлім" (ID=6)
      6: 2,   // "6 бөлім" (ID=6) -> "7 бөлім" (ID=2)
      2: 13,  // "7 бөлім" (ID=2) -> "8 бөлім" (ID=13)
      13: 7,  // "8 бөлім" (ID=13) -> "9 бөлім" (ID=7)
      7: 8,   // "9 бөлім" (ID=7) -> "10 бөлім" (ID=8)
      8: 14,  // "10 бөлім" (ID=8) -> "11 бөлім" (ID=14)
      14: 11, // "11 бөлім" (ID=14) -> "12 бөлім" (ID=11)
      11: 12, // "12 бөлім" (ID=11) -> "13 бөлім" (ID=12)
      12: 4,  // "13 бөлім" (ID=12) -> "14 бөлім" (ID=4)
      // 4 - последний тест, нет следующего
    };
    
    return testSequence[currentTestId] || -1; // -1 если следующего теста нет
  };
  
  const completeTest = (testId: number, score: number) => {
    setProgress(prev => {
      const newScores = { ...prev.scores, [testId]: score };
      
      // Если это первый раз, когда тест завершен, добавляем в completedTests
      if (!prev.completedTests.includes(testId)) {
        // Разблокируем следующий тест, если текущий пройден успешно (например >60%)
        const shouldUnlockNext = score >= 60;
        const nextTestId = getNextTestId(testId);
        
        return {
          ...prev,
          completedTests: [...prev.completedTests, testId],
          unlockedTests: shouldUnlockNext && nextTestId !== -1 && !prev.unlockedTests.includes(nextTestId) 
            ? [...prev.unlockedTests, nextTestId] 
            : prev.unlockedTests,
          scores: newScores,
        };
      }
      
      return {
        ...prev,
        scores: newScores,
      };
    });
  };
  
  const isTestCompleted = (testId: number) => {
    return progress.completedTests.includes(testId);
  };
  
  const getTestScore = (testId: number) => {
    return progress.scores[testId] || null;
  };
  
  return (
    <UserContext.Provider 
      value={{ 
        studentName, 
        setStudentName, 
        clearStudentName,
        isNameSet: !!studentName,
        isLoading,
        progress,
        unlockTest,
        isTestUnlocked,
        completeTest,
        isTestCompleted,
        getTestScore,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};