// app/tests/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { Container } from '../components/common/Container';
import { TestCard } from '../components/tests/TestCard';
import { Spinner } from '../components/common/Spinner';
import { Test, testApi } from '../services/api';
import { RandomTestCard } from '../components/tests/RandomTestCard'; // Новый импорт

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;


const FeaturedTestSection = styled.div`
  margin-bottom: 3rem;
`;

const PageDescription = styled.p`
  font-size: 1.1rem;
  color: var(--text-light);
  max-width: 800px;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const TestsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
`;

const ErrorMessage = styled.div`
  background-color: rgba(231, 76, 60, 0.1);
  border: 1px solid var(--error-color);
  border-radius: 8px;
  padding: 1rem;
  color: var(--error-color);
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export default function TestsPage() {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { 
    isNameSet, 
    isTestUnlocked, 
    isTestCompleted, 
    getTestScore,
    isLoading 
  } = useUser();
  const router = useRouter();
  
  useEffect(() => {
    if (!isLoading && !isNameSet) {
      router.push('/register-name');
      return;
    }
    
    const fetchTests = async () => {
      try {
        const testsData = await testApi.getTests();
        const sortedTests = [...testsData].sort((a, b) => {
          const numA = parseInt(a.title.match(/\d+/)?.[0] || '0');
          const numB = parseInt(b.title.match(/\d+/)?.[0] || '0');
          return numA - numB;
        });
        const filteredTests = sortedTests.filter(test => test.id !== 9999);
        setTests(filteredTests);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching tests:', err);
        setError('Не удалось загрузить тесты. Пожалуйста, попробуйте позже.');
        setLoading(false);
      }
    };
    
    fetchTests();
  }, [isNameSet, router, isLoading]);
  if (isLoading) {
    return (
            <LoadingContainer>
              <Spinner size="40px" />
            </LoadingContainer>
        );
  }
  if (!isNameSet) {
    return (
      <LoadingContainer>
        <Spinner size="40px" />
      </LoadingContainer>
    );
  }
  
  return (
    <Container style={{ padding: '2rem 1rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <PageTitle>Тест тапсырмалары</PageTitle>
        <PageDescription>
          Өзіңізді тексеру үшін тест тапсырмаларын таңдаңыз. Тест аяқталғаннан кейін өз нәтижеңізді басқа оқушылармен салыстыра аласыз.
        </PageDescription>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        {loading ? (
          <LoadingContainer>
            <Spinner size="40px" />
          </LoadingContainer>
        ) : (
          <>
            {/* Добавляем секцию с пробным ЕНТ */}
            <FeaturedTestSection>
              <SectionTitle>Байқау тесті</SectionTitle>
              <RandomTestCard />
            </FeaturedTestSection>
            
            <SectionTitle>Бөлім бойынша тест тапсырмалары</SectionTitle>
          <TestsGrid>
            {tests.map((test, index) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TestCard test={test}
                isUnlocked={isTestUnlocked(test.id)} 
                isCompleted={isTestCompleted(test.id)}
                score={getTestScore(test.id)}
                />
              </motion.div>
            ))}
          </TestsGrid>
        </>
        )}
      </motion.div>
    </Container>
  );
}