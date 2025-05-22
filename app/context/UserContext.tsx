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
  unlockedTests: [1], // Первый тест всегда разблокирован
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
  
  
  const getNextTestId = (currentTestId: number): number => {
    // Карта соответствия ID текущего теста -> ID следующего теста
    const testSequence: Record<number, number> = {
      1: 7,   // После "1 Бөлім" следует "2 бөлім" (ID 7)
      7: 8,   // После "2 бөлім" следует "3 Бөлім" (ID 8) 
      8: 9,   // После "3 Бөлім" следует "4 бөлім" (ID 9)
      9: 10,  // После "4 бөлім" следует "5 бөлім" (ID 10)
      10: 11, // После "5 бөлім" следует "6 бөлім" (ID 11)
      11: 12, // После "6 бөлім" следует "7 бөлім" (ID 12)
      12: 13, // После "7 бөлім" следует "8 бөлім" (ID 13)
      13: 14, // После "8 бөлім" следует "9 бөлім" (ID 14)
      14: 2,  // После "9 бөлім" следует "10 бөлім" (ID 2)
      2: 3,   // После "10 бөлім" следует "11 бөлім" (ID 3)
      3: 4,   // После "11 бөлім" следует "12 бөлім" (ID 4)
      4: 5,   // После "12 бөлім" следует "13 бөлім" (ID 5)
      5: 6    // После "13 бөлім" следует "14 бөлім" (ID 6)
    };
    
    return testSequence[currentTestId] || currentTestId + 1;
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
          unlockedTests: shouldUnlockNext && !prev.unlockedTests.includes(nextTestId) 
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