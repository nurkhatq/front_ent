// app/layout.tsx
import { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { UserProvider } from '../app/context/UserContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { GlobalStyle } from './styles/GlobalStyle';
import StyledComponentsRegistry from '../app/lib/registry';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin', 'cyrillic'],
});

export const metadata: Metadata = {
  title: 'ENT Trainer - Информатикадан ҰБТ-ға дайындық',
  description: 'Информатика пәні бойынша Ұлттық Бірыңғай Тестілеуге дайындалуға арналған интерактивті тренажер',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={roboto.className}>
        <StyledComponentsRegistry>
          <UserProvider>
            <GlobalStyle />
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Header />
              <main style={{ flex: 1 }}>{children}</main>
              <Footer />
            </div>
          </UserProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}