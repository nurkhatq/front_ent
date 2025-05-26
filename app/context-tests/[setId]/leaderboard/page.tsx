// app/context-tests/[setId]/leaderboard/page.tsx
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
import { contextQuestionsApi } from '../../../services/api';

interface LeaderboardEntry {
  id: number;
  student_name: string;
  percentage: number;
  created_at: string;
}

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
const extractTestNumber = (title: string): number => {
  // Ищем формат "X-нұсқа" или "нұсқа X" в названии, где X - число
  const match1 = title.match(/^(\d+)-нұсқа/);
  if (match1) return parseInt(match1[1], 10);
  
  const match2 = title.match(/нұсқа (\d+)/);
  if (match2) return parseInt(match2[1], 10);
  
  return 999; // Если номер не найден, присваиваем большое число
};

export default function ContextTestLeaderboardPage() {
  const params = useParams();
  const setId = Number(params.setId);
  const router = useRouter();
  const { isNameSet, studentName, isLoading } = useUser();
  
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
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
        const testData = await contextQuestionsApi.getQuestionSet(setId);
        setTestTitle(testData.title);
        
        // Получаем рейтинг
        const leaderboardData = await contextQuestionsApi.getLeaderboard(setId);
        
        // Сортируем результаты
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
        setError('Рейтингті алу кезінде қате пайда болды. Қайтадан көріңіз.');
        setLoading(false);
      }
    };
    
    fetchLeaderboard();
  }, [isNameSet, router, setId, isLoading]);
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
  
  // Преобразуем номер варианта для отображения
  // let displayTitle = testTitle;
  const variantNumber = extractTestNumber(testTitle);
  if (variantNumber !== 999) {
    // displayTitle = `Вариант ${variantNumber}: ${testTitle}`;
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
          <Button 
            as={Link} 
            href={`/context-tests/${setId}`}
            $variant="secondary"
          >
            Тестті қайта өту
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