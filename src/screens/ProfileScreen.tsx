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
import { RootStackParamList } from '../types'
import { Colors, Typography, Radii, Shadows } from '../theme'
import ChecklistIcon  from '../../assets/tab-checklist.svg'
import ProgressIcon   from '../../assets/tab-progress.svg'
import ChatIcon       from '../../assets/tab-chat.svg'
import ResourcesIcon  from '../../assets/tab-resources.svg'
import ProfileIcon    from '../../assets/tab-profile.svg'
import CareProgramSvg from '../../assets/icon-careprogram.svg'
import MedicationSvg  from '../../assets/icon-medication.svg'
import ReminderAlarmSvg from '../../assets/icons/reminderalarm.svg'
import SettingsIcon   from '../../assets/icon-settings.svg'
import BatterySvg     from '../../assets/icon-battery.svg'
import WifiSvg        from '../../assets/icon-wifi.svg'
import SignalSvg      from '../../assets/icon-signal.svg'
import AddCircleSvg from '../../assets/icon-add-circle.svg'
import DiabetesIllustration from '../../assets/illustrations/iOS/diabetesmanagement.svg'
import CardiacRehabIllustration from '../../assets/illustrations/iOS/cardiacrehab.svg'

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'>
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
  bar:         { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 6, marginTop: 16, marginBottom: 12 },
  time:        { fontSize: 15, fontWeight: '600', color: Colors.neutral1, letterSpacing: 0.2 },
  right:       { flexDirection: 'row', alignItems: 'center', gap: 6 },
})

/* ─────────────────────────────────────────────────────────────────────────
   AVATAR
───────────────────────────────────────────────────────────────────────── */
function Avatar({ initials }: { initials: string }) {
  return (
    <View style={av.circle}>
      <Text style={av.text}>{initials}</Text>
    </View>
  )
}
const av = StyleSheet.create({
  circle: { width: 52, height: 52, borderRadius: 26, backgroundColor: Colors.brandPrimary, alignItems: 'center', justifyContent: 'center' },
  text:   { fontSize: 18, fontWeight: Typography.bold, color: Colors.white, letterSpacing: 0.5 },
})

/* ─────────────────────────────────────────────────────────────────────────
   CARE PROGRAM CARD — compact thumbnail for horizontal scroll
   .cp-card from wellframe-mobile-library (adapted for React Native)
───────────────────────────────────────────────────────────────────────── */
type CareProgramCardProps = {
  title: string
  accent: string
  Illustration: React.FC<{ width: number; height: number }>
}
function CareProgramCard({ title, accent, Illustration }: CareProgramCardProps) {
  return (
    <View style={cp.card}>
      <View style={cp.top}>
        <CareProgramSvg width={28} height={28} color={Colors.brandSecondary} />
        <Text style={cp.title} numberOfLines={2}>{title}</Text>
      </View>
      <View style={[cp.bottom, { backgroundColor: accent }]}>
        <View style={cp.illustrationWrap}>
          <Illustration width={65} height={57} />
        </View>
      </View>
    </View>
  )
}
const cp = StyleSheet.create({
  card:   { width: 170, height: 210, backgroundColor: Colors.white, borderRadius: Radii.card, overflow: 'hidden', marginRight: 12, ...Shadows.card },
  top:    { flex: 1, padding: 16, justifyContent: 'space-between' },
  title:  { fontSize: 16, fontWeight: '500', color: Colors.neutral1, lineHeight: 21, letterSpacing: -0.32 },
  bottom: { height: 65 },
  illustrationWrap: { position: 'absolute', bottom: 0, right: 4 },
})

/* ─────────────────────────────────────────────────────────────────────────
   ADD ROW — "+ Add …" button card
───────────────────────────────────────────────────────────────────────── */
function AddRow({ label }: { label: string }) {
  return (
    <TouchableOpacity style={add.row} activeOpacity={0.75}>
      <AddCircleSvg width={22} height={22} color={Colors.brandSecondary} />
      <Text style={add.label}>{label}</Text>
    </TouchableOpacity>
  )
}
const add = StyleSheet.create({
  row:    { backgroundColor: Colors.white, borderRadius: Radii.card, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10, ...Shadows.card },
  label:  { fontSize: 15, color: Colors.brandSecondary, fontWeight: Typography.medium, letterSpacing: -0.24 },
})

