import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../types'
import { mockAssessments } from '../mocks/assessments'
import { Colors, Typography, Radii, Shadows } from '../theme'

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AssessmentComplete'>
  route: RouteProp<RootStackParamList, 'AssessmentComplete'>
}

export function AssessmentCompleteScreen({ navigation, route }: Props) {
  const { assessmentId, score, scoreLabel } = route.params
  const assessment = mockAssessments.find(a => a.id === assessmentId)
  const hasScore = score !== undefined

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.brandPrimary} />

      {/* Teal header */}
      <View style={styles.navHeader}>
        <View style={styles.navSpacer} />
        <Text style={styles.navTitle}>{assessment?.title}</Text>
        <View style={styles.navSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Success circle */}
        <View style={styles.successCircle}>
          <Text style={styles.successIcon}>✓</Text>
        </View>

        <Text style={styles.heading}>Thank you!</Text>
        <Text style={styles.subtext}>
          Your <Text style={styles.bold}>{assessment?.title}</Text> has been submitted.
        </Text>

        {/* Score card */}
        {hasScore && (
          <View style={styles.scoreCard}>
            <Text style={styles.scoreCardLabel}>Your Score</Text>
            <Text style={styles.scoreNumber}>{score}</Text>
            {scoreLabel && (
              <Text style={styles.scoreLabel}>{scoreLabel}</Text>
            )}
          </View>
        )}

        {/* What's next */}
        <View style={styles.nextCard}>
          <Text style={styles.nextTitle}>What happens next</Text>
          {[
            'Your responses have been shared with your care team.',
            `${mockAssessments[0]?.title ? 'Your care manager' : 'Your care manager'} will review your answers within 2 business days.`,
            'You may be contacted to discuss your results or any follow-up care.',
          ].map((step, i) => (
            <View key={i} style={styles.stepRow}>
              <View style={styles.stepDot} />
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>

        {/* Primary pill CTA */}
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => navigation.replace('AssessmentList', { completedAssessmentId: assessmentId })}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryBtnText}>Back to Check-Ins</Text>
        </TouchableOpacity>

        {/* Secondary outlined */}
        <TouchableOpacity style={styles.secondaryBtn} activeOpacity={0.85}>
          <Text style={styles.secondaryBtnText}>Share Results</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe:    { flex: 1, backgroundColor: Colors.bgPrimary },

  navHeader: {
    backgroundColor: Colors.brandPrimary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  navSpacer: { width: 32 },
  navTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: Typography.body.fontSize,
    fontWeight: Typography.medium,
    color: Colors.white,
    letterSpacing: -0.32,
  },

  container: {
    padding: 24,
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 40,
  },

  // Success
  successCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.brandTint,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: Colors.brandSecondary,
  },
  successIcon: {
    fontSize: 36,
    color: Colors.brandPrimary,
    fontWeight: Typography.bold,
  },

  heading: {
    fontSize: Typography.title1.fontSize,
    fontWeight: Typography.medium,
    color: Colors.neutral1,
    marginBottom: 10,
    letterSpacing: 0,
  },
  subtext: {
    fontSize: Typography.callout.fontSize,
    color: Colors.neutral3,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
    letterSpacing: Typography.callout.letterSpacing,
  },
  bold: { color: Colors.neutral2, fontWeight: Typography.medium },

  // Score card
  scoreCard: {
    backgroundColor: Colors.white,
    borderRadius: Radii.card,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    ...Shadows.card,
  },
  scoreCardLabel: {
    fontSize: Typography.caption1.fontSize,
    fontWeight: Typography.medium,
    color: Colors.brandPrimary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  scoreNumber: {
    fontSize: Typography.xlNumber.fontSize,
    fontWeight: Typography.light,
    color: Colors.brandShade1,
    lineHeight: Typography.xlNumber.lineHeight,
  },
  scoreLabel: {
    fontSize: Typography.subheadline.fontSize,
    color: Colors.neutral3,
    marginTop: 4,
    letterSpacing: Typography.subheadline.letterSpacing,
  },

  // Next steps card
  nextCard: {
    backgroundColor: Colors.white,
    borderRadius: Radii.card,
    padding: 20,
    width: '100%',
    marginBottom: 28,
    ...Shadows.card,
  },
  nextTitle: {
    fontSize: Typography.callout.fontSize,
    fontWeight: Typography.medium,
    color: Colors.neutral2,
    marginBottom: 14,
    letterSpacing: Typography.callout.letterSpacing,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 10,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.brandSecondary,
    marginTop: 7,
    flexShrink: 0,
  },
  stepText: {
    fontSize: Typography.footnote.fontSize,
    color: Colors.neutral3,
    lineHeight: 20,
    flex: 1,
    letterSpacing: Typography.footnote.letterSpacing,
  },

  // Pill buttons
  primaryBtn: {
    backgroundColor: Colors.brandSecondary,
    borderRadius: Radii.button,
    height: 51,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    marginBottom: 12,
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
  secondaryBtn: {
    borderWidth: 1,
    borderColor: Colors.brandSecondary,
    borderRadius: Radii.button,
    height: 51,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  secondaryBtnText: {
    color: Colors.brandSecondary,
    fontSize: Typography.callout.fontSize,
    fontWeight: Typography.medium,
    letterSpacing: Typography.callout.letterSpacing,
  },
})
