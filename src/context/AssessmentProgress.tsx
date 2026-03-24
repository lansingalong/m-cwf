import { createContext, useContext, useState, ReactNode } from 'react'

type ProgressMap = Record<string, number>
type AnswersMap = Record<string, Record<string, string | string[]>>

const AssessmentProgressContext = createContext<{
  progress: ProgressMap
  setProgress: (id: string, value: number) => void
  savedAnswers: AnswersMap
  saveAnswers: (id: string, answers: Record<string, string | string[]>) => void
  currentPage: Record<string, number>
  saveCurrentPage: (id: string, page: number) => void
}>({
  progress: {},
  setProgress: () => {},
  savedAnswers: {},
  saveAnswers: () => {},
  currentPage: {},
  saveCurrentPage: () => {},
})

export function AssessmentProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgressMap] = useState<ProgressMap>({})
  const [savedAnswers, setSavedAnswers] = useState<AnswersMap>({})
  const [currentPage, setCurrentPageMap] = useState<Record<string, number>>({})

  const setProgress = (id: string, value: number) => {
    setProgressMap(prev => ({ ...prev, [id]: value }))
  }
  const saveAnswers = (id: string, answers: Record<string, string | string[]>) => {
    setSavedAnswers(prev => ({ ...prev, [id]: answers }))
  }
  const saveCurrentPage = (id: string, page: number) => {
    setCurrentPageMap(prev => ({ ...prev, [id]: page }))
  }

  return (
    <AssessmentProgressContext.Provider value={{ progress, setProgress, savedAnswers, saveAnswers, currentPage, saveCurrentPage }}>
      {children}
    </AssessmentProgressContext.Provider>
  )
}

export function useAssessmentProgress() {
  return useContext(AssessmentProgressContext)
}
