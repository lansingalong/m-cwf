import { Assessment, Member } from '../types'

export const mockMember: Member = {
  id: 'M001',
  firstName: 'Maria',
  lastName: 'Santos',
  email: 'maria.santos@email.com',
  dateOfBirth: '1985-06-14',
  memberId: 'CWF000045',
  careManager: 'Jennifer Reyes, RN',
}

export const mockAssessments: Assessment[] = [
  {
    id: 'phq9',
    title: 'PHQ-9',
    description: 'Patient Health Questionnaire to screen for depression symptoms over the past 2 weeks.',
    category: 'Behavioral Health',
    estimatedMinutes: 5,
    status: 'due',
    dueDate: '2026-03-30',
    questions: [
      {
        id: 'phq9_1',
        text: 'Little interest or pleasure in doing things?',
        type: 'single_choice',
        required: true,
        options: [
          { value: '0', label: 'Not at all', score: 0 },
          { value: '1', label: 'Several days', score: 1 },
          { value: '2', label: 'More than half the days', score: 2 },
          { value: '3', label: 'Nearly every day', score: 3 },
        ],
      },
      {
        id: 'phq9_2',
        text: 'Feeling down, depressed, or hopeless?',
        type: 'single_choice',
        required: true,
        options: [
          { value: '0', label: 'Not at all', score: 0 },
          { value: '1', label: 'Several days', score: 1 },
          { value: '2', label: 'More than half the days', score: 2 },
          { value: '3', label: 'Nearly every day', score: 3 },
        ],
      },
      {
        id: 'phq9_3',
        text: 'Trouble falling or staying asleep, or sleeping too much?',
        type: 'single_choice',
        required: true,
        options: [
          { value: '0', label: 'Not at all', score: 0 },
          { value: '1', label: 'Several days', score: 1 },
          { value: '2', label: 'More than half the days', score: 2 },
          { value: '3', label: 'Nearly every day', score: 3 },
        ],
      },
      {
        id: 'phq9_4',
        text: 'Feeling tired or having little energy?',
        type: 'single_choice',
        required: true,
        options: [
          { value: '0', label: 'Not at all', score: 0 },
          { value: '1', label: 'Several days', score: 1 },
          { value: '2', label: 'More than half the days', score: 2 },
          { value: '3', label: 'Nearly every day', score: 3 },
        ],
      },
      {
        id: 'phq9_5',
        text: 'Poor appetite or overeating?',
        type: 'single_choice',
        required: true,
        options: [
          { value: '0', label: 'Not at all', score: 0 },
          { value: '1', label: 'Several days', score: 1 },
          { value: '2', label: 'More than half the days', score: 2 },
          { value: '3', label: 'Nearly every day', score: 3 },
        ],
      },
      {
        id: 'phq9_6',
        text: 'Feeling bad about yourself — or that you are a failure or have let yourself or your family down?',
        type: 'single_choice',
        required: true,
        options: [
          { value: '0', label: 'Not at all', score: 0 },
          { value: '1', label: 'Several days', score: 1 },
          { value: '2', label: 'More than half the days', score: 2 },
          { value: '3', label: 'Nearly every day', score: 3 },
        ],
      },
      {
        id: 'phq9_7',
        text: 'Trouble concentrating on things, such as reading the newspaper or watching television?',
        type: 'single_choice',
        required: true,
        options: [
          { value: '0', label: 'Not at all', score: 0 },
          { value: '1', label: 'Several days', score: 1 },
          { value: '2', label: 'More than half the days', score: 2 },
          { value: '3', label: 'Nearly every day', score: 3 },
        ],
      },
      {
        id: 'phq9_8',
        text: 'Moving or speaking so slowly that other people could have noticed? Or so fidgety or restless that you have been moving around a lot more than usual?',
        type: 'single_choice',
        required: true,
        options: [
          { value: '0', label: 'Not at all', score: 0 },
          { value: '1', label: 'Several days', score: 1 },
          { value: '2', label: 'More than half the days', score: 2 },
          { value: '3', label: 'Nearly every day', score: 3 },
        ],
      },
      {
        id: 'phq9_9',
        text: 'Thoughts that you would be better off dead, or thoughts of hurting yourself in some way?',
        type: 'single_choice',
        required: true,
        options: [
          { value: '0', label: 'Not at all', score: 0 },
          { value: '1', label: 'Several days', score: 1 },
          { value: '2', label: 'More than half the days', score: 2 },
          { value: '3', label: 'Nearly every day', score: 3 },
        ],
      },
    ],
  },
  {
    id: 'fall',
    title: 'Fall Prevention Assessment',
    description: 'Assessment to evaluate your risk of falling and identify preventive measures to keep you safe.',
    category: 'General Health',
    estimatedMinutes: 6,
    status: 'completed',
    completedDate: '2026-03-15',
    questions: [
      {
        id: 'fall_1',
        text: 'Have you fallen in the past 12 months?',
        type: 'single_choice',
        required: true,
        options: [
          { value: 'no', label: 'No' },
          { value: 'once', label: 'Yes, once' },
          { value: 'multiple', label: 'Yes, more than once' },
        ],
      },
      {
        id: 'fall_2',
        text: 'Were you injured during a fall?',
        type: 'single_choice',
        required: true,
        showIf: { questionId: 'fall_1', values: ['once', 'multiple'] },
        options: [
          { value: 'no', label: 'No injury' },
          { value: 'minor', label: 'Minor injury (bruise, scrape)' },
          { value: 'major', label: 'Major injury (fracture, hospitalization)' },
        ],
      },
      {
        id: 'fall_3',
        text: 'Do you feel unsteady when standing or walking?',
        type: 'single_choice',
        required: true,
        options: [
          { value: 'never', label: 'Never' },
          { value: 'sometimes', label: 'Sometimes' },
          { value: 'often', label: 'Often' },
          { value: 'always', label: 'Always' },
        ],
      },
      {
        id: 'fall_4',
        text: 'Do you use any assistive devices? (Select all that apply)',
        type: 'multi_choice',
        required: false,
        options: [
          { value: 'cane', label: 'Cane' },
          { value: 'walker', label: 'Walker' },
          { value: 'wheelchair', label: 'Wheelchair' },
          { value: 'grab_bars', label: 'Grab bars at home' },
          { value: 'none', label: 'None' },
        ],
      },
      {
        id: 'fall_5',
        text: 'Do you take any medications that cause dizziness or drowsiness?',
        type: 'single_choice',
        required: true,
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
          { value: 'unsure', label: 'Not sure' },
        ],
      },
      {
        id: 'fall_6',
        text: 'Do you have any of the following conditions? (Select all that apply)',
        type: 'multi_choice',
        required: true,
        options: [
          { value: 'vision', label: 'Vision problems' },
          { value: 'hearing', label: 'Hearing problems' },
          { value: 'neuropathy', label: 'Numbness in feet or legs' },
          { value: 'arthritis', label: 'Arthritis or joint pain' },
          { value: 'dizziness', label: 'Frequent dizziness' },
          { value: 'none', label: 'None of the above' },
        ],
      },
      {
        id: 'fall_7',
        text: 'Are there any hazards in your home that could increase your risk of falling (loose rugs, poor lighting, clutter)?',
        type: 'single_choice',
        required: true,
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
          { value: 'unsure', label: 'Not sure' },
        ],
      },
      {
        id: 'fall_8',
        text: 'Is there anything else you would like your care team to know about your fall risk?',
        type: 'text',
        required: false,
      },
    ],
  },
  {
    id: 'gad7',
    title: 'GAD-7',
    description: 'Generalized Anxiety Disorder scale to measure anxiety symptoms over the past 2 weeks.',
    category: 'Behavioral Health',
    estimatedMinutes: 4,
    status: 'in_progress',
    dueDate: '2026-04-05',
    questions: [
      {
        id: 'gad7_1',
        text: 'Feeling nervous, anxious, or on edge?',
        type: 'single_choice',
        required: true,
        options: [
          { value: '0', label: 'Not at all', score: 0 },
          { value: '1', label: 'Several days', score: 1 },
          { value: '2', label: 'More than half the days', score: 2 },
          { value: '3', label: 'Nearly every day', score: 3 },
        ],
      },
      {
        id: 'gad7_2',
        text: 'Not being able to stop or control worrying?',
        type: 'single_choice',
        required: true,
        options: [
          { value: '0', label: 'Not at all', score: 0 },
          { value: '1', label: 'Several days', score: 1 },
          { value: '2', label: 'More than half the days', score: 2 },
          { value: '3', label: 'Nearly every day', score: 3 },
        ],
      },
      {
        id: 'gad7_3',
        text: 'Worrying too much about different things?',
        type: 'single_choice',
        required: true,
        options: [
          { value: '0', label: 'Not at all', score: 0 },
          { value: '1', label: 'Several days', score: 1 },
          { value: '2', label: 'More than half the days', score: 2 },
          { value: '3', label: 'Nearly every day', score: 3 },
        ],
      },
      {
        id: 'gad7_4',
        text: 'Trouble relaxing?',
        type: 'single_choice',
        required: true,
        options: [
          { value: '0', label: 'Not at all', score: 0 },
          { value: '1', label: 'Several days', score: 1 },
          { value: '2', label: 'More than half the days', score: 2 },
          { value: '3', label: 'Nearly every day', score: 3 },
        ],
      },
      {
        id: 'gad7_5',
        text: "Being so restless that it's hard to sit still?",
        type: 'single_choice',
        required: true,
        options: [
          { value: '0', label: 'Not at all', score: 0 },
          { value: '1', label: 'Several days', score: 1 },
          { value: '2', label: 'More than half the days', score: 2 },
          { value: '3', label: 'Nearly every day', score: 3 },
        ],
      },
      {
        id: 'gad7_6',
        text: 'Becoming easily annoyed or irritable?',
        type: 'single_choice',
        required: true,
        options: [
          { value: '0', label: 'Not at all', score: 0 },
          { value: '1', label: 'Several days', score: 1 },
          { value: '2', label: 'More than half the days', score: 2 },
          { value: '3', label: 'Nearly every day', score: 3 },
        ],
      },
      {
        id: 'gad7_7',
        text: 'Feeling afraid as if something awful might happen?',
        type: 'single_choice',
        required: true,
        options: [
          { value: '0', label: 'Not at all', score: 0 },
          { value: '1', label: 'Several days', score: 1 },
          { value: '2', label: 'More than half the days', score: 2 },
          { value: '3', label: 'Nearly every day', score: 3 },
        ],
      },
    ],
  },
  {
    id: 'hra',
    title: 'Health Risk Assessment',
    description: 'Annual health risk assessment to understand your overall health status and identify areas of focus for your care plan.',
    category: 'General Health',
    estimatedMinutes: 15,
    status: 'due',
    dueDate: '2026-03-30',
    questions: [],
    pages: [
      {
        title: 'Medical History & Current Health',
        questions: [
          // Single-select: SF-36 standard self-rated health
          { id: 'hra_1', text: 'In general, how would you rate your overall health?', type: 'single_choice', required: true, options: [{ value: 'excellent', label: 'Excellent' }, { value: 'very_good', label: 'Very Good' }, { value: 'good', label: 'Good' }, { value: 'fair', label: 'Fair' }, { value: 'poor', label: 'Poor' }] },
          // Single-select: SF-36 health transition
          { id: 'hra_2', text: 'Compared to one year ago, how would you rate your health in general now?', type: 'single_choice', required: true, options: [{ value: 'much_better', label: 'Much better than one year ago' }, { value: 'somewhat_better', label: 'Somewhat better than one year ago' }, { value: 'same', label: 'About the same' }, { value: 'somewhat_worse', label: 'Somewhat worse than one year ago' }, { value: 'much_worse', label: 'Much worse than one year ago' }] },
          // Single-select: ER utilization (triggers skip logic)
          { id: 'hra_3', text: 'In the past 12 months, have you visited an emergency department?', type: 'single_choice', required: true, options: [{ value: 'no', label: 'No' }, { value: 'yes_once', label: 'Yes, 1 time' }, { value: 'yes_multiple', label: 'Yes, 2 or more times' }] },
          // Skip logic: ER reason (only if hra_3 = yes)
          { id: 'hra_4', text: 'What was the primary reason for your most recent emergency department visit?', type: 'single_choice', required: true, showIf: { questionId: 'hra_3', values: ['yes_once', 'yes_multiple'] }, options: [{ value: 'injury', label: 'Injury or accident' }, { value: 'chronic', label: 'Worsening of a chronic condition' }, { value: 'pain', label: 'Uncontrolled pain' }, { value: 'breathing', label: 'Difficulty breathing' }, { value: 'chest_pain', label: 'Chest pain or heart-related concern' }, { value: 'other', label: 'Other reason' }] },
          // Single-select: Inpatient utilization
          { id: 'hra_5', text: 'In the past 12 months, how many times have you been admitted to a hospital overnight or longer?', type: 'single_choice', required: true, options: [{ value: '0', label: 'None' }, { value: '1', label: '1 time' }, { value: '2-3', label: '2–3 times' }, { value: '4+', label: '4 or more times' }] },
          // Single-select: PCP access
          { id: 'hra_6', text: 'Do you have a primary care provider (PCP) that you see for routine care?', type: 'single_choice', required: true, options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
          // Multi-select: Chronic conditions (standard CMS HRA)
          { id: 'hra_7', text: 'Have you been told by a doctor or health professional that you have any of the following conditions? (Select all that apply)', type: 'multi_choice', required: true, options: [{ value: 'diabetes', label: 'Diabetes or pre-diabetes' }, { value: 'heart_disease', label: 'Heart disease or heart failure' }, { value: 'hypertension', label: 'High blood pressure' }, { value: 'asthma_copd', label: 'Asthma or COPD' }, { value: 'arthritis', label: 'Arthritis or chronic joint pain' }, { value: 'depression', label: 'Depression or anxiety' }, { value: 'kidney', label: 'Chronic kidney disease' }, { value: 'cancer', label: 'Cancer (current or history)' }, { value: 'none', label: 'None of the above' }] },
          // Single-select: Polypharmacy screening (triggers skip logic)
          { id: 'hra_8', text: 'How many prescription medications do you currently take on a regular basis?', type: 'single_choice', required: true, options: [{ value: 'none', label: 'None' }, { value: '1-3', label: '1–3 medications' }, { value: '4-6', label: '4–6 medications' }, { value: '7+', label: '7 or more medications' }] },
          // Text field: Allergies
          { id: 'hra_9', text: 'Please list any known allergies (medications, food, latex, or environmental). If none, write "None."', type: 'text', required: false },
          // Skip logic: Medication adherence (only if taking meds) — last on page so single-select auto-advances
          { id: 'hra_10', text: 'How often do you have difficulty remembering to take your medications as prescribed?', type: 'single_choice', required: true, showIf: { questionId: 'hra_8', values: ['1-3', '4-6', '7+'] }, options: [{ value: 'never', label: 'Never' }, { value: 'rarely', label: 'Rarely' }, { value: 'sometimes', label: 'Sometimes' }, { value: 'often', label: 'Often' }, { value: 'always', label: 'Almost always' }] },
        ],
      },
      {
        title: 'Functional Status & Lifestyle',
        questions: [
          // Sub-question: Pain screening (standard in HRA)
          {
            id: 'hra_pain',
            text: 'Are you currently experiencing any pain or discomfort on most days?',
            type: 'single_choice',
            required: true,
            options: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ],
            subQuestions: {
              triggerValues: ['yes'],
              questions: [
                {
                  id: 'hra_pain_type',
                  text: 'What type of pain are you experiencing? (Select all that apply)',
                  type: 'multi_choice',
                  required: true,
                  options: [
                    { value: 'sharp', label: 'Sharp or stabbing pain' },
                    { value: 'dull', label: 'Dull or aching pain' },
                    { value: 'burning', label: 'Burning or tingling' },
                    { value: 'throbbing', label: 'Throbbing pain' },
                    { value: 'stiffness', label: 'Joint stiffness or muscle tension' },
                    { value: 'other', label: 'Other' },
                  ],
                },
                {
                  id: 'hra_pain_daily',
                  text: 'Does this pain limit your ability to perform daily activities such as walking, bathing, or household tasks?',
                  type: 'single_choice',
                  required: true,
                  options: [
                    { value: 'yes', label: 'Yes' },
                    { value: 'somewhat', label: 'Somewhat' },
                    { value: 'no', label: 'No' },
                  ],
                },
              ],
            },
          },
          // Single-select: Physical activity (standard preventive health)
          { id: 'hra_11', text: 'In a typical week, how many days do you engage in at least 30 minutes of moderate physical activity (such as walking, gardening, or light exercise)?', type: 'single_choice', required: true, options: [{ value: '0', label: '0 days' }, { value: '1-2', label: '1–2 days' }, { value: '3-4', label: '3–4 days' }, { value: '5+', label: '5 or more days' }] },
          // Single-select: Nutrition screening
          { id: 'hra_12', text: 'How would you describe your eating habits?', type: 'single_choice', required: true, options: [{ value: 'very_healthy', label: 'Balanced diet with fruits, vegetables, and whole grains' }, { value: 'somewhat_healthy', label: 'Mostly healthy with occasional processed foods' }, { value: 'average', label: 'Average — mix of healthy and unhealthy foods' }, { value: 'unhealthy', label: 'Mostly processed, fast food, or skipped meals' }] },
          // Single-select: Sleep screening
          { id: 'hra_13', text: 'On average, how many hours of sleep do you get per night?', type: 'single_choice', required: true, options: [{ value: 'less_5', label: 'Less than 5 hours' }, { value: '5-6', label: '5–6 hours' }, { value: '7-8', label: '7–8 hours' }, { value: 'more_8', label: 'More than 8 hours' }] },
          // Single-select: Tobacco screening (triggers skip logic)
          { id: 'hra_14', text: 'Do you currently use any tobacco or nicotine products (cigarettes, e-cigarettes, chewing tobacco, etc.)?', type: 'single_choice', required: true, options: [{ value: 'never', label: 'Never used' }, { value: 'former', label: 'Former user (quit more than 6 months ago)' }, { value: 'current', label: 'Current user' }] },
          // Skip logic: Cessation interest (only if current user)
          { id: 'hra_15', text: 'Would you be interested in receiving tobacco cessation support or resources?', type: 'single_choice', required: true, showIf: { questionId: 'hra_14', values: ['current'] }, options: [{ value: 'yes', label: 'Yes, I would like help quitting' }, { value: 'not_now', label: 'Not right now, but maybe later' }, { value: 'no', label: 'No, I am not interested' }] },
          // Single-select: AUDIT-C alcohol screening
          { id: 'hra_16', text: 'How often do you have a drink containing alcohol?', type: 'single_choice', required: true, options: [{ value: 'never', label: 'Never' }, { value: 'monthly', label: 'Monthly or less' }, { value: '2-4_month', label: '2–4 times a month' }, { value: '2-3_week', label: '2–3 times a week' }, { value: '4+_week', label: '4 or more times a week' }] },
          // Single-select: Fall risk screening (CDC STEADI)
          { id: 'hra_17', text: 'Have you fallen or felt unsteady while walking or standing in the past 12 months?', type: 'single_choice', required: true, options: [{ value: 'no', label: 'No falls and no balance concerns' }, { value: 'unsteady', label: 'No falls, but I sometimes feel unsteady' }, { value: 'yes_no_injury', label: 'Yes, I fell but was not injured' }, { value: 'yes_injury', label: 'Yes, I fell and was injured' }] },
          // Multi-select: ADL/IADL functional assessment
          { id: 'hra_18', text: 'Do you need help with any of the following activities? (Select all that apply)', type: 'multi_choice', required: false, options: [{ value: 'bathing', label: 'Bathing, dressing, or personal hygiene' }, { value: 'meals', label: 'Preparing meals' }, { value: 'housework', label: 'Light housework or chores' }, { value: 'transportation', label: 'Getting to appointments or errands' }, { value: 'medications', label: 'Taking medications correctly' }, { value: 'finances', label: 'Managing bills or finances' }, { value: 'none', label: 'I do not need help with any of these' }] },
          // Single-select: Safety screening
          { id: 'hra_19', text: 'Do you feel physically and emotionally safe where you currently live?', type: 'single_choice', required: true, options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }, { value: 'prefer_not', label: 'I prefer not to answer' }] },
          // Date picker: Last preventive visit
          { id: 'hra_20', text: 'When did you last have an annual wellness visit or physical exam with your doctor?', type: 'date', required: true },
        ],
      },
      {
        title: 'Behavioral Health & Social Determinants',
        questions: [
          // Single-select: Behavioral health access
          { id: 'hra_21', text: 'Have you seen a doctor, therapist, or counselor for a mental or behavioral health concern in the past 12 months?', type: 'single_choice', required: true, options: [{ value: 'yes', label: 'Yes' }, { value: 'no_needed', label: 'No, but I feel I could benefit from it' }, { value: 'no', label: 'No, and I do not feel I need to' }] },
          // Date picker: PHQ-2 depression screener (validated clinical tool)
          { id: 'hra_22', text: 'Over the past 2 weeks, how often have you been bothered by feeling down, depressed, or hopeless?', type: 'single_choice', required: true, options: [{ value: 'not_at_all', label: 'Not at all' }, { value: 'several', label: 'Several days' }, { value: 'more_than_half', label: 'More than half the days' }, { value: 'nearly_every', label: 'Nearly every day' }] },
          // Skip logic: Treatment engagement (only if PHQ-2 positive)
          { id: 'hra_23', text: 'Are you currently receiving any treatment, therapy, or counseling for your emotional or mental health?', type: 'single_choice', required: true, showIf: { questionId: 'hra_22', values: ['several', 'more_than_half', 'nearly_every'] }, options: [{ value: 'yes', label: 'Yes, I am currently in treatment' }, { value: 'no_interested', label: 'No, but I would like to be connected to services' }, { value: 'no', label: 'No, and I am not interested at this time' }] },
          // Single-select: GAD-2 anxiety screener (validated clinical tool)
          { id: 'hra_24', text: 'Over the past 2 weeks, how often have you been bothered by feeling nervous, anxious, or on edge?', type: 'single_choice', required: true, options: [{ value: 'not_at_all', label: 'Not at all' }, { value: 'several', label: 'Several days' }, { value: 'more_than_half', label: 'More than half the days' }, { value: 'nearly_every', label: 'Nearly every day' }] },
          // Single-select: Social isolation screening (CMS standard)
          { id: 'hra_25', text: 'How often do you feel isolated, lonely, or that you lack companionship?', type: 'single_choice', required: true, options: [{ value: 'hardly_ever', label: 'Hardly ever' }, { value: 'some_time', label: 'Some of the time' }, { value: 'often', label: 'Often' }] },
          // Single-select: Social support
          { id: 'hra_26', text: 'If you needed help during an illness or emergency, do you have someone you could count on?', type: 'single_choice', required: true, options: [{ value: 'yes', label: 'Yes' }, { value: 'maybe', label: 'Maybe, but I am not sure' }, { value: 'no', label: 'No' }] },
          // Single-select: Food insecurity (Hunger Vital Sign)
          { id: 'hra_27', text: 'Within the past 12 months, have you ever worried that your food would run out before you had money to buy more?', type: 'single_choice', required: true, options: [{ value: 'never', label: 'Never' }, { value: 'sometimes', label: 'Sometimes true' }, { value: 'often', label: 'Often true' }] },
          // Single-select: Transportation barrier
          { id: 'hra_28', text: 'In the past 12 months, has a lack of reliable transportation kept you from medical appointments, meetings, work, or getting things needed for daily living?', type: 'single_choice', required: true, options: [{ value: 'no', label: 'No' }, { value: 'yes_sometimes', label: 'Yes, it has kept me from things I need to do sometimes' }, { value: 'yes_often', label: 'Yes, it is a frequent problem for me' }] },
          // Multi-select: Care priorities / goals
          { id: 'hra_29', text: 'Which of the following health goals are most important to you right now? (Select all that apply)', type: 'multi_choice', required: false, options: [{ value: 'manage_condition', label: 'Managing a chronic condition' }, { value: 'lose_weight', label: 'Losing weight or improving nutrition' }, { value: 'more_active', label: 'Being more physically active' }, { value: 'mental_health', label: 'Improving my mental health or reducing stress' }, { value: 'quit_tobacco', label: 'Quitting tobacco' }, { value: 'reduce_pain', label: 'Reducing or managing pain' }, { value: 'stay_independent', label: 'Staying independent at home' }, { value: 'none', label: 'No specific goals at this time' }] },
          // Text field: Open-ended member input
          { id: 'hra_30', text: 'Is there anything else you would like your care team to know about your health, your needs, or your goals?', type: 'text', required: false },
        ],
      },
    ],
  },
]

// Mock completed answers for read-only view
export const mockCompletedAnswers: Record<string, Record<string, string | string[]>> = {
  fall: {
    fall_1: 'once',
    fall_2: 'minor',
    fall_3: 'sometimes',
    fall_4: ['grab_bars'],
    fall_5: 'yes',
    fall_6: ['vision', 'arthritis'],
    fall_7: 'no',
    fall_8: 'I occasionally feel lightheaded when getting up quickly.',
  },
}
