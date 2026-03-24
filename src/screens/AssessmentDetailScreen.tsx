import { useState, useRef, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Modal,
  Pressable,
} from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList, Question, SubQuestion } from '../types'
import { mockAssessments, mockCompletedAnswers } from '../mocks/assessments'
import { Colors, Typography, Radii, Shadows } from '../theme'
import { useAssessmentProgress } from '../context/AssessmentProgress'
import SubmitButtonSvg from '../../assets/icon-submit-button.svg'
import HamburgerSvg from '../../assets/icon-hamburger.svg'
import PageSvg from '../../assets/icon-page.svg'
import BackChevronSvg from '../../assets/icon-back-chevron.svg'
import HelpSvg from '../../assets/icon-help.svg'

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AssessmentDetail'>
  route: RouteProp<RootStackParamList, 'AssessmentDetail'>
}

type Answers = Record<string, string | string[]>

/* ── Radio / checkbox option — matches original assessments project ───── */
import Svg, { Path, Circle as SvgCircle } from 'react-native-svg'

function ChoiceOption({
  label,
  selected,
  onPress,
  multi,
}: {
  label: string
  selected: boolean
  onPress: () => void
  multi?: boolean
}) {
  return (
    <TouchableOpacity style={opt.row} onPress={onPress} activeOpacity={0.7}>
      {multi ? (
        <View style={[opt.check, selected && opt.checkSelected]}>
          {selected && (
            <Svg width={11} height={8} viewBox="0 0 11 8" fill="none">
              <Path d="M1 4L4 7L10 1" stroke="white" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          )}
        </View>
      ) : (
        <View style={opt.radio}>
          {selected && <View style={opt.radioDot} />}
        </View>
      )}
      <Text style={opt.label}>{label}</Text>
    </TouchableOpacity>
  )
}

const opt = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 44,
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: Colors.white,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#0080A3',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0080A3',
  },
  check: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#0080A3',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  checkSelected: {
    backgroundColor: '#0080A3',
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
    color: '#282F35',
    lineHeight: 22,
    flex: 1,
  },
})

/* ── Progress ring for sidebar ────────────────────────────────────────── */
function ProgressRing({ size, progress, pageNum }: { size: number; progress: number; pageNum: number }) {
  const stroke = 3
  const r = (size - stroke) / 2
  const cx = size / 2
  const cy = size / 2
  const circumference = 2 * Math.PI * r
  const offset = circumference * (1 - progress)
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={{ position: 'absolute' }}>
        <SvgCircle cx={cx} cy={cy} r={r} stroke={Colors.bgSecondary} strokeWidth={stroke} fill="none" />
        {progress > 0 && (
          <SvgCircle
            cx={cx} cy={cy} r={r}
            stroke={Colors.brandSecondary}
            strokeWidth={stroke}
            fill="none"
            strokeDasharray={`${circumference}`}
            strokeDashoffset={`${offset}`}
            strokeLinecap="round"
            transform={`rotate(-90 ${cx} ${cy})`}
          />
        )}
      </Svg>
      <Text style={{ fontSize: 13, fontWeight: '500', color: Colors.neutral3 }}>{pageNum}</Text>
    </View>
  )
}

