# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (http://localhost:5173)
npm run build     # Type-check + production build (tsc -b && vite build)
npm run lint      # ESLint
npm run preview   # Serve production build locally
```

No test runner is configured. There is no single-test command.

## Architecture

### Data flow

```
questions.ts  →  quizStore (Zustand)  →  Pages  →  storage.ts (localStorage)
```

- **`src/data/questions.ts`** is the single source of truth for all 40 quiz questions. Each question has an `id` (`java_001` format), `category`, `question`, optional `code`, four `options`, an `answer` index (0–3), and `explanation`. Also exports `CATEGORIES` metadata and `getQuestionsByCategory()`.

- **`src/store/quizStore.ts`** holds the entire in-progress quiz session. `startQuiz(category)` shuffles the question pool (Fisher-Yates) and resets all session state. `selectAnswer` is idempotent once an answer is chosen. `isFinished: true` is the signal for `QuizPage` to redirect to `/result`.

- **`src/utils/storage.ts`** wraps `localStorage` under the key `quiz_scores`. `getTopScores(category, limit)` sorts by `percentage DESC, duration ASC` (ties broken by speed).

### Routing

Four routes, all in `App.tsx`:

| Path | Page | Guard |
|------|------|-------|
| `/` | `HomePage` | — |
| `/quiz` | `QuizPage` | redirects to `/` if `questions.length === 0` |
| `/result` | `ResultPage` | redirects to `/` if `questions.length === 0` |
| `/leaderboard` | `LeaderboardPage` | accepts `{ recentId, category }` via `location.state` |

Page transitions use a `key={location.pathname}` wrapper with a `fadeIn` CSS animation.

### Component responsibilities

- **`QuestionCard`** owns per-question rendering: syntax-highlighted code block (`react-syntax-highlighter` vscDarkPlus, language derived from `question.category`), four `OptionButton`s, and the `FeedbackPanel` (conditionally rendered after answer selection).
- **`OptionButton`** is purely presentational — correct/wrong/neutral state driven by props, disabled once `revealed`.
- **`FeedbackPanel`** slides in via `@keyframes slideUp` (defined in `index.css`) and auto-focuses the "next" button.
- **`ScoreSummary`** shows grade (S/A/B/C at 90/70/50% thresholds) and, for `category === 'all'`, renders per-category progress bars.

### Styling

Tailwind CSS v4 via `@tailwindcss/vite` plugin — **no `tailwind.config.js`**. Custom keyframes (`slideUp`, `fadeIn`) live in `src/index.css` and are referenced with Tailwind's arbitrary-value syntax `animate-[slideUp_0.25s_ease-out]`.

## Adding questions

Add entries to the `questions` array in `src/data/questions.ts`. IDs must follow the `<category>_<NNN>` format. The `answer` field is a 0-based index into `options`.
