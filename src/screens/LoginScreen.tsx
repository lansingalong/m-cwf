import { useState, useRef, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
  useWindowDimensions,
  Image,
} from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types'
import { Colors, Typography, Radii } from '../theme'
import ParkBackground from '../../assets/park-background.svg'
import BatterySvg     from '../../assets/icon-battery.svg'
import WifiSvg        from '../../assets/icon-wifi.svg'
import SignalSvg      from '../../assets/icon-signal.svg'

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>
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

/* ── Outlined iOS-style text field ───────────────────────────────────── */
function OutlinedField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  autoCapitalize,
  autoComplete,
  secureTextEntry,
  showToggle,
  onToggleSecure,
  returnKeyType,
  onSubmitEditing,
  autoFocus,
  inputRef,
}: {
  label?: string
  value: string
  onChangeText: (t: string) => void
  placeholder?: string
  keyboardType?: any
  autoCapitalize?: any
  autoComplete?: any
  secureTextEntry?: boolean
  showToggle?: boolean
  onToggleSecure?: () => void
  returnKeyType?: any
  onSubmitEditing?: () => void
  autoFocus?: boolean
  inputRef?: React.RefObject<TextInput>
}) {
  return (
    <View style={field.wrap}>
      {label ? <Text style={field.label}>{label}</Text> : null}
      <View style={field.row}>
        <TextInput
          ref={inputRef}
          style={field.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.neutral4}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize ?? 'none'}
          autoComplete={autoComplete}
          secureTextEntry={secureTextEntry}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          autoFocus={autoFocus}
        />
        {showToggle && (
          <TouchableOpacity onPress={onToggleSecure} style={field.toggle}>
            <Image
              source={require('../../assets/icon-eye-off.png')}
              style={[field.eyeIcon, !secureTextEntry && field.eyeIconActive]}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const field = StyleSheet.create({
  wrap: {
    borderWidth: 1,
    borderColor: Colors.neutral2,
    borderRadius: 2,
    height: 56,
    paddingHorizontal: 14,
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  label: {
    fontSize: Typography.caption1.fontSize,
    color: Colors.neutral3,
    lineHeight: 16,
  },
  row:    { flexDirection: 'row', alignItems: 'center' },
  input: {
    flex: 1,
    fontSize: Typography.callout.fontSize,
    color: Colors.neutral2,
    paddingVertical: 0,
    letterSpacing: Typography.callout.letterSpacing,
    outlineStyle: 'none' as any,
  },
  toggle: { padding: 4 },
  eyeIcon: { width: 22, height: 22, opacity: 0.5 },
  eyeIconActive: { opacity: 1 },
})


/* ── Main screen ─────────────────────────────────────────────────────── */
export function LoginScreen({ navigation }: Props) {
  const [step, setStep]           = useState<'email' | 'password'>('email')
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [showPass, setShowPass]   = useState(false)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')
  const passwordRef = useRef<TextInput>(null)
  const { width } = useWindowDimensions()
  // Image is 1233×916 — fill screen width and show full height
  const imgHeight = width * (916 / 1233)

  useEffect(() => {
    if (step === 'password') {
      setTimeout(() => passwordRef.current?.focus(), 100)
    }
  }, [step])

  const handleNext = () => {
    if (!email.trim()) { setError('Please enter your email address.'); return }
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!re.test(email)) { setError('Please enter a valid email address.'); return }
    setError('')
    setStep('password')
  }

  const handleLogin = async () => {
    if (!password.trim()) { setError('Please enter your password.'); return }
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    navigation.replace('AssessmentList')
  }

  const handleBack = () => {
    if (step === 'password') { setStep('email'); setError('') }
  }

  return (
    <View style={styles.bg}>
      {/* SVG background anchored to bottom */}
      <ParkBackground
        width={width}
        height={imgHeight}
        style={styles.bgSvg}
        preserveAspectRatio="xMidYMax slice"
      />
      <SafeAreaView style={styles.safe}>
        <MockStatusBar />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.flex}
        >
          {/* Back arrow — only on password step */}
          {step === 'password' && (
            <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
              <Text style={styles.backArrow}>‹</Text>
            </TouchableOpacity>
          )}

          {step === 'email' && (
            <View style={styles.backBtn} />
          )}

          {/* White card floating over background */}
          <View style={styles.card}>
            {step === 'email' ? (
              <>
                <Text style={styles.cardTitle}>Log In</Text>

                {!!error && <Text style={styles.errorText}>{error}</Text>}

                <OutlinedField
                  placeholder="Email Address"
                  value={email}
                  onChangeText={t => { setEmail(t); setError('') }}
                  keyboardType="email-address"
                  autoComplete="email"
                  returnKeyType="next"
                  onSubmitEditing={handleNext}
                  autoFocus
                />

                <TouchableOpacity
                  style={[styles.primaryBtn, { marginTop: 20 }]}
                  onPress={handleNext}
                  activeOpacity={0.85}
                >
                  <Text style={styles.primaryBtnText}>Next</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                {/* Confirmed email */}
                <View style={styles.emailConfirm}>
                  <Text style={styles.emailConfirmText}>{email}</Text>
                  <TouchableOpacity onPress={() => { setStep('email'); setError('') }}>
                    <Text style={styles.changeLink}>change</Text>
                  </TouchableOpacity>
                </View>

                {!!error && <Text style={[styles.errorText, { marginBottom: 10 }]}>{error}</Text>}

                <OutlinedField
                  label="Password"
                  placeholder="|Password"
                  value={password}
                  onChangeText={t => { setPassword(t); setError('') }}
                  autoComplete="password"
                  secureTextEntry={!showPass}
                  showToggle
                  onToggleSecure={() => setShowPass(s => !s)}
                  returnKeyType="done"
                  onSubmitEditing={handleLogin}
                  inputRef={passwordRef}
                />

                <TouchableOpacity
                  style={[styles.primaryBtn, { marginTop: 20 }]}
                  onPress={handleLogin}
                  disabled={loading}
                  activeOpacity={0.85}
                >
                  {loading
                    ? <ActivityIndicator color={Colors.white} />
                    : <Text style={styles.primaryBtnText}>Log In</Text>
                  }
                </TouchableOpacity>

                <TouchableOpacity style={styles.forgotBtn}>
                  <Text style={styles.forgotText}>Forgot Password</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  bg:    { flex: 1, backgroundColor: '#D6F3FF' },
  bgSvg: { position: 'absolute', bottom: 0, left: 0 },
  safe:  { flex: 1, backgroundColor: 'transparent' },
  flex:  { flex: 1 },

  backBtn: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 4,
    height: 44,
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 32,
    color: Colors.neutral2,
    lineHeight: 36,
    fontWeight: Typography.light,
  },

  // White card
  card: {
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    borderRadius: Radii.card,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  // "Log In" serif title in teal
  cardTitle: {
    fontFamily: 'Georgia',
    fontSize: Typography.title3.fontSize,
    fontWeight: Typography.light,
    color: Colors.brandPrimary,
    textAlign: 'center',
    marginBottom: 24,
    letterSpacing: 0.38,
  },

  errorText: {
    fontSize: Typography.caption1.fontSize,
    color: Colors.errorText,
    marginBottom: 8,
    textAlign: 'center',
  },

  // Confirmed email row
  emailConfirm: {
    alignItems: 'center',
    marginBottom: 20,
    gap: 4,
  },
  emailConfirmText: {
    fontSize: Typography.callout.fontSize,
    fontWeight: Typography.medium,
    color: Colors.neutral2,
    letterSpacing: Typography.callout.letterSpacing,
  },
  changeLink: {
    fontSize: Typography.subheadline.fontSize,
    color: Colors.brandSecondary,
    letterSpacing: Typography.subheadline.letterSpacing,
  },

  // Teal pill button
  primaryBtn: {
    backgroundColor: Colors.brandSecondary,
    borderRadius: Radii.button,
    height: 51,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  primaryBtnText: {
    color: Colors.white,
    fontSize: Typography.callout.fontSize,
    fontWeight: Typography.medium,
    letterSpacing: Typography.callout.letterSpacing,
  },

  forgotBtn: { alignItems: 'center', paddingTop: 16 },
  forgotText: {
    fontSize: Typography.subheadline.fontSize,
    color: Colors.brandSecondary,
    fontWeight: Typography.medium,
    letterSpacing: Typography.subheadline.letterSpacing,
  },
})