/* ── Single question card ─────────────────────────────────────────────── */
function QuestionCard({
  question,
  index,
  answer,
  setAnswer,
  onNext,
  onLayout,
  collapsed,
  subAnswers,
  setSubAnswer,
  isLastQuestion,
  readOnly,
}: {
  question: Question
  index: number
  answer: string | string[] | undefined
  setAnswer: (val: string | string[]) => void
  onNext?: () => void
  onLayout?: (e: any) => void
  collapsed?: boolean
  subAnswers?: Record<string, string | string[]>
  setSubAnswer?: (subId: string, val: string | string[]) => void
  isLastQuestion?: boolean
  readOnly?: boolean
}) {
  const needsNextBtn = question.type === 'multi_choice' || question.type === 'text' || question.type === 'date'
  const hasAnswer = (() => {
    if (question.type === 'multi_choice') return Array.isArray(answer) && answer.length > 0
    if (question.type === 'text' || question.type === 'date') return typeof answer === 'string' && answer.trim().length > 0
    return !!answer
  })()
  const nextEnabled = !question.required || hasAnswer

  const disabled = collapsed === true

  if (disabled) {
    return (
      <View style={[qcard.wrap, qcard.disabledWrap]} onLayout={onLayout}>
        <Text style={[qcard.questionText, qcard.disabledText, { marginBottom: 0 }]}>
          {index + 1}.{'  '}{question.text}
        </Text>
      </View>
    )
  }

  return (
    <View style={qcard.wrap} onLayout={onLayout}>
      {/* Question text with number + required asterisk */}
      <Text style={qcard.questionText}>
        {index + 1}.{'  '}{question.text}
        {question.required && <Text style={qcard.asterisk}> *</Text>}
      </Text>

      <View style={readOnly ? { opacity: 0.6 } : undefined} pointerEvents={readOnly ? 'none' : 'auto'}>
      {/* Single / yes_no */}
      {(question.type === 'single_choice' || question.type === 'yes_no') && (
        <View style={qcard.optionList}>
          {question.options?.map(o => (
            <ChoiceOption
              key={o.value}
              label={o.label}
              selected={answer === o.value}
              onPress={() => setAnswer(o.value)}
            />
          ))}
        </View>
      )}

      {/* Multi select */}
      {question.type === 'multi_choice' && (
        <View style={qcard.optionList}>
          {question.options?.map(o => {
            const arr = (answer as string[] | undefined) ?? []
            return (
              <ChoiceOption
                key={o.value}
                label={o.label}
                selected={arr.includes(o.value)}
                onPress={() =>
                  setAnswer(
                    arr.includes(o.value)
                      ? arr.filter(v => v !== o.value)
                      : [...arr, o.value]
                  )
                }
                multi
              />
            )
          })}
        </View>
      )}

      {/* Free text */}
      {question.type === 'text' && (
        <TextInput
          style={qcard.textArea}
          value={(answer as string) ?? ''}
          onChangeText={val => setAnswer(val)}
          placeholder="Type your answer here…"
          placeholderTextColor={Colors.neutral5}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      )}

      {/* Date selector */}
      {question.type === 'date' && (
        <TextInput
          style={qcard.dateInput}
          value={(answer as string) ?? ''}
          onChangeText={val => setAnswer(val)}
          placeholder="MM/DD/YYYY"
          placeholderTextColor={Colors.neutral5}
          keyboardType="numbers-and-punctuation"
          maxLength={10}
        />
      )}

      {/* Sub-questions — shown when trigger answer is selected */}
      {/* Sub-questions — shown when trigger answer is selected */}
      {question.subQuestions && typeof answer === 'string' && question.subQuestions.triggerValues.includes(answer) && (
        <View style={qcard.subQuestionsWrap}>
          {question.subQuestions.questions.map(sq => {
            const sqAnswer = subAnswers?.[sq.id]
            return (
              <View key={sq.id} style={qcard.subCard}>
                <Text style={qcard.subQuestionText}>
                  {sq.text}
                  {sq.required && <Text style={qcard.asterisk}> *</Text>}
                </Text>

                {(sq.type === 'single_choice' || sq.type === 'yes_no') && (
                  <View style={qcard.optionList}>
                    {sq.options?.map(o => (
                      <ChoiceOption
                        key={o.value}
                        label={o.label}
                        selected={sqAnswer === o.value}
                        onPress={() => setSubAnswer?.(sq.id, o.value)}
                      />
                    ))}
                  </View>
                )}

                {sq.type === 'multi_choice' && (
                  <View style={qcard.optionList}>
                    {sq.options?.map(o => {
                      const arr = (sqAnswer as string[] | undefined) ?? []
                      return (
                        <ChoiceOption
                          key={o.value}
                          label={o.label}
                          selected={arr.includes(o.value)}
                          onPress={() =>
                            setSubAnswer?.(sq.id, arr.includes(o.value) ? arr.filter(v => v !== o.value) : [...arr, o.value])
                          }
                          multi
                        />
                      )
                    })}
                  </View>
                )}

                {sq.type === 'text' && (
                  <TextInput
                    style={qcard.textArea}
                    value={(sqAnswer as string) ?? ''}
                    onChangeText={val => setSubAnswer?.(sq.id, val)}
                    placeholder="Type your answer here…"
                    placeholderTextColor={Colors.neutral5}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                  />
                )}
              </View>
            )
          })}
        </View>
      )}

      {/* Next button — only for multi-select, text, date, or questions with sub-questions */}
      {!disabled && onNext && (() => {
        const hasSubQuestions = question.subQuestions && typeof answer === 'string' && question.subQuestions.triggerValues.includes(answer)
        const showBtn = hasSubQuestions || needsNextBtn
        if (!showBtn) return null
        const allSubsAnswered = hasSubQuestions
          ? question.subQuestions!.questions.every(sq => {
              if (!sq.required) return true
              const sa = subAnswers?.[sq.id]
              if (sq.type === 'multi_choice') return Array.isArray(sa) && sa.length > 0
              if (sq.type === 'text' || sq.type === 'date') return typeof sa === 'string' && sa.trim().length > 0
              return !!sa
            })
          : true
        const enabled = hasAnswer && allSubsAnswered
        return (
          <TouchableOpacity
            style={[qcard.nextBtn, !enabled && qcard.nextBtnDisabled]}
            onPress={enabled ? onNext : undefined}
            activeOpacity={enabled ? 0.85 : 1}
          >
            <Text style={[qcard.nextBtnText, !enabled && qcard.nextBtnTextDisabled]}>{isLastQuestion ? 'Submit Assessment' : 'Next'}</Text>
          </TouchableOpacity>
        )
      })()}
      </View>
    </View>
  )
}

