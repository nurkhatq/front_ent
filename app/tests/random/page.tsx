// app/tests/random/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useUser } from '../../context/UserContext';
import { Container } from '../../components/common/Container';
import { QuestionCard } from '../../components/tests/QuestionCard';
import { RandomContextQuestionCard } from '../../components/tests/RandomContextQuestionCard';
import { TestResultCard } from '../../components/tests/TestResultCard';
import { Spinner } from '../../components/common/Spinner';
import { testApi, Question, Context, StudentAnswerWithContext } from '../../services/api';
import { useNavigationBlocker } from '../../hooks/useNavigationBlocker';
import { QuestionNavigator } from '../../components/tests/QuestionNavigator';

const TestContainer = styled(Container)`
  padding: 2rem 1rem;
  max-width: 800px;
`;

const TestTitle = styled.h1`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const TestDescription = styled.p`
  text-align: center;
  color: var(--text-light);
  margin-bottom: 2rem;
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

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: var(--card-shadow);
  padding: 2rem;
  margin-bottom: 2rem;
  text-align: center;
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

// Типы для расширенных вопросов
interface ContextQuestion extends Question {
  is_context_question: true;
  context: Context;
}

// type ExtendedQuestion = Question;

// Уникальный ID для случайного теста
const RANDOM_TEST_ID = 9999;

