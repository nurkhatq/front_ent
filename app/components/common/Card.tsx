// app/components/common/Card.tsx
"use client";

import styled from 'styled-components';

interface CardProps {
  padding?: string;
  bordered?: boolean;
  hoverable?: boolean;
}

export const Card = styled.div<CardProps>`
  background-color: white;
  border-radius: 8px;
  box-shadow: var(--card-shadow);
  padding: ${({ padding }) => padding || '24px'};
  ${({ bordered }) => bordered && `border: 1px solid var(--border-color);`}
  ${({ hoverable }) => hoverable && `
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    }
  `}
`;

export const CardHeader = styled.div`
  margin-bottom: 16px;
`;

export const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 8px;
`;

export const CardDescription = styled.p`
  color: var(--text-light);
  margin-bottom: 16px;
`;

export const CardContent = styled.div``;

export const CardFooter = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
`;