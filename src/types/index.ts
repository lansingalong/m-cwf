export type QuestionType = 'single_choice' | 'multi_choice' | 'scale' | 'text' | 'yes_no' | 'date'

export interface QuestionOption {
  value: string
  label: string
  score?: number
}

export interface SubQuestion {
  id: string
  text: string
  type: QuestionType
  options?: QuestionOption[]
  required: boolean
}

export interface Question {
  id: string
  text: string
  type: QuestionType
  options?: QuestionOption[]
  required: boolean
  scaleMin?: number
  scaleMax?: number
  scaleMinLabel?: string
  scaleMaxLabel?: string
  showIf?: { questionId: string; values: string[] }
  subQuestions?: { triggerValues: string[]; questions: SubQuestion[] }
}

export interface AssessmentPage {
  title?: string
  questions: Question[]
}

export interface Assessment {
  id: string
  title: string
  description: string
  category: 'Behavioral Health' | 'Social Determinants' | 'Chronic Condition' | 'General Health'
  estimatedMinutes: number
  status: 'due' | 'in_progress' | 'completed'
  dueDate?: string
  completedDate?: string
  questions: Question[]
  pages?: AssessmentPage[]
  score?: number
  scoreLabel?: string
}

export interface Member {
  id: string
  firstName: string
  lastName: string
  email: string
  dateOfBirth: string
  memberId: string
  careManager: string
}

export type RootStackParamList = {
  Login: undefined
  AssessmentList: { completedAssessmentId?: string } | undefined
  AssessmentDetail: { assessmentId: string; readOnly?: boolean }
  AssessmentComplete: { assessmentId: string; score?: number; scoreLabel?: string }
  Profile: undefined
}
