import { useState } from 'react'
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
import { RootStackParamList, Question } from '../types'
import { mockAssessments } from '../mocks/assessments'
import { Colors, Typography, Radii, Shadows } from '../theme'
import SubmitButtonSvg from '../../assets/icon-submit-button.svg'
import HamburgerSvg from '../../assets/icon-hamburger.svg'
import PageSvg from '../../assets/icon-page.svg'

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AssessmentDetail'>
  route: RouteProp<RootStackParamList, 'AssessmentDetail'>
}

type Answers = Record<string, string | string[]>

/* ── Radio / checkbox option — matches original assessments project ───── */
import Svg, { Path } from 'react-native-svg'

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

/* ── Single question card ─────────────────────────────────────────────── */
function QuestionCard({
  question,
  index,
  answer,
  setAnswer,
  onNext,
}: {
  question: Question
  index: number
  answer: string | string[] | undefined
  setAnswer: (val: string | string[]) => void
  onNext?: () => void
}) {
  const needsNextBtn = question.type === 'multi_choice' || question.type === 'text' || question.type === 'date'
  const hasAnswer = (() => {
    if (question.type === 'multi_choice') return Array.isArray(answer) && answer.length > 0
    if (question.type === 'text' || question.type === 'date') return typeof answer === 'string' && answer.trim().length > 0
    return !!answer
  })()
  const nextEnabled = !question.required || hasAnswer

  return (
    <View style={qcard.wrap}>
      {/* Question text with number + required asterisk */}
      <Text style={qcard.questionText}>
        {index + 1}.{'  '}{question.text}
        {question.required && <Text style={qcard.asterisk}> *</Text>}
      </Text>

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

      {/* Next button for multi-select, text, and date */}
      {needsNextBtn && onNext && (
        <TouchableOpacity
          style={[qcard.nextBtn, !nextEnabled && qcard.nextBtnDisabled]}
          onPress={nextEnabled ? onNext : undefined}
          activeOpacity={nextEnabled ? 0.85 : 1}
        >
          <Text style={[qcard.nextBtnText, !nextEnabled && qcard.nextBtnTextDisabled]}>Next</Text>
        </TouchableOpacity>
      )}
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
  const [answers, setAnswers] = useState<Answers>({})
  const [menuVisible, setMenuVisible] = useState(false)
  const [sideMenuVisible, setSideMenuVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)

  if (!assessment) return null

  /* Already completed */
  if (assessment.status === 'completed') {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.bgPrimary} />
        <View style={styles.navHeader}>
          <TouchableOpacity style={styles.navBack} onPress={() => navigation.goBack()}>
            <Text style={styles.navBackText}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.navTitle}>Check-In</Text>
          <View style={styles.navHelp}>
            <Text style={styles.navHelpText}>?</Text>
          </View>
        </View>
        <View style={styles.completedWrap}>
          <Text style={styles.completedIcon}>✓</Text>
          <Text style={styles.completedTitle}>Already Completed</Text>
          <Text style={styles.completedDesc}>
            You completed this assessment on{' '}
            {assessment.completedDate
              ? new Date(assessment.completedDate).toLocaleDateString('en-US', {
                  month: 'long', day: 'numeric', year: 'numeric',
                })
              : 'a previous date'}.
          </Text>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.primaryBtnText}>Back to Check-Ins</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  // Use pages if available, otherwise wrap flat questions into a single page
  const pages = assessment.pages && assessment.pages.length > 0
    ? assessment.pages
    : [{ questions: assessment.questions }]

  // Get visible questions for each page (apply skip logic)
  const getVisibleQuestions = (pageQuestions: typeof assessment.questions) =>
    pageQuestions.filter(q => {
      if (!q.showIf) return true
      const depAnswer = answers[q.showIf.questionId]
      if (typeof depAnswer === 'string') return q.showIf.values.includes(depAnswer)
      return false
    })

  const currentPageQuestions = getVisibleQuestions(pages[currentPage]?.questions ?? [])

  // All visible questions across all pages
  const allVisibleQuestions = pages.flatMap(p => getVisibleQuestions(p.questions))

  const answeredCount = allVisibleQuestions.filter(q => {
    const a = answers[q.id]
    if (q.type === 'multi_choice') return Array.isArray(a) && a.length > 0
    return !!a
  }).length

  // Check if a page is complete (all required questions answered)
  const isPageComplete = (pageIndex: number) => {
    const visible = getVisibleQuestions(pages[pageIndex]?.questions ?? [])
    return visible.every(q => {
      if (!q.required) return true
      const a = answers[q.id]
      if (q.type === 'multi_choice') return Array.isArray(a) && a.length > 0
      return !!a
    })
  }

  // Check if a page has any answers
  const isPageInProgress = (pageIndex: number) => {
    const visible = getVisibleQuestions(pages[pageIndex]?.questions ?? [])
    return visible.some(q => {
      const a = answers[q.id]
      if (q.type === 'multi_choice') return Array.isArray(a) && a.length > 0
      return !!a
    })
  }

  const [submitError, setSubmitError] = useState('')

  const handleSubmit = () => {
    const unanswered = allVisibleQuestions.filter(q => {
      if (!q.required) return false
      const a = answers[q.id]
      if (q.type === 'multi_choice') return !Array.isArray(a) || a.length === 0
      return !a
    })
    if (unanswered.length > 0) {
      setSubmitError(`Please answer all required questions (${unanswered.length} remaining).`)
      return
    }
    setSubmitError('')
    navigation.replace('AssessmentList', { completedAssessmentId: assessment.id })
  }

  const goToNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handleSetAnswer = (questionId: string, val: string | string[]) => {
    setAnswers(prev => ({ ...prev, [questionId]: val }))
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.bgPrimary} />

      {/* Light nav header */}
      <View style={styles.navHeader}>
        <TouchableOpacity style={styles.navBack} onPress={() => navigation.goBack()}>
          <Text style={styles.navBackText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>Check-In</Text>
        <View style={styles.navHelp}>
          <Text style={styles.navHelpText}>?</Text>
        </View>
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
                      <View style={[styles.sideProgressRing, inProgress && styles.sideProgressRingActive]}>
                        <Text style={styles.sidePageNum}>{i + 1}</Text>
                      </View>
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
        <View style={styles.subHeaderLeft}>
          <TouchableOpacity onPress={() => setSideMenuVisible(true)} activeOpacity={0.7}>
            <HamburgerSvg width={24} height={20} color={Colors.brandSecondary} />
          </TouchableOpacity>
          <PageSvg width={20} height={20} color={Colors.neutral2} />
          <Text style={styles.subHeaderText}>
            Page {currentPage + 1} of {pages.length}
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => setMenuVisible(true)} activeOpacity={0.85}>
            <SubmitButtonSvg width={149} height={51} />
          </TouchableOpacity>
          <Modal visible={menuVisible} transparent animationType="fade" onRequestClose={() => setMenuVisible(false)}>
            <Pressable style={styles.menuOverlay} onPress={() => setMenuVisible(false)}>
              <Pressable style={styles.menuDropdown} onPress={e => e.stopPropagation()}>
                <TouchableOpacity style={styles.menuItem} onPress={() => { setMenuVisible(false); setTimeout(handleSubmit, 100) }} activeOpacity={0.7}>
                  <Text style={styles.menuItemText}>Submit</Text>
                </TouchableOpacity>
                <View style={styles.menuDivider} />
                <TouchableOpacity style={styles.menuItem} onPress={() => { setMenuVisible(false); setTimeout(() => navigation.goBack(), 100) }} activeOpacity={0.7}>
                  <Text style={styles.menuItemText}>Save and Close</Text>
                </TouchableOpacity>
              </Pressable>
            </Pressable>
          </Modal>
        </View>
      </View>

      {/* Error banner */}
      {submitError !== '' && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorBannerText}>{submitError}</Text>
        </View>
      )}

      {/* Current page — all questions on this page */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {pages[currentPage]?.title && (
          <Text style={styles.pageHeading}>{pages[currentPage].title}</Text>
        )}

        {currentPageQuestions.map((q, i) => (
          <QuestionCard
            key={q.id}
            question={q}
            index={i}
            answer={answers[q.id]}
            setAnswer={val => handleSetAnswer(q.id, val)}
            onNext={() => {}}
          />
        ))}

        {/* Page navigation buttons */}
        <View style={styles.pageNav}>
          {currentPage > 0 && (
            <TouchableOpacity
              style={styles.pageNavBtn}
              onPress={() => setCurrentPage(currentPage - 1)}
              activeOpacity={0.75}
            >
              <Text style={styles.pageNavBtnText}>Previous</Text>
            </TouchableOpacity>
          )}
          <View style={{ flex: 1 }} />
          {currentPage < pages.length - 1 ? (
            <TouchableOpacity
              style={[styles.pageNavBtn, styles.pageNavBtnPrimary]}
              onPress={goToNextPage}
              activeOpacity={0.75}
            >
              <Text style={styles.pageNavBtnTextPrimary}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.pageNavBtn, styles.pageNavBtnPrimary]}
              onPress={handleSubmit}
              activeOpacity={0.75}
            >
              <Text style={styles.pageNavBtnTextPrimary}>Submit</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
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
    fontSize: Typography.body.fontSize,
    fontWeight: Typography.regular,
    color: Colors.neutral2,
    letterSpacing: -0.32,
  },
  navHelp: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: Colors.neutral3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navHelpText: {
    fontSize: Typography.subheadline.fontSize,
    color: Colors.neutral3,
    fontWeight: Typography.medium,
  },

  // Sub-header bar
  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: Colors.bgPrimary,
  },
  subHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
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
  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 140,
    paddingRight: 16,
  },
  menuDropdown: {
    backgroundColor: Colors.white,
    borderRadius: Radii.card,
    minWidth: 180,
    ...Shadows.modal,
    overflow: 'hidden',
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
  sideProgressRing: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: Colors.bgSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  sideProgressRingActive: {
    borderColor: Colors.brandSecondary,
  },
  sidePageNum: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.neutral3,
  },

  // Page heading
  pageHeading: {
    fontSize: 18,
    fontWeight: Typography.medium,
    color: Colors.brandPrimary,
    marginBottom: 16,
  },

  // Page navigation
  pageNav: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  pageNavBtn: {
    borderWidth: 1,
    borderColor: Colors.brandSecondary,
    borderRadius: Radii.button,
    height: 44,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageNavBtnPrimary: {
    backgroundColor: Colors.brandSecondary,
    borderColor: Colors.brandSecondary,
  },
  pageNavBtnText: {
    fontSize: 15,
    fontWeight: Typography.medium,
    color: Colors.brandSecondary,
  },
  pageNavBtnTextPrimary: {
    fontSize: 15,
    fontWeight: Typography.medium,
    color: Colors.white,
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
