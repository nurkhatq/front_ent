// app/components/common/Spinner.tsx
"use client";

import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

interface SpinnerProps {
  size?: string;
  color?: string;
  thickness?: string;
}

export const Spinner = styled.div<SpinnerProps>`
  display: inline-block;
  width: ${({ size }) => size || '30px'};
  height: ${({ size }) => size || '30px'};
  border: ${({ thickness }) => thickness || '3px'} solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: ${({ color }) => color || 'var(--primary-color)'};
  animation: ${spin} 0.8s linear infinite;
`;