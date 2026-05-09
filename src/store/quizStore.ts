import { create } from 'zustand';
import { questions as allQuestions, type Question } from '../data/questions';

interface QuizState {
  category: string;
  questions: Question[];
  currentIndex: number;
  selectedAnswer: number | null;
  answers: Record<string, number>;
  isFinished: boolean;
  startTime: number;

  startQuiz: (category: string) => void;
  selectAnswer: (index: number) => void;
  nextQuestion: () => void;
  resetQuiz: () => void;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  category: '',
  questions: [],
  currentIndex: 0,
  selectedAnswer: null,
  answers: {},
  isFinished: false,
  startTime: 0,

  startQuiz: (category) => {
    const pool =
      category === 'all'
        ? allQuestions
        : allQuestions.filter((q) => q.category === category);
    set({
      category,
      questions: shuffle(pool),
      currentIndex: 0,
      selectedAnswer: null,
      answers: {},
      isFinished: false,
      startTime: Date.now(),
    });
  },

  selectAnswer: (index) => {
    const { questions, currentIndex, answers, selectedAnswer } = get();
    if (selectedAnswer !== null) return;
    const q = questions[currentIndex];
    set({
      selectedAnswer: index,
      answers: { ...answers, [q.id]: index },
    });
  },

  nextQuestion: () => {
    const { currentIndex, questions } = get();
    if (currentIndex + 1 >= questions.length) {
      set({ isFinished: true });
    } else {
      set({ currentIndex: currentIndex + 1, selectedAnswer: null });
    }
  },

  resetQuiz: () =>
    set({
      category: '',
      questions: [],
      currentIndex: 0,
      selectedAnswer: null,
      answers: {},
      isFinished: false,
      startTime: 0,
    }),
}));
