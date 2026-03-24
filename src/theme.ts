export const Colors = {
  // Brand
  brandPrimary:   '#0080A3',
  brandSecondary: '#0E98BE',
  brandShade1:    '#0F3541',
  brandShade2:    '#19566A',
  brandTint:      '#B0DEEA',

  // Backgrounds
  bgPrimary:   '#F2F8FA',
  bgSecondary: '#D9E3E7',

  // Neutrals
  neutral1: '#161B1F',
  neutral2: '#282F35',
  neutral3: '#4E5961',
  neutral4: '#78868E',
  neutral5: '#A6B4BA',
  white:    '#FFFFFF',

  // Status
  errorIcon:    '#F05B60',
  errorText:    '#923133',
  successIcon:  '#73BE5E',
  successText:  '#317A20',
} as const

export const Typography = {
  // iOS SF Pro sizes (pt → px 1:1 for RN)
  navigation:   { fontSize: 10, lineHeight: 12, letterSpacing: 0.05 },
  caption2:     { fontSize: 11, lineHeight: 13 },
  caption1:     { fontSize: 12, lineHeight: 16 },
  footnote:     { fontSize: 13, lineHeight: 18, letterSpacing: -0.078 },
  subheadline:  { fontSize: 15, lineHeight: 20, letterSpacing: -0.24 },
  callout:      { fontSize: 16, lineHeight: 21, letterSpacing: -0.32 },
  body:         { fontSize: 17, lineHeight: 21 },
  title3:       { fontSize: 20, lineHeight: 25, letterSpacing: 0.38 },
  title1:       { fontSize: 28, lineHeight: 34 },
  xlNumber:     { fontSize: 56, lineHeight: 68 },

  // Weights
  regular: '400' as const,
  medium:  '600' as const,
  light:   '300' as const,
  bold:    '700' as const,

  // Serif (Merriweather fallback → Georgia)
  serifFamily: 'Georgia, serif' as const,
} as const

export const Radii = {
  button:     30,
  buttonPill: 100,
  card:       10,
  cardAndroid: 4,
  chatBubble:  12,
  input:       20,
  tag:         100,
  progress:    10,
} as const

export const Shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 3,
  },
  modal: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 11 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
  },
} as const