export default function RandomTestPage() {
  const router = useRouter();
  const { isNameSet, studentName, completeTest, isLoading } = useUser();
  const [shouldRestart, setShouldRestart] = useState(false);
  
  const [testTitle, setTestTitle] = useState('Байқау тесті');
  const [testDescription, setTestDescription] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Map<number, string[]>>(new Map());
  const [, setMultipleAnswersAllowed] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [testCompleted, setTestCompleted] = useState(false);
  const [testResult, setTestResult] = useState<{
    score: number;
    totalQuestions: number;
    percentage: number;
    maxScore?: number;
  } | null>(null);
  
  // Добавляем состояние для трекинга прогресса теста и диалога подтверждения
  const [testInProgress, setTestInProgress] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [exitDestination, setExitDestination] = useState('');
  
  // Уникальный ключ для localStorage
  const storageKey = `test_progress_random`;
  
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
  
  // Функция для проверки, является ли вопрос контекстным
  const isContextQuestion = (question: Question): question is ContextQuestion => {
    return 'is_context_question' in question && 
           question.is_context_question === true && 
           'context' in question && 
           question.context !== undefined;
  };
  
  // Функция для проверки, является ли вопрос с множественным выбором
  const isMultipleChoiceQuestion = (question: Question, index: number): boolean => {
    // Проверяем, находится ли вопрос в диапазоне вопросов с множественным выбором (31-40)
    return index >= 30; // Вопросы начинаются с индекса 0, поэтому 30 = 31-й вопрос
  };
  
  // Загрузка теста
  useEffect(() => {
    if (!isLoading && !isNameSet) {
      router.push('/register-name');
      return;
    }
    
    const fetchRandomTest = async () => {
      try {
        // Проверяем сохраненные вопросы в localStorage
        if (typeof window !== 'undefined') {
          const savedQuestionsJson = localStorage.getItem(`${storageKey}_questions`);
          const savedProgress = localStorage.getItem(storageKey);
          
          if (savedQuestionsJson && savedProgress) {
            try {
              const savedQuestions = JSON.parse(savedQuestionsJson) as Question[];
              const { answers, currentIndex, completed, result } = JSON.parse(savedProgress);
              
              setTestTitle('Байқау тесті');
              setTestDescription('Әр түрлі бөлімдерден кездейсоқ сұрақтардан тұратын кешенді тест');
              
              setQuestions(savedQuestions);
              
              // Восстанавливаем ответы
              const answersMap = new Map();
              Object.entries(answers).forEach(([questionId, options]) => {
                answersMap.set(parseInt(questionId), options as string[]);
              });
              setSelectedAnswers(answersMap);
              
              setCurrentQuestionIndex(currentIndex);
              
              if (completed && result) {
                setTestCompleted(true);
                setTestResult(result);
              }
              
              setMultipleAnswersAllowed(true);
              setLoading(false);
              return;
            } catch (e) {
              console.error('Error restoring test data:', e);
              localStorage.removeItem(`${storageKey}_questions`);
              localStorage.removeItem(storageKey);
            }
          }
        }
        
        // Запрашиваем новый смешанный тест
        const testData = await testApi.getRandomTest();
        const questionsWithNumbers = testData.questions.map((q: Question, idx: number) => {
          return { ...q, number: q.number || (idx + 1) };
        });
        setTestTitle(testData.title || 'Байқау тесті');
        setTestDescription('Әр түрлі бөлімдерден кездейсоқ сұрақтардан тұратын кешенді тест');
        setQuestions(questionsWithNumbers);
        setMultipleAnswersAllowed(true);
        
        if (typeof window !== 'undefined') {
          localStorage.setItem(`${storageKey}_questions`, JSON.stringify(testData.questions));
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching random test:', err);
        setError('Не удалось загрузить тест. Пожалуйста, попробуйте позже.');
        setLoading(false);
      }
    };
    
    fetchRandomTest();
  }, [isNameSet, router, storageKey, isLoading]);
  
  // Устанавливаем статус теста в процессе
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
  
  // Обработчик для предупреждения при попытке покинуть страницу
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (testInProgress && !testCompleted) {
        e.preventDefault();
        e.returnValue = 'Сіз тестті аяқтамадыңыз. Егер бетті тастап кетсеңіз, жауаптарыңыз сақталмайды.';
        return e.returnValue;
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [testInProgress, testCompleted]);
  
  const handleSelectOption = (questionId: number, options: string[]) => {
    // Получаем текущий вопрос
    const currentQuestion = questions[currentQuestionIndex];
    
    // Если вопрос контекстный или с одиночным выбором (1-25)
    if (isContextQuestion(currentQuestion) || currentQuestionIndex < 25) {
      // Ограничиваем выбор только одним вариантом
      const newSelectedAnswers = new Map(selectedAnswers);
      newSelectedAnswers.set(questionId, options.slice(-1)); // Берем только последний выбранный вариант
      setSelectedAnswers(newSelectedAnswers);
    } else {
      // Для вопросов с множественным выбором (31-40)
      const newSelectedAnswers = new Map(selectedAnswers);
      newSelectedAnswers.set(questionId, options);
      setSelectedAnswers(newSelectedAnswers);
    }
  };
  
  // Получаем ID отвеченных вопросов для навигатора
  const getAnsweredQuestionIds = () => {
    const answeredIds = new Set<number>();
    
    questions.forEach((question, index) => {
      if (selectedAnswers.has(question.id)) {
        answeredIds.add(index + 1);
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
  const [submitting, setSubmitting] = useState(false);
  const handleFinishTest = async (): Promise<boolean> => {
    // 1. Проверяем, не происходит ли уже отправка формы
    if (submitting) return false;
    
    
    // 2. Проверяем, все ли вопросы отвечены - ВЫНЕСЕМ ЭТО ВНЕ блока try-catch
    if (selectedAnswers.size < questions.length) {
      // Определяем, на какие вопросы не даны ответы
      const unansweredQuestions = questions.filter(q => !selectedAnswers.has(q.id));
      
      // Показываем уведомление на казахском
      alert(`Сіз барлық сұрақтарға жауап берген жоқсыз. Келесі сұрақтарға жауап беріңіз: ${
        unansweredQuestions.map((q) => {
          const qIndex = questions.findIndex(question => question.id === q.id);
          return qIndex + 1;
        }).join(', ')
      }`);
      
      // Переходим к первому неотвеченному вопросу
      if (unansweredQuestions.length > 0) {
        const firstUnansweredIndex = questions.findIndex(q => q.id === unansweredQuestions[0].id);
        setCurrentQuestionIndex(firstUnansweredIndex);
      }
      
      // ОБЯЗАТЕЛЬНО сбрасываем состояние отправки ПЕРЕД выходом из функции
      return false;
    }
    setSubmitting(true);
    // Только если все вопросы отвечены, идем дальше
    try {
      // 3. Теперь формируем и отправляем ответы
      const answers: StudentAnswerWithContext[] = Array.from(selectedAnswers.entries()).map(
        ([questionId, options]) => {
          const question = questions.find(q => q.id === questionId);
          
          return {
            question_id: questionId,
            selected_options: options,
            is_context_question: question ? isContextQuestion(question) : false
          };
        }
      );
      
      const result = await testApi.submitTestAnswers(RANDOM_TEST_ID, studentName, answers);
      
      completeTest(RANDOM_TEST_ID, result.percentage);
      
      setTestResult({
        score: result.score,
        totalQuestions: result.total_questions,
        percentage: result.percentage,
        maxScore: result.max_score
      });
      
      setTestCompleted(true);
      setTestInProgress(false);
      
      if (typeof window !== 'undefined') {
        localStorage.removeItem(storageKey);
        localStorage.removeItem(`${storageKey}_questions`);
      }
      return true; // Успешная отправка
    } catch (err) {
      console.error('Error submitting answers:', err);
      setError('Жауаптарды жіберу мүмкін болмады. Кейінірек қайталап көріңіз.');
      return false; // Ошибка отправки
    } finally {
      // В любом случае сбрасываем флаг отправки
      setSubmitting(false);
    }
  };
  
  // Обработчики для диалога подтверждения
  const handleCancelExit = () => {
    setShowConfirmDialog(false);
    setExitDestination('');
  };
  
  // При нажатии на кнопку "Пройти снова"
  const handleRestartTest = () => {
    // Сбрасываем состояние теста
    setCurrentQuestionIndex(0);
    setSelectedAnswers(new Map());
    setTestCompleted(false);
    setTestResult(null);
    setShouldRestart(false);
    
    // Очищаем localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem(storageKey);
      localStorage.removeItem(`${storageKey}_questions`);
    }
    
    // Перезагружаем страницу для получения новых случайных вопросов
    window.location.reload();
  };
  
  const handleConfirmExit = () => {
    setTestInProgress(false);
    setShowConfirmDialog(false);
    
    // Очищаем сохраненный прогресс при выходе
    if (typeof window !== 'undefined') {
      localStorage.removeItem(storageKey);
      localStorage.removeItem(`${storageKey}_questions`);
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
  
  if (testCompleted && testResult && !shouldRestart) {
    return (
      <TestContainer>
        <TestResultCard
          studentName={studentName}
          testTitle={testTitle}
          score={testResult.score}
          totalQuestions={testResult.totalQuestions}
          percentage={testResult.percentage}
          testId={RANDOM_TEST_ID}
          onRestartClick={handleRestartTest}
          maxScore={testResult.maxScore}
        />
      </TestContainer>
    );
  }
  
  if (questions.length === 0) {
    return (
      <TestContainer>
        <Card>
          <h2>Өкінішке орай, тестті құру мүмкін болмады</h2>
          <p>Жүйеде байқау тестін құру үшін жеткілікті сұрақтар жоқ.</p>
        </Card>
      </TestContainer>
    );
  }
  
  const currentQuestion = questions[currentQuestionIndex];
  const currentSelectedOptions = selectedAnswers.get(currentQuestion.id) || [];
  
  // Определяем тип вопроса для отображения соответствующего компонента
  const isCurrentQuestionContextual = isContextQuestion(currentQuestion);
  
  return (
    <TestContainer>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <TestTitle>{testTitle}</TestTitle>
        {testDescription && <TestDescription>{testDescription}</TestDescription>}
        
        {/* Навигатор вопросов */}
        <QuestionNavigator
          totalQuestions={questions.length}
          currentIndex={currentQuestionIndex}
          answeredQuestions={getAnsweredQuestionIds()}
          onQuestionSelect={handleQuestionSelect}
          isRandomTest={true}
        />
        
        {/* Отображаем соответствующий компонент в зависимости от типа вопроса */}
        {isCurrentQuestionContextual && isContextQuestion(currentQuestion) ? (
          <RandomContextQuestionCard
            question={currentQuestion}
            currentIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            selectedOptions={currentSelectedOptions}
            onSelectOption={handleSelectOption}
            onNextQuestion={handleNextQuestion}
            onPreviousQuestion={handlePreviousQuestion}
            onFinishTest={handleFinishTest}
            onCancelTest={handleCancelTest}
          />
        ) : (
          <QuestionCard
            question={currentQuestion}
            currentIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            selectedOptions={currentSelectedOptions}
            multipleAnswersAllowed={isMultipleChoiceQuestion(currentQuestion, currentQuestionIndex)}
            onSelectOption={handleSelectOption}
            onNextQuestion={handleNextQuestion}
            onPreviousQuestion={handlePreviousQuestion}
            onFinishTest={handleFinishTest}
            onCancelTest={handleCancelTest}
          />
        )}
      </motion.div>
      
      {/* Диалог подтверждения выхода */}
      {showConfirmDialog && (
        <ConfirmationDialog>
          <DialogContent>
            <DialogTitle>Шығуды растау</DialogTitle>
            <DialogText>
              Сіз тестті аяқтамадыңыз. Егер бетті тастап кетсеңіз, жауаптарыңыз жүйеде сақталмайды. Сенімдісіз бе?
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