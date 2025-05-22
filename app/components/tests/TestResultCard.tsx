// // app/components/tests/TestResultCard.tsx
// "use client";
// import React from 'react';
// import Link from 'next/link';
// import styled from 'styled-components';
// import { motion } from 'framer-motion';
// import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../common/Card';
// import { Button } from '../common/Button';
// import { useRouter } from 'next/navigation';

// interface TestResultCardProps {
//   studentName: string;
//   testTitle: string;
//   score: number;
//   totalQuestions: number;
//   percentage: number;
//   testId: number;
//   onRestartClick: () => void;
// }

// const ResultCardContainer = styled(Card)`
//   max-width: 600px;
//   margin: 0 auto;
//   box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
// `;

// const ResultCardTitle = styled(CardTitle)`
//   text-align: center;
// `;

// const ResultCardDescription = styled(CardDescription)`
//   text-align: center;
// `;

// const ResultBox = styled.div<{ percentage: number }>`
//   border-radius: 8px;
//   padding: 2rem;
//   margin: 1.5rem 0;
//   text-align: center;
//   background-color: ${({ percentage }) => {
//     if (percentage < 50) return 'rgba(231, 76, 60, 0.1)';
//     if (percentage < 70) return 'rgba(243, 156, 18, 0.1)';
//     return 'rgba(46, 204, 113, 0.1)';
//   }};
//   color: ${({ percentage }) => {
//     if (percentage < 50) return 'var(--error-color)';
//     if (percentage < 70) return 'var(--warning-color)';
//     return 'var(--success-color)';
//   }};
// `;
// const ResultPercentage = styled.div`
//   font-size: 3rem;
//   font-weight: 700;
//   margin-bottom: 0.5rem;
// `;

// const ResultDetails = styled.div`
//   font-size: 1.25rem;
//   margin-bottom: 1rem;
// `;

// const ResultMessage = styled.div`
//   font-size: 1rem;
// `;

// const ButtonsContainer = styled.div`
//   display: flex;
//   gap: 1rem;
//   flex-wrap: wrap;
//   justify-content: center;
// `;

// export const TestResultCard: React.FC<TestResultCardProps> = ({
//   studentName,
//   testTitle,
//   score,
//   totalQuestions,
//   percentage,
//   testId,
//   onRestartClick,
// }) => {
//   const getResultMessage = () => {
//     if (percentage < 50) {
//       return "Материалды қайта қарап, қайтадан байқап көруді ұсынамыз.";
//     } else if (percentage < 70) {
//       return "Жаман емес, бірақ әлі де жұмыстану қажет.";
//     } else if (percentage < 90) {
//       return "Жақсы нәтиже! Сіз жақсы дайындалғансыз.";
//     } else {
//       return "Тамаша нәтиже! Сіз материалды керемет меңгергенсіз.";
//     }
//   };

//   const router = useRouter();
//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <ResultCardContainer>
//         <CardHeader>
//           <ResultCardTitle>Тест нәтижесі</ResultCardTitle>
//           <ResultCardDescription>{testTitle}</ResultCardDescription>
//         </CardHeader>
        
//         <CardContent>
//           <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
//             <p>Оқушы: <strong>{studentName}</strong></p>
//           </div>
          
//           <ResultBox percentage={percentage}>
//             <ResultPercentage>{percentage.toFixed(1)}%</ResultPercentage>
//             <ResultDetails>
//               {score}/{totalQuestions} дұрыс
//             </ResultDetails>
//             <ResultMessage>{getResultMessage()}</ResultMessage>
//           </ResultBox>
//         </CardContent>
        
