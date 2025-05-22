// app/components/common/Button.tsx
"use client";
import styled, { css } from 'styled-components';

type Button$variant = 'primary' | 'secondary' | 'outline' | 'text' | 'success' | 'warning' | 'error';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  $variant?: Button$variant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
}

const getButtonStyles = ($variant: Button$variant) => {
  switch ($variant) {
    case 'primary':
      return css`
        background-color: var(--primary-color);
        color: white;
        
        &:hover:not(:disabled) {
          background-color: var(--primary-dark);
        }
      `;
    case 'secondary':
      return css`
        background-color: var(--secondary-color);
        color: white;
        
        &:hover:not(:disabled) {
          background-color: var(--secondary-dark);
        }
      `;
    case 'outline':
      return css`
        background-color: transparent;
        border: 2px solid var(--primary-color);
        color: var(--primary-color);
        
        &:hover:not(:disabled) {
          background-color: var(--primary-light);
          color: white;
        }
      `;
    case 'text':
      return css`
        background-color: transparent;
        color: var(--primary-color);
        border: none;
        box-shadow: none;
        
        &:hover:not(:disabled) {
          background-color: rgba(52, 152, 219, 0.1);
        }
      `;
    case 'success':
      return css`
        background-color: var(--success-color);
        color: white;
        
        &:hover:not(:disabled) {
          background-color: var(--secondary-dark);
        }
      `;
    case 'warning':
      return css`
        background-color: var(--warning-color);
        color: white;
        
        &:hover:not(:disabled) {
          background-color: #e67e22;
        }
      `;
    case 'error':
      return css`
        background-color: var(--error-color);
        color: white;
        
        &:hover:not(:disabled) {
          background-color: #c0392b;
        }
      `;
    default:
      return css`
        background-color: var(--primary-color);
        color: white;
        
        &:hover:not(:disabled) {
          background-color: var(--primary-dark);
        }
      `;
  }
};

const getButtonSize = (size: ButtonSize) => {
  switch (size) {
    case 'small':
      return css`
        font-size: 0.85rem;
        padding: 6px 12px;
      `;
    case 'large':
      return css`
        font-size: 1.1rem;
        padding: 12px 24px;
      `;
    default:
      return css`
        font-size: 1rem;
        padding: 8px 16px;
      `;
  }
};

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius, 4px);
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: var(--box-shadow, 0 2px 4px rgba(0, 0, 0, 0.1));
  
  ${({ $variant = 'primary' }) => getButtonStyles($variant)}
  ${({ size = 'medium' }) => getButtonSize(size)}
  ${({ fullWidth }) => fullWidth && css`width: 100%;`}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &:$active {
    transform: translateY(1px);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
`;