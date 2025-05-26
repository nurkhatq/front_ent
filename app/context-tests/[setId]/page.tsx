// app/context-tests/[setId]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useUser } from '../../context/UserContext';
import { Container } from '../../components/common/Container';
import { ContextViewer } from '../../components/context-tests/ContextViewer';
import { ContextQuestionCard } from '../../components/context-tests/ContextQuestionCard';
import { ContextTestResultCard } from '../../components/context-tests/ContextTestResultCard';
import { Spinner } from '../../components/common/Spinner';
import { ContextQuestionSet, StudentAnswer, contextQuestionsApi } from '../../services/api';
import { useNavigationBlocker } from '../../hooks/useNavigationBlocker';

const TestContainer = styled(Container)`
  padding: 2rem 1rem;
`;

const TestTitle = styled.h1`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const TestContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
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

export default function ContextTestPage() {
  const params = useParams();
  const setId = Number(params.setId);
  const router = useRouter();
  const { isNameSet, studentName, isLoading } = useUser();
  
  const [questionSet, setQuestionSet] = useState<ContextQuestionSet | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Map<number, string[]>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [testCompleted, setTestCompleted] = useState(false);
  const [testResult, setTestResult] = useState<{
    score: number;
    totalQuestions: number;
    percentage: number;
  } | null>(null);
  
  // Добавляем состояние для трекинга прогресса теста и диалога подтверждения
  const [testInProgress, setTestInProgress] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [exitDestination, setExitDestination] = useState('');
  
  // Уникальный ключ для localStorage
  const storageKey = `context_test_progress_${setId}`;
  
  // Функция для обработки попыток навигации
  


  useEffect(() => {
    if (!isLoading && !isNameSet) {
      router.push('/register-name');
      return;
    }
    
    const fetchQuestionSet = async () => {
      try {
        const data = await contextQuestionsApi.getQuestionSet(setId);
        setQuestionSet(data);
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
        console.error('Error fetching context test:', err);
        setError('Контексттік тестті жүктеу мүмкін болмады. Қайталап көріңізші.');
        setLoading(false);
      }
    };
    
    fetchQuestionSet();
  }, [isNameSet, router, setId, storageKey, isLoading]);
  
  // Устанавливаем статус теста в процессе, когда загружен набор вопросов
  useEffect(() => {
    if (questionSet && !testCompleted) {
      setTestInProgress(true);
    } else {
      setTestInProgress(false);
    }
  }, [questionSet, testCompleted]);
  

  // useEffect(() => {
  //   if (questionSet && typeof window !== 'undefined') {
  //     // Конвертируем Map в объект для сохранения
  //     const answersObj: Record<number, string[]> = {};
  //     selectedAnswers.forEach((value, key) => {
  //       answersObj[key] = value;
  //     });
      
  //     const progressData = {
  //       answers: answersObj,
  //       currentIndex: currentQuestionIndex,
  //       completed: testCompleted,
  //       result: testResult
  //     };
      
  //     localStorage.setItem(storageKey, JSON.stringify(progressData));
  //   }
  // }, [questionSet, selectedAnswers, currentQuestionIndex, testCompleted, testResult, storageKey]);
  
  // Обработчик для предупреждения при попытке покинуть страницу через обновление/закрытие
  
  useEffect(() => {
    // Проверяем условие внутри хука, а не снаружи
    if (questionSet && typeof window !== 'undefined') {
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
  }, [questionSet, selectedAnswers, currentQuestionIndex, testCompleted, testResult, storageKey]);
  
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
  

  // Функция для перезапуска теста
  const handleRetryTest = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers(new Map());
    setTestCompleted(false);
    setTestResult(null);
  };


  const handleSelectOption = (questionId: number, options: string[]) => {
    const newSelectedAnswers = new Map(selectedAnswers);
    newSelectedAnswers.set(questionId, options);
    setSelectedAnswers(newSelectedAnswers);
  };
  
  const handleNextQuestion = () => {
    if (questionSet && currentQuestionIndex < questionSet.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  const [submitting, setSubmitting] = useState(false);
  const handleFinishTest = async (): Promise<boolean> => {
    if (!questionSet) return false;
    if (submitting) return false;
    
    if (selectedAnswers.size < questionSet.questions.length) {
      // Определяем, на какие вопросы не даны ответы
      const unansweredQuestions = questionSet.questions.filter(q => !selectedAnswers.has(q.id));
      
      // Показываем уведомление
      alert(`Сіз барлық сұраққа жауап бермедіңіз. Осы сұрақтарға жауап беріңіз: ${unansweredQuestions.map(q => q.number).join(', ')}`);
      
      // Переходим к первому неотвеченному вопросу
      if (unansweredQuestions.length > 0) {
        const firstUnansweredIndex = questionSet.questions.findIndex(q => q.id === unansweredQuestions[0].id);
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
      
      const result = await contextQuestionsApi.submitAnswers(setId, studentName, answers);
      
      setTestResult({
        score: result.correct_answers,
        totalQuestions: result.total_questions,
        percentage: result.score_percentage,
      });
      
      setTestCompleted(true);
      setTestInProgress(false);
      
      // Очищаем сохраненный прогресс после завершения
      if (typeof window !== 'undefined') {
        localStorage.removeItem(storageKey);
      }
      return true;
    } catch (err) {
      console.error('Error submitting answers:', err);
      setError('Не удалось отправить ответы. Пожалуйста, попробуйте позже.');
      return false;
    }finally {
      // Сбрасываем флаг отправки в любом случае
      setSubmitting(false);
    }
  };
  
  // Обработчики для диалога подтверждения
  const handleCancelExit = () => {
    setShowConfirmDialog(false);
    setExitDestination('');
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
    setExitDestination('/context-tests');
    setShowConfirmDialog(true);
  };
  if (isLoading) {
    // return <div>Загрузка...</div>;
    return (
      <TestContainer>
        <LoadingContainer>
          <Spinner size="40px" />
        </LoadingContainer>
      </TestContainer>
    );
  }
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
  
  if (!questionSet) {
    return (
      <TestContainer>
        <ErrorMessage>
          контексттік мәтін табылмады. Басқа тестті таңдаңыз.
        </ErrorMessage>
      </TestContainer>
    );
  }
  
  if (testCompleted && testResult) {
    return (
      <TestContainer>
        <ContextTestResultCard
          studentName={studentName}
          testTitle={questionSet.title}
          score={testResult.score}
          totalQuestions={testResult.totalQuestions}
          percentage={testResult.percentage}
          testId={setId}
          onRetryTest={handleRetryTest}
        />
      </TestContainer>
    );
  }
  
  if (questionSet.questions.length === 0) {
    return (
      <TestContainer>
        <ErrorMessage>
          Бұл контексттік тестте сұрақтар жоқ. Басқа тестті таңдаңыз.
        </ErrorMessage>
      </TestContainer>
    );
  }
  
  const currentQuestion = questionSet.questions[currentQuestionIndex];
  const currentSelectedOptions = selectedAnswers.get(currentQuestion.id) || [];
  
  return (
    <TestContainer>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <TestTitle>{questionSet.title}</TestTitle>
        
        <TestContent>
          <ContextViewer context={questionSet.context} />
          
          <ContextQuestionCard
            question={currentQuestion}
            currentIndex={currentQuestionIndex}
            totalQuestions={questionSet.questions.length}
            selectedOptions={currentSelectedOptions}
            onSelectOption={handleSelectOption}
            onNextQuestion={handleNextQuestion}
            onPreviousQuestion={handlePreviousQuestion}
            onFinishTest={handleFinishTest}
            onCancelTest={handleCancelTest}
          />
        </TestContent>
      </motion.div>
      
      {/* Диалог подтверждения выхода */}
      {showConfirmDialog && (
        <ConfirmationDialog>
          <DialogContent>
            <DialogTitle>Тесттен шығуды растау</DialogTitle>
            <DialogText>
              Сіздің тестіңіз аяқталмаған. Шығып кетсеңіз жауаптарыңыз сақталмайды.
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