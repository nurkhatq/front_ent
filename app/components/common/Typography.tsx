// app/components/common/Typography.tsx
"use client";

import styled from 'styled-components';

export const Heading1 = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Heading2 = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

export const Heading3 = styled.h3`
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

export const TextLarge = styled.span`
  font-size: 1.25rem;
`;

export const TextSmall = styled.span`
  font-size: 0.875rem;
`;

export const TextMuted = styled.span`
  color: var(--text-light);
`;