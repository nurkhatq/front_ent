// app/components/tests/TestCard.tsx
import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Test } from '@/app/services/api';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../common/Card';
import { Button } from '../common/Button';

interface TestCardProps {
  test: Test;
  isUnlocked: boolean;
  isCompleted: boolean;
  score: number | null;
}

const TestCardContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 330px; /* Фиксированная высота для всех карточек */
`;

const TestCardHeaderStyled = styled(CardHeader)`
  position: relative;
  overflow: hidden;
  min-height: 80px; /* Минимальная высота заголовка */
  padding-bottom: 0.5rem;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
  }
`;

const TestCardTitle = styled(CardTitle)`
  font-size: 1.25rem;
  line-height: 1.4;
  margin-bottom: 0.5rem;
  /* Дать заголовку возможность занимать больше места */
  max-height: 4.2rem; /* ~3 строки */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const TestCardDescription = styled(CardDescription)`
  font-size: 0.9rem;
`;

const TestCardContent = styled(CardContent)`
  flex-grow: 1;
  overflow: hidden;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
`;

const BadgesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`;

const TestCardBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: rgba(52, 152, 219, 0.1);
  color: var(--primary-color);
`;

const TestDescription = styled.p`
  margin: 0;
  font-size: 0.95rem;
  color: var(--text-color);
  flex-grow: 1;
`;

const TestCardFooter = styled(CardFooter)`
  padding-top: 1rem;
  margin-top: auto;
`;

const LockedBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: rgba(231, 76, 60, 0.1);
  color: var(--danger-color);
`;

export const TestCard: React.FC<TestCardProps> = ({ test, isUnlocked }) => {
  if (!isUnlocked) {
    return (
      <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
        <TestCardContainer hoverable>
          <TestCardHeaderStyled>
            <CardTitle>{test.title}</CardTitle>
            <CardDescription>
              {test.question_count} сұрақ
            </CardDescription>
          </TestCardHeaderStyled>
          <CardContent>
            <TestDescription>
              <LockedBadge>🔒 Бұғатталған</LockedBadge>
              <p>
                Тестке қол жеткізу үшін алдыңғы тестті жақсы аяқтау керек.
              </p>
            </TestDescription>
          </CardContent>
        </TestCardContainer>
      </motion.div>
    );
  }
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <TestCardContainer hoverable>
        <TestCardHeaderStyled>
          <TestCardTitle title={test.title}>{test.title}</TestCardTitle>
          <TestCardDescription>
            {test.question_count} сұрақ
          </TestCardDescription>
        </TestCardHeaderStyled>
        <TestCardContent>
          <BadgesContainer>
            {test.has_images && (
              <TestCardBadge>Суреттермен</TestCardBadge>
            )}
            {test.multiple_answers_allowed && (
              <TestCardBadge>Көп таңдаулы</TestCardBadge>
            )}
          </BadgesContainer>
          <TestDescription>
            Бұл тест арқылы сіз біліміңізді тексере аласыз. Тестті бастау үшін төмендегі түймені басыңыз.
          </TestDescription>
        </TestCardContent>
        <TestCardFooter>
          <Button as={Link} href={`/tests/${test.id}`} fullWidth>
            Тестті бастау
          </Button>
        </TestCardFooter>
      </TestCardContainer>
    </motion.div>
  );
};