// app/tests/[testId]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useUser } from '../../context/UserContext';
import { Container } from '../../components/common/Container';
import { QuestionCard } from '../../components/tests/QuestionCard';
import { TestResultCard } from '../../components/tests/TestResultCard';
import { Spinner } from '../../components/common/Spinner';
import { Question, StudentAnswer, testApi } from '../../services/api';
import { useNavigationBlocker } from '../../hooks/useNavigationBlocker';
import { QuestionNavigator } from '../../components/tests/QuestionNavigator';

const TestContainer = styled(Container)`
  padding: 2rem 1rem;
  max-width: 800px;
`;

const TestTitle = styled.h1`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

const ErrorMessage = styled.div`
  background-color: rgba(231, 76, 60, 0.1);
  border: 1px solid var(--error-color);
  border-radius: 8px;
  padding: 1rem;
  color: var(--error-color);
  margin-bottom: 2rem;
`;

const ConfirmationDialog = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const DialogContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`;

const DialogTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const DialogText = styled.p`
  margin-bottom: 1.5rem;
`;

const DialogButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;


export default function TestPage() {
  const params = useParams();
  const testId = Number(params.testId);
  const router = useRouter();
  const { isNameSet, studentName, completeTest, isLoading } = useUser();
  const [shouldRestart, setShouldRestart] = useState(false);
  const [testTitle, setTestTitle] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Map<number, string[]>>(new Map());
  const [multipleAnswersAllowed, setMultipleAnswersAllowed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [testCompleted, setTestCompleted] = useState(false);
  const [testResult, setTestResult] = useState<{
    score: number;
    totalQuestions: number;
    percentage: number;
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  // Добавляем состояние для трекинга прогресса теста и диалога подтверждения
  const [testInProgress, setTestInProgress] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [exitDestination, setExitDestination] = useState('');
   const { 
      isTestUnlocked
    } = useUser();
  // Уникальный ключ для localStorage
  const storageKey = `test_progress_${testId}`;
  
  // Функция для обработки попыток навигации
  const handleNavigationAttempt = (destination: string) => {
    if (testInProgress && !testCompleted) {
      setExitDestination(destination);
      setShowConfirmDialog(true);
    } else {
      router.push(destination);
    }
  };
  
  // Используем наш хук для блокировки навигации
  useNavigationBlocker(testInProgress && !testCompleted, handleNavigationAttempt);
  
  // Загрузка теста
  useEffect(() => {
    if (!isLoading && !isNameSet) {
      router.push('/register-name');
      return;
    }

    if (!isTestUnlocked(testId)) {
      router.push('/tests');
      return;
    }

    const fetchTest = async () => {
      try {
        const testData = await testApi.getTest(testId);
        setTestTitle(testData.title);
        
        // Ограничение до 40 вопросов
        const limitedQuestions = testData.questions.slice(0, 80);
        setQuestions(limitedQuestions);
        
        setMultipleAnswersAllowed(testData.multiple_answers_allowed);
        setLoading(false);
        
        // Проверяем, есть ли сохраненный прогресс
        if (typeof window !== 'undefined') {
          const savedProgress = localStorage.getItem(storageKey);
          if (savedProgress) {
            try {
              const { answers, currentIndex, completed, result } = JSON.parse(savedProgress);
              
              // Восстанавливаем ответы
              const answersMap = new Map();
              Object.entries(answers).forEach(([questionId, options]) => {
                answersMap.set(parseInt(questionId), options as string[]);
              });
              setSelectedAnswers(answersMap);
              
              // Восстанавливаем текущий вопрос
              setCurrentQuestionIndex(currentIndex);
              
              // Проверяем, был ли тест завершен
              if (completed && result) {
                setTestCompleted(true);
                setTestResult(result);
              }
            } catch (e) {
              console.error('Error restoring test progress:', e);
              // Если ошибка, просто продолжаем с начала
            }
          }
        }
      } catch (err) {
        console.error('Error fetching test:', err);
        setError('Не удалось загрузить тест. Пожалуйста, попробуйте позже.');
        setLoading(false);
      }
    };
    
    fetchTest();
  }, [isNameSet, router, testId, storageKey, isTestUnlocked, isLoading]);
  // Затем добавьте новый useEffect
  useEffect(() => {
    // Сброс состояния при смене теста
    setCurrentQuestionIndex(0);
    setSelectedAnswers(new Map());
    setTestCompleted(false);
    setTestResult(null);
    setShouldRestart(false);
  }, [testId]); // Перезагрузка при изменении ID теста
  // Устанавливаем статус теста в процессе, когда загружены вопросы
  useEffect(() => {
    if (questions.length > 0 && !testCompleted) {
      setTestInProgress(true);
    } else {
      setTestInProgress(false);
    }
  }, [questions, testCompleted]);
  
  // Сохраняем прогресс в localStorage
  useEffect(() => {
    if (questions.length > 0 && typeof window !== 'undefined') {
      // Конвертируем Map в объект для сохранения
      const answersObj: Record<number, string[]> = {};
      selectedAnswers.forEach((value, key) => {
        answersObj[key] = value;
      });
      
      const progressData = {
        answers: answersObj,
        currentIndex: currentQuestionIndex,
        completed: testCompleted,
        result: testResult
      };
      
      localStorage.setItem(storageKey, JSON.stringify(progressData));
    }
  }, [questions, selectedAnswers, currentQuestionIndex, testCompleted, testResult, storageKey]);
  
  // Обработчик для предупреждения при попытке покинуть страницу через обновление/закрытие
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (testInProgress && !testCompleted) {
        e.preventDefault();
        e.returnValue = 'Сіз бұл бетті шынымен тастап кеткіңіз келетініне сенімдісіз бе? Тест аяқталмайды және нәтижелер сақталмайды.';
        return e.returnValue;
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [testInProgress, testCompleted]);
  
  const handleSelectOption = (questionId: number, options: string[]) => {
    const newSelectedAnswers = new Map(selectedAnswers);
    newSelectedAnswers.set(questionId, options);
    setSelectedAnswers(newSelectedAnswers);
  };
  const getAnsweredQuestionIds = () => {
    const answeredIds = new Set<number>();
    
    // Добавляем ID вопросов, на которые даны ответы
    questions.forEach((question, index) => {
      if (selectedAnswers.has(question.id)) {
        answeredIds.add(index + 1); // ID начинаются с 1
      }
    });
    
    return answeredIds;
  };
  
  // Обработчик выбора вопроса в навигаторе
  const handleQuestionSelect = (index: number) => {
    setCurrentQuestionIndex(index);
  };
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleFinishTest = async (): Promise<boolean> => {
    if (submitting) return false;
    
    

    if (selectedAnswers.size < questions.length) {
      // Определяем, на какие вопросы не даны ответы
      const unansweredQuestions = questions.filter(q => !selectedAnswers.has(q.id));
      
      // Показываем уведомление
      alert(`Барлық сұраққа жауап берілмеді. Өтініш, берілген сұрақтарға жауап беріңіз: ${unansweredQuestions.map(q => q.number).join(', ')}`);
      
      // Переходим к первому неотвеченному вопросу
      if (unansweredQuestions.length > 0) {
        const firstUnansweredIndex = questions.findIndex(q => q.id === unansweredQuestions[0].id);
        setCurrentQuestionIndex(firstUnansweredIndex);
      }
      return false;
    }
    setSubmitting(true);
    try {
      // Подготавливаем ответы в нужном формате
      const answers: StudentAnswer[] = Array.from(selectedAnswers.entries()).map(
        ([questionId, options]) => ({
          question_id: questionId,
          selected_options: options,
        })
      );
      
      const result = await testApi.submitTestAnswers(testId, studentName, answers);
      
      completeTest(testId, result.percentage);

      setTestResult({
        score: result.score,
        totalQuestions: result.total_questions,
        percentage: result.percentage,
      });
      
      setTestCompleted(true);
      setTestInProgress(false);
      
      // Очищаем сохраненный прогресс после завершения
      if (typeof window !== 'undefined') {
        localStorage.removeItem(storageKey);
      }
      return true; // Успешное завершение теста
    } catch (err) {
      console.error('Error submitting answers:', err);
      setError('Не удалось отправить ответы. Пожалуйста, попробуйте позже.');
      return false; // Ошибка при отправке
    } finally {
      // Сбрасываем флаг отправки в любом случае
      setSubmitting(false);
    }
  };
  
  // Обработчики для диалога подтверждения
  const handleCancelExit = () => {
    setShowConfirmDialog(false);
    setExitDestination('');
  };
    // При нажатии на кнопку "Пройти снова":
  const handleRestartTest = () => {
    // Сбрасываем состояние теста
    setCurrentQuestionIndex(0);
    setSelectedAnswers(new Map());
    setTestCompleted(false);
    setTestResult(null);
    setShouldRestart(false);
  };
  const handleConfirmExit = () => {
    setTestInProgress(false);
    setShowConfirmDialog(false);
    
    // Очищаем сохраненный прогресс при выходе
    if (typeof window !== 'undefined') {
      localStorage.removeItem(storageKey);
    }
    
    if (exitDestination) {
      router.push(exitDestination);
    }
  };
  
  const handleCancelTest = () => {
    setExitDestination('/tests');
    setShowConfirmDialog(true);
  };
  if (isLoading) {
    return (
      <TestContainer>
        <LoadingContainer>
          <Spinner size="40px" />
        </LoadingContainer>
      </TestContainer>
    );  }
  if (!isNameSet) {
    return (
      <LoadingContainer>
        <Spinner size="40px" />
      </LoadingContainer>
    );
  }
  
  if (loading) {
    return (
      <TestContainer>
        <LoadingContainer>
          <Spinner size="40px" />
        </LoadingContainer>
      </TestContainer>
    );
  }
  
  if (error) {
    return (
      <TestContainer>
        <ErrorMessage>{error}</ErrorMessage>
      </TestContainer>
    );
  }
  
  if (testCompleted && testResult && !shouldRestart) {
    return (
      <TestContainer>
        <TestResultCard
          studentName={studentName}
          testTitle={testTitle}
          score={testResult.score}
          totalQuestions={testResult.totalQuestions}
          percentage={testResult.percentage}
          testId={testId}
          onRestartClick={handleRestartTest} // Передаем обработчик
        />
      </TestContainer>
    );
  }
  
  if (questions.length === 0) {
    return (
      <TestContainer>
        <ErrorMessage>
          Бұл тестте сұрақтар жоқ. Өтінеміз, басқа тесті таңдаңыз.
        </ErrorMessage>
      </TestContainer>
    );
  }
  
  const currentQuestion = questions[currentQuestionIndex];
  const currentSelectedOptions = selectedAnswers.get(currentQuestion.id) || [];
  
  return (
    <TestContainer>      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <TestTitle>{testTitle}</TestTitle>
        {/* Добавленный навигатор вопросов */}
        <QuestionNavigator
          totalQuestions={questions.length}
          currentIndex={currentQuestionIndex}
          answeredQuestions={getAnsweredQuestionIds()}
          onQuestionSelect={handleQuestionSelect}
        />
        <QuestionCard
          question={currentQuestion}
          currentIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          selectedOptions={currentSelectedOptions}
          multipleAnswersAllowed={multipleAnswersAllowed}
          onSelectOption={handleSelectOption}
          onNextQuestion={handleNextQuestion}
          onPreviousQuestion={handlePreviousQuestion}
          onFinishTest={handleFinishTest}
          onCancelTest={handleCancelTest}
        />
      </motion.div>
      
      {/* Диалог подтверждения выхода */}
      {showConfirmDialog && (
        <ConfirmationDialog>
          <DialogContent>
            <DialogTitle>Шығуды растау</DialogTitle>
            <DialogText>
              Сіз тестті аяқтамадыңыз. Егер сіз беттен шықсаңыз, жауаптарыңыз жүйеде сақталмайды. Шығатыныңызға сенімдісіз бе?
            </DialogText>
            <DialogButtons>
              <button
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#f1f1f1',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
                onClick={handleCancelExit}
              >
                Болдырмау
              </button>
              <button
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
                onClick={handleConfirmExit}
              >
                Шығу
              </button>
            </DialogButtons>
          </DialogContent>
        </ConfirmationDialog>
      )}
    </TestContainer>
  );
}
