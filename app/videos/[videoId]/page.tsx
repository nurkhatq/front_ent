// // app/videos/[videoId]/page.tsx
// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import styled from 'styled-components';
// import { videos } from '../../data/videos';
// import { Container } from '../../components/common/Container';

// const VideoContainer = styled.div`
//   max-width: 900px;
//   margin: 0 auto;
// `;

// const VideoPlayer = styled.div`
//   position: relative;
//   width: 100%;
//   padding-top: 56.25%; /* 16:9 Aspect Ratio */
//   margin-bottom: 1.5rem;
//   border-radius: 8px;
//   overflow: hidden;
//   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  
//   iframe {
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     border: none;
//   }
// `;

// const VideoInfo = styled.div`
//   color: #333;
//   margin-bottom: 2rem;
  
//   h1 {
//     font-size: 2rem;
//     margin-bottom: 1rem;
//   }
  
//   p {
//     font-size: 1rem;
//     color: #555;
//     line-height: 1.6;
//   }
// `;

// const RelatedVideos = styled.div`
//   margin-top: 2rem;
  
//   h2 {
//     font-size: 1.5rem;
//     margin-bottom: 1rem;
//     color: #333;
//   }
// `;

// const RelatedVideosGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
//   gap: 1rem;
// `;

// const RelatedVideoCard = styled.div`
//   cursor: pointer;
//   transition: transform 0.2s, box-shadow 0.2s;
//   border-radius: 8px;
//   overflow: hidden;
  
//   &:hover {
//     transform: translateY(-5px);
//     box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
//   }
  
//   img {
//     width: 100%;
//     border-radius: 8px 8px 0 0;
//     aspect-ratio: 16/9;
//     object-fit: cover;
//   }
  
//   h3 {
//     font-size: 0.9rem;
//     margin: 0.5rem;
//     color: #333;
//   }
// `;

// const BackButton = styled.button`
//   padding: 0.5rem 1rem;
//   background-color: #f1f1f1;
//   border: none;
//   color: #333;
//   border-radius: 4px;
//   cursor: pointer;
//   margin-bottom: 1rem;
//   font-weight: 500;
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
  
//   &:hover {
//     background-color: #e5e5e5;
//   }
// `;

// const CategoryTag = styled.span`
//   display: inline-block;
//   background-color: #3498db;
//   color: white;
//   padding: 0.3rem 0.8rem;
//   border-radius: 20px;
//   font-size: 0.8rem;
//   margin-bottom: 1rem;
// `;

// export default function VideoPage() {
//   const params = useParams();
//   const videoId = params.videoId as string;
//   const router = useRouter();
  
//   const [video] = useState(videos.find(v => v.id === videoId));
  
//   // Если видео не найдено, перенаправляем на страницу со списком видео
//   useEffect(() => {
//     if (!video) {
//       router.push('/videos');
//     }
//   }, [video, router]);
  
//   if (!video) {
//     return <div>Загрузка...</div>;
//   }
  
//   // Получаем связанные видео (из той же категории)
//   const relatedVideos = videos
//     .filter(v => v.category === video.category && v.id !== videoId)
//     .slice(0, 4);
  
//   return (
//     <Container style={{ padding: '2rem 1rem' }}>
//       <VideoContainer>
//         <BackButton onClick={() => router.push('/videos')}>
//           ← Бейнежазбаларға оралу
//         </BackButton>
        
//         <VideoPlayer>
//           <iframe
//             src={`https://www.youtube.com/embed/${video.youtubeId}`}
//             title={video.title}
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//           />
//         </VideoPlayer>
        
//         <VideoInfo>
//           <CategoryTag>{video.category}</CategoryTag>
//           <h1>{video.title}</h1>
//           <p>{video.description}</p>
//         </VideoInfo>
        
