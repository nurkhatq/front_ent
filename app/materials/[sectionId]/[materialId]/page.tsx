// app/materials/[sectionId]/[materialId]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import styled from 'styled-components';
import { useUser } from '../../../../app/context/UserContext';
import { Container } from '../../../../app/components/common/Container';
import { MaterialViewer } from '../../../../app/components/materials/MaterialViewer';
import { Button } from '../../../../app/components/common/Button';
import { Spinner } from '../../../../app/components/common/Spinner';
import { Material, Section, learningMaterialsApi } from '../../../../app/services/api';

const MaterialContainer = styled(Container)`
  padding: 2rem 1rem;
  max-width: 900px;
`;

const MaterialHeader = styled.div`
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

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
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

export default function MaterialPage() {
  const params = useParams();
  const sectionId = Number(params.sectionId);
  const materialId = Number(params.materialId);
  const router = useRouter();
  const { isNameSet, isLoading } = useUser();
  
  const [material, setMaterial] = useState<Material | null>(null);
  const [section, setSection] = useState<Section | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!isLoading && !isNameSet) {
      router.push('/register-name');
      return;
    }
    
    const fetchData = async () => {
      try {
        // Загружаем секцию и материал параллельно
        const [sectionData, materialData] = await Promise.all([
          learningMaterialsApi.getSection(sectionId),
          learningMaterialsApi.getMaterial(materialId)
        ]);
        
        setSection(sectionData);
        setMaterial(materialData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching material:', err);
        setError('Материалды жүктеу мүмкін болмады. Кейінірек қайталап көріңіз.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, [isNameSet, router, sectionId, materialId, isLoading]);
  
  // Получаем предыдущий и следующий материалы для навигации
  const getAdjacentMaterials = () => {
    if (!section) return { prev: null, next: null };
    
    const materialIndex = section.materials.findIndex(m => m.id === materialId);
    if (materialIndex === -1) return { prev: null, next: null };
    
    const prev = materialIndex > 0 ? section.materials[materialIndex - 1] : null;
    const next = materialIndex < section.materials.length - 1 ? section.materials[materialIndex + 1] : null;
    
    return { prev, next };
  };
  
  const { prev, next } = getAdjacentMaterials();
  if (isLoading) {
    return (
      <MaterialContainer>
        <LoadingContainer>
          <Spinner size="40px" />
        </LoadingContainer>
      </MaterialContainer>
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
      <MaterialContainer>
        <LoadingContainer>
          <Spinner size="40px" />
        </LoadingContainer>
      </MaterialContainer>
    );
  }
  
  if (error) {
    return (
      <MaterialContainer>
        <ErrorMessage>{error}</ErrorMessage>
      </MaterialContainer>
    );
  }
  
  if (!material || !section) {
    return (
      <MaterialContainer>
        <ErrorMessage>
        Сіз таңдаған бөлім табылмады. Басқа бөлімді таңдаңыз. 
        </ErrorMessage>
      </MaterialContainer>
    );
  }
  
  return (
    <MaterialContainer>
      <MaterialHeader>
        <BackLink href={`/materials/${sectionId}`}>
          ← Бөлімдерге оралу: {section.title}
        </BackLink>
      </MaterialHeader>
      
      <MaterialViewer material={material} />
      
      <NavigationButtons>
        {prev ? (
          <Button 
            as={Link} 
            href={`/materials/${sectionId}/${prev.id}`}
            $variant="outline"
          >
            ← {prev.title}
          </Button>
        ) : (
          <div></div>
        )}
        
        {next && (
          <Button 
            as={Link} 
            href={`/materials/${sectionId}/${next.id}`}
            $variant="outline"
          >
            {next.title} →
          </Button>
        )}
      </NavigationButtons>
    </MaterialContainer>
  );
}