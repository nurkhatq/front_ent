// // app/components/leaderboard/ExpandableLeaderboard.tsx
// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { Card, CardHeader, CardTitle, CardContent } from '../common/Card';
// import { Button } from '../common/Button';

// interface LeaderboardResult {
//   id: number;
//   student_name: string;
//   percentage: number;
//   created_at: string;
//   // Другие поля, которые могут присутствовать
//   [key: string]: any;
// }

// interface ExpandableLeaderboardProps {
//   title: string;
//   results: LeaderboardResult[];
//   currentUserName: string;
//   initialExpanded?: boolean;
//   maxVisible?: number;
//   testNumberOrder?: boolean; // Добавляем опцию для сортировки по номеру теста
// }

// const LeaderboardCard = styled(Card)`
//   overflow: hidden;
//   margin-bottom: 1rem;
// `;

// const TableContainer = styled.div`
//   overflow-x: auto;
// `;

// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
// `;

// const TableHead = styled.thead`
//   background-color: rgba(52, 152, 219, 0.05);
  
//   th {
//     padding: 1rem;
//     text-align: left;
//     font-weight: 600;
//     color: var(--text-color);
//     border-bottom: 1px solid var(--border-color);
//   }
// `;

// const TableBody = styled.tbody`
//   tr {
//     &:hover {
//       background-color: rgba(0, 0, 0, 0.02);
//     }
    
//     &.current-user {
//       background-color: rgba(52, 152, 219, 0.1);
//     }
//   }
  
//   td {
//     padding: 1rem;
//     border-bottom: 1px solid var(--border-color);
//   }
// `;

// const EmptyState = styled.div`
//   text-align: center;
//   padding: 3rem 0;
//   color: var(--text-light);
// `;

// const ShowMoreButton = styled(Button)`
//   margin-top: 1rem;
// `;

// // Функция для извлечения номера из заголовка теста
// const extractSectionNumber = (title: string): number => {
//   // Ищем формат "X_..." или "X..." где X - число
//   const match = title.match(/^(\d+)[\s_-]?/);
//   return match ? parseInt(match[1], 10) : 999; // Если номер не найден, присваиваем большое число
// };

// export const ExpandableLeaderboard: React.FC<ExpandableLeaderboardProps> = ({
//   title,
//   results,
//   currentUserName,
//   initialExpanded = false,
//   maxVisible = 10,
//   testNumberOrder = true,
// }) => {
//   const [expanded, setExpanded] = useState(initialExpanded);
  
//   // Сортируем результаты
//   const sortedResults = [...results].sort((a, b) => {
//     if (testNumberOrder) {
//       // Сначала попробуем сортировать по номеру в названии теста
//       const aNum = extractSectionNumber(title);
//       const bNum = extractSectionNumber(title);
      
//       if (aNum !== bNum) {
//         return aNum - bNum;
//       }
//     }
    
//     // Если номера равны или сортировка по номеру отключена,
//     // сортируем по проценту (от большего к меньшему)
//     if (a.percentage !== b.percentage) {
//       return b.percentage - a.percentage;
//     }
    
//     // Если проценты равны, сортируем по дате (от более новых к более старым)
//     return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
//   });
  
//   // Определяем, сколько результатов отображать
//   const displayResults = expanded ? sortedResults : sortedResults.slice(0, maxVisible);
  
//   // Проверяем, есть ли текущий пользователь в списке и если его нет в отображаемой части,
//   // добавляем его позицию в конце таблицы
//   const currentUserIndex = sortedResults.findIndex(r => r.student_name === currentUserName);
//   const showCurrentUserSeparately = currentUserIndex >= 0 && currentUserIndex >= maxVisible && !expanded;
  
