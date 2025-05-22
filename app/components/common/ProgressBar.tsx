// app/components/common/ProgressBar.tsx
"use client";

import styled from 'styled-components';

interface ProgressBarProps {
  value: number;
  max: number;
  color?: string;
  height?: string;
}

interface ProgressBarContainerProps {
    height?: string;
  }
  
  const ProgressBarContainer = styled.div<ProgressBarContainerProps>`
    width: 100%;
    background-color: #f1f1f1;
    border-radius: 4px;
    overflow: hidden;
    height: ${props => props.height || '8px'};
  `;
export const ProgressBarFill = styled.div<{ value: number; max: number; color?: string }>`
  height: 100%;
  background-color: ${({ color }) => color || 'var(--primary-color)'};
  width: ${({ value, max }) => (value / max) * 100}%;
  transition: width 0.3s ease;
`;

export const ProgressBar: React.FC<ProgressBarProps> = ({ value, max, color, height }) => {
  return (
    <ProgressBarContainer height={height}>
      <ProgressBarFill value={value} max={max} color={color} />
    </ProgressBarContainer>
  );
};