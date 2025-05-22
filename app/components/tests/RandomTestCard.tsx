// app/components/tests/RandomTestCard.tsx
import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../common/Card';
import { Button } from '../common/Button';

const RandomTestCardContainer = styled(Card)`
  border: 2px solid var(--primary-color);
  background: linear-gradient(45deg, rgba(52, 152, 219, 0.05) 0%, rgba(46, 204, 113, 0.05) 100%);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`;

const RandomTestHeader = styled(CardHeader)`
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  }
`;

const RandomTestBadge = styled.span`
  display: inline-block;
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const RandomTestTitle = styled(CardTitle)`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const RandomTestDescription = styled(CardDescription)`
  font-size: 1rem;
  margin-bottom: 0;
`;

const RandomTestContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Feature = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`;

const FeatureIcon = styled.div`
  width: 24px;
  height: 24px;
  color: var(--primary-color);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
`;

const FeatureText = styled.div`
  font-size: 1rem;
`;

export const RandomTestCard: React.FC = () => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <RandomTestCardContainer>
        <RandomTestHeader>
          <RandomTestBadge>Сынап көріңіз</RandomTestBadge>
          <RandomTestTitle>БАЙҚАУ ТЕСТІ</RandomTestTitle>
          <RandomTestDescription>
          Барлық бөлімдерден кездейсоқ сұрақтары бар кешенді тест
          </RandomTestDescription>
        </RandomTestHeader>
        
        <RandomTestContent>
          <Feature>
            <FeatureIcon>✓</FeatureIcon>
            <FeatureText>
            Барлық бөлімдерден кездейсоқ таңдалған 40 сұрақ
            </FeatureText>
          </Feature>
          
          <Feature>
            <FeatureIcon>✓</FeatureIcon>
            <FeatureText>
            Информатика пәні бойынша нақты ҰБТ – ға негізделген
            </FeatureText>
          </Feature>
          
          <Feature>
            <FeatureIcon>✓</FeatureIcon>
            <FeatureText>
            Тиімді дайындалу үшін әр жолы жаңа сұрақтар жиынтығы
            </FeatureText>
          </Feature>
        </RandomTestContent>
        
        <CardFooter>
          <Button
            as={Link}
            href="/tests/random"
            fullWidth
            size="large"
          >
            Байқау тесті бастау
          </Button>
        </CardFooter>
      </RandomTestCardContainer>
    </motion.div>
  );
};