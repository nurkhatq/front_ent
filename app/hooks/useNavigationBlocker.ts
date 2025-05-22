// // app/hooks/useNavigationBlocker.ts
// import { useEffect } from 'react';
// import { useRouter, usePathname } from 'next/navigation';

// export const useNavigationBlocker = (
//   shouldBlock: boolean,
//   onNavigationAttempt: (destination: string) => void
// ) => {
//   const pathname = usePathname();
//   const router = useRouter();
  
//   useEffect(() => {
//     if (!shouldBlock) return;
    
//     // Функция для перехвата кликов по ссылкам
//     const handleClick = (e: MouseEvent) => {
//       // Проверяем, был ли клик по ссылке (a-тегу)
//       let target = e.target as Element;
//       let href = '';
      
//       // Поиск ближайшего родителя-ссылки, если клик был не на ссылке напрямую
//       while (target && target.tagName.toLowerCase() !== 'a') {
//         target = target.parentElement as Element;
//         if (!target) break;
//       }
      
//       // Если найдена ссылка и это не текущий путь
//       if (target && target.tagName.toLowerCase() === 'a') {
//         href = target.getAttribute('href') || '';
        
//         // Игнорируем внешние ссылки, якоря и т.д.
//         if (href && href.startsWith('/') && href !== pathname) {
//           e.preventDefault();
//           e.stopPropagation();
//           onNavigationAttempt(href);
//         }
//       }
//     };
    
//     // Добавляем обработчик для всего документа
//     document.addEventListener('click', handleClick, { capture: true });
    
//     // Очистка при размонтировании
//     return () => {
//       document.removeEventListener('click', handleClick, { capture: true });
//     };
//   }, [shouldBlock, pathname, onNavigationAttempt]);
  
//   // Блокировка браузерной навигации (вперед/назад)
//   // Замените этот блок кода в функции useNavigationBlocker
// useEffect(() => {
//     if (shouldBlock) {
//       // Функция для обработки навигации браузера (назад/вперед)
//       const handlePopState = (e: PopStateEvent) => {
//         // Отменяем навигацию назад, заменяя историю
//         window.history.pushState(null, '', window.location.pathname);
        
//         onNavigationAttempt('/tests');
//       };
      
//       window.addEventListener('popstate', handlePopState);
      

//       if (!window.history.state?.preventNavigation) {
//         window.history.pushState({ preventNavigation: true }, '', window.location.pathname);
//       }
      
//       return () => {
//         window.removeEventListener('popstate', handlePopState);
//       };
//     }
//   }, [shouldBlock, onNavigationAttempt]);
// };
// app/hooks/useNavigationBlocker.ts
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Хук для блокировки навигации при незавершенных действиях пользователя
 * @param shouldBlock - Флаг, указывающий, нужно ли блокировать навигацию
 * @param onNavigationAttempt - Callback, который вызывается при попытке навигации
 */
export function useNavigationBlocker(
  shouldBlock: boolean,
  onNavigationAttempt: (destination: string) => void
) {
  // const router = useRouter();
  const pathname = usePathname();
  
  // Блокировка навигации по ссылкам
  useEffect(() => {
    if (!shouldBlock) return;
    
    // Функция для обработки попытки перехода по ссылке
    const handleClickCapture = (e: MouseEvent) => {
      // Проверяем, является ли цель ссылкой
      const target = e.target as HTMLElement;
      const linkElement = target.closest('a');
      
      if (!linkElement) return;
      
      // Получаем href ссылки
      const href = linkElement.getAttribute('href');
      
      // Если ссылка ведет на тот же путь или не задана, разрешаем навигацию
      if (!href || href === pathname || href === '#') return;
      
      // Если ссылка внешняя или ведет на другой домен, разрешаем навигацию
      if (href.startsWith('http') || href.startsWith('//') || href.startsWith('mailto:')) return;
      
      // Останавливаем стандартное поведение
      e.preventDefault();
      e.stopPropagation();
      
      // Вызываем обработчик попытки навигации
      onNavigationAttempt(href);
    };
    
    // Добавляем обработчики событий
    document.addEventListener('click', handleClickCapture, true);
    
    return () => {
      // Удаляем обработчики при размонтировании компонента
      document.removeEventListener('click', handleClickCapture, true);
    };
  }, [shouldBlock, onNavigationAttempt, pathname]);
  
  // Блокировка браузерной навигации (вперед/назад)
  useEffect(() => {
    if (!shouldBlock) return;
    
    // Функция для обработки навигации браузера (назад/вперед)
    const handlePopState = () => {
      // Отменяем навигацию назад, заменяя историю
      window.history.pushState(null, '', window.location.pathname);
      
      // Вызываем обработчик с предполагаемым предыдущим маршрутом
      // Так как точный предыдущий маршрут может быть недоступен, используем /tests
      onNavigationAttempt('/tests');
    };
    
    // Добавляем обработчик popstate для истории браузера
    window.addEventListener('popstate', handlePopState);
    
    // Добавляем запись в историю с флагом, чтобы не создавать дубликаты
    if (!window.history.state?.preventNavigation) {
      window.history.pushState({ preventNavigation: true }, '', window.location.pathname);
    }
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [shouldBlock, onNavigationAttempt]);
  
  return null;
}