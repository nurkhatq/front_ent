// app/styles/theme.ts
export const theme = {
    colors: {
      primary: 'var(--primary-color)',
      primaryDark: 'var(--primary-dark)',
      primaryLight: 'var(--primary-light)',
      secondary: 'var(--secondary-color)',
      secondaryDark: 'var(--secondary-dark)',
      accent: 'var(--accent-color)',
      accentDark: 'var(--accent-dark)',
      warning: 'var(--warning-color)',
      error: 'var(--error-color)',
      success: 'var(--success-color)',
      background: 'var(--background-color)',
      text: 'var(--text-color)',
      textLight: 'var(--text-light)',
      border: 'var(--border-color)',
    },
    shadows: {
      card: 'var(--card-shadow)',
      button: '0 2px 4px rgba(0, 0, 0, 0.1)',
      hover: '0 8px 15px rgba(0, 0, 0, 0.1)',
    },
    transitions: {
      default: 'var(--transition-speed) ease',
    },
    borderRadius: {
      small: '4px',
      medium: '8px',
      large: '12px',
      round: '50%',
    },
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
      xxl: '48px',
    },
    breakpoints: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
    },
  };