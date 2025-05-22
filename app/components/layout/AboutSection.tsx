// app/components/layout/AboutSection.tsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container } from '../common/Container';

const AboutSectionContainer = styled.section`
  padding: 5rem 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233498db' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    z-index: 0;
  }
`;

const AboutContent = styled.div`
  position: relative;
  z-index: 1;
`;

const AboutHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const AboutTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const AboutSubtitle = styled.p`
  font-size: 1.25rem;
  color: var(--text-light);
  max-width: 800px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const AboutCard = styled(motion.div)`
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  }
`;

const AboutCardIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(45deg, var(--primary-color), var(--primary-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  align-self: center;
`;

const AboutCardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-color);
`;

const AboutCardText = styled.p`
  color: var(--text-light);
  line-height: 1.7;
  flex-grow: 1;
`;

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
  text-align: center;
`;

const StatItem = styled.div`
  padding: 1.5rem;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StatTitle = styled.div`
  font-size: 1.1rem;
  color: var(--text-color);
`;

const TestimonialSection = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 3rem auto 0;
  padding: 2rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  position: relative;
  
  &::before {
    content: '"';
    position: absolute;
    top: -0.5rem;
    left: 2rem;
    font-size: 6rem;
    color: var(--primary-light);
    opacity: 0.2;
    font-family: Georgia, serif;
  }
`;

const TestimonialText = styled.blockquote`
  font-size: 1.2rem;
  line-height: 1.8;
  color: var(--text-color);
  font-style: italic;
  margin-bottom: 1.5rem;
`;

const TestimonialAuthor = styled.cite`
  font-size: 1rem;
  color: var(--text-light);
  font-style: normal;
  display: block;
`;

export const AboutSection: React.FC = () => {
  return (
    <AboutSectionContainer>
      <Container>
        <AboutContent>
          <AboutHeader>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <AboutTitle>Біз туралы</AboutTitle>
              <AboutSubtitle>
                Информатика пәнінен ҰБТ-ға даярлауға арналған заманауи платформа
              </AboutSubtitle>
            </motion.div>
          </AboutHeader>
          
          <AboutGrid>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <AboutCard whileHover={{ y: -5 }}>
                <AboutCardIcon>🎯</AboutCardIcon>
                <AboutCardTitle>Біздің миссиямыз</AboutCardTitle>
                <AboutCardText>
                  Біздің миссиямыз – оқушыларға информатика пәнінен ҰБТ-ны сәтті тапсыруға көмектесу. 
                  Біз оқушыларға қолжетімді, тиімді және қызықты оқу тәжірибесін ұсыну арқылы, 
                  барлық оқушылардың ЖОО-ға түсу мүмкіндіктерін арттыруға тырысамыз.
                </AboutCardText>
              </AboutCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <AboutCard whileHover={{ y: -5 }}>
                <AboutCardIcon>🔍</AboutCardIcon>
                <AboutCardTitle>Тесттер және тапсырмалар</AboutCardTitle>
                <AboutCardText>
                  Біздің платформадағы барлық тест тапсырмалары ҰБТ-дағы тест спецификасы негізінде құрастырылған. 
                  Әр тақырып бойынша бірнеше тесттер бар, сонымен қатар контекстік тесттер мен тапсырмалар да қамтылған, 
                  бұл оқушыларға толыққанды дайындалуға мүмкіндік береді.
                </AboutCardText>
              </AboutCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <AboutCard whileHover={{ y: -5 }}>
                <AboutCardIcon>📚</AboutCardIcon>
                <AboutCardTitle>Оқу материалдары</AboutCardTitle>
                <AboutCardText>
                  Біздің платформада толық оқу материалдары бар: конспектілер, формулалар, 
                  алгоритмдер, мысалдар және графикалық материалдар. Біз оқушыларға 
                  толық ақпаратты ұсынуға тырысамыз, бұл оларға ҰБТ-ға жақсы дайындалуға көмектеседі.
                </AboutCardText>
              </AboutCard>
            </motion.div>
          </AboutGrid>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <StatsSection>
              <StatItem>
                <StatNumber>300+</StatNumber>
                <StatTitle>Тест сұрақтары</StatTitle>
              </StatItem>
              <StatItem>
                <StatNumber>14</StatNumber>
                <StatTitle>Тақырыптар</StatTitle>
              </StatItem>
              <StatItem>
                <StatNumber>50+</StatNumber>
                <StatTitle>Оқу материалдары</StatTitle>
              </StatItem>
              <StatItem>
                <StatNumber>10+</StatNumber>
                <StatTitle>Контекстік тесттер</StatTitle>
              </StatItem>
            </StatsSection>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <TestimonialSection>
              <TestimonialText>
                Информатика пәнінен ҰБТ-ға даярлау платформасына қош келдіңіз.
                Бұл жобаның басты мақсаты – оқушыларды ҰБТ-ны сәтті тапсыруға қолжетімді әрі қызықты түрде дайындау. 
                Мұндағы тест тапсырмалары ҰБТ-дағы тест спецификасы негізінде құрастырылған. 
                Сонымен қатар, оқу материалдарының конспектілері, контекстік тесттер, бейнежазбалары бар. 
                Сіз үшін пайдалы оқу құралы болады деп үміттенеміз. Сәттілік!
              </TestimonialText>
              <TestimonialAuthor>Жобаның авторлары</TestimonialAuthor>
            </TestimonialSection>
          </motion.div>
        </AboutContent>
      </Container>
    </AboutSectionContainer>
  );
};