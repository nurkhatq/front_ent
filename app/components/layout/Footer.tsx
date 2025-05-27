// app/components/layout/Footer.tsx
"use client";
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #f8f9fa;
  padding: 3rem 0;
  border-top: 1px solid var(--border-color);
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: var(--text-color);
`;

// const FooterLink = styled(Link)`
//   color: var(--text-light);
//   margin-bottom: 0.5rem;
//   transition: color 0.2s ease;
  
//   &:hover {
//     color: var(--primary-color);
//   }
// `;

const FooterText = styled.p`
  color: var(--text-light);
  margin-bottom: 0.5rem;
`;

// const Copyright = styled.div`
//   text-align: center;
//   margin-top: 2rem;
//   padding-top: 1rem;
//   border-top: 1px solid var(--border-color);
//   color: var(--text-light);
//   font-size: 0.875rem;
// `;

export const Footer = () => {
  // const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
          <FooterTitle>Байланыс</FooterTitle>
          <FooterText>Email: ultra777.kz@gmail.com</FooterText>
          <FooterText>Телефон: +7 (702) 349 49 50</FooterText>
        </FooterColumn>
      </FooterContent>
    </FooterContainer>
  );
};