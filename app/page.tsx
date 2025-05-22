// app/page.tsx
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useUser } from './context/UserContext';
import { Container } from './components/common/Container';
import { Card, CardHeader, CardTitle, CardContent } from './components/common/Card';
import { Button } from './components/common/Button';
import { Spinner } from './components/common/Spinner';
import { AboutSection } from './components/layout/AboutSection';

// Улучшенный Hero раздел с анимированным фоном
const HeroSection = styled.section`
  position: relative;
  padding: 6rem 0;
  text-align: center;
  background: linear-gradient(135deg, var(--primary-light) 0%, var(--primary-color) 100%);
  color: white;
  margin-bottom: 4rem;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
    opacity: 0.2;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 50px;
    background: linear-gradient(to bottom right, transparent 49%, white 50%);
  }
`;

const HeroContainer = styled(Container)`
  max-width: 900px;
  position: relative;
  z-index: 1;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  text-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  margin-bottom: 2.5rem;
  opacity: 0.95;
  max-width: 750px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const HeroButton = styled(Button)`
  padding: 0.8rem 2rem;
  font-size: 1.1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  transform: translateY(0);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }
`;

// Стилизованная секция функций
const FeaturesSection = styled.section`
  padding: 2rem 0 4rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg width='84' height='48' viewBox='0 0 84 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h12v6H0V0zm28 8h12v6H28V8zm14-8h12v6H42V0zm14 0h12v6H56V0zm0 8h12v6H56V8zM42 8h12v6H42V8zm0 16h12v6H42v-6zm14-8h12v6H56v-6zm14 0h12v6H70v-6zm0-16h12v6H70V0zM28 32h12v6H28v-6zM14 16h12v6H14v-6zM0 24h12v6H0v-6zm0 8h12v6H0v-6zm14 0h12v6H14v-6zm14 8h12v6H28v-6zm-14 0h12v6H14v-6zm28 0h12v6H42v-6zm14-8h12v6H56v-6zm0-8h12v6H56v-6zm14 8h12v6H70v-6zm0 8h12v6H70v-6zM14 24h12v6H14v-6zm14-8h12v6H28v-6zM14 8h12v6H14V8zM0 8h12v6H0V8z' fill='%233498db' fill-opacity='0.02' fill-rule='evenodd'/%3E%3C/svg%3E");
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2.5rem;
  background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const FeatureCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureCardHeader = styled(CardHeader)`
  position: relative;
  overflow: hidden;
  border-radius: 0;
  padding: 2rem 1.5rem;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(52, 152, 219, 0.15), rgba(46, 204, 113, 0.05));
    z-index: -1;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: linear-gradient(to bottom, var(--primary-color), var(--secondary-color));
  }
`;

const FeatureCardContent = styled(CardContent)`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
`;

const FeatureCardDescription = styled.p`
  color: var(--text-light);
  line-height: 1.7;
  flex-grow: 1;
  margin-bottom: 1.5rem;
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.2rem;
  color: var(--primary-color);
`;

const FeatureTitle = styled(CardTitle)`
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
`;

// Улучшенная CTA секция
const CTASection = styled.section`
  position: relative;
  padding: 4rem 0;
  text-align: center;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 16px;
  margin-bottom: 4rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%233498db' fill-opacity='0.05'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 20.83l2.83-2.83 1.41 1.41L1.41 22H0v-1.17zM0 3.07l2.83-2.83 1.41 1.41L1.41 4.24H0V3.07zm18.34 18.34l2.83-2.83 1.41 1.41L19.76 23h-1.41v-1.59zm18.34-18.34l2.83-2.83 1.41 1.41L38.17 4.24h-1.41V3.07zM20 1.41l2.83-2.83 1.41 1.41L21.41 3H20V1.41zm0 17.66l2.83-2.83 1.41 1.41-2.83 2.83H20v-1.41zm0 17.66l2.83-2.83 1.41 1.41-2.83 2.83H20v-1.41zm18.34-17.66l2.83-2.83 1.41 1.41-2.83 2.83h-1.41v-1.41zM20 18.34l2.83-2.83 1.41 1.41L21.41 20H20v-1.66zm0 17.66l2.83-2.83 1.41 1.41L21.41 37.66H20v-1.66zm18.34-17.66l2.83-2.83 1.41 1.41-2.83 2.83h-1.41V18.34z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
`;

const CTAContent = styled.div`
  position: relative;
  z-index: 1;
`;

