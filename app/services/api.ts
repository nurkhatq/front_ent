// // app/services/api.ts
// import axios from 'axios';

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// const apiInstance = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Интерфейсы для типизации
// export interface Test {
//   id: number;
//   title: string;
//   question_count: number;
//   has_images: boolean;
//   multiple_answers_allowed: boolean;
// }

// export interface Question {
//   id: number;
//   number: number;
//   text: string;
//   options: Option[];
//   has_images: boolean;
//   images?: QuestionImage[];
// }

// export interface Option {
//   id: number;
//   letter: string;
//   text: string;
// }

// export interface QuestionImage {
//   id: number;
//   url: string;
//   image_type: string;
//   order: number;
// }

// export interface TestResult {
//   id: number;
//   student_name: string;
//   test_title?: string;
//   percentage: number;
//   created_at: string;
// }

// export interface Section {
//   id: number;
//   number: number;
//   title: string;
//   materials: Material[];
// }

// export interface Material {
//   id: number;
//   title: string;
//   content_html: string;
//   has_images: boolean;
//   has_tables: boolean;
//   has_formulas: boolean;
//   created_at: string;
//   images: MaterialImage[];
// }

// export interface MaterialImage {
//   id: number;
//   image: string;
//   caption: string;
//   order: number;
// }

// export interface ContextQuestionSet {
//   id: number;
//   title: string;
//   description: string;
//   context: Context;
//   questions: ContextQuestion[];
// }

// export interface Context {
//   id: number;
//   text: string;
//   images: ContextImage[];
// }

// export interface ContextImage {
//   id: number;
//   url: string;
//   image_type: string;
//   order: number;
// }

// export interface ContextQuestion {
//   id: number;
//   number: number;
//   text: string;
//   options: Option[];
//   images: ContextImage[];
// }

// export interface StudentAnswer {
//   question_id: number;
//   selected_options: string[];
// }

// // API для работы с тестами
// export const testApi = {
//   // Получить список всех тестов
//   getTests: async (): Promise<Test[]> => {
//     const response = await apiInstance.get('/tests/');
//     return response.data;
//   },
//   getRandomTest: async (): Promise<{ id: number; title: string; questions: Question[] }> => {
//     const response = await apiInstance.get('/tests/random_test/');
//     return response.data;
//   },
//   getRandomTestLeaderboard: async (): Promise<TestResult[]> => {
//     const response = await apiInstance.get('/tests/random_test_leaderboard/');
//     return response.data;
//   },
//   // Получить тест с вопросами
//   getTest: async (id: number): Promise<{ id: number; title: string; questions: Question[]; multiple_answers_allowed: boolean }> => {
//     const response = await apiInstance.get(`/tests/${id}/`);
//     return response.data;
//   },

//   // Отправить ответы и получить результат
//   submitTestAnswers: async (
//     testId: number,
//     studentName: string,
//     answers: StudentAnswer[]
//   ) => {
//     const response = await apiInstance.post(`/tests/${testId}/check_answers/`, {
//       student_name: studentName,
//       answers,
//     });
//     return response.data;
//   },

//   // Получить рейтинг по тесту
//   getTestLeaderboard: async (testId: number): Promise<TestResult[]> => {
//     const response = await apiInstance.get(`/tests/${testId}/leaderboard/`);
//     return response.data;
//   },
// };

// // API для работы с учебными материалами
// export const learningMaterialsApi = {
//   // Получить список всех разделов
//   getSections: async (): Promise<Section[]> => {
//     const response = await apiInstance.get('/learning-materials/sections/');
//     return response.data;
//   },

//   // Получить конкретный раздел
//   getSection: async (id: number): Promise<Section> => {
//     const response = await apiInstance.get(`/learning-materials/sections/${id}/`);
//     return response.data;
//   },

//   // Получить конкретный материал
//   getMaterial: async (id: number): Promise<Material> => {
//     const response = await apiInstance.get(`/learning-materials/materials/${id}/`);
//     return response.data;
//   },
// };

// // API для работы с контекстными вопросами
// export const contextQuestionsApi = {
//   // Получить список всех наборов контекстных вопросов
//   getQuestionSets: async (): Promise<ContextQuestionSet[]> => {
//     const response = await apiInstance.get('/context-questions/question-sets/');
//     return response.data;
//   },

//   // Получить конкретный набор
//   getQuestionSet: async (id: number): Promise<ContextQuestionSet> => {
//     const response = await apiInstance.get(`/context-questions/question-sets/${id}/`);
//     return response.data;
//   },

//   // Отправить ответы и получить результат
//   submitAnswers: async (
//     setId: number,
//     studentName: string,
//     answers: StudentAnswer[]
//   ) => {
//     const response = await apiInstance.post(`/context-questions/question-sets/${setId}/check_answers/`, {
//       student_name: studentName,
//       answers,
//     });
//     return response.data;
//   },

//   // Получить рейтинг по контекстному тесту
//   getLeaderboard: async (setId: number) => {
//     const response = await apiInstance.get(`/context-questions/question-sets/${setId}/leaderboard/`);
//     return response.data;
//   },
// };

// const api = {
//   testApi,
//   learningMaterialsApi,
//   contextQuestionsApi,
// };

// export default api;

// app/services/api.ts
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ent-trainer-web.onrender.com/api';

const apiInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Интерфейсы для типизации
export interface Test {
  id: number;
  title: string;
  question_count: number;
  has_images: boolean;
  multiple_answers_allowed: boolean;
}

