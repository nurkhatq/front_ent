// app/materials/[sectionId]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useUser } from '../../../app/context/UserContext';
import { Container } from '../../../app/components/common/Container';
import { MaterialCard } from '../../../app/components/materials/MaterialCard';
import { Spinner } from '../../../app/components/common/Spinner';
import { Section, learningMaterialsApi } from '../../../app/services/api';

const SectionContainer = styled(Container)`
  padding: 2rem 1rem;
`;

const SectionHeader = styled.div`
  margin-bottom: 2rem;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
  
  &:hover {
    text-decoration: underline;
  }
`;

const SectionTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const MaterialsGrid = styled.div`
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

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 0;
  color: var(--text-light);
  background-color: rgba(46, 204, 113, 0.05);
  border-radius: 8px;
`;

export default function SectionPage() {
  const params = useParams();
  const sectionId = Number(params.sectionId);
  const router = useRouter();
  const { isNameSet, isLoading } = useUser();
  
  const [section, setSection] = useState<Section | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!isLoading && !isNameSet) {
      router.push('/register-name');
      return;
    }
    
    const fetchSection = async () => {
      try {
        const sectionData = await learningMaterialsApi.getSection(sectionId);
        setSection(sectionData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching section:', err);
        setError('Не удалось загрузить раздел. Пожалуйста, попробуйте позже.');
        setLoading(false);
      }
    };
    
    fetchSection();
  }, [isNameSet, router, sectionId, isLoading]);
  if (isLoading) {
    return (
      <SectionContainer>
        <LoadingContainer>
          <Spinner size="40px" />
        </LoadingContainer>
      </SectionContainer>
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
      <SectionContainer>
        <LoadingContainer>
          <Spinner size="40px" />
        </LoadingContainer>
      </SectionContainer>
    );
  }
  
  if (error) {
    return (
      <SectionContainer>
        <ErrorMessage>{error}</ErrorMessage>
      </SectionContainer>
    );
  }
  
  if (!section) {
    return (
      <SectionContainer>
        <ErrorMessage>
          Сіз таңдаған бөлім табылмады. Басқа бөлімді таңдаңыз. 
        </ErrorMessage>
      </SectionContainer>
    );
  }
  
  return (
    <SectionContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SectionHeader>
          <BackLink href="/materials">← Бөлімдерге оралу</BackLink>
          <SectionTitle>{section.title}</SectionTitle>
        </SectionHeader>
        
        {section.materials.length === 0 ? (
          <EmptyState>
            <p>Бұл бөлімде әзірше материал жоқ.</p>
          </EmptyState>
        ) : (
          <MaterialsGrid>
            {section.materials.map((material, index) => (
              <motion.div
                key={material.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <MaterialCard 
                  material={material} 
                  sectionId={section.id} 
                />
              </motion.div>
            ))}
          </MaterialsGrid>
        )}
        </motion.div>
    </SectionContainer>
  );
}