// app/context-tests/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { Container } from '../components/common/Container';
import { ContextQuestionSetCard } from '../components/context-tests/ContextQuestionSetCard';
import { Spinner } from '../components/common/Spinner';
import { ContextQuestionSet, contextQuestionsApi } from '../services/api';

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
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

const ContextTestsGrid = styled.div`
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

export default function ContextTestsPage() {
  const [questionSets, setQuestionSets] = useState<ContextQuestionSet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isNameSet, isLoading } = useUser();
  const router = useRouter();
  
  useEffect(() => {
    if (!isLoading && !isNameSet) {
      router.push('/register-name');
      return;
    }
    
    const fetchQuestionSets = async () => {
      try {
        const data = await contextQuestionsApi.getQuestionSets();
        const sortedSets = [...data].sort((a, b) => {
          const numA = parseInt(a.title.match(/\d+/)?.[0] || '0');
          const numB = parseInt(b.title.match(/\d+/)?.[0] || '0');
          return numA - numB;
        });
        if (!data || !Array.isArray(data)) {
          console.error('Received invalid data format for question sets:', data);
          setError('Қате деректер алынды. Қайталап көріңізші.');
          setQuestionSets([]);
        } else {
          // Фильтруем некорректные данные, если такие есть
          const validData = sortedSets.filter(set => set && typeof set === 'object');
          setQuestionSets(validData);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching context tests:', err);
        setError('Контексттік тесттерді жүктеу мүмкін болмады. Қайталап көріңізші.');
        setLoading(false);
      }
    };
    
    fetchQuestionSets();
  }, [isNameSet,isLoading, router]);
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
        <PageTitle>Контекстік тесттер</PageTitle>
        <PageDescription>
        Контекстік тесттер ақпаратты талдау және мәтінмен жұмыс істеу дағдыларын тексеруге көмектеседі. Әр тест мәтін мен оның мазмұны бойынша бірнеше сұрақтан тұрады.
        </PageDescription>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        {loading ? (
          <LoadingContainer>
            <Spinner size="40px" />
          </LoadingContainer>
        ) : (
          <ContextTestsGrid>
            {questionSets.length === 0 ? (
              <div>Қазіргі уақытта қолжетімді контексттік тесттер жоқ.</div>
            ) : (
              questionSets.map((questionSet, index) => (
                <motion.div
                  key={questionSet.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ContextQuestionSetCard questionSet={questionSet} />
                </motion.div>
              ))
            )}
          </ContextTestsGrid>
        )}
      </motion.div>
    </Container>
  );
}