export interface Question {
  id: number;
  number: number;
  text: string;
  options: Option[];
  has_images: boolean;
  images?: QuestionImage[];
  is_context_question?: boolean;
  context?: Context;
}

export interface Option {
  id: number;
  letter: string;
  text: string;
}

export interface QuestionImage {
  id: number;
  url: string;
  image_type: string;
  order: number;
}

export interface TestResult {
  id: number;
  student_name: string;
  test_title?: string;
  percentage: number;
  created_at: string;
  score?: number;
  max_score?: number;
  total_questions?: number;
}

export interface Section {
  id: number;
  number: number;
  title: string;
  materials: Material[];
}

export interface Material {
  id: number;
  title: string;
  content_html: string;
  has_images: boolean;
  has_tables: boolean;
  has_formulas: boolean;
  created_at: string;
  images: MaterialImage[];
}

export interface MaterialImage {
  id: number;
  image: string;
  caption: string;
  order: number;
}

export interface ContextQuestionSet {
  id: number;
  title: string;
  description: string;
  context: Context;
  questions: ContextQuestion[];
}

export interface Context {
  id: number;
  text: string;
  images: ContextImage[];
}

export interface ContextImage {
  id: number;
  url: string;
  image_type: string;
  order: number;
}

export interface ContextQuestion {
  id: number;
  number: number;
  text: string;
  options: Option[];
  images: ContextImage[];
}

export interface StudentAnswer {
  question_id: number;
  selected_options: string[];
}

// Дополнительный интерфейс для смешанного теста
export interface StudentAnswerWithContext extends StudentAnswer {
  is_context_question?: boolean;
}

export interface RandomTestResponse {
  id: number; 
  title: string;
  description?: string;
  questions: Question[];
  multiple_answers_allowed: boolean;
  has_images: boolean;
  has_context_questions: boolean;
}

export interface TestSubmissionResponse {
  score_percentage: number;
  correct_answers: number;
  result_id: number;
  student_name: string;
  score: number;
  max_score: number;
  total_questions: number;
  percentage: number;
  results?: Array<{
    question_id: number;
    score: number;
    max_score: number;
    correct_options: string[];
  }>;
}

// API для работы с тестами
export const testApi = {
  // Получить список всех тестов
  getTests: async (): Promise<Test[]> => {
    const response = await apiInstance.get('/tests/');
    return response.data;
  },
  
  // Получить случайный смешанный тест
  getRandomTest: async (): Promise<RandomTestResponse> => {
    const response = await apiInstance.get('/tests/random_test/');
    return response.data;
  },
  
  // Получить таблицу лидеров случайного теста
  getRandomTestLeaderboard: async (): Promise<TestResult[]> => {
    const response = await apiInstance.get('/tests/random_test_leaderboard/');
    return response.data;
  },
  
  // Получить тест с вопросами
  getTest: async (id: number): Promise<{ id: number; title: string; questions: Question[]; multiple_answers_allowed: boolean }> => {
    const response = await apiInstance.get(`/tests/${id}/`);
    return response.data;
  },

  // Отправить ответы и получить результат
  submitTestAnswers: async (
    testId: number,
    studentName: string,
    answers: StudentAnswerWithContext[]
  ): Promise<TestSubmissionResponse> => {
    const response = await apiInstance.post(`/tests/${testId}/check_answers/`, {
      student_name: studentName,
      answers,
    });
    return response.data;
  },

  // Получить рейтинг по тесту
  getTestLeaderboard: async (testId: number): Promise<TestResult[]> => {
    const response = await apiInstance.get(`/tests/${testId}/leaderboard/`);
    return response.data;
  },
};

// API для работы с учебными материалами
export const learningMaterialsApi = {
  // Получить список всех разделов
  getSections: async (): Promise<Section[]> => {
    const response = await apiInstance.get('/learning-materials/sections/');
    return response.data;
  },

  // Получить конкретный раздел
  getSection: async (id: number): Promise<Section> => {
    const response = await apiInstance.get(`/learning-materials/sections/${id}/`);
    return response.data;
  },

  // Получить конкретный материал
  getMaterial: async (id: number): Promise<Material> => {
    const response = await apiInstance.get(`/learning-materials/materials/${id}/`);
    return response.data;
  },
};

// API для работы с контекстными вопросами
export const contextQuestionsApi = {
  // Получить список всех наборов контекстных вопросов
  getQuestionSets: async (): Promise<ContextQuestionSet[]> => {
    const response = await apiInstance.get('/context-questions/question-sets/');
    return response.data;
  },

  // Получить конкретный набор
  getQuestionSet: async (id: number): Promise<ContextQuestionSet> => {
    const response = await apiInstance.get(`/context-questions/question-sets/${id}/`);
    return response.data;
  },

  // Отправить ответы и получить результат
  submitAnswers: async (
    setId: number,
    studentName: string,
    answers: StudentAnswer[]
  ): Promise<TestSubmissionResponse> => {
    const response = await apiInstance.post(`/context-questions/question-sets/${setId}/check_answers/`, {
      student_name: studentName,
      answers,
    });
    return response.data;
  },

  // Получить рейтинг по контекстному тесту
  getLeaderboard: async (setId: number): Promise<TestResult[]> => {
    const response = await apiInstance.get(`/context-questions/question-sets/${setId}/leaderboard/`);
    return response.data;
  },
};

const api = {
  testApi,
  learningMaterialsApi,
  contextQuestionsApi,
};

export default api;