// app/components/common/Container.tsx
"use client";

import styled from 'styled-components';

interface ContainerProps {
  maxWidth?: string;
  padding?: string;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth || '1200px'};
  margin: 0 auto;
  padding: ${({ padding }) => padding || '0 16px'};
`;