const CTATitle = styled.h2`
  font-size: 2.25rem;
  margin-bottom: 1.25rem;
  background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const CTADescription = styled.p`
  font-size: 1.15rem;
  margin-bottom: 2.5rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  color: var(--text-color);
  line-height: 1.7;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const StyledButton = styled(Button)`
  padding: 0.75rem 1.75rem;
  border-radius: 50px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

// Анимированный Loading компонент
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const SpinnerContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const LoadingText = styled(motion.p)`
  color: var(--primary-color);
  font-size: 1.2rem;
  font-weight: 500;
  margin-top: 1rem;
`;

export default function Home() {
  const { isNameSet, studentName, isLoading } = useUser();
  const router = useRouter();
  
  // Если имя не указано, перенаправляем на страницу ввода имени
  useEffect(() => {
    if (!isLoading && !isNameSet) {
      router.push('/register-name');
    }
  }, [isNameSet, router, isLoading]);
  
  // Улучшенный экран загрузки
  if (isLoading || !isNameSet) {
    return (
      <LoadingContainer>
        <SpinnerContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Spinner size="50px" color="var(--primary-color)" />
          <LoadingText
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Жүктелуде...
          </LoadingText>
        </SpinnerContainer>
      </LoadingContainer>
    );
  }
  
  return (
    <>
      <HeroSection>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <HeroContainer>
            <HeroTitle>
              Информатика пәні бойынша ҰБТ-ға даярлауға арналған әдістемелік жүйеге қош келдіңіз!
            </HeroTitle>
            <HeroSubtitle>
              Сәлем, {studentName}! Мұнда сіз Ұлттық Бірыңғай Тестілеуге дайындалуға қажетті барлық материалдар мен тесттерді таба аласыз.
            </HeroSubtitle>
            <HeroButton size="large" as={Link} href="/tests">
              Тестті бастау
            </HeroButton>
          </HeroContainer>
        </motion.div>
      </HeroSection>
      
      <Container>
        <FeaturesSection>
          <SectionTitle>Біздің мүмкіндіктер</SectionTitle>
          
          <FeaturesGrid>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <FeatureCard>
                <FeatureCardHeader>
                  <FeatureIcon>📚</FeatureIcon>
                  <FeatureTitle>Оқу материалдары</FeatureTitle>
                </FeatureCardHeader>
                <FeatureCardContent>
                  <FeatureCardDescription>
                    Информатика пәнінің тақырыптары бойынша бөлімдерге бөлінген толық оқу материалдарына қолжетімділік.
                  </FeatureCardDescription>
                  <Link href="/materials" passHref>
                    <Button fullWidth>Материалдарды оқу</Button>
                  </Link>
                </FeatureCardContent>
              </FeatureCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <FeatureCard>
                <FeatureCardHeader>
                  <FeatureIcon>✅</FeatureIcon>
                  <FeatureTitle>Тест тапсырмалары</FeatureTitle>
                </FeatureCardHeader>
                <FeatureCardContent>
                  <FeatureCardDescription>
                    300-ден астам сұрақ, тақырыптар бойынша бөлінген, білімді тексеру және прогресті бақылау мүмкіндігімен.
                  </FeatureCardDescription>
                  <Link href="/tests" passHref>
                    <Button fullWidth>Тест тапсыру</Button>
                  </Link>
                </FeatureCardContent>
              </FeatureCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <FeatureCard>
                <FeatureCardHeader>
                  <FeatureIcon>🧩</FeatureIcon>
                  <FeatureTitle>Контекстік тесттер</FeatureTitle>
                </FeatureCardHeader>
                <FeatureCardContent>
                  <FeatureCardDescription>
                    Ақпаратты талдау және мәтінмен жұмыс істеу дағдыларын дамытатын контекстік тесттер.
                  </FeatureCardDescription>
                  <Link href="/context-tests" passHref>
                    <Button fullWidth>Контекстік тесттер</Button>
                  </Link>
                </FeatureCardContent>
              </FeatureCard>
            </motion.div>
          </FeaturesGrid>
        </FeaturesSection>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <CTASection>
            <Container>
              <CTAContent>
                <CTATitle>Дайындықты бастауға дайынсыз ба?</CTATitle>
                <CTADescription>
                  Қажетті бөлімді таңдаңыз және оқуды бастаңыз. Жүйе сіздің нәтижелеріңізді сақтап, дайындық барысын бақылауға көмектеседі.
                </CTADescription>
                <ButtonGroup>
                  <StyledButton $variant="secondary" as={Link} href="/materials">
                    Теорияны оқу
                  </StyledButton>
                  <StyledButton as={Link} href="/tests">
                    Тест тапсыру
                  </StyledButton>
                </ButtonGroup>
              </CTAContent>
            </Container>
          </CTASection>
        </motion.div>
      </Container>
      
      <AboutSection />
    </>
  );
}