const qcard = StyleSheet.create({
  wrap: {
    backgroundColor: Colors.white,
    borderRadius: Radii.card,
    padding: 20,
    marginBottom: 12,
    ...Shadows.card,
  },
  questionText: {
    flex: 1,
    fontSize: Typography.callout.fontSize,
    fontWeight: Typography.regular,
    color: Colors.neutral1,
    lineHeight: 24,
    marginBottom: 14,
    letterSpacing: Typography.callout.letterSpacing,
  },
  asterisk: {
    color: Colors.errorIcon,
    fontSize: Typography.callout.fontSize,
  },
  disabledWrap: {
    opacity: 0.4,
  },
  disabledText: {
    color: Colors.neutral4,
  },
  subQuestionsWrap: {
    marginTop: 12,
    gap: 12,
  },
  subCard: {
    borderWidth: 1,
    borderColor: Colors.bgSecondary,
    borderRadius: 10,
    padding: 16,
    backgroundColor: Colors.white,
  },
  subQuestionText: {
    fontSize: Typography.callout.fontSize,
    fontWeight: Typography.regular,
    color: Colors.neutral1,
    lineHeight: 24,
    marginBottom: 12,
    letterSpacing: Typography.callout.letterSpacing,
  },
  optionList: { gap: 2 },
  textArea: {
    borderWidth: 1,
    borderColor: Colors.bgSecondary,
    borderRadius: 8,
    padding: 14,
    fontSize: Typography.callout.fontSize,
    color: Colors.neutral2,
    minHeight: 100,
    lineHeight: 22,
    outlineStyle: 'none' as any,
    letterSpacing: Typography.callout.letterSpacing,
    marginTop: 4,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: Colors.bgSecondary,
    borderRadius: 8,
    padding: 14,
    fontSize: Typography.callout.fontSize,
    color: Colors.neutral2,
    height: 48,
    letterSpacing: Typography.callout.letterSpacing,
    outlineStyle: 'none' as any,
  },
  nextBtn: {
    backgroundColor: '#0E98BE',
    borderRadius: Radii.button,
    height: 51,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  nextBtnDisabled: {
    backgroundColor: '#86CBDF',
  },
  nextBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '500' as const,
    letterSpacing: -0.32,
  },
  nextBtnTextDisabled: {
    opacity: 0.8,
  },
})