//   return (
//     <LeaderboardCard>
//       <CardHeader>
//         <CardTitle>{title}</CardTitle>
//       </CardHeader>
//       <CardContent>
//         {sortedResults.length === 0 ? (
//           <EmptyState>
//             <p>Әзірге ешкім бірде-бір тесттен өткен жоқ.</p>
//           </EmptyState>
//         ) : (
//           <>
//             <TableContainer>
//               <Table>
//                 <TableHead>
//                   <tr>
//                   <th>Орын</th>
//                   <th>Аты</th>
//                   <th>Нәтижесі</th>
//                   <th>Тапсырған уақыты</th>
//                   </tr>
//                 </TableHead>
//                 <TableBody>
//                   {displayResults.map((result) => {
//                     const isCurrentUser = result.student_name === currentUserName;
//                     const date = new Date(result.created_at);
//                     const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
                    
//                     // Используем позицию из общего отсортированного массива
//                     const realPosition = sortedResults.findIndex(r => r.id === result.id) + 1;
                    
//                     return (
//                       <tr key={result.id} className={isCurrentUser ? 'current-user' : ''}>
//                         <td>{realPosition}</td>
//                         <td>
//                           {result.student_name} {isCurrentUser && '(Сіз)'}
//                         </td>
//                         <td>{result.percentage.toFixed(1)}%</td>
//                         <td>{formattedDate}</td>
//                       </tr>
//                     );
//                   })}
                  
//                   {/* Добавляем строку с текущим пользователем, если он не попал в отображаемую часть */}
//                   {showCurrentUserSeparately && (
//                     <>
//                       <tr>
//                         <td colSpan={4} style={{ textAlign: 'center', padding: '0.5rem' }}>...</td>
//                       </tr>
//                       <tr className="current-user">
//                         <td>{currentUserIndex + 1}</td>
//                         <td>{currentUserName} (Сіз)</td>
//                         <td>{sortedResults[currentUserIndex].percentage.toFixed(1)}%</td>
//                         <td>
//                           {new Date(sortedResults[currentUserIndex].created_at).toLocaleDateString() + ' ' +
//                            new Date(sortedResults[currentUserIndex].created_at).toLocaleTimeString()}
//                         </td>
//                       </tr>
//                     </>
//                   )}
//                 </TableBody>
//               </Table>
//             </TableContainer>
            
//             {sortedResults.length > maxVisible && (
//               <div style={{ textAlign: 'center' }}>
//                 <ShowMoreButton
//                   $variant="outline"
//                   onClick={() => setExpanded(!expanded)}
//                 >
//                   {expanded ? 'Показать меньше' : `Показать все (${sortedResults.length})`}
//                 </ShowMoreButton>
//               </div>
//             )}
//           </>
//         )}
//       </CardContent>
//     </LeaderboardCard>
//   );
// };
// app/components/leaderboard/ExpandableLeaderboard.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { Card, CardHeader, CardTitle, CardContent } from '../common/Card';
import { Button } from '../common/Button';
import { TestResult } from '../../services/api';

interface ExpandableLeaderboardProps {
  title: string;
  results: TestResult[];
  currentUserName: string;
  initialExpanded?: boolean;
  maxVisible?: number;
  testNumberOrder?: boolean; // Добавляем опцию для сортировки по номеру теста
}

const LeaderboardCard = styled(Card)`
  overflow: hidden;
  margin-bottom: 1rem;
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: rgba(52, 152, 219, 0.05);
  
  th {
    padding: 1rem;
    text-align: left;
    font-weight: 600;
    color: var(--text-color);
    border-bottom: 1px solid var(--border-color);
  }
`;

const TableBody = styled.tbody`
  tr {
    &:hover {
      background-color: rgba(0, 0, 0, 0.02);
    }
    
    &.current-user {
      background-color: rgba(52, 152, 219, 0.1);
    }
  }
  
  td {
    padding: 1rem;
    border-bottom: 1px solid var(--border-color);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 0;
  color: var(--text-light);
`;

const ShowMoreButton = styled(Button)`
  margin-top: 1rem;
`;

