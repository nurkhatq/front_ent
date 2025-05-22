// import React, { useState } from 'react';
// import styled from 'styled-components';

// interface QuestionNavigatorProps {
//   totalQuestions: number;
//   currentIndex: number;
//   answeredQuestions: Set<number>;
//   onQuestionSelect: (index: number) => void;
// }

// const QUESTIONS_PER_PAGE = 10;

// const NavigatorContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 1rem;
//   background-color: #f8f9fa;
//   border-radius: 8px;
// `;

// const ButtonsContainer = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 0.5rem;
//   justify-content: center;
//   margin-bottom: 1rem;
// `;

// const QuestionButton = styled.button<{ isActive: boolean; isAnswered: boolean }>`
//   width: 2.5rem;
//   height: 2.5rem;
//   border-radius: 4px;
//   border: none;
//   font-weight: ${({ isActive }) => (isActive ? '700' : '400')};
//   background-color: ${({ isActive, isAnswered }) => 
//     isActive 
//       ? 'var(--primary-color)' 
//       : isAnswered 
//         ? 'rgba(46, 204, 113, 0.2)' 
//         : 'white'};
//   color: ${({ isActive }) => (isActive ? 'white' : 'var(--text-color)')};
//   cursor: pointer;
//   transition: all 0.2s ease;
  
//   &:hover {
//     background-color: ${({ isActive, isAnswered }) => 
//       isActive 
//         ? 'var(--primary-dark)' 
//         : isAnswered 
//           ? 'rgba(46, 204, 113, 0.3)' 
//           : 'rgba(0, 0, 0, 0.05)'}};
//   }
// `;

// const PaginationContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   gap: 0.5rem;
// `;

// const PageButton = styled.button`
//   padding: 0.5rem 1rem;
//   border: none;
//   background-color: var(--primary-color);
//   color: white;
//   cursor: pointer;
//   border-radius: 4px;
//   transition: all 0.2s ease;

//   &:disabled {
//     background-color: lightgray;
//     cursor: default;
//   }
// `;

// export const QuestionNavigator: React.FC<QuestionNavigatorProps> = ({
//   totalQuestions,
//   currentIndex,
//   answeredQuestions,
//   onQuestionSelect,
// }) => {
//   const [currentPage, setCurrentPage] = useState(0);
  
//   const totalPages = Math.ceil(totalQuestions / QUESTIONS_PER_PAGE);
//   const start = currentPage * QUESTIONS_PER_PAGE;
//   const end = start + QUESTIONS_PER_PAGE;

//   return (
//     <NavigatorContainer>
//       <ButtonsContainer>
//         {Array.from({ length: totalQuestions }).slice(start, end).map((_, index) => {
//           const questionId = start + index + 1;
//           const isAnswered = answeredQuestions.has(questionId);
          
//           return (
//             <QuestionButton
//               key={questionId}
//               isActive={currentIndex === questionId - 1}
//               isAnswered={isAnswered}
//               onClick={() => onQuestionSelect(questionId - 1)}
//             >
//               {questionId}
//             </QuestionButton>
//           );
//         })}
//       </ButtonsContainer>

//       <PaginationContainer>
//         <PageButton disabled={currentPage === 0} onClick={() => setCurrentPage((prev) => prev - 1)}>
//           Артқа
//         </PageButton>
//         <PageButton disabled={currentPage === totalPages - 1} onClick={() => setCurrentPage((prev) => prev + 1)}>
//           Алға
//         </PageButton>
//       </PaginationContainer>
//     </NavigatorContainer>
//   );
// };
// app/components/tests/QuestionNavigator.tsx
// app/components/tests/QuestionNavigator.tsx
import React, { useState } from 'react';
import styled from 'styled-components';

interface QuestionNavigatorProps {
  totalQuestions: number;
  currentIndex: number;
  answeredQuestions: Set<number>;
  onQuestionSelect: (index: number) => void;
  isRandomTest?: boolean; // Флаг для определения типа теста
}

const QUESTIONS_PER_PAGE = 10;

const NavigatorContainer = styled.div`
  margin-bottom: 1.5rem;
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: var(--card-shadow);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NavigatorTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.75rem;
  color: var(--text-color);
  align-self: flex-start;
`;

const QuestionButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 1rem;
`;

const QuestionButton = styled.button<{ 
  active: boolean; 
  answered: boolean;
  isContextQuestion?: boolean;
  isMultipleChoiceQuestion?: boolean;
}>`
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-weight: ${({ active }) => active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  /* Стилизация в зависимости от типа вопроса и состояния */
  background-color: ${({ active, answered, isContextQuestion, isMultipleChoiceQuestion }) => {
    if (active) {
      if (isContextQuestion) return 'rgba(155, 89, 182, 0.2)';
      if (isMultipleChoiceQuestion) return 'rgba(52, 152, 219, 0.2)';
      return 'rgba(46, 204, 113, 0.2)';
    }
    if (answered) {
      if (isContextQuestion) return 'rgba(155, 89, 182, 0.1)';
      if (isMultipleChoiceQuestion) return 'rgba(52, 152, 219, 0.1)';
      return 'rgba(46, 204, 113, 0.1)';
    }
    return '#f1f1f1';
  }};
  
  border: 1px solid ${({ active, answered, isContextQuestion, isMultipleChoiceQuestion }) => {
    if (active) {
      if (isContextQuestion) return 'var(--accent-color)';
      if (isMultipleChoiceQuestion) return 'var(--primary-color)';
      return 'var(--secondary-color)';
    }
    if (answered) {
      if (isContextQuestion) return 'rgba(155, 89, 182, 0.3)';
      if (isMultipleChoiceQuestion) return 'rgba(52, 152, 219, 0.3)';
      return 'rgba(46, 204, 113, 0.3)';
    }
    return 'var(--border-color)';
  }};
  
  color: ${({ active, answered, isContextQuestion, isMultipleChoiceQuestion }) => {
    if (active || answered) {
      if (isContextQuestion) return 'var(--accent-color)';
      if (isMultipleChoiceQuestion) return 'var(--primary-color)';
      return 'var(--secondary-color)';
    }
    return 'var(--text-light)';
  }};
  
  &:hover {
    background-color: ${({ isContextQuestion, isMultipleChoiceQuestion }) => {
      if (isContextQuestion) return 'rgba(155, 89, 182, 0.15)';
      if (isMultipleChoiceQuestion) return 'rgba(52, 152, 219, 0.15)';
      return 'rgba(46, 204, 113, 0.15)';
    }};
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  background-color: var(--primary-color);
  color: white;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:disabled {
    background-color: lightgray;
    cursor: default;
  }
`;

const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: var(--text-light);
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LegendDot = styled.span<{ 
  isContextQuestion?: boolean;
  isMultipleChoiceQuestion?: boolean;
}>`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background-color: ${({ isContextQuestion, isMultipleChoiceQuestion }) => {
    if (isContextQuestion) return 'var(--accent-color)';
    if (isMultipleChoiceQuestion) return 'var(--primary-color)';
    return 'var(--secondary-color)';
  }};
`;

export const QuestionNavigator: React.FC<QuestionNavigatorProps> = ({
  totalQuestions,
  currentIndex,
  answeredQuestions,
  onQuestionSelect,
  isRandomTest = false // По умолчанию считаем, что это обычный тест
}) => {
  const [currentPage, setCurrentPage] = useState(Math.floor(currentIndex / QUESTIONS_PER_PAGE));
  
  // Automatically update page when current index changes
  React.useEffect(() => {
    const targetPage = Math.floor(currentIndex / QUESTIONS_PER_PAGE);
    if (targetPage !== currentPage) {
      setCurrentPage(targetPage);
    }
  }, [currentIndex, currentPage]);
  
  const totalPages = Math.ceil(totalQuestions / QUESTIONS_PER_PAGE);
  const start = currentPage * QUESTIONS_PER_PAGE;
  const end = Math.min(start + QUESTIONS_PER_PAGE, totalQuestions);

  // Функция для определения типа вопроса по его индексу (только для случайного теста)
  const getQuestionType = (index: number) => {
    if (!isRandomTest) {
      // Для обычного теста не различаем типы вопросов
      return { isContextQuestion: false, isMultipleChoiceQuestion: false };
    }
    
    if (index >= 25 && index < 30) { // Вопросы 26-30 (индексы 25-29)
      return { isContextQuestion: true, isMultipleChoiceQuestion: false };
    } else if (index >= 30) { // Вопросы 31-40 (индексы 30-39)
      return { isContextQuestion: false, isMultipleChoiceQuestion: true };
    } else { // Вопросы 1-25 (индексы 0-24)
      return { isContextQuestion: false, isMultipleChoiceQuestion: false };
    }
  };

  return (
    <NavigatorContainer>
      <NavigatorTitle>Сұрақтар навигациясы:</NavigatorTitle>
      
      <PaginationContainer>
        <PageButton 
          disabled={currentPage === 0} 
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Артқа
        </PageButton>
        <PageButton 
          disabled={currentPage === totalPages - 1} 
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Алға
        </PageButton>
      </PaginationContainer>
      
      <QuestionButtons>
        {Array.from({ length: end - start }).map((_, index) => {
          const questionIndex = start + index;
          const questionNumber = questionIndex + 1;
          const isAnswered = answeredQuestions.has(questionNumber);
          const { isContextQuestion, isMultipleChoiceQuestion } = getQuestionType(questionIndex);
          
          return (
            <QuestionButton
              key={questionIndex}
              active={currentIndex === questionIndex}
              answered={isAnswered}
              isContextQuestion={isContextQuestion}
              isMultipleChoiceQuestion={isMultipleChoiceQuestion}
              onClick={() => onQuestionSelect(questionIndex)}
            >
              {questionNumber}
            </QuestionButton>
          );
        })}
      </QuestionButtons>
      
      {/* Легенда отображается только для случайного теста */}
      {isRandomTest && (
        <Legend>
          <LegendItem>
            <LegendDot /> Сұрақтар бір жауаппен (1-25)
          </LegendItem>
          <LegendItem>
            <LegendDot isContextQuestion /> Контекстік сұрақтар (26-30)
          </LegendItem>
          <LegendItem>
            <LegendDot isMultipleChoiceQuestion /> Көп таңдаулы сұрақтар (31-40)
          </LegendItem>
        </Legend>
      )}
    </NavigatorContainer>
  );
};