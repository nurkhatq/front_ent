// app/components/materials/MaterialViewer.tsx
'use client';

import React, { useMemo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Material } from '@/app/services/api';

interface MaterialViewerProps {
  material: Material;
}

const MaterialContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: var(--card-shadow);
`;

const MaterialTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: var(--text-color);
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const MaterialContent = styled.div`
  line-height: 1.7;
  font-size: 1.1rem;
  
  h1, h2, h3, h4, h5, h6 {
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: var(--text-color);
  }
  
  h1 { font-size: 2rem; }
  h2 { font-size: 1.75rem; }
  h3 { font-size: 1.5rem; }
  
  p { margin-bottom: 1rem; }
  
  ul, ol {
    margin-bottom: 1rem;
    padding-left: 2rem;
  }
  
  li { margin-bottom: 0.5rem; }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
    overflow-x: auto;
    display: block;
    
    @media (min-width: 768px) {
      display: table;
    }
    
    th, td {
      border: 1px solid var(--border-color);
      padding: 0.75rem;
    }
    
    th {
      background-color: rgba(52, 152, 219, 0.05);
      font-weight: 600;
    }
    
    tr:nth-child(even) {
      background-color: rgba(0, 0, 0, 0.02);
    }
  }
  
  /* Стили для изображений из материалов */
  .material-image {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 1.5rem auto;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 1.5rem auto;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .table-wrapper {
    overflow-x: auto;
    margin: 1.5rem 0;
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    
    h1 { font-size: 1.5rem; }
    h2 { font-size: 1.3rem; }
    h3 { font-size: 1.2rem; }
  }
`;

export const MaterialViewer: React.FC<MaterialViewerProps> = ({ material }) => {
  const processedHtml = useMemo(() => {
    console.log('Material:', material.title);
    console.log('Content HTML length:', material.content_html?.length || 0);
    console.log('Has images flag:', material.has_images);
    console.log('Images array:', material.images?.length || 0);
    
    // Логируем часть HTML для проверки
    if (material.content_html) {
      console.log('HTML preview:', material.content_html.substring(0, 500));
    }
    
    return material.content_html || '';
  }, [material]);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <MaterialContainer>
        <MaterialTitle>{material.title}</MaterialTitle>
        <MaterialContent 
          dangerouslySetInnerHTML={{ __html: processedHtml }}
        />
        

      </MaterialContainer>
    </motion.div>
  );
};