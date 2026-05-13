import { useState, useCallback } from 'react'
import type { Category } from '../data/questions'

const LS_KEY = 'quiz-leaderboard'
const MAX_RECORDS = 50

export interface ScoreRecord {
  id: string
  nickname: string
  score: number
  totalQuestions: number
  elapsedSeconds: number
  categoryScores: { category: Category; correct: number; total: number }[]
  date: string
}

function load(): ScoreRecord[] {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) ?? '[]') as ScoreRecord[]
  } catch {
    return []
  }
}

function save(records: ScoreRecord[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(records))
}

export function useLeaderboard() {
  const [records, setRecords] = useState<ScoreRecord[]>(load)

  const getRecords = useCallback((): ScoreRecord[] => {
    return [...records].sort((a, b) => b.score - a.score).slice(0, MAX_RECORDS)
  }, [records])

  const saveRecord = useCallback((record: ScoreRecord) => {
    setRecords((prev) => {
      const existing = prev.findIndex((r) => r.nickname === record.nickname)
      let next: ScoreRecord[]
      if (existing !== -1) {
        // 같은 닉네임이면 최고 점수만 유지
        if (prev[existing].score >= record.score) return prev
        next = prev.map((r, i) => (i === existing ? record : r))
      } else {
        next = [...prev, record]
      }
      const sorted = next.sort((a, b) => b.score - a.score).slice(0, MAX_RECORDS)
      save(sorted)
      return sorted
    })
  }, [])

  const clearRecords = useCallback(() => {
    localStorage.removeItem(LS_KEY)
    setRecords([])
  }, [])

  return { getRecords, saveRecord, clearRecords, records }
}
