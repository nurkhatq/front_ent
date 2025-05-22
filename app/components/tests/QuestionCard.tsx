// app/components/tests/QuestionCard.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Question } from '@/app/services/api';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../common/Card';
import { Button } from '../common/Button';
import { ProgressBar } from '../common/ProgressBar';
import { Spinner } from '../common/Spinner';

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedOptions: string[];
  multipleAnswersAllowed: boolean;
  onSelectOption: (questionId: number, options: string[]) => void;
  onNextQuestion: () => void;
  onPreviousQuestion: () => void;
  onFinishTest: () => Promise<boolean>;
  onCancelTest: () => void; // Добавляем проп для отмены теста
}

const QuestionContainer = styled(Card)`
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const ProgressContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-light);
`;

const QuestionText = styled(CardTitle)`
  font-size: 1.25rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const OptionItem = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: flex-start;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid ${({ selected }) => selected ? 'var(--primary-color)' : 'var(--border-color)'};
  background-color: ${({ selected }) => selected ? 'rgba(52, 152, 219, 0.05)' : 'transparent'};
  
  &:hover {
    background-color: ${({ selected }) => selected ? 'rgba(52, 152, 219, 0.1)' : 'rgba(0, 0, 0, 0.02)'};
  }
`;

interface OptionLetterProps {
  selected: boolean;
}

const OptionLetter = styled.span<OptionLetterProps>`
  display: inline-block;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  text-align: center;
  line-height: 28px;
  font-weight: 600;
  margin-right: 0.75rem;
  background-color: ${props => props.selected ? 'var(--accent-color)' : 'var(--border-color)'};
  color: ${props => props.selected ? 'white' : 'var(--text-color)'};
  flex-shrink: 0;
`;

const OptionText = styled.div`
  flex-grow: 1;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const QuestionImageContainer = styled.div`
  margin-bottom: 1.5rem;
  border-radius: 8px;
  overflow: hidden;
  text-align: center; // Центрируем изображение
  max-width: 100%;
`;

const QuestionImage = styled.img`
  max-width: 100%; // Изображение не будет шире контейнера
  max-height: 300px; // Максимальная высота
  object-fit: contain; // Сохраняем пропорции изображения
  border-radius: 8px;
  display: inline-block;
`;

const TestTypeIndicator = styled.div`
  font-size: 0.875rem;
  color: var(--text-light);
  margin-bottom: 0.5rem;
`;

const CancelButtonContainer = styled.div`
  margin-right: auto;
  margin-left: 1rem;
`;

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  selectedOptions,
  multipleAnswersAllowed,
  onSelectOption,
  onNextQuestion,
  onPreviousQuestion,
  onFinishTest,
  onCancelTest,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleOptionClick = (letter: string) => {
    if (multipleAnswersAllowed) {
      // Для множественного выбора добавляем или удаляем опцию
      const isSelected = selectedOptions.includes(letter);
      const newOptions = isSelected
        ? selectedOptions.filter(opt => opt !== letter)
        : [...selectedOptions, letter];
      
      onSelectOption(question.id, newOptions);
    } else {
      // Для одиночного выбора просто заменяем текущий выбор
      onSelectOption(question.id, [letter]);
    }
  };
  
  const handleFinishTest = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const success = await onFinishTest();
      
      // Если родительский компонент вернул false, значит действие не выполнено
      if (!success) {
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error finishing context test:', error);
      setIsSubmitting(false);
    }
  };

  const isLastQuestion = currentIndex === totalQuestions - 1;
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        <QuestionContainer>
          <CardHeader>
            <ProgressContainer>
              <ProgressInfo>
                <span>{currentIndex + 1}/{totalQuestions} сұрақ</span>
                <TestTypeIndicator>
                  {multipleAnswersAllowed ? 'Көптік таңдау' : 'Бір ғана дұрыс жауап'}
                </TestTypeIndicator>
              </ProgressInfo>
              <ProgressBar value={currentIndex + 1} max={totalQuestions} />
            </ProgressContainer>
            
            <QuestionText>{question.text}</QuestionText>
            
            {question.images && question.images.length > 0 && (
              <QuestionImageContainer>
                <QuestionImage 
                  src={question.images[0].url} 
                  alt="Сұраққа сурет" 
                  onError={(e) => {
                    console.error("Error loading image:", e);
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </QuestionImageContainer>
            )}
          </CardHeader>
          
          <CardContent>
            <OptionsContainer>
              {question.options.map((option) => (
                <OptionItem
                  key={option.id}
                  selected={selectedOptions.includes(option.letter)}
                  onClick={() => handleOptionClick(option.letter)}
                >
                  <OptionLetter selected={selectedOptions.includes(option.letter)}>
                    {option.letter}
                  </OptionLetter>
                  <OptionText>{option.text}</OptionText>
                </OptionItem>
              ))}
            </OptionsContainer>
          </CardContent>
          
          <CardFooter>
            <ButtonGroup>
              <Button 
                $variant="outline" 
                onClick={onPreviousQuestion}
                disabled={currentIndex === 0}
              >
                Артқа
              </Button>
              
              <CancelButtonContainer>
                <Button 
                  $variant="outline"
                  onClick={onCancelTest}
                  style={{ color: 'var(--error-color)' }}
                >
                  Тесттен шығу
                </Button>
              </CancelButtonContainer>
              
              {isLastQuestion ? (
                <Button 
                onClick={handleFinishTest}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Spinner size="16px" style={{ marginRight: '8px' }} />
                    Аяқталуда...
                  </>
                ) : (
                  'Тестті аяқтау'
                )}
              </Button>
              ) : (
                <Button onClick={onNextQuestion}>Келесі сұрақ</Button>
              )}
            </ButtonGroup>
          </CardFooter>
        </QuestionContainer>
      </motion.div>
    </AnimatePresence>
  );
};