//         {relatedVideos.length > 0 && (
//           <RelatedVideos>
//             <h2>Ұқсас видеолар</h2>
//             <RelatedVideosGrid>
//               {relatedVideos.map(relatedVideo => (
//                 <RelatedVideoCard 
//                   key={relatedVideo.id}
//                   onClick={() => router.push(`/videos/${relatedVideo.id}`)}
//                 >
//                   <img 
//                     src={relatedVideo.thumbnail || `https://img.youtube.com/vi/${relatedVideo.youtubeId}/hqdefault.jpg`}
//                     alt={relatedVideo.title}
//                     onError={(e) => {
//                       const target = e.target as HTMLImageElement;
//                       target.src = `https://img.youtube.com/vi/${relatedVideo.youtubeId}/hqdefault.jpg`;
//                     }}
//                   />
//                   <h3>{relatedVideo.title}</h3>
//                 </RelatedVideoCard>
//               ))}
//             </RelatedVideosGrid>
//           </RelatedVideos>
//         )}
//       </VideoContainer>
//     </Container>
//   );
// }
// app/videos/[videoId]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styled from 'styled-components';
import Image from 'next/image';
import { videos } from '../../data/videos';
import { Container } from '../../components/common/Container';

const VideoContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const VideoPlayer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  margin-bottom: 1.5rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const VideoInfo = styled.div`
  color: #333;
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1rem;
    color: #555;
    line-height: 1.6;
  }
`;

const RelatedVideos = styled.div`
  margin-top: 2rem;
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #333;
  }
`;

const RelatedVideosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const RelatedVideoCard = styled.div`
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  border-radius: 8px;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  .thumbnail-container {
    position: relative;
    width: 100%;
    aspect-ratio: 16/9;
    border-radius: 8px 8px 0 0;
    overflow: hidden;
  }
  
  h3 {
    font-size: 0.9rem;
    margin: 0.5rem;
    color: #333;
  }
`;

const BackButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #f1f1f1;
  border: none;
  color: #333;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: #e5e5e5;
  }
`;

const CategoryTag = styled.span`
  display: inline-block;
  background-color: #3498db;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  margin-bottom: 1rem;
`;

export default function VideoPage() {
  const params = useParams();
  const videoId = params.videoId as string;
  const router = useRouter();
  
  const [video] = useState(videos.find(v => v.id === videoId));
  
  // Если видео не найдено, перенаправляем на страницу со списком видео
  useEffect(() => {
    if (!video) {
      router.push('/videos');
    }
  }, [video, router]);
  
  if (!video) {
    return <div>Жүктелуде...</div>;
  }
  
  // Получаем связанные видео (из той же категории)
  const relatedVideos = videos
    .filter(v => v.category === video.category && v.id !== videoId)
    .slice(0, 4);
  
  return (
    <Container style={{ padding: '2rem 1rem' }}>
      <VideoContainer>
        <BackButton onClick={() => router.push('/videos')}>
          ← Бейнежазбаларға оралу
        </BackButton>
        
        <VideoPlayer>
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </VideoPlayer>
        
        <VideoInfo>
          <CategoryTag>{video.category}</CategoryTag>
          <h1>{video.title}</h1>
          <p>{video.description}</p>
        </VideoInfo>
        
        {relatedVideos.length > 0 && (
          <RelatedVideos>
            <h2>Ұқсас видеолар</h2>
            <RelatedVideosGrid>
              {relatedVideos.map(relatedVideo => (
                <RelatedVideoCard 
                  key={relatedVideo.id}
                  onClick={() => router.push(`/videos/${relatedVideo.id}`)}
                >
                  <div className="thumbnail-container">
                    <Image
                      src={relatedVideo.thumbnail || `https://img.youtube.com/vi/${relatedVideo.youtubeId}/hqdefault.jpg`}
                      alt={relatedVideo.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                  <h3>{relatedVideo.title}</h3>
                </RelatedVideoCard>
              ))}
            </RelatedVideosGrid>
          </RelatedVideos>
        )}
      </VideoContainer>
    </Container>
  );
}