/* ── Main screen ─────────────────────────────────────────────────────── */
export function AssessmentDetailScreen({ navigation, route }: Props) {
  const { assessmentId } = route.params
  const assessment = mockAssessments.find(a => a.id === assessmentId)
  const { setProgress, savedAnswers, saveAnswers, currentPage: savedPages, saveCurrentPage } = useAssessmentProgress()
  const [answers, setAnswersState] = useState<Answers>(() => {
    if (route.params.readOnly && mockCompletedAnswers[assessmentId]) return { ...mockCompletedAnswers[assessmentId] }
    if (savedAnswers[assessmentId]) return { ...savedAnswers[assessmentId] }
    return {}
  })
  const setAnswers = (updater: Answers | ((prev: Answers) => Answers)) => {
    setAnswersState(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      saveAnswers(assessmentId, next)
      return next
    })
  }
  const [menuVisible, setMenuVisible] = useState(false)
  const [sideMenuVisible, setSideMenuVisible] = useState(false)
  const [currentPage, setCurrentPageState] = useState(() => savedPages[assessmentId] ?? 0)
  const setCurrentPage = (page: number) => {
    setCurrentPageState(page)
    saveCurrentPage(assessmentId, page)
  }
  const scrollRef = useRef<ScrollView>(null)
  const cardOffsets = useRef<number[]>([])
  const cardRefs = useRef<(View | null)[]>([])

  if (!assessment) return null

  const readOnly = route.params.readOnly === true

  // Use pages if available, otherwise wrap flat questions into a single page
  const pages = assessment.pages && assessment.pages.length > 0
    ? assessment.pages
    : [{ questions: assessment.questions }]

  // Check if a question's skip-logic condition is met (should be active)
  // Default is active (expanded). Only collapses when the parent question
  // has been answered with a value NOT in the showIf list.
  const isQuestionActive = (q: typeof assessment.questions[0]) => {
    if (!q.showIf) return true
    const depAnswer = answers[q.showIf.questionId]
    // If parent hasn't been answered yet, keep expanded (default)
    if (depAnswer === undefined || depAnswer === '') return true
    if (typeof depAnswer === 'string') return q.showIf.values.includes(depAnswer)
    return true
  }

  // All questions on the current page (both active and collapsed)
  const currentPageAllQuestions = pages[currentPage]?.questions ?? []
  // Active (visible) questions for validation
  const currentPageQuestions = currentPageAllQuestions.filter(q => isQuestionActive(q))

  // Reset offsets when page changes
  if (cardOffsets.current.length !== currentPageAllQuestions.length) {
    cardOffsets.current = []
  }

  // All active questions across all pages
  const allVisibleQuestions = pages.flatMap(p => p.questions.filter(q => isQuestionActive(q)))

  const answeredCount = allVisibleQuestions.filter(q => {
    const a = answers[q.id]
    if (q.type === 'multi_choice') return Array.isArray(a) && a.length > 0
    return !!a
  }).length

  // Report progress to shared context
  const totalRequired = allVisibleQuestions.filter(q => q.required).length
  const answeredRequired = allVisibleQuestions.filter(q => {
    if (!q.required) return false
    const a = answers[q.id]
    if (q.type === 'multi_choice') return Array.isArray(a) && a.length > 0
    return !!a
  }).length
  const progressPct = totalRequired > 0 ? answeredRequired / totalRequired : 0
  useEffect(() => {
    if (!readOnly) setProgress(assessmentId, progressPct)
  }, [progressPct, readOnly, assessmentId])

  // Check if a page is complete (all required active questions answered)
  const isPageComplete = (pageIndex: number) => {
    const active = (pages[pageIndex]?.questions ?? []).filter(q => isQuestionActive(q))
    return active.every(q => {
      if (!q.required) return true
      const a = answers[q.id]
      if (q.type === 'multi_choice') return Array.isArray(a) && a.length > 0
      return !!a
    })
  }

  // Get page progress as 0–1
  const getPageProgress = (pageIndex: number) => {
    const active = (pages[pageIndex]?.questions ?? []).filter(q => isQuestionActive(q))
    const required = active.filter(q => q.required)
    if (required.length === 0) return 1
    const answered = required.filter(q => {
      const a = answers[q.id]
      if (q.type === 'multi_choice') return Array.isArray(a) && a.length > 0
      return !!a
    }).length
    return answered / required.length
  }

  // Check if a page has any answers
  const isPageInProgress = (pageIndex: number) => {
    const active = (pages[pageIndex]?.questions ?? []).filter(q => isQuestionActive(q))
    return active.some(q => {
      const a = answers[q.id]
      if (q.type === 'multi_choice') return Array.isArray(a) && a.length > 0
      return !!a
    })
  }

  const [submitError, setSubmitError] = useState('')
  const [showSkippedDialog, setShowSkippedDialog] = useState(false)
  const [finishMode, setFinishMode] = useState<typeof allVisibleQuestions | null>(null)

  const getUnanswered = () => allVisibleQuestions.filter(q => {
    if (!q.required) return false
    const a = answers[q.id]
    if (q.type === 'multi_choice') return !Array.isArray(a) || a.length === 0
    return !a
  })

  const handleSubmit = () => {
    const unanswered = getUnanswered()
    if (unanswered.length > 0) {
      setSubmitError('')
      setShowSkippedDialog(true)
      return
    }
    setSubmitError('')
    navigation.replace('AssessmentList', { completedAssessmentId: assessment.id })
  }

  const finishScrollRef = useRef<ScrollView>(null)
  const finishOffsets = useRef<number[]>([])

  const scrollToFinishQuestion = (qIndex: number) => {
    if (finishOffsets.current[qIndex] !== undefined) {
      finishScrollRef.current?.scrollTo({ y: Math.max(0, finishOffsets.current[qIndex]), animated: true })
    }
  }

  const handleFinishAnswer = (questionId: string, val: string | string[], index: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: val }))
    if (!finishMode) return
    const q = finishMode[index]
    if (q && (q.type === 'single_choice' || q.type === 'yes_no') && !q.subQuestions) {
      setTimeout(() => scrollToFinishQuestion(index + 1), 500)
    }
  }

  const enterFinishMode = () => {
    setShowSkippedDialog(false)
    const unanswered = getUnanswered()
    setFinishMode(unanswered)
    // Scroll to top after the finish mode view mounts
    setTimeout(() => {
      finishScrollRef.current?.scrollTo({ y: 0, animated: false })
      scrollRef.current?.scrollTo({ y: 0, animated: false })
    }, 150)
  }

  // Check if answering question at index means we're done with the page
  const isLastActiveOnPage = (index: number, newAnswers: Answers) => {
    for (let n = index + 1; n < currentPageAllQuestions.length; n++) {
      const nq = currentPageAllQuestions[n]
      const nqActive = !nq.showIf || (
        newAnswers[nq.showIf.questionId] !== undefined &&
        newAnswers[nq.showIf.questionId] !== '' &&
        (typeof newAnswers[nq.showIf.questionId] === 'string'
          ? nq.showIf.values.includes(newAnswers[nq.showIf.questionId] as string)
          : true)
      )
      if (nqActive) return false
    }
    return true
  }

  const scrollToQuestion = (qIndex: number) => {
    if (cardOffsets.current[qIndex] !== undefined) {
      scrollRef.current?.scrollTo({ y: Math.max(0, cardOffsets.current[qIndex]), animated: true })
    }
  }

  const scrollToNextOrAdvance = (index: number) => {
    if (index + 1 < currentPageAllQuestions.length) {
      // Wait for layout to settle (sub-questions may have expanded/collapsed)
      setTimeout(() => scrollToQuestion(index + 1), 400)
      return
    }
    // No more questions — advance to next page or submit on last page
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1)
      setTimeout(() => scrollRef.current?.scrollTo({ y: 0, animated: false }), 50)
    } else {
      handleSubmit()
    }
  }

  const handleSetAnswer = (questionId: string, val: string | string[], index: number) => {
    const newAnswers = { ...answers, [questionId]: val }
    setAnswers(newAnswers)
    const q = currentPageAllQuestions[index]
    if (q && (q.type === 'single_choice' || q.type === 'yes_no') && !q.subQuestions) {
      // Delay to let layout recalculate after skip-logic changes
      setTimeout(() => scrollToNextOrAdvance(index), 500)
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.bgPrimary} />

      {/* Light nav header */}
      <View style={styles.navHeader}>
        <TouchableOpacity style={styles.navBack} onPress={() => navigation.goBack()}>
          <BackChevronSvg width={14} height={22} color={Colors.neutral2} />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Check-In</Text>
        <HelpSvg width={24} height={24} color={Colors.neutral2} />
      </View>

      {/* Side menu overlay */}
      <Modal visible={sideMenuVisible} transparent animationType="none" onRequestClose={() => setSideMenuVisible(false)}>
        <Pressable style={styles.sideOverlay} onPress={() => setSideMenuVisible(false)}>
          <Pressable style={styles.sideMenu} onPress={e => e.stopPropagation()}>
            {/* Close button */}
            <TouchableOpacity style={styles.sideCloseBtn} onPress={() => setSideMenuVisible(false)} activeOpacity={0.7}>
              <Text style={styles.sideCloseText}>✕</Text>
            </TouchableOpacity>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.sideScrollContent}>
              {pages.map((page, i) => {
                const complete = isPageComplete(i)
                const inProgress = !complete && isPageInProgress(i)
                const isCurrent = i === currentPage
                return (
                  <TouchableOpacity
                    key={i}
                    style={[styles.sideRow, isCurrent && styles.sideRowCurrent]}
                    activeOpacity={0.7}
                    onPress={() => {
                      setSideMenuVisible(false)
                      setCurrentPage(i)
                    }}
                  >
                    <Text style={styles.sideRowLabel}>Page</Text>
                    {complete ? (
                      <View style={styles.sideCheckCircle}>
                        <Text style={styles.sideCheckMark}>✓</Text>
                      </View>
                    ) : (
                      <ProgressRing size={36} progress={getPageProgress(i)} pageNum={i + 1} />
                    )}
                  </TouchableOpacity>
                )
              })}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Sub-header: hamburger + page count + Submit button */}
      <View style={styles.subHeader}>
        <TouchableOpacity onPress={() => setSideMenuVisible(true)} activeOpacity={0.7}>
          <HamburgerSvg width={24} height={20} color={Colors.brandSecondary} />
        </TouchableOpacity>
        <View style={styles.subHeaderPage}>
          <PageSvg width={20} height={20} color={Colors.neutral2} />
          <Text style={styles.subHeaderText}>
            Page {currentPage + 1} of {pages.length}
          </Text>
        </View>
        <View style={{ flex: 1 }} />
        {readOnly ? (
          <View style={styles.readOnlyBadge}>
            <Text style={styles.readOnlyText}>View Only</Text>
          </View>
        ) : (
          <View style={styles.submitWrap}>
            <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)} activeOpacity={0.85}>
              <SubmitButtonSvg width={149} height={51} />
            </TouchableOpacity>
            {menuVisible && (
              <>
                <Pressable style={styles.menuOverlay} onPress={() => setMenuVisible(false)} />
                <View style={styles.menuDropdown}>
                  <TouchableOpacity style={styles.menuItem} onPress={() => { setMenuVisible(false); setTimeout(handleSubmit, 100) }} activeOpacity={0.7}>
                    <Text style={styles.menuItemText}>Submit</Text>
                  </TouchableOpacity>
                  <View style={styles.menuDivider} />
                  <TouchableOpacity style={styles.menuItem} onPress={() => { setMenuVisible(false); setTimeout(() => navigation.goBack(), 100) }} activeOpacity={0.7}>
                    <Text style={styles.menuItemText}>Save and Close</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        )}
      </View>

      {/* Skipped questions dialog */}
      <Modal visible={showSkippedDialog} transparent animationType="fade" onRequestClose={() => setShowSkippedDialog(false)}>
        <View style={styles.dialogOverlay}>
          <View style={styles.dialogBox}>
            <Text style={styles.dialogTitle}>You skipped required questions</Text>
            <Text style={styles.dialogMessage}>You must complete these questions before submitting your assessment.</Text>
            <View style={styles.dialogButtons}>
              <TouchableOpacity style={styles.dialogBtn} onPress={() => setShowSkippedDialog(false)} activeOpacity={0.7}>
                <Text style={styles.dialogBtnTextCancel}>Cancel</Text>
              </TouchableOpacity>
              <View style={styles.dialogBtnDivider} />
              <TouchableOpacity style={styles.dialogBtn} onPress={enterFinishMode} activeOpacity={0.7}>
                <Text style={styles.dialogBtnTextAction}>Finish Questions</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Error banner */}
      {submitError !== '' && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorBannerText}>{submitError}</Text>
        </View>
      )}

      {finishMode ? (
        /* Finish mode — show all unanswered required questions on one page */
        <ScrollView
          ref={finishScrollRef}
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {finishMode.map((fq, fi) => {
            const allQs = pages.flatMap(p => p.questions)
            const globalIdx = allQs.findIndex(q => q.id === fq.id)
            return (
              <View key={fq.id} onLayout={e => { finishOffsets.current[fi] = e.nativeEvent.layout.y }}>
                <QuestionCard
                  question={fq}
                  index={globalIdx >= 0 ? globalIdx : 0}
                  answer={answers[fq.id]}
                  setAnswer={val => handleFinishAnswer(fq.id, val, fi)}
                  onNext={() => setTimeout(() => scrollToFinishQuestion(fi + 1), 100)}
                  subAnswers={answers}
                  setSubAnswer={(subId, val) => setAnswers(prev => ({ ...prev, [subId]: val }))}
                  isLastQuestion={fi === finishMode.length - 1}
                />
              </View>
            )
          })}
          {(() => {
            const allAnswered = finishMode.every(fq => {
              const a = answers[fq.id]
              if (fq.type === 'multi_choice') return Array.isArray(a) && a.length > 0
              if (fq.type === 'text' || fq.type === 'date') return typeof a === 'string' && a.trim().length > 0
              return !!a
            })
            return (
              <TouchableOpacity
                style={[styles.finishNextBtn, !allAnswered && styles.finishNextBtnDisabled]}
                onPress={allAnswered ? () => {
                  setFinishMode(null)
                  navigation.replace('AssessmentList', { completedAssessmentId: assessment.id })
                } : undefined}
                activeOpacity={allAnswered ? 0.85 : 1}
              >
                <Text style={[styles.finishNextBtnText, !allAnswered && styles.finishNextBtnTextDisabled]}>
                  Submit Assessment
                </Text>
              </TouchableOpacity>
            )
          })()}
        </ScrollView>
      ) : (
        /* Normal mode — current page questions */
        <ScrollView
          ref={scrollRef}
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          pointerEvents={readOnly ? 'box-none' : 'auto'}
        >
          {(() => {
            let globalOffset = 0
            for (let p = 0; p < currentPage; p++) {
              globalOffset += (pages[p]?.questions ?? []).length
            }
            return currentPageAllQuestions.map((q, i) => {
            const active = isQuestionActive(q)
            return (
              <View key={q.id} ref={ref => { cardRefs.current[i] = ref }} onLayout={e => { cardOffsets.current[i] = e.nativeEvent.layout.y }}>
                <QuestionCard
                  question={q}
                  index={globalOffset + i}
                  answer={answers[q.id]}
                  setAnswer={readOnly ? () => {} : val => handleSetAnswer(q.id, val, i)}
                  collapsed={!active}
                  onNext={readOnly ? undefined : () => setTimeout(() => scrollToNextOrAdvance(i), 100)}
                  subAnswers={answers}
                  setSubAnswer={readOnly ? undefined : (subId, val) => setAnswers(prev => ({ ...prev, [subId]: val }))}
                  isLastQuestion={currentPage === pages.length - 1 && i === currentPageAllQuestions.length - 1}
                  readOnly={readOnly}
                />
              </View>
            )
            })
          })()}
        </ScrollView>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: Colors.bgPrimary },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 32 },

  // Light nav header
  navHeader: {
    backgroundColor: Colors.bgPrimary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.bgSecondary,
  },
  navBack: { width: 36, alignItems: 'flex-start' },
  navBackText: {
    fontSize: 28,
    color: Colors.neutral2,
    lineHeight: 30,
    fontWeight: Typography.light,
  },
  navTitle: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Merriweather-Light',
    fontSize: 17,
    color: Colors.neutral2,
    letterSpacing: -0.32,
  },

  // Sub-header bar
  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: Colors.bgPrimary,
    zIndex: 20,
  },
  subHeaderPage: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginLeft: 16,
  },
  subHeaderText: {
    fontSize: Typography.subheadline.fontSize,
    fontWeight: Typography.medium,
    color: Colors.neutral2,
    letterSpacing: Typography.subheadline.letterSpacing,
  },

  // Error banner
  errorBanner: {
    backgroundColor: '#FEF2F2',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#FECACA',
  },
  errorBannerText: {
    fontSize: 14,
    color: Colors.errorText,
    textAlign: 'center',
  },

  // Menu dropdown
  submitWrap: {
    position: 'relative',
    zIndex: 20,
  },
  menuOverlay: {
    position: 'fixed' as any,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9,
  },
  menuDropdown: {
    position: 'absolute',
    top: 56,
    right: 0,
    backgroundColor: Colors.white,
    borderRadius: Radii.card,
    minWidth: 180,
    ...Shadows.modal,
    overflow: 'hidden',
    zIndex: 30,
    elevation: 30,
  },
  menuItem: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  menuItemText: {
    fontSize: Typography.callout.fontSize,
    color: Colors.neutral2,
    letterSpacing: Typography.callout.letterSpacing,
  },
  // Finish mode
  finishNextBtn: {
    backgroundColor: '#0E98BE',
    borderRadius: Radii.button,
    height: 51,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  finishNextBtnDisabled: {
    backgroundColor: '#86CBDF',
  },
  finishNextBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: -0.32,
  },
  finishNextBtnTextDisabled: {
    opacity: 0.8,
  },

  // iOS-style dialog
  dialogOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  dialogBox: {
    backgroundColor: 'rgba(242,242,242,0.95)',
    borderRadius: 14,
    width: '100%',
    maxWidth: 300,
    overflow: 'hidden',
  },
  dialogTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.neutral1,
    textAlign: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 4,
  },
  dialogMessage: {
    fontSize: 13,
    color: Colors.neutral2,
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    lineHeight: 18,
  },
  dialogButtons: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.2)',
  },
  dialogBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogBtnDivider: {
    width: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  dialogBtnTextCancel: {
    fontSize: 17,
    color: '#007AFF',
  },
  dialogBtnTextAction: {
    fontSize: 17,
    fontWeight: '600',
    color: '#007AFF',
  },

  readOnlyBadge: {
    backgroundColor: Colors.bgSecondary,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  readOnlyText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.neutral3,
  },
  menuDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.bgSecondary,
  },

  // Side menu
  sideOverlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  sideMenu: {
    width: 300,
    backgroundColor: Colors.white,
    paddingTop: 16,
    paddingBottom: 32,
    ...Shadows.modal,
  },
  sideCloseBtn: {
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginBottom: 8,
  },
  sideCloseText: {
    fontSize: 20,
    color: Colors.neutral3,
    fontWeight: '300',
  },
  sideScrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 10,
  },
  sideRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EDF2F4',
    borderRadius: 30,
    height: 52,
    paddingLeft: 24,
    paddingRight: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  sideRowCurrent: {
    borderColor: Colors.brandSecondary,
    backgroundColor: Colors.white,
  },
  sideRowLabel: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.neutral2,
  },
  sideCheckCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#5CB85C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sideCheckMark: {
    fontSize: 18,
    color: Colors.white,
    fontWeight: '700',
  },

  // Page heading
  pageHeading: {
    fontSize: 18,
    fontWeight: Typography.medium,
    color: Colors.brandPrimary,
    marginBottom: 16,
  },


  // Bottom submit pill
  primaryBtn: {
    backgroundColor: Colors.brandSecondary,
    borderRadius: Radii.button,
    height: 51,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    shadowColor: Colors.brandPrimary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  primaryBtnText: {
    color: Colors.white,
    fontSize: Typography.callout.fontSize,
    fontWeight: Typography.medium,
    letterSpacing: Typography.callout.letterSpacing,
  },

  // Completed state
  completedWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 16,
  },
  completedIcon: { fontSize: 48, color: Colors.successText },
  completedTitle: {
    fontSize: Typography.title3.fontSize,
    fontWeight: Typography.medium,
    color: Colors.neutral2,
    letterSpacing: Typography.title3.letterSpacing,
  },
  completedDesc: {
    fontSize: Typography.callout.fontSize,
    color: Colors.neutral3,
    textAlign: 'center',
    lineHeight: 22,
    letterSpacing: Typography.callout.letterSpacing,
  },
})
