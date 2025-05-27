// // app/components/materials/SectionCard.tsx
// 'use client';
// import React from 'react';
// import styled from 'styled-components';
// import { motion } from 'framer-motion';
// import { Section } from '@/app/services/api';
// import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../common/Card';
// import { Button } from '../common/Button';

// interface SectionCardProps {
//   section: Section;
// }

// const SectionCardContainer = styled(Card)`
//   display: flex;
//   flex-direction: column;
//   height: 360px; /* Фиксированная высота для всех карточек */
//   border-radius: 12px;
//   overflow: hidden;
//   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
//   transition: transform 0.3s ease, box-shadow 0.3s ease;
//   border: none;
  
//   &:hover {
//     transform: translateY(-10px);
//     box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
//   }
// `;

// const SectionCardHeaderStyled = styled(CardHeader)`
//   position: relative;
//   overflow: hidden;
//   height: 90px; /* Фиксированная высота заголовка */
//   padding: 1.25rem;
  
//   &::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background: linear-gradient(135deg, rgba(46, 204, 113, 0.15), rgba(39, 174, 96, 0.05));
//     z-index: -1;
//   }
  
//   &::after {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 5px;
//     height: 100%;
//     background: linear-gradient(to bottom, var(--secondary-color), #7dcea0);
//   }
// `;

// const SectionCardTitle = styled(CardTitle)`
//   font-size: 1.25rem;
//   line-height: 1.4;
//   margin-bottom: 0.5rem;
//   display: -webkit-box;
//   -webkit-line-clamp: 1;
//   -webkit-box-orient: vertical;
//   overflow: hidden;
//   font-weight: 600;
//   color: var(--text-color);
//   padding-left: 0.5rem;
// `;

// const SectionCardDescription = styled(CardDescription)`
//   font-size: 0.9rem;
//   color: var(--text-light);
//   padding-left: 0.5rem;
// `;

// const SectionCardContent = styled(CardContent)`
//   flex-grow: 1;
//   overflow: hidden;
//   padding: 1rem 1.25rem;
// `;

// const MaterialsList = styled.ul`
//   list-style: none;
//   padding: 0;
//   margin: 0;
//   height: 120px; /* Фиксированная высота для списка материалов */
//   overflow: hidden;
// `;

// const MaterialItem = styled.li`
//   margin-bottom: 0.75rem;
//   display: flex;
//   align-items: flex-start;
//   font-size: 0.95rem;
//   line-height: 1.4;
//   color: var(--text-color);
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   transition: color 0.2s ease;
  
//   &:before {
//     content: '•';
//     margin-right: 0.75rem;
//     color: var(--secondary-color);
//     flex-shrink: 0;
//     font-size: 1.2rem;
//     line-height: 1;
//   }
  
//   &:hover {
//     color: var(--secondary-color);
//   }
// `;

// const MoreMaterialsItem = styled(MaterialItem)`
//   color: var(--text-light);
//   font-size: 0.9rem;
//   font-style: italic;
  
//   &:before {
//     content: '...';
//     margin-right: 0.75rem;
//     color: var(--text-light);
//   }
// `;

// const SectionCardFooter = styled(CardFooter)`
//   padding: 1.25rem;
//   margin-top: auto;
//   border-top: 1px solid rgba(0, 0, 0, 0.03);
// `;

// const SectionButton = styled(Button)`
//   border-radius: 8px;
//   box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
//   transition: transform 0.3s ease, box-shadow 0.3s ease;
  
//   &:hover {
//     transform: translateY(-3px);
//     box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
//   }
// `;

// const MaterialIcon = styled.span`
//   margin-right: 0.5rem;
//   color: var(--secondary-color);
// `;

// export const SectionCard: React.FC<SectionCardProps> = ({ section }) => {
//   // Показываем до 3 материалов в превью карточки
//   const previewMaterials = section.materials.slice(0, 3);
  
//   // Функция для определения окончания слова "материал" в зависимости от количества
//   const getMaterialsText = (count: number) => {
//     if (count === 1) return "материал";
//     return "материал";
//   };
  
//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.3 }}
//     >
//       <SectionCardContainer hoverable>
//         <SectionCardHeaderStyled>
//           <SectionCardTitle>{section.title}</SectionCardTitle>
//           <SectionCardDescription>
//             {section.materials.length} {getMaterialsText(section.materials.length)}
//           </SectionCardDescription>
//         </SectionCardHeaderStyled>
//         <SectionCardContent>
//           <MaterialsList>
//             {previewMaterials.map(material => (
//               <MaterialItem key={material.id} title={material.title}>
//                 {material.title}
//               </MaterialItem>
//             ))}
            
