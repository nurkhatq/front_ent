// app/components/materials/MaterialCard.tsx
"use client";
import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Material } from '../../../app/services/api';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../common/Card';
import { Button } from '../common/Button';

interface MaterialCardProps {
  material: Material;
  sectionId: number;
}

const MaterialCardContainer = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
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

const MaterialCardHeader = styled(CardHeader)`
  position: relative;
  padding: 1.25rem;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(41, 128, 185, 0.05));
    z-index: -1;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: linear-gradient(to bottom, var(--primary-color), var(--primary-light));
  }
`;

const MaterialCardTitle = styled(CardTitle)`
  font-size: 1.25rem;
  line-height: 1.4;
  margin-bottom: 0.75rem;
  font-weight: 600;
  color: var(--text-color);
  padding-left: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.8rem;
`;

const MaterialCardContent = styled(CardContent)`
  flex-grow: 1;
  padding: 0.75rem 1.25rem 1.25rem;
`;

const MaterialDescription = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 1rem;
  color: var(--text-color);
  line-height: 1.6;
  font-size: 0.95rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 30%;
    height: 1.6em;
    background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
  }
`;

const BadgesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  padding-left: 0.5rem;
`;

const MaterialBadge = styled.span`
  display: inline-flex;
  align-items: center;
  background-color: rgba(46, 204, 113, 0.1);
  color: var(--secondary-color);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  transition: transform 0.2s ease, background-color 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    background-color: rgba(46, 204, 113, 0.15);
  }
`;

const ImageBadge = styled(MaterialBadge)`
  background-color: rgba(52, 152, 219, 0.1);
  color: var(--primary-color);
  
  &:hover {
    background-color: rgba(52, 152, 219, 0.15);
  }
`;

const TableBadge = styled(MaterialBadge)`
  background-color: rgba(155, 89, 182, 0.1);
  color: var(--accent-color);
  
  &:hover {
    background-color: rgba(155, 89, 182, 0.15);
  }
`;

const FormulaBadge = styled(MaterialBadge)`
  background-color: rgba(243, 156, 18, 0.1);
  color: var(--warning-color);
  
  &:hover {
    background-color: rgba(243, 156, 18, 0.15);
  }
`;

const MaterialCardFooter = styled(CardFooter)`
  padding: 1.25rem;
  border-top: 1px solid rgba(0, 0, 0, 0.03);
`;

const MaterialButton = styled(Button)`
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
`;

const BadgeIcon = styled.span`
  margin-right: 0.25rem;
  font-size: 0.85rem;
`;

export const MaterialCard: React.FC<MaterialCardProps> = ({ material, sectionId }) => {
  // Функция для удаления HTML тегов для превью
  const stripHtml = (html: string) => {
    const tempEl = document.createElement('div');
    tempEl.innerHTML = html;
    return tempEl.textContent || tempEl.innerText || '';
  };
  
  // Получаем чистый текст для превью (первые 150 символов)
  const previewText = stripHtml(material.content_html).substring(0, 180) + '...';
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      <MaterialCardContainer hoverable>
        <MaterialCardHeader>
          <MaterialCardTitle>{material.title}</MaterialCardTitle>
          <BadgesContainer>
            {material.has_images && (
              <ImageBadge>
                <BadgeIcon>🖼️</BadgeIcon> Суреттер
              </ImageBadge>
            )}
            {material.has_tables && (
              <TableBadge>
                <BadgeIcon>📊</BadgeIcon> Кестелер
              </TableBadge>
            )}
            {material.has_formulas && (
              <FormulaBadge>
                <BadgeIcon>📐</BadgeIcon> Формулалар
              </FormulaBadge>
            )}
          </BadgesContainer>
        </MaterialCardHeader>
        <MaterialCardContent>
          <MaterialDescription>{previewText}</MaterialDescription>
        </MaterialCardContent>
        <MaterialCardFooter>
          <MaterialButton
            as={Link}
            href={`/materials/${sectionId}/${material.id}`}
            style={{ width: '100%' }}
          >
            <MaterialIcon>📖</MaterialIcon>
            Материалды оқу
          </MaterialButton>
        </MaterialCardFooter>
      </MaterialCardContainer>
    </motion.div>
  );
};