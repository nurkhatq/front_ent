// app/components/context-tests/ContextViewer.tsx (исправленная версия)
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Context } from '@/app/services/api';

interface ContextViewerProps {
  context: Context;
}

const ContextContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: var(--card-shadow);
  height: 100%;
`;

const ContextTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--accent-color);
`;

const ContextText = styled.div`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  
  p {
    margin-bottom: 1rem;
  }
`;

const ContextImagesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
`;

const ContextImageWrapper = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ContextImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const ErrorMessage = styled.div`
  color: var(--error-color);
  padding: 1rem;
  background-color: rgba(231, 76, 60, 0.1);
  border-radius: 4px;
  margin-bottom: 1rem;
`;

export const ContextViewer: React.FC<ContextViewerProps> = ({ context }) => {
  // Проверяем, что контекст существует и имеет текст
  if (!context) {
    return (
      <ContextContainer>
        <ErrorMessage>Контекст табылмады</ErrorMessage>
      </ContextContainer>
    );
  }

  // Безопасно разбиваем текст на параграфы, проверяя что текст существует
  const text = context.text || '';
  const paragraphs = text.split('\n').filter(p => p.trim().length > 0);

  // Безопасно проверяем наличие изображений
  const hasImages = context.images && Array.isArray(context.images) && context.images.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      style={{ height: '100%' }}
    >
      <ContextContainer>
        <ContextTitle>Контекст</ContextTitle>
        <ContextText>
          {paragraphs.length > 0 ? (
            paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))
          ) : (
            <p>Контекстің мәтіні табылмады</p>
          )}
        </ContextText>
        
        {hasImages && (
          <ContextImagesContainer>
            {context.images.map((image, index) => (
              <ContextImageWrapper key={index}>
                <ContextImage 
                  src={image.url} 
                  alt={`Изображение ${index + 1}`} 
                  onError={(e) => {
                    // Обработка ошибки загрузки изображения
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
                  }}
                />
              </ContextImageWrapper>
            ))}
          </ContextImagesContainer>
        )}
      </ContextContainer>
    </motion.div>
  );
};