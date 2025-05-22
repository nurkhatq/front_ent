// // app/videos/page.tsx
// 'use client';

// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { videos } from '../data/videos';
// import { Container } from '../components/common/Container';

// const VideosGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
//   gap: 1.5rem;
//   margin-top: 2rem;
// `;

// const VideoCard = styled.div`
//   background-color: white;
//   border-radius: 8px;
//   overflow: hidden;
//   transition: transform 0.2s, box-shadow 0.2s;
//   cursor: pointer;
//   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  
//   &:hover {
//     transform: translateY(-5px);
//     box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
//   }
// `;

// const Thumbnail = styled.div`
//   position: relative;
//   width: 100%;
//   padding-top: 56.25%; /* 16:9 Aspect Ratio */
  
//   img {
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//   }
  
//   .duration {
//     position: absolute;
//     bottom: 8px;
//     right: 8px;
//     background-color: rgba(0, 0, 0, 0.7);
//     color: white;
//     padding: 2px 6px;
//     border-radius: 4px;
//     font-size: 0.8rem;
//     font-weight: 500;
//   }
// `;

// const VideoInfo = styled.div`
//   padding: 1rem;
//   color: #333;
  
//   h3 {
//     margin: 0 0 0.5rem;
//     font-size: 1.2rem;
//     font-weight: 600;
//   }
  
//   p {
//     margin: 0;
//     color: #666;
//     font-size: 0.9rem;
//     display: -webkit-box;
//     -webkit-line-clamp: 2;
//     -webkit-box-orient: vertical;
//     overflow: hidden;
//   }
// `;

// const PageTitle = styled.h1`
//   font-size: 2.5rem;
//   color: #333;
//   margin-bottom: 1rem;
// `;

// const CategoryFilter = styled.div`
//   margin-bottom: 2rem;
//   display: flex;
//   flex-wrap: wrap;
//   gap: 0.5rem;
// `;

// const CategoryButton = styled.button<{ $active: boolean }>`
//   padding: 0.5rem 1rem;
//   border-radius: 20px;
//   border: none;
//   background-color: ${({ $active }) => $active ? '#3498db' : '#f1f1f1'};
//   color: ${({ $active }) => $active ? 'white' : '#333'};
//   cursor: pointer;
//   transition: all 0.2s;
//   font-weight: 500;
  
//   &:hover {
//     background-color: ${({ $active }) => $active ? '#2980b9' : '#e5e5e5'};
//   }
// `;

// export default function VideosPage() {
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
//   // Получаем все уникальные категории
//   const categories = Array.from(new Set(videos.map(video => video.category)));
  
//   // Фильтруем видео по выбранной категории
//   const filteredVideos = selectedCategory 
//     ? videos.filter(video => video.category === selectedCategory) 
//     : videos;
  
//   const handleVideoClick = (videoId: string) => {
//     window.location.href = `/videos/${videoId}`;
//   };
  
//   return (
//     <Container style={{ padding: '2rem 1rem' }}>
//       <PageTitle>Бейнежазбалар</PageTitle>
      
//       <CategoryFilter>
//         <CategoryButton 
//           $active={selectedCategory === null} 
//           onClick={() => setSelectedCategory(null)}
//         >
//           Все
//         </CategoryButton>
//         {categories.map(category => (
//           <CategoryButton 
//             key={category}
//             $active={selectedCategory === category}
//             onClick={() => setSelectedCategory(category)}
//           >
//             {category}
//           </CategoryButton>
//         ))}
//       </CategoryFilter>
      
//       <VideosGrid>
//         {filteredVideos.map(video => (
//           <VideoCard key={video.id} onClick={() => handleVideoClick(video.id)}>
//             <Thumbnail>
//               <img 
//                 src={video.thumbnail || `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`} 
//                 alt={video.title} 
//                 onError={(e) => {
//                   const target = e.target as HTMLImageElement;
//                   target.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
//                 }}
//               />
//               <div className="duration">{video.duration}</div>
//             </Thumbnail>
//             <VideoInfo>
//               <h3>{video.title}</h3>
//               <p>{video.description}</p>
//             </VideoInfo>
//           </VideoCard>
//         ))}
//       </VideosGrid>
//     </Container>
//   );
// }
// app/videos/page.tsx
'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { videos } from '../data/videos';
import { Container } from '../components/common/Container';

const VideosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const VideoCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const Thumbnail = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  
  .next-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .duration {
    position: absolute;
    bottom: 8px;
    right: 8px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 500;
  }
`;

const VideoInfo = styled.div`
  padding: 1rem;
  color: #333;
  
  h3 {
    margin: 0 0 0.5rem;
    font-size: 1.2rem;
    font-weight: 600;
  }
  
  p {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const CategoryFilter = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const CategoryButton = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: none;
  background-color: ${({ $active }) => $active ? '#3498db' : '#f1f1f1'};
  color: ${({ $active }) => $active ? 'white' : '#333'};
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
  
  &:hover {
    background-color: ${({ $active }) => $active ? '#2980b9' : '#e5e5e5'};
  }
`;

export default function VideosPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Получаем все уникальные категории
  const categories = Array.from(new Set(videos.map(video => video.category)));
  
  // Фильтруем видео по выбранной категории
  const filteredVideos = selectedCategory 
    ? videos.filter(video => video.category === selectedCategory) 
    : videos;
  
  const handleVideoClick = (videoId: string) => {
    window.location.href = `/videos/${videoId}`;
  };
  
  return (
    <Container style={{ padding: '2rem 1rem' }}>
      <PageTitle>Бейнежазбалар</PageTitle>
      
      <CategoryFilter>
        <CategoryButton 
          $active={selectedCategory === null} 
          onClick={() => setSelectedCategory(null)}
        >
          Все
        </CategoryButton>
        {categories.map(category => (
          <CategoryButton 
            key={category}
            $active={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </CategoryButton>
        ))}
      </CategoryFilter>
      
      <VideosGrid>
        {filteredVideos.map(video => (
          <VideoCard key={video.id} onClick={() => handleVideoClick(video.id)}>
            <Thumbnail>
              <Image
                src={video.thumbnail || `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                alt={video.title}
                fill
                className="next-image"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="duration">{video.duration}</div>
            </Thumbnail>
            <VideoInfo>
              <h3>{video.title}</h3>
              <p>{video.description}</p>
            </VideoInfo>
          </VideoCard>
        ))}
      </VideosGrid>
    </Container>
  );
}