//             {section.materials.length > 3 && (
//               <MoreMaterialsItem>
//                 тағы {section.materials.length - 3} материал
//               </MoreMaterialsItem>
//             )}
//           </MaterialsList>
//         </SectionCardContent>
//         <SectionCardFooter>
//           <SectionButton
//             as="a"
//             href={`/materials/${section.id}`}
//             fullWidth
//             $variant="secondary"
//           >
//             <MaterialIcon>📚</MaterialIcon>
//             Оқу материалдарын қарау
//           </SectionButton>
//         </SectionCardFooter>
//       </SectionCardContainer>
//     </motion.div>
//   );
// };
// app/components/materials/SectionCard.tsx
'use client';
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Section } from '@/app/services/api';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../common/Card';
import { Button } from '../common/Button';

interface SectionCardProps {
  section: Section;
}

const SectionCardContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 360px; /* Фиксированная высота для всех карточек */
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: none;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  }
`;

const SectionCardHeaderStyled = styled(CardHeader)`
  position: relative;
  overflow: hidden;
  height: auto; /* Изменено: автоматическая высота заголовка */
  min-height: 90px; /* Минимальная высота */
  padding: 1.25rem;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(46, 204, 113, 0.15), rgba(39, 174, 96, 0.05));
    z-index: -1;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: linear-gradient(to bottom, var(--secondary-color), #7dcea0);
  }
`;

const SectionCardTitle = styled(CardTitle)`
  font-size: 1.25rem;
  line-height: 1.4;
  margin-bottom: 0.5rem;
  word-wrap: break-word; /* Изменено: разрешаем перенос слов */
  white-space: normal; /* Изменено: разрешаем многострочный текст */
  font-weight: 600;
  color: var(--text-color);
  padding-left: 0.5rem;
`;

const SectionCardDescription = styled(CardDescription)`
  font-size: 0.9rem;
  color: var(--text-light);
  padding-left: 0.5rem;
`;

const SectionCardContent = styled(CardContent)`
  flex-grow: 1;
  overflow: hidden;
  padding: 1rem 1.25rem;
`;

const MaterialsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  height: 120px; /* Фиксированная высота для списка материалов */
  overflow: hidden;
`;

const MaterialItem = styled.li`
  margin-bottom: 0.75rem;
  display: flex;
  align-items: flex-start;
  font-size: 0.95rem;
  line-height: 1.4;
  color: var(--text-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.2s ease;
  
  &:before {
    content: '•';
    margin-right: 0.75rem;
    color: var(--secondary-color);
    flex-shrink: 0;
    font-size: 1.2rem;
    line-height: 1;
  }
  
  &:hover {
    color: var(--secondary-color);
  }
`;

const MoreMaterialsItem = styled(MaterialItem)`
  color: var(--text-light);
  font-size: 0.9rem;
  font-style: italic;
  
  &:before {
    content: '...';
    margin-right: 0.75rem;
    color: var(--text-light);
  }
`;

const SectionCardFooter = styled(CardFooter)`
  padding: 1.25rem;
  margin-top: auto;
  border-top: 1px solid rgba(0, 0, 0, 0.03);
`;

const SectionButton = styled(Button)`
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
`;

const MaterialIcon = styled.span`
  margin-right: 0.5rem;
  color: var(--secondary-color);
`;

export const SectionCard: React.FC<SectionCardProps> = ({ section }) => {
  // Показываем до 3 материалов в превью карточки
  const previewMaterials = section.materials.slice(0, 3);
  
  // Функция для определения окончания слова "материал" в зависимости от количества
  const getMaterialsText = (count: number) => {
    if (count === 1) return "материал";
    return "материал";
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      <SectionCardContainer hoverable>
        <SectionCardHeaderStyled>
          <SectionCardTitle>{section.title}</SectionCardTitle>
          <SectionCardDescription>
            {section.materials.length} {getMaterialsText(section.materials.length)}
          </SectionCardDescription>
        </SectionCardHeaderStyled>
        <SectionCardContent>
          <MaterialsList>
            {previewMaterials.map(material => (
              <MaterialItem key={material.id} title={material.title}>
                {material.title}
              </MaterialItem>
            ))}
            
            {section.materials.length > 3 && (
              <MoreMaterialsItem>
                тағы {section.materials.length - 3} материал
              </MoreMaterialsItem>
            )}
          </MaterialsList>
        </SectionCardContent>
        <SectionCardFooter>
          <SectionButton
            as="a"
            href={`/materials/${section.id}`}
            fullWidth
            $variant="secondary"
          >
            <MaterialIcon>📚</MaterialIcon>
            Оқу материалдарын қарау
          </SectionButton>
        </SectionCardFooter>
      </SectionCardContainer>
    </motion.div>
  );
};