/* ─────────────────────────────────────────────────────────────────────────
   LIST ROW — medication or reminder item row
───────────────────────────────────────────────────────────────────────── */
type ListRowProps = {
  showIcon?: boolean
  name: string
  schedule: string
  note?: string
  noteIsNew?: boolean
  last?: boolean
}
function ListRow({ showIcon, name, schedule, note, noteIsNew, last }: ListRowProps) {
  return (
    <View style={[lr.row, !last && lr.divider]}>
      {showIcon && <MedicationSvg width={20} height={20} color={Colors.brandSecondary} />}
      {!showIcon && <View style={lr.iconSpacer} />}
      <View style={lr.body}>
        <Text style={lr.name}>{name}</Text>
        <Text style={lr.schedule}>{schedule}</Text>
        {note && <Text style={[lr.note, noteIsNew && lr.noteNew]}>{note}</Text>}
      </View>
      <ReminderAlarmSvg width={22} height={20} color={Colors.neutral5} />
    </View>
  )
}
const lr = StyleSheet.create({
  row:       { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 16, gap: 12 },
  divider:   { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: Colors.bgSecondary },
  iconSpacer:{ width: 20 },
  body:      { flex: 1, gap: 2 },
  name:      { fontSize: 15, fontWeight: Typography.medium, color: Colors.neutral2, letterSpacing: -0.24 },
  schedule:  { fontSize: 13, color: Colors.neutral3, letterSpacing: -0.078 },
  note:      { fontSize: 12, color: Colors.neutral3, fontStyle: 'italic', marginTop: 1 },
  noteNew:   { color: Colors.brandSecondary, fontStyle: 'normal' },
})

/* ─────────────────────────────────────────────────────────────────────────
   LIST CARD — white shadow container for list rows
   .wf-card from wellframe-mobile-library
───────────────────────────────────────────────────────────────────────── */
function ListCard({ children }: { children: React.ReactNode }) {
  return <View style={lc.card}>{children}</View>
}
const lc = StyleSheet.create({
  card: { backgroundColor: Colors.white, borderRadius: Radii.card, overflow: 'hidden', marginBottom: 10, ...Shadows.card },
})

/* ─────────────────────────────────────────────────────────────────────────
   SECTION HEADER
───────────────────────────────────────────────────────────────────────── */
function SectionHeader({ label, info }: { label: string; info?: boolean }) {
  return (
    <View style={sh.row}>
      <Text style={sh.label}>{label}</Text>
      {info && <Text style={sh.info}>ⓘ</Text>}
    </View>
  )
}
const sh = StyleSheet.create({
  row:   { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12, marginTop: 20 },
  label: { fontSize: 20, fontWeight: Typography.regular, color: Colors.neutral1, letterSpacing: 0.2 },
  info:  { fontSize: 16, color: Colors.brandSecondary },
})

