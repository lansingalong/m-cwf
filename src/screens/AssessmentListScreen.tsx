import { useState, useEffect } from 'react'
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
import { Colors, Typography, Radii } from '../theme'
import ChecklistIcon   from '../../assets/tab-checklist.svg'
import ProgressIcon    from '../../assets/tab-progress.svg'
import ChatIcon        from '../../assets/tab-chat.svg'
import ResourcesIcon   from '../../assets/tab-resources.svg'
import ProfileIcon     from '../../assets/tab-profile.svg'
import StepCountSvg   from '../../assets/icon-stepcount.svg'
import ReminderSvg    from '../../assets/icon-reminder.svg'
import CheckInSvg     from '../../assets/icon-checkin.svg'
import CareProgramSvg from '../../assets/icon-careprogram.svg'
import ArticleSvg     from '../../assets/icon-article.svg'
import MedicationSvg  from '../../assets/icon-medication.svg'
import BatterySvg     from '../../assets/icon-battery.svg'
import WifiSvg        from '../../assets/icon-wifi.svg'
import SignalSvg      from '../../assets/icon-signal.svg'
import AddCircleSvg   from '../../assets/icon-add-circle.svg'
import ChevronSvg     from '../../assets/icon-chevron.svg'
import CompleteSvg    from '../../assets/icon-complete.svg'

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AssessmentList'>
  route: RouteProp<RootStackParamList, 'AssessmentList'>
}

/* ── Mock iOS status bar ──────────────────────────────────────────────── */
function MockStatusBar() {
  return (
    <View style={sb.bar}>
      <Text style={sb.time}>9:41</Text>
      <View style={sb.right}>
        <SignalSvg width={18} height={12} color={Colors.neutral1} />
        <WifiSvg width={17} height={12} color={Colors.neutral1} />
        <BatterySvg width={28} height={13} color={Colors.neutral1} />
      </View>
    </View>
  )
}
const sb = StyleSheet.create({
  bar:         { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 6, marginTop: 16, marginBottom: 12, backgroundColor: Colors.bgPrimary },
  time:        { fontSize: 15, fontWeight: '600', color: Colors.neutral1, letterSpacing: 0.2 },
  right:       { flexDirection: 'row', alignItems: 'center', gap: 6 },
})

/* ─────────────────────────────────────────────────────────────────────────
   SHARED: wf-card base + care tag
───────────────────────────────────────────────────────────────────────── */