// Функция для извлечения номера из заголовка теста
const extractSectionNumber = (title: string): number => {
  // Ищем формат "X_..." или "X..." где X - число
  const match = title.match(/^(\d+)[\s_-]?/);
  return match ? parseInt(match[1], 10) : 999; // Если номер не найден, присваиваем большое число
};

export const ExpandableLeaderboard: React.FC<ExpandableLeaderboardProps> = ({
  title,
  results,
  currentUserName,
  initialExpanded = false,
  maxVisible = 10,
  testNumberOrder = true,
}) => {
  const [expanded, setExpanded] = useState(initialExpanded);
  
  // Сортируем результаты
  const sortedResults = [...results].sort((a, b) => {
    if (testNumberOrder) {
      // Сначала попробуем сортировать по номеру в названии теста
      const aNum = extractSectionNumber(title);
      const bNum = extractSectionNumber(title);
      
      if (aNum !== bNum) {
        return aNum - bNum;
      }
    }
    
    // Если номера равны или сортировка по номеру отключена,
    // сортируем по проценту (от большего к меньшему)
    if (a.percentage !== b.percentage) {
      return b.percentage - a.percentage;
    }
    
    // Если проценты равны, сортируем по дате (от более новых к более старым)
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
  
  // Определяем, сколько результатов отображать
  const displayResults = expanded ? sortedResults : sortedResults.slice(0, maxVisible);
  
  // Проверяем, есть ли текущий пользователь в списке и если его нет в отображаемой части,
  // добавляем его позицию в конце таблицы
  const currentUserIndex = sortedResults.findIndex(r => r.student_name === currentUserName);
  const showCurrentUserSeparately = currentUserIndex >= 0 && currentUserIndex >= maxVisible && !expanded;
  
  return (
    <LeaderboardCard>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {sortedResults.length === 0 ? (
          <EmptyState>
            <p>Әзірге ешкім бірде-бір тесттен өткен жоқ.</p>
          </EmptyState>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <tr>
                  <th>Орын</th>
                  <th>Аты</th>
                  <th>Нәтижесі</th>
                  <th>Тапсырған уақыты</th>
                  </tr>
                </TableHead>
                <TableBody>
                  {displayResults.map((result) => {
                    const isCurrentUser = result.student_name === currentUserName;
                    const date = new Date(result.created_at);
                    const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
                    
                    // Используем позицию из общего отсортированного массива
                    const realPosition = sortedResults.findIndex(r => r.id === result.id) + 1;
                    
                    return (
                      <tr key={result.id} className={isCurrentUser ? 'current-user' : ''}>
                        <td>{realPosition}</td>
                        <td>
                          {result.student_name} {isCurrentUser && '(Сіз)'}
                        </td>
                        <td>{result.percentage.toFixed(1)}%</td>
                        <td>{formattedDate}</td>
                      </tr>
                    );
                  })}
                  
                  {/* Добавляем строку с текущим пользователем, если он не попал в отображаемую часть */}
                  {showCurrentUserSeparately && (
                    <>
                      <tr>
                        <td colSpan={4} style={{ textAlign: 'center', padding: '0.5rem' }}>...</td>
                      </tr>
                      <tr className="current-user">
                        <td>{currentUserIndex + 1}</td>
                        <td>{currentUserName} (Сіз)</td>
                        <td>{sortedResults[currentUserIndex].percentage.toFixed(1)}%</td>
                        <td>
                          {new Date(sortedResults[currentUserIndex].created_at).toLocaleDateString() + ' ' +
                           new Date(sortedResults[currentUserIndex].created_at).toLocaleTimeString()}
                        </td>
                      </tr>
                    </>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            
            {sortedResults.length > maxVisible && (
              <div style={{ textAlign: 'center' }}>
                <ShowMoreButton
                  $variant="outline"
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? 'Показать меньше' : `Показать все (${sortedResults.length})`}
                </ShowMoreButton>
              </div>
            )}
          </>
        )}
      </CardContent>
    </LeaderboardCard>
  );
};