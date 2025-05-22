// app/styles/GlobalStyle.ts
"use client";
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #3498db;
    --primary-dark: #2980b9;
    --primary-light: #85c1e9;
    --secondary-color: #2ecc71;
    --secondary-dark: #27ae60;
    --accent-color: #9b59b6;
    --accent-dark: #8e44ad;
    --warning-color: #f39c12;
    --error-color: #e74c3c;
    --success-color: #2ecc71;
    --background-color: #f8f9fa;
    --text-color: #2c3e50;
    --text-light: #7f8c8d;
    --border-color: #dcdde1;
    --card-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    --transition-speed: 0.3s;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: var(--background-color);
    color: var(--text-color);
    line-height: 1.6;
    font-size: 16px;
  }

  a {
    color: var(--primary-color);
    text-decoration: none;
    transition: color var(--transition-speed) ease;
    
    &:hover {
      color: var(--primary-dark);
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.3;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.75rem;
  }

  p {
    margin-bottom: 1rem;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  button, input, select, textarea {
    font-family: inherit;
    font-size: inherit;
  }
`;