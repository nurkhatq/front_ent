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

const CURRENT_DATA_VERSION = 3; // Увеличиваем версию при изменении ID тестов

const defaultProgress: UserProgress = {
  completedTests: [],
  unlockedTests: [223], // "1 Бөлім Компьютерлік жүйелер" (ID=223) - первый тест всегда разблокирован
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
  
  
  // ОБНОВЛЕННАЯ карта последовательности тестов с новыми ID (версия 3)
  const getNextTestId = (currentTestId: number): number => {
    // Карта соответствия: текущий тест ID -> следующий тест ID
    // Порядок по логической последовательности бөлімов (1->2->3->4->...)
    const testSequence: Record<number, number> = {
      223: 217, // "1 Бөлім" (ID=223) -> "2 бөлім" (ID=217)
      217: 216, // "2 бөлім" (ID=217) -> "3 Бөлім" (ID=216)
      216: 215, // "3 Бөлім" (ID=216) -> "4 бөлім" (ID=215)
      215: 224, // "4 бөлім" (ID=215) -> "5 бөлім" (ID=224)
      224: 220, // "5 бөлім" (ID=224) -> "6 бөлім" (ID=220)
      220: 211, // "6 бөлім" (ID=220) -> "7 бөлім" (ID=211)
      211: 213, // "7 бөлім" (ID=211) -> "8 бөлім" (ID=213)
      213: 212, // "8 бөлім" (ID=213) -> "9 бөлім" (ID=212)
      212: 222, // "9 бөлім" (ID=212) -> "10 бөлім" (ID=222)
      222: 221, // "10 бөлім" (ID=222) -> "11 бөлім" (ID=221)
      221: 218, // "11 бөлім" (ID=221) -> "12 бөлім" (ID=218)
      218: 214, // "12 бөлім" (ID=218) -> "13 бөлім" (ID=214)
      214: 219, // "13 бөлім" (ID=214) -> "14 бөлім" (ID=219)
      // 219 - последний тест, нет следующего
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