//         <CardFooter>
//           <ButtonsContainer>
//             <Button 
//               $variant="outline" 
//               as={Link}
//               href={`/tests/${testId}/leaderboard`}
//             >
//               Рейтинг
//             </Button>
//             <Button 
//               $variant="outline" 
//               as={Link}
//               href="/tests"
//             >
//               Тест тізіміне қайту
//             </Button>
//             <Button onClick={onRestartClick}>
//               Қайтадан бастау
//             </Button>
//           </ButtonsContainer>
//         </CardFooter>
//       </ResultCardContainer>
//     </motion.div>
//   );
// };
// app/components/tests/TestResultCard.tsx
"use client";
import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../common/Card';
import { Button } from '../common/Button';

interface TestResultCardProps {
  studentName: string;
  testTitle: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  testId: number;
  onRestartClick?: () => void; // Made optional
  maxScore?: number; // Added maxScore property
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

const ScoringSystem = styled.div`
  background-color: rgba(52, 152, 219, 0.05);
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: var(--text-light);
`;

const ScoringTitle = styled.h4`
  margin-bottom: 0.5rem;
  color: var(--text-color);
`;

const ScoringList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ScoringItem = styled.li`
  margin-bottom: 0.5rem;
`;

export const TestResultCard: React.FC<TestResultCardProps> = ({
  studentName,
  testTitle,
  score,
  totalQuestions,
  percentage,
  testId,
  onRestartClick,
  maxScore = totalQuestions, // Default maxScore to totalQuestions
}) => {
  const getResultMessage = () => {
    if (percentage < 50) {
      return "Материалды қайта қарап, қайтадан байқап көруді ұсынамыз.";
    } else if (percentage < 70) {
      return "Жаман емес, бірақ әлі де жұмыстану қажет.";
    } else if (percentage < 90) {
      return "Жақсы нәтиже! Сіз жақсы дайындалғансыз.";
    } else {
      return "Тамаша нәтиже! Сіз материалды керемет меңгергенсіз.";
    }
  };

  // const router = useRouter();
  
  const isRandomTest = testId === 9999;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ResultCardContainer>
        <CardHeader>
          <ResultCardTitle>Тест нәтижесі</ResultCardTitle>
          <ResultCardDescription>{testTitle}</ResultCardDescription>
        </CardHeader>
        
        <CardContent>
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <p>Оқушы: <strong>{studentName}</strong></p>
          </div>
          
          <ResultBox percentage={percentage}>
            <ResultPercentage>{percentage.toFixed(1)}%</ResultPercentage>
            <ResultDetails>
              {score} из {maxScore} баллов
              {maxScore !== totalQuestions && ` (${totalQuestions} сұрақ)`}
            </ResultDetails>
            <ResultMessage>{getResultMessage()}</ResultMessage>
          </ResultBox>
          
          {/* Scoring system explanation for random test */}
          {isRandomTest && (
            <ScoringSystem>
              <ScoringTitle>Бағалау жүйесі:</ScoringTitle>
              <ScoringList>
                <ScoringItem>• Сұрақтар 1-25 (бір дұрыс жауаппен) - 1 балға дейін</ScoringItem>
                <ScoringItem>• Сұрақтар 26-30 (контекстік) - 1 балға дейін</ScoringItem>
                <ScoringItem>• Сұрақтар 31-40 (көп таңдаумен) - 2 балға дейін</ScoringItem>
              </ScoringList>
            </ScoringSystem>
          )}
        </CardContent>
        
        <CardFooter>
          <ButtonsContainer>
            <Button 
              $variant="outline" 
              as={Link}
              href={isRandomTest ? "/tests/random/leaderboard" : `/tests/${testId}/leaderboard`}
            >
              Рейтинг
            </Button>
            
            <Button 
              $variant="outline" 
              as={Link}
              href="/tests"
            >
              Тест тізіміне қайту
            </Button>
            
            {onRestartClick ? (
              <Button onClick={onRestartClick}>
                Қайтадан бастау
              </Button>
            ) : (
              <Button 
                as={Link}
                href={isRandomTest ? `/tests/random` : `/tests/${testId}`}
              >
                Қайтадан бастау
              </Button>
            )}
          </ButtonsContainer>
        </CardFooter>
      </ResultCardContainer>
    </motion.div>
  );
};