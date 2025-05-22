// app/about/page.tsx
'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container } from '../components/common/Container';

const AboutContainer = styled(Container)`
  padding: 2rem 1rem;
  max-width: 900px;
`;

const AboutTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const AboutSection = styled.section`
  margin-bottom: 3rem;
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: var(--card-shadow);
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const SectionContent = styled.div`
  font-size: 1.1rem;
  line-height: 1.7;
  
  p {
    margin-bottom: 1rem;
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    padding-left: 1.5rem;
    position: relative;
    margin-bottom: 1rem;
    
    &:before {
      content: '✓';
      color: var(--secondary-color);
      position: absolute;
      left: 0;
      top: 0;
    }
  }
`;

const TechStack = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const TechItem = styled.div`
  background-color: rgba(52, 152, 219, 0.05);
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  
  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: var(--primary-color);
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      margin-bottom: 0.5rem;
    }
  }
`;

export default function AboutPage() {
  return (
    <AboutContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AboutTitle>О системе</AboutTitle>
        
        <AboutSection>
          <SectionTitle>Цель проекта</SectionTitle>
          <SectionContent>
            <p>
              ENT Trainer - это интерактивный тренажёр для подготовки к Единому Национальному Тестированию (ЕНТ) 
              по информатике, предназначенный для учащихся старших классов.
            </p>
            <p>
              Система разработана с целью помочь ученикам эффективно подготовиться к ЕНТ, предоставляя 
              доступ к учебным материалам, тестовым заданиям и возможность отслеживать свой прогресс.
            </p>
          </SectionContent>
        </AboutSection>
        
        <AboutSection>
          <SectionTitle>Возможности системы</SectionTitle>
          <SectionContent>
            <FeatureList>
              <li>
                <strong>Оқу материалдары</strong> - доступ к структурированным материалам 
                по 14 основным темам информатики
              </li>
              <li>
                <strong>Тест тапсырмалары</strong> - более 300 вопросов с автоматической проверкой, 
                разделенные по темам
              </li>
              <li>
                <strong>Контекстік тесттер</strong> - задания для развития навыков анализа информации 
                и работы с текстом
              </li>
              <li>
                <strong>Рейтинг</strong> - возможность отслеживать свои результаты и 
                сравнивать их с результатами других учеников
              </li>
              <li>
                <strong>Адаптивный дизайн</strong> - удобный интерфейс для работы на компьютере, 
                планшете и смартфоне
              </li>
            </FeatureList>
          </SectionContent>
        </AboutSection>
        
        <AboutSection>
          <SectionTitle>Технический стек</SectionTitle>
          <SectionContent>
            <p>
              Система разработана с использованием современных технологий, обеспечивающих быструю работу,
              безопасность и удобство использования.
            </p>
            
            <TechStack>
              <TechItem>
                <h3>Фронтенд</h3>
                <ul>
                  <li>Next.js (React)</li>
                  <li>TypeScript</li>
                  <li>Styled Components</li>
                  <li>Framer Motion</li>
                </ul>
              </TechItem>
              
              <TechItem>
                <h3>Бэкенд</h3>
                <ul>
                  <li>Django</li>
                  <li>Django REST Framework</li>
                  <li>PostgreSQL</li>
                  <li>Docker</li>
                </ul>
              </TechItem>
              
              <TechItem>
                <h3>Хранение данных</h3>
                <ul>
                  <li>AWS S3</li>
                  <li>PostgreSQL</li>
                </ul>
              </TechItem>
            </TechStack>
          </SectionContent>
        </AboutSection>
      </motion.div>
    </AboutContainer>
  );
}