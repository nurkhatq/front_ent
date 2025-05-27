// app/context/UserContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserProgress {
  completedTests: number[];
  unlockedTests: number[];
  scores: Record<number, number>; // testId => score в процентах
  version?: number; // Добавляем версию данных
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

const CURRENT_DATA_VERSION = 4; // Увеличиваем версию при изменении ID тестов

const defaultProgress: UserProgress = {
  completedTests: [],
  unlockedTests: [306], // "1 Бөлім Компьютерлік жүйелер" (ID=306) - первый тест всегда разблокирован
  scores: {},
  version: CURRENT_DATA_VERSION,
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
          const parsedProgress = JSON.parse(savedProgress);
          
          // Проверяем версию данных
          if (parsedProgress.version !== CURRENT_DATA_VERSION) {
            console.log('Updating user progress data to new version');
            // Если версия не совпадает - сбрасываем прогресс
            setProgress(defaultProgress);
            // Очищаем старые данные
            localStorage.removeItem('userProgress');
          } else {
            setProgress(parsedProgress);
          }
        } catch (e) {
          console.error('Failed to parse user progress:', e);
          // При ошибке парсинга тоже сбрасываем
          setProgress(defaultProgress);
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
  
  
  // НОВАЯ карта последовательности тестов с ID 295-308
  const getNextTestId = (currentTestId: number): number => {
    // Карта соответствия: текущий тест ID -> следующий тест ID
    // Порядок по логической последовательности бөлімов (1->2->3->4->...)
    const testSequence: Record<number, number> = {
      306: 295, // "1 Бөлім" (ID=306) -> "2 бөлім" (ID=295)
      295: 299, // "2 бөлім" (ID=295) -> "3 Бөлім" (ID=299)
      299: 302, // "3 Бөлім" (ID=299) -> "4 бөлім" (ID=302)
      302: 307, // "4 бөлім" (ID=302) -> "5 бөлім" (ID=307)
      307: 305, // "5 бөлім" (ID=307) -> "6 бөлім" (ID=305)
      305: 301, // "6 бөлім" (ID=305) -> "7 бөлім" (ID=301)
      301: 296, // "7 бөлім" (ID=301) -> "8 бөлім" (ID=296)
      296: 303, // "8 бөлім" (ID=296) -> "9 бөлім" (ID=303)
      303: 298, // "9 бөлім" (ID=303) -> "10 бөлім" (ID=298)
      298: 300, // "10 бөлім" (ID=298) -> "11 бөлім" (ID=300)
      300: 297, // "11 бөлім" (ID=300) -> "12 бөлім" (ID=297)
      297: 304, // "12 бөлім" (ID=297) -> "13 бөлім" (ID=304)
      304: 308, // "13 бөлім" (ID=304) -> "14 бөлім" (ID=308)
      // 308 - последний тест, нет следующего
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