/* ─────────────────────────────────────────────────────────────────────────
   MAIN SCREEN
───────────────────────────────────────────────────────────────────────── */
export function ProfileScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

      {/* White header section */}
      <View style={styles.header}>
        <MockStatusBar />
        <View style={styles.titleRow}>
          <Text style={styles.pageTitle}>Profile</Text>
          <TouchableOpacity style={styles.gearBtn} activeOpacity={0.75}>
            <SettingsIcon width={24} height={24} color={Colors.neutral2} />
          </TouchableOpacity>
        </View>
        <View style={styles.userRow}>
          <Avatar initials="JT" />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Jackson Thomas</Text>
            <Text style={styles.userDay}>Day 103 on Wellframe</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Enrolled Care Programs */}
        <SectionHeader label="Enrolled Care Programs" info />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.cpScroll}
          contentContainerStyle={styles.cpContent}
        >
          <CareProgramCard title="Diabetes Management"   accent="#D8EDF5" Illustration={DiabetesIllustration} />
          <CareProgramCard title="Cardiac Rehab Support" accent="#FDE3EB" Illustration={CardiacRehabIllustration} />
        </ScrollView>

        {/* Medication List */}
        <SectionHeader label="Medication List" />
        <AddRow label="Add Medication" />
        <ListCard><ListRow showIcon name="Gabapentin"     schedule="Take daily, at 9:00AM"                   note="New Medication- Starting tomorrow" noteIsNew last /></ListCard>
        <ListCard><ListRow showIcon name="Metformin"      schedule="Take daily, at 9:00AM" last /></ListCard>
        <ListCard><ListRow showIcon name="Claritin"       schedule="Take daily, at 9:00AM" last /></ListCard>
        <ListCard><ListRow showIcon name="Levothyroxine"  schedule="Take daily, at 9:00AM" last /></ListCard>
        <ListCard><ListRow showIcon name="Methotrexate"   schedule="Take weekly on Mondays, at 9:00AM" last /></ListCard>
        <TouchableOpacity style={styles.loadMore} activeOpacity={0.75}>
          <Text style={styles.loadMoreText}>Load more</Text>
        </TouchableOpacity>

        {/* Health Reminders */}
        <SectionHeader label="Health Reminders" />
        <AddRow label="Add Reminder" />
        <ListCard><ListRow name="Take a walk"                schedule="Daily, at 9:00AM"              note="Walk for at least 30 minutes" last /></ListCard>
        <ListCard><ListRow name="Endocrinology appointment"  schedule="January 15, 2024 at 8:00AM" last /></ListCard>
        <ListCard><ListRow name="Rheumatology appointment"   schedule="February 10, 2024 at 3:30PM" last /></ListCard>

      </ScrollView>

      {/* Bottom tab bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AssessmentList')} activeOpacity={0.75}>
          <ChecklistIcon width={24} height={24} color={Colors.neutral3} />
          <Text style={styles.tabLabel}>Checklist</Text>
        </TouchableOpacity>
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
        <View style={styles.tabItem}>
          <ProfileIcon width={24} height={24} color={Colors.brandPrimary} />
          <Text style={[styles.tabLabel, styles.tabActive]}>Profile</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe:    { flex: 1, backgroundColor: Colors.bgPrimary },
  scroll:  { flex: 1 },
  content: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 32 },

  header:    { backgroundColor: Colors.white, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: Colors.bgSecondary, paddingBottom: 16 },
  titleRow:  { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 12 },
  pageTitle: { fontFamily: 'Merriweather-Regular', fontSize: 24, color: Colors.neutral1, letterSpacing: 0.37 },
  gearBtn:   { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },

  userRow:  { flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 20 },
  userInfo: { flex: 1 },
  userName: { fontSize: 20, fontWeight: '500', color: Colors.neutral2, letterSpacing: -0.4 },
  userDay:  { fontSize: 13, color: Colors.neutral4, marginTop: 2, letterSpacing: -0.078 },

  cpScroll:   { marginHorizontal: -20, marginBottom: 4 },
  cpContent:  { paddingHorizontal: 20, paddingVertical: 4 },

  loadMore:     { alignItems: 'center', paddingVertical: 12, marginBottom: 4 },
  loadMoreText: { fontSize: 15, color: Colors.brandSecondary, fontWeight: Typography.medium, letterSpacing: -0.24 },

  tabBar:   { flexDirection: 'row', backgroundColor: Colors.white, borderTopWidth: 1, borderTopColor: Colors.bgSecondary, paddingBottom: 28, paddingTop: 8 },
  tabItem:  { flex: 1, alignItems: 'center', gap: 3 },
  tabLabel: { fontSize: Typography.navigation.fontSize, color: Colors.neutral3, letterSpacing: Typography.navigation.letterSpacing },
  tabActive:{ color: Colors.brandPrimary },
})
