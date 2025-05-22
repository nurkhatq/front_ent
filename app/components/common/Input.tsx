// app/components/common/Input.tsx
"use client";

// app/components/common/Input.tsx (исправленная версия)
import styled, { css } from 'styled-components';

interface InputProps {
  $error?: boolean;
  $fullWidth?: boolean;
}

export const Input = styled.input<InputProps>`
  padding: 10px 16px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  background-color: white;
  
  ${({ $fullWidth }) => $fullWidth && css`width: 100%;`}
  
  ${({ $error }) => $error ? css`
    border-color: var(--error-color);
    
    &:focus {
      box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2);
      outline: none;
    }
  ` : css`
    &:focus {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
      outline: none;
    }
  `}
`;

export const InputLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
`;

export const InputGroup = styled.div`
  margin-bottom: 16px;
`;

export const InputError = styled.span`
  color: var(--error-color);
  font-size: 0.85rem;
  margin-top: 4px;
  display: block;
`;