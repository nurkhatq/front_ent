// app/data/videos.ts
export interface Video {
    id: string;
    title: string;
    description: string;
    youtubeId: string;
    thumbnail: string;
    category: string;
    duration: string;
  }
  
  export const videos: Video[] = [
    {
      id: "1",
      title: "Компьютерлік жүйелер",
      description: "Компьютерлік жүйелердің құрылымы мен жұмыс істеу принциптері. Аппараттық және бағдарламалық қамтамасыз ету компоненттері.",
      youtubeId: "6BDNj-W0m1k",
      thumbnail: "/images/thumbnails/6BDNj-W0m1k.jpg",
      category: "Негізгі технологиялар",
      duration: "7:05"
    },
    {
      id: "2",
      title: "Ақпараттық процесстер",
      description: "Ақпараттық процесстердің негізгі түрлері мен сипаттамалары. Ақпаратты өңдеу, сақтау және беру әдістері.",
      youtubeId: "QamR7DbuLK4",
      thumbnail: "/images/thumbnails/QamR7DbuLK4.jpg",
      category: "Негізгі технологиялар",
      duration: "8:20"
    },
    {
      id: "3",
      title: "Есептеу жүйелері",
      description: "Есептеу жүйелерінің эволюциясы мен даму тарихы. Заманауи есептеу архитектуралары.",
      youtubeId: "BcdcYzKUnQM",
      thumbnail: "/images/thumbnails/BcdcYzKUnQM.jpg",
      category: "Негізгі технологиялар",
      duration: "6:36"
    },
    {
      id: "4",
      title: "Логикалық операциялар",
      description: "Логикалық операциялар және олардың компьютерлік жүйелердегі қолданылуы. Булдық алгебра негіздері.",
      youtubeId: "OJd5J6ioBkA",
      thumbnail: "/images/thumbnails/OJd5J6ioBkA.jpg",
      category: "Негізгі технологиялар",
      duration: "4:13"
    },
    {
      id: "5",
      title: "Компьютерлік ойлау дағдылары",
      description: "Компьютерлік ойлау дағдылары мен оның маңыздылығы. Алгоритмдік ойлау және мәселелерді шешу әдістері.",
      youtubeId: "DZkfTFPuu68",
      thumbnail: "/images/thumbnails/DZkfTFPuu68.jpg",
      category: "Негізгі технологиялар",
      duration: "7:42"
    },
    {
      id: "6",
      title: "Аппараттық және программалық қамтамасыз ету",
      description: "Аппараттық-программалық қамтамасыз ету құралдары мен жүйелері. Бағдарламалық өнімдерді әзірлеу және енгізу.",
      youtubeId: "WswjOriUyA8",
      thumbnail: "/images/thumbnails/WswjOriUyA8.jpg",
      category: "Негізгі технологиялар",
      duration: "5:00"
    },
    {
      id: "7",
      title: "Мәліметтер қоры жүйелері",
      description: "Мәліметтер қоры жүйелері және олардың түрлері. Ақпаратты сақтау мен өңдеудің заманауи тәсілдері.",
      youtubeId: "uKmR8UEkzvU",
      thumbnail: "/images/thumbnails/uKmR8UEkzvU.jpg",
      category: "Бағдарламалау және деректер",
      duration: "4:40"
    },
    {
      id: "8",
      title: "Реляциялық деректер қоры",
      description: "Реляциялық деректер қорының құрылымы мен жұмыс істеу принциптері. SQL тілі және мәліметтерді басқару жүйелері.",
      youtubeId: "m2Via_dyoEE",
      thumbnail: "/images/thumbnails/m2Via_dyoEE.jpg",
      category: "Бағдарламалау және деректер",
      duration: "2:38"
    },
    {
      id: "9",
      title: "Ақпараттық объектілерді құру",
      description: "Ақпараттық объектілерді құру және оларды басқару принциптері. Деректер құрылымы мен оларды өңдеу әдістері.",
      youtubeId: "TYpS_VjP2-c",
      thumbnail: "/images/thumbnails/TYpS_VjP2-c.jpg",
      category: "Бағдарламалау және деректер",
      duration: "3:14"
    },
    {
      id: "10",
      title: "Компьютерлік қауіпсіздік негіздері",
      description: "Компьютерлік қауіпсіздік негіздері. Киберқауіптер және олардан қорғану әдістері туралы маңызды ақпарат.",
      youtubeId: "1_5sbKLlLXI",
      thumbnail: "/images/thumbnails/1_5sbKLlLXI.jpg",
      category: "Инновациялар мен қауіпсіздік",
      duration: "3:57"
    },
    {
      id: "11",
      title: "Виртуалды және толықтырылған шындық (VR/AR)",
      description: "Виртуалды шындық (VR) және толықтырылған шындық (AR) технологияларының мүмкіндіктері мен даму перспективалары.",
      youtubeId: "D5ZTsihsr6U",
      thumbnail: "/images/thumbnails/D5ZTsihsr6U.jpg",
      category: "Инновациялар мен қауіпсіздік",
      duration: "2:56"
    },
    {
      id: "12",
      title: "Блокчейн технологиясы",
      description: "Блокчейн технологиясының жұмыс істеу принциптері мен қолдану салалары. Криптовалюталар мен смарт-келісімшарттар.",
      youtubeId: "qjbFDspC_e4",
      thumbnail: "/images/thumbnails/qjbFDspC_e4.jpg",
      category: "Инновациялар мен қауіпсіздік",
      duration: "1:57"
    },
    {
      id: "13",
      title: "Заттар интернеті (IoT)",
      description: "Заттар интернетінің (IoT) қазіргі әлемдегі маңызы мен қолданылуы. Смарт құрылғылар және олардың өзара байланысы.",
      youtubeId: "A-aUdlGFUNQ",
      thumbnail: "/images/thumbnails/A-aUdlGFUNQ.jpg",
      category: "Инновациялар мен қауіпсіздік",
      duration: "3:14"
    },
    {
      id: "14",
      title: "Веб жобалау",
      description: "Веб жобалаудың негізгі принциптері мен әдістері. Заманауи веб-сайттар мен қосымшаларды құрудың технологиялық аспектілері.",
      youtubeId: "Y8vGKwmK-ss",
      thumbnail: "/images/thumbnails/Y8vGKwmK-ss.jpg",
      category: "Бағдарламалау және деректер",
      duration: "3:46"
    },
    {
      id: "15",
      title: "Стартап жобалар",
      description: "Стартап жобаларды дамыту және іске қосу процесі. Инновациялық бизнес идеялардан бастап нарыққа шығуға дейінгі кезеңдер.",
      youtubeId: "tHf8GGb-z0Y",
      thumbnail: "/images/thumbnails/tHf8GGb-z0Y.jpg",
      category: "Инновациялар мен қауіпсіздік",
      duration: "2:45"
    },
    {
      id: "16",
      title: "Электрондық цифрлық қолтаңба (ЭЦҚ)",
      description: "Электрондық цифрлық қолтаңба (ЭЦҚ) туралы толық түсіндірме. Қауіпсіздік және аутентификация жүйелерінде қолданылуы.",
      youtubeId: "alUq4B0ljes",
      thumbnail: "/images/thumbnails/alUq4B0ljes.jpg",
      category: "Инновациялар мен қауіпсіздік",
      duration: "2:56"
    }
  ];
