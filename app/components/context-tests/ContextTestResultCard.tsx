// app/components/context-tests/ContextTestResultCard.tsx
// Меняем логику кнопки "Пройти снова"

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../common/Card';
import { Button } from '../common/Button';

interface ContextTestResultCardProps {
  studentName: string;
  testTitle: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  testId: number;
  onRetryTest: () => void; // Новый проп для повторного запуска теста
}

const ResultCardContainer = styled(Card)`
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
`;

const ResultCardTitle = styled(CardTitle)`
  text-align: center;
`;

const ResultCardDescription = styled(CardDescription)`
  text-align: center;
`;

const ResultBox = styled.div<{ percentage: number }>`
  border-radius: 8px;
  padding: 2rem;
  margin: 1.5rem 0;
  text-align: center;
  background-color: ${({ percentage }) => {
    if (percentage < 50) return 'rgba(231, 76, 60, 0.1)';
    if (percentage < 70) return 'rgba(243, 156, 18, 0.1)';
    return 'rgba(46, 204, 113, 0.1)';
  }};
  color: ${({ percentage }) => {
    if (percentage < 50) return 'var(--error-color)';
    if (percentage < 70) return 'var(--warning-color)';
    return 'var(--success-color)';
  }};
`;

const ResultPercentage = styled.div`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const ResultDetails = styled.div`
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;

const ResultMessage = styled.div`
  font-size: 1rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

export const ContextTestResultCard: React.FC<ContextTestResultCardProps> = ({
  studentName,
  testTitle,
  score,
  totalQuestions,
  percentage,
  testId,
  onRetryTest, // Используем новый проп
}) => {
  const getResultMessage = () => {
    if (percentage < 50) {
      return "Сізге мәтінді талдау дағдыларын жақсарту қажет. Қайтадан байқап көріңіз.";
    } else if (percentage < 70) {
      return "Жаман емес, бірақ әлі де жұмыстану керек. Жаттығуды жалғастырыңыз.";
    } else if (percentage < 90) {
      return "Жақсы нәтиже! Сіз ақпаратты талдауда жақсы жұмыс жасадыңыз.";
    } else {
      return "Тамаша нәтиже! Сіздің контекстпен жұмыс істеу дағдыларыңыз өте жоғары.";
    }
  };

  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ResultCardContainer>
        <CardHeader>
          <ResultCardTitle>Контекстік тест қорытындысы</ResultCardTitle>
          <ResultCardDescription>{testTitle}</ResultCardDescription>
        </CardHeader>
        
        <CardContent>
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <p>Оқушы: <strong>{studentName}</strong></p>
          </div>
          
          <ResultBox percentage={percentage}>
            <ResultPercentage>{percentage.toFixed(1)}%</ResultPercentage>
            <ResultDetails>
              {score}/{totalQuestions} дұрыс жауап
            </ResultDetails>
            <ResultMessage>{getResultMessage()}</ResultMessage>
          </ResultBox>
        </CardContent>
        
        <CardFooter>
          <ButtonsContainer>
            <Button 
              $variant="outline" 
              as={Link}
              href={`/context-tests/${testId}/leaderboard`}
            >
              Рейтинг
            </Button>
            <Button 
              $variant="outline" 
              as={Link}
              href="/context-tests"
            >
              Тесттер тізіміне қайту
            </Button>
            <Button 
              onClick={onRetryTest} // Используем onRetryTest вместо Link
              $variant="secondary"
            >
              Қайтадан тапсыру
            </Button>
          </ButtonsContainer>
        </CardFooter>
      </ResultCardContainer>
    </motion.div>
  );
};