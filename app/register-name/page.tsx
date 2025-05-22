// app/register-name/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/common/Card';
import { Input, InputLabel, InputError } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { Spinner } from '../components/common/Spinner';

// Улучшенный фон с анимированным градиентом
const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5z' fill='%233498db' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
    z-index: 0;
  }
`;

// Стилизованная карточка регистрации
const RegisterCard = styled(Card)`
  width: 100%;
  max-width: 500px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  z-index: 1;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
  }
`;

// Стилизованный заголовок карточки
const RegisterCardHeader = styled(CardHeader)`
  text-align: center;
  padding: 2.5rem 2rem 1.5rem;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
`;

// Анимированное изображение приветствия
const WelcomeImage = styled(motion.div)`
  font-size: 6rem;
  margin-bottom: 1.5rem;
  display: inline-block;
`;

// Стилизованный заголовок
const StyledCardTitle = styled(CardTitle)`
  font-size: 2.2rem;
  margin-bottom: 0.75rem;
  background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

// Стилизованное описание
const StyledCardDescription = styled(CardDescription)`
  font-size: 1.1rem;
  color: var(--text-light);
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// Стилизованное содержимое карточки
const StyledCardContent = styled(CardContent)`
  padding: 2rem;
  background-color: white;
`;

// Стилизованное поле формы
const FormField = styled.div`
  margin-bottom: 1.5rem;
`;

// Стилизованная форма
const RegisterForm = styled.form`
  width: 100%;
`;

// Стилизованная метка ввода
const StyledInputLabel = styled(InputLabel)`
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
  color: var(--text-color);
`;

// Стилизованное поле ввода
const StyledInput = styled(Input)`
  height: 50px;
  font-size: 1.1rem;
  border-radius: 8px;
  border-width: 2px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:focus {
    box-shadow: 0 3px 15px rgba(52, 152, 219, 0.15);
    border-color: var(--primary-color);
  }
`;

// Стилизованная нижняя часть карточки
const StyledCardFooter = styled(CardFooter)`
  padding: 1.5rem 2rem 2rem;
  background-color: white;
  border-top: none;
`;

// Стилизованная кнопка
const StyledButton = styled(Button)`
  height: 54px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  background: linear-gradient(to right, var(--primary-color), var(--secondary-dark));
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(52, 152, 219, 0.4);
  }
  
  &:active:not(:disabled) {
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.7;
    background: linear-gradient(to right, var(--primary-color), var(--secondary-dark));
  }
`;

// Стилизованное сообщение об ошибке
const StyledInputError = styled(InputError)`
  margin-top: 0.75rem;
  font-size: 0.95rem;
  color: #e74c3c;
  display: flex;
  align-items: center;
  
  &::before {
    content: '⚠️';
    margin-right: 0.5rem;
  }
`;

// Стилизованный спиннер
const StyledSpinner = styled(Spinner)`
  margin-right: 10px;
`;

export default function RegisterNamePage() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { setStudentName } = useUser();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    
    // Валидация
    if (!name.trim()) {
      setError('Өтінеміз, атыңызды енгізіңіз');
      return;
    }
    
    setSubmitting(true);
    setStudentName(name.trim());
    
    // Проверяем, был ли сохранен предыдущий путь
    const lastPath = localStorage.getItem('lastPath');
    if (lastPath && lastPath !== '/' && lastPath !== '/register-name') {
      router.push(lastPath);
    } else {
      router.push('/');
    }
  };
  
  return (
    <PageContainer>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ width: '100%', maxWidth: '500px' }}
      >
        <RegisterCard>
          <RegisterCardHeader>
            <WelcomeImage
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              👋
            </WelcomeImage>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <StyledCardTitle>Қош келдіңіз!</StyledCardTitle>
              <StyledCardDescription>
                ҰБТ тренажерімен жұмыс жасауды бастау үшін өзіңізді таныстырыңыз
              </StyledCardDescription>
            </motion.div>
          </RegisterCardHeader>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <StyledCardContent>
              <RegisterForm onSubmit={handleSubmit}>
                <FormField>
                  <StyledInputLabel htmlFor="name">Аты-жөніңіз кім?</StyledInputLabel>
                  <StyledInput
                    id="name"
                    type="text"
                    placeholder="Атыңызды енгізіңіз"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    $error={!!error}
                    $fullWidth
                    autoFocus
                  />
                  {error && <StyledInputError>{error}</StyledInputError>}
                </FormField>
              </RegisterForm>
            </StyledCardContent>
            
            <StyledCardFooter>
              <StyledButton 
                fullWidth 
                size="large" 
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <StyledSpinner size="20px" color="white" />
                    Жүктелуде...
                  </>
                ) : (
                  'Бастау'
                )}
              </StyledButton>
            </StyledCardFooter>
          </motion.div>
        </RegisterCard>
      </motion.div>
    </PageContainer>
  );
}