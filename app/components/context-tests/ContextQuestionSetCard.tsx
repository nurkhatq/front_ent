// app/components/context-tests/ContextQuestionSetCard.tsx
'use client';

import React from 'react';

import Link from 'next/link';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ContextQuestionSet } from '@/app/services/api';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../common/Card';
import { Button } from '../common/Button';

interface ContextQuestionSetCardProps {
  questionSet: ContextQuestionSet;
}

const ContextCardContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 360px; /* Фиксированная высота для всех карточек */
`;

const ContextCardHeaderStyled = styled(CardHeader)`
  position: relative;
  overflow: hidden;
  height: 90px; /* Фиксированная высота заголовка */
  background: linear-gradient(to right, rgba(155, 89, 182, 0.1), rgba(155, 89, 182, 0.05));
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, var(--accent-color), #b39cd0);
  }
`;

const ContextCardTitle = styled(CardTitle)`
  font-size: 1.25rem;
  line-height: 1.4;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ContextCardDescription = styled(CardDescription)`
  font-size: 0.9rem;
`;

const ContextCardContent = styled(CardContent)`
  flex-grow: 1;
  overflow: hidden;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;

const ContextBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
  background-color: rgba(155, 89, 182, 0.1);
  color: var(--accent-color);
`;

const ContextDescription = styled.p`
  margin: 0;
  font-size: 0.95rem;
  color: var(--text-color);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 4.5em; /* ~3 строки текста */
`;

const ContextCardFooter = styled(CardFooter)`
  padding-top: 1rem;
  margin-top: auto;
`;

export const ContextQuestionSetCard: React.FC<ContextQuestionSetCardProps> = ({ questionSet }) => {
  // Получаем превью текста описания (макс. 150 символов)
  const descriptionPreview = questionSet.description 
    ? (questionSet.description.length > 150 
        ? questionSet.description.substring(0, 147) + '...' 
        : questionSet.description)
    : 'Осы мәтіндік тапсырмада сіз берілген ақпаратты талдап, мәтін бойынша сұрақтарға жауап беруіңіз керек.';

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <ContextCardContainer hoverable>
        <ContextCardHeaderStyled>
          <ContextCardTitle>{questionSet.title}</ContextCardTitle>
          <ContextCardDescription>
            5 сұрақ
          </ContextCardDescription>
        </ContextCardHeaderStyled>
        <ContextCardContent>
          <ContextBadge>Контекстік тест</ContextBadge>
          <ContextDescription>{descriptionPreview}</ContextDescription>
        </ContextCardContent>
        <ContextCardFooter>
          <Button 
            as={Link} 
            href={`/context-tests/${questionSet.id}`} 
            fullWidth
            $variant="secondary"
          >
            Тестті бастау
          </Button>
        </ContextCardFooter>
      </ContextCardContainer>
    </motion.div>
  );
};