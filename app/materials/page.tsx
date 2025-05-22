// app/materials/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useUser } from '../../app/context/UserContext';
import { Container } from '../../app/components/common/Container';
import { SectionCard } from '../../app/components/materials/SectionCard';
import { Spinner } from '../../app/components/common/Spinner';
import { Section, learningMaterialsApi } from '../../app/services/api';

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

const SectionsGrid = styled.div`
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

export default function MaterialsPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isNameSet, isLoading } = useUser();
  const router = useRouter();
  
  useEffect(() => {
    if (!isLoading && !isNameSet) {
      router.push('/register-name');
      return;
    }
    
    const fetchSections = async () => {
      try {
        const sectionsData = await learningMaterialsApi.getSections();
        setSections(sectionsData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching sections:', err);
        setError('Не удалось загрузить разделы. Пожалуйста, попробуйте позже.');
        setLoading(false);
      }
    };
    
    fetchSections();
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
        <PageTitle>Оқу материалдары</PageTitle>
        <PageDescription>
        Информатика бойынша теориялық материалдар ҰБТ бағдарламасының негізгі бөлімдері бойынша құрылымдалған.
        Оқу материалдарына қол жеткізу үшін сізді қызықтыратын бөлімді таңдаңыз.
        </PageDescription>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        {loading ? (
          <LoadingContainer>
            <Spinner size="40px" />
          </LoadingContainer>
        ) : (
          <SectionsGrid>
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <SectionCard section={section} />
              </motion.div>
            ))}
          </SectionsGrid>
        )}
      </motion.div>
    </Container>
  );
}
