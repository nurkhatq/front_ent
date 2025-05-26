// app/tests/[testId]/leaderboard/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useUser } from '../../../context/UserContext';
import { Container } from '../../../components/common/Container';
import { Button } from '../../../components/common/Button';
import { Spinner } from '../../../components/common/Spinner';
import { ExpandableLeaderboard } from '../../../components/leaderboard/ExpandableLeaderboard';
import { TestResult, testApi } from '../../../services/api';

const LeaderboardContainer = styled(Container)`
  padding: 2rem 1rem;
  max-width: 900px;
`;

const LeaderboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const LeaderboardTitle = styled.h1`
  font-size: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
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

// Функция для извлечения номера из названия теста
// const extractTestNumber = (title: string): number => {
//   // Ищем формат "X бөлім" или "X_" в начале названия, где X - число
//   const match = title.match(/^(\d+)[\s_-]?/);
//   return match ? parseInt(match[1], 10) : 999; // Если номер не найден, присваиваем большое число
// };

export default function LeaderboardPage() {
  const params = useParams();
  const testId = Number(params.testId);
  const router = useRouter();
  const { isNameSet, studentName, isLoading } = useUser();
  
  const [leaderboard, setLeaderboard] = useState<TestResult[]>([]);
  const [testTitle, setTestTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!isLoading && !isNameSet) {
      router.push('/register-name');
      return;
    }
    
    const fetchLeaderboard = async () => {
      try {
        // Получаем информацию о тесте
        const testData = await testApi.getTest(testId);
        setTestTitle(testData.title);
        
        // Получаем рейтинг
        const leaderboardData = await testApi.getTestLeaderboard(testId);
        
        // Сортировка результатов
        // 1. По проценту (от большего к меньшему)
        // 2. При равных процентах - по времени (от новых к старым)
        const sortedLeaderboard = [...leaderboardData].sort((a, b) => {
          if (a.percentage !== b.percentage) {
            return b.percentage - a.percentage;
          }
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
        
        setLeaderboard(sortedLeaderboard);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError('Не удалось загрузить рейтинг. Пожалуйста, попробуйте позже.');
        setLoading(false);
      }
    };
    
    fetchLeaderboard();
  }, [isNameSet, router, testId, isLoading]);
  if (isLoading) {
    return (
      <LeaderboardContainer>
        <LoadingContainer>
          <Spinner size="40px" />
        </LoadingContainer>
      </LeaderboardContainer>
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
      <LeaderboardContainer>
        <LoadingContainer>
          <Spinner size="40px" />
        </LoadingContainer>
      </LeaderboardContainer>
    );
  }
  
  if (error) {
    return (
      <LeaderboardContainer>
        <ErrorMessage>{error}</ErrorMessage>
      </LeaderboardContainer>
    );
  }
  
  return (
    <LeaderboardContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <LeaderboardHeader>
          <LeaderboardTitle>
            Рейтинг: {testTitle}
          </LeaderboardTitle>
          <Button as={Link} href={`/tests/${testId}`}>
            Тестті қайтадан өту
          </Button>
        </LeaderboardHeader>
        
        <ExpandableLeaderboard
          title={testTitle}
          results={leaderboard}
          currentUserName={studentName}
          testNumberOrder={true} // Включаем сортировку по номеру теста
        />
      </motion.div>
    </LeaderboardContainer>
  );
}