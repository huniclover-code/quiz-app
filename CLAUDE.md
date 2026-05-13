# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (http://localhost:5173)
npm run build     # Type-check + production build (tsc -b && vite build)
npm run lint      # ESLint
npm run preview   # Serve production build locally
```

No test runner is configured.

## Architecture

### Data flow

```
questions.ts  →  useQuiz (useReducer)  →  QuizContext  →  Pages
                                                        →  useLeaderboard (localStorage)
```

- **`src/data/questions.ts`** — 80문제의 단일 진실 원천. 카테고리(python/java/c/sql)별 20문제(easy×4, medium×4, hard×2 × 2회차). `Question` 인터페이스: `id` (`python_001` 형식), `category`, `difficulty`, `question`, optional `code`, 4개 `options` 튜플, 0-based `answer` 인덱스, `explanation`. `getQuestionsByCategory(categories[])` 로 필터링.

- **`src/hooks/useQuiz.ts`** — `useReducer` 기반 퀴즈 엔진. 액션: `START_QUIZ`(카테고리+닉네임, Fisher-Yates 셔플), `SELECT_ANSWER`(idempotent, 카테고리별 점수+오답 기록), `NEXT_QUESTION`(마지막이면 `status: finished`+`finishedAt`), `FINISH_QUIZ`, `RESTART`(`wrongOnly?: true`이면 오답 문제만), `GO_HOME`. 점수는 문제당 2.5점. `elapsedSeconds`는 `startedAt`/`finishedAt` 타임스탬프로 계산.

- **`src/context/QuizContext.tsx`** — `useQuiz` 반환값 전체를 Context로 노출. 모든 페이지는 `useQuizContext()` 훅으로 접근.

- **`src/hooks/useLeaderboard.ts`** — `localStorage` 키 `'quiz-leaderboard'`. `ScoreRecord`의 `score` 필드는 **정답률(0~100, 퍼센트)**. 같은 닉네임이면 최고 점수만 유지. 최대 50개 보관.

### Routing

`App.tsx`는 `QuizContext.Provider` 래핑과 라우팅만 담당.

| Path | Page | Guard |
|------|------|-------|
| `/` | `HomePage` | — |
| `/quiz` | `QuizPage` | `questions.length === 0`이면 `/`로 redirect |
| `/result` | `ResultPage` | `questions.length === 0`이면 `/`로 redirect |
| `/leaderboard` | `LeaderboardPage` | — |

`key={location.pathname}` + `animate-[fadeIn_0.2s_ease-out]` 으로 페이지 전환 애니메이션.

### Component responsibilities

- **`QuestionCard`** — `react-syntax-highlighter` (vscDarkPlus) 코드 블록, 4개 `OptionButton`, 답 선택 후 `FeedbackPanel` 렌더링.
- **`OptionButton`** — correct/wrong/neutral 상태를 props로 받는 순수 표현 컴포넌트. `revealed` 시 disabled.
- **`FeedbackPanel`** — `animate-[slideUp_0.25s_ease-out]` 슬라이드인, 마운트 시 "다음" 버튼에 auto-focus.
- **`ResultPage`** — Recharts `RadarChart`(내 점수 vs 만점 겹침), 카테고리별 수평 progress bar, 오답 접기/펼치기. 최초 진입 시 `useRef`로 `saveRecord()` 한 번만 호출.
- **`LeaderboardPage`** — TOP 3 메달 🥇🥈🥉, 현재 닉네임 파란색 하이라이트, 초기화 확인 모달.

### Styling

Tailwind CSS v4 via `@tailwindcss/vite` — **`tailwind.config.js` 없음**. 커스텀 keyframe(`slideUp`, `fadeIn`)은 `src/index.css`에 정의, arbitrary-value 문법 `animate-[slideUp_0.25s_ease-out]`으로 사용.

## Adding questions

`src/data/questions.ts`의 배열에 항목 추가. ID는 `<category>_<NNN>` 형식 필수. `answer`는 `options`의 0-based 인덱스.

## Deployment

- **Netlify** — Build command: `npm run build`, Publish directory: `dist`
- `public/_redirects`에 SPA 라우팅 설정(`/* /index.html 200`) 포함
- GitHub remotes: `origin` → `huniclover-code/quiz-app2`, `jeongdan` → `jeongdan/study-quiz-04`