// Care tag — .care-tag from wellframe-mobile-library
function CareTag({ label, muted }: { label: string; muted?: boolean }) {
  return (
    <View style={ct.wrap}>
      <CareProgramSvg width={12} height={12} color={muted ? Colors.neutral4 : Colors.brandPrimary} />
      <Text style={[ct.text, muted && ct.textMuted]}>{label}</Text>
    </View>
  )
}
const ct = StyleSheet.create({
  wrap:     { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#F0F4F5', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 6, alignSelf: 'flex-start' },
  text:     { fontSize: 11, lineHeight: 13, color: Colors.neutral3, fontWeight: Typography.medium, letterSpacing: 0.06 },
  textMuted:{ color: Colors.neutral4 },
})

/* ─────────────────────────────────────────────────────────────────────────
   1. STEP COUNT CARD — .step-card from wellframe-mobile-library
      Header: icon + title + chevron. Progress bar flush to bottom.
───────────────────────────────────────────────────────────────────────── */
function StepCountCard() {
  return (
    <View style={sc.card}>
      <View style={sc.header}>
        <StepCountSvg width={22} height={22} color={Colors.brandSecondary} />
        <Text style={sc.title}>Step Count</Text>
        <ChevronSvg width={15} height={24} color={Colors.neutral2} />
      </View>
      {/* .step-progress-bar: gradient, flush to bottom */}
      <View style={sc.progressTrack}>
        <View style={[sc.progressFill, { width: '41%' }]} />
      </View>
    </View>
  )
}
const sc = StyleSheet.create({
  card:          { backgroundColor: Colors.white, borderRadius: 10, overflow: 'hidden', marginBottom: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.18, shadowRadius: 4, elevation: 3 },
  header:        { flexDirection: 'row', alignItems: 'center', gap: 12, paddingLeft: 20, paddingRight: 14, paddingVertical: 14 },
  icon:          { fontSize: 22, color: Colors.brandSecondary },
  title:         { flex: 1, fontSize: 16, lineHeight: 21, color: Colors.neutral2, letterSpacing: -0.32 },
  progressTrack: { height: 8, backgroundColor: Colors.bgSecondary, borderBottomLeftRadius: 4, borderBottomRightRadius: 4, overflow: 'hidden' },
  progressFill:  { height: '100%', backgroundColor: Colors.brandSecondary, borderBottomLeftRadius: 4, borderBottomRightRadius: 4 },
})

/* ─────────────────────────────────────────────────────────────────────────
   2. TASK CARD — .task-card from wellframe-mobile-library
      Supports: Reminder, Check-In, Medication, Article (completed)
───────────────────────────────────────────────────────────────────────── */
type TaskCardProps = {
  IconComponent: React.FC<{ width: number; height: number; color: string }>
  typeLabel: string
  title: string
  tag?: string
  completed?: boolean
  onPress?: () => void
}
function TaskCard({ IconComponent, typeLabel, title, tag, completed, onPress }: TaskCardProps) {
  const iconColor = completed ? Colors.brandTint : Colors.brandSecondary
  return (
    <TouchableOpacity style={[tk.card, completed && tk.cardCompleted]} onPress={onPress} activeOpacity={0.75}>
      {/* .task-header: icon + type label */}
      <View style={tk.header}>
        <IconComponent width={22} height={22} color={iconColor} />
        <Text style={[tk.typeLabel, completed && tk.mutedBlue]}>{typeLabel}</Text>
      </View>
      {/* .task-main: title + chevron/checkmark */}
      <View style={tk.main}>
        <Text style={[tk.title, completed && tk.titleMuted]} numberOfLines={2}>{title}</Text>
        {completed
          ? <CompleteSvg width={22} height={22} />
          : <ChevronSvg width={15} height={24} color={Colors.neutral2} />
        }
      </View>
      {/* .care-tag */}
      {tag && <CareTag label={tag} muted={completed} />}
    </TouchableOpacity>
  )
}
const tk = StyleSheet.create({
  card:          { backgroundColor: Colors.white, borderRadius: 10, padding: 14, marginBottom: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.18, shadowRadius: 4, elevation: 3, gap: 10 },
  cardCompleted: { opacity: 0.5 },
  header:        { flexDirection: 'row', alignItems: 'center', gap: 10 },
  typeLabel:     { fontSize: 15, lineHeight: 20, color: Colors.brandPrimary, fontWeight: Typography.regular, letterSpacing: -0.24 },
  mutedBlue:     { color: Colors.brandTint },
  main:          { flexDirection: 'row', alignItems: 'center', gap: 8 },
  title:         { flex: 1, fontSize: 16, lineHeight: 21, color: Colors.neutral2, letterSpacing: -0.32 },
  titleMuted:    { color: Colors.neutral3 },
})

/* ─────────────────────────────────────────────────────────────────────────
   3. SURVEY CARD — .survey-card from wellframe-mobile-library
      Georgia serif question, radio options, teal submit button
───────────────────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────────────────────
   MAIN SCREEN
───────────────────────────────────────────────────────────────────────── */
export function AssessmentListScreen({ navigation, route }: Props) {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    const id = route.params?.completedAssessmentId
    if (id) setCompletedIds(prev => new Set(prev).add(id))
  }, [route.params?.completedAssessmentId])

  const hraCompleted = completedIds.has('hra')

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.bgPrimary} />
      <MockStatusBar />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Large page title */}
        <Text style={styles.pageTitle}>Checklist</Text>

        {/* ── Today section ── */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Today</Text>
          <TouchableOpacity style={styles.addBtn} activeOpacity={0.8}>
            <AddCircleSvg width={18} height={18} color={Colors.brandSecondary} />
            <Text style={styles.addBtnText}>Add</Text>
          </TouchableOpacity>
        </View>

        {/* Step Count — .step-card */}
        <StepCountCard />

        {/* Reminder — .task-card */}
        <TaskCard
          IconComponent={ReminderSvg}
          typeLabel="Reminder"
          title="10:00 AM: Take a walk"
        />

        {/* Check-In — .task-card with care tag (only in Today if not completed) */}
        {!hraCompleted && (
          <TaskCard
            IconComponent={CheckInSvg}
            typeLabel="Check-In"
            title="Health Risk Assessment"
            tag="Digital Intake Assessment"
            onPress={() => navigation.navigate('AssessmentDetail', { assessmentId: 'hra' })}
          />
        )}

        {/* ── Complete section ── */}
        <View style={[styles.sectionRow, { marginTop: 14 }]}>
          <Text style={styles.sectionTitle}>Complete</Text>
        </View>

        {/* HRA — completed (moves here after submission) */}
        {hraCompleted && (
          <TaskCard
            IconComponent={CheckInSvg}
            typeLabel="Check-In"
            title="Health Risk Assessment"
            tag="Digital Intake Assessment"
            completed
          />
        )}

        {/* Medication — completed task card */}
        <TaskCard
          IconComponent={MedicationSvg}
          typeLabel="Medication"
          title="10:00 AM: Take Claritin"
          completed
        />

        {/* Article — completed task card with care tag */}
        <TaskCard
          IconComponent={ArticleSvg}
          typeLabel="Article"
          title="About Diabetes Medications"
          tag="Diabetes Management"
          completed
        />

      </ScrollView>

      {/* Bottom tab bar */}
      <View style={styles.tabBar}>
        <View style={styles.tabItem}>
          <ChecklistIcon width={24} height={24} color={Colors.brandPrimary} />
          <Text style={[styles.tabLabel, styles.tabActive]}>Checklist</Text>
        </View>
        <View style={styles.tabItem}>
          <ProgressIcon width={24} height={24} color={Colors.neutral3} />
          <Text style={styles.tabLabel}>Progress</Text>
        </View>
        <View style={styles.tabItem}>
          <ChatIcon width={24} height={24} color={Colors.neutral3} />
          <Text style={styles.tabLabel}>Chat</Text>
        </View>
        <View style={styles.tabItem}>
          <ResourcesIcon width={24} height={24} color={Colors.neutral3} />
          <Text style={styles.tabLabel}>Resources</Text>
        </View>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Profile')} activeOpacity={0.75}>
          <ProfileIcon width={24} height={24} color={Colors.neutral3} />
          <Text style={styles.tabLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe:    { flex: 1, backgroundColor: Colors.bgPrimary },
  scroll:  { flex: 1 },
  content: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 32 },

  pageTitle: { fontFamily: 'Merriweather-Regular', fontSize: 24, color: Colors.neutral1, marginBottom: 24, letterSpacing: 0.37 },

  sectionRow:   { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  sectionTitle: { fontSize: 20, fontWeight: Typography.regular, color: Colors.neutral1, letterSpacing: 0.2 },

  addBtn:     { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: Colors.white, borderRadius: Radii.button, paddingHorizontal: 16, paddingVertical: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.18, shadowRadius: 4, elevation: 3 },
  addBtnText: { fontSize: 15, color: Colors.brandSecondary, fontWeight: Typography.medium, letterSpacing: -0.24 },

  tabBar:   { flexDirection: 'row', backgroundColor: Colors.white, borderTopWidth: 1, borderTopColor: Colors.bgSecondary, paddingBottom: 28, paddingTop: 8 },
  tabItem:  { flex: 1, alignItems: 'center', gap: 3 },
  tabLabel: { fontSize: Typography.navigation.fontSize, color: Colors.neutral3, letterSpacing: Typography.navigation.letterSpacing },
  tabActive:{ color: Colors.brandPrimary },
})
