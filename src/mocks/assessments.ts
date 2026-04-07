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

  // ── Comprehensive Assessment ─────────────────────────────────────────────
  {
    id: 'comprehensive',
    title: 'Comprehensive Assessment',
    description: 'A thorough whole-person assessment covering physical health, mental wellbeing, social needs, and functional status.',
    category: 'General Health',
    estimatedMinutes: 12,
    status: 'due',
    dueDate: '2026-04-15',
    questions: [
      { id: 'comp_1', text: 'In general, how would you rate your overall health?', type: 'single_choice', required: true, options: [{ value: 'excellent', label: 'Excellent' }, { value: 'very_good', label: 'Very Good' }, { value: 'good', label: 'Good' }, { value: 'fair', label: 'Fair' }, { value: 'poor', label: 'Poor' }] },
      { id: 'comp_2', text: 'Which chronic conditions are you currently managing? (Select all that apply)', type: 'multi_choice', required: true, options: [{ value: 'diabetes', label: 'Diabetes or pre-diabetes' }, { value: 'heart', label: 'Heart disease or heart failure' }, { value: 'hypertension', label: 'High blood pressure' }, { value: 'copd', label: 'Asthma or COPD' }, { value: 'ckd', label: 'Chronic kidney disease' }, { value: 'cancer', label: 'Cancer (current or history)' }, { value: 'none', label: 'None' }] },
      { id: 'comp_3', text: 'How often do you feel down, depressed, or hopeless?', type: 'single_choice', required: true, options: [{ value: '0', label: 'Not at all', score: 0 }, { value: '1', label: 'Several days', score: 1 }, { value: '2', label: 'More than half the days', score: 2 }, { value: '3', label: 'Nearly every day', score: 3 }] },
      { id: 'comp_4', text: 'How would you rate your ability to perform daily activities?', type: 'single_choice', required: true, options: [{ value: 'independent', label: 'Fully independent' }, { value: 'mostly', label: 'Mostly independent — occasional help' }, { value: 'some_help', label: 'Need help with some activities' }, { value: 'significant', label: 'Need significant assistance' }] },
      { id: 'comp_5', text: 'Do you have reliable housing, food, and transportation?', type: 'single_choice', required: true, options: [{ value: 'yes_all', label: 'Yes — all needs are met' }, { value: 'some_gaps', label: 'Some gaps in one or more areas' }, { value: 'significant_needs', label: 'Significant unmet social needs' }] },
      { id: 'comp_6', text: 'How many prescription medications do you currently take?', type: 'single_choice', required: true, options: [{ value: 'none', label: 'None' }, { value: '1_3', label: '1–3' }, { value: '4_6', label: '4–6' }, { value: '7plus', label: '7 or more' }] },
      { id: 'comp_7', text: 'Have you visited an emergency department or been hospitalized in the past 6 months?', type: 'single_choice', required: true, options: [{ value: 'no', label: 'No' }, { value: 'yes_ed', label: 'Yes — ED visit' }, { value: 'yes_hospital', label: 'Yes — hospitalized overnight or longer' }] },
      { id: 'comp_8', text: 'What health goals are most important to you right now? (Select all that apply)', type: 'multi_choice', required: false, options: [{ value: 'manage_condition', label: 'Managing a chronic condition' }, { value: 'mental_health', label: 'Improving mental health' }, { value: 'nutrition', label: 'Better nutrition or weight management' }, { value: 'active', label: 'Being more physically active' }, { value: 'independence', label: 'Staying independent at home' }, { value: 'none', label: 'No specific goals at this time' }] },
      { id: 'comp_9', text: 'Is there anything else you would like your care team to know?', type: 'text', required: false },
    ],
  },

  // ── Pediatric HRA ─────────────────────────────────────────────────────────
  {
    id: 'pediatric_hra',
    title: 'Pediatric HRA',
    description: 'A health risk assessment for pediatric members to identify health, developmental, and social needs.',
    category: 'General Health',
    estimatedMinutes: 8,
    status: 'due',
    dueDate: '2026-04-15',
    questions: [
      { id: 'phra_1', text: "How old is your child?", type: 'single_choice', required: true, options: [{ value: '0_2', label: 'Under 2 years' }, { value: '3_5', label: '3–5 years' }, { value: '6_11', label: '6–11 years' }, { value: '12_17', label: '12–17 years' }] },
      { id: 'phra_2', text: "How would you rate your child's overall health?", type: 'single_choice', required: true, options: [{ value: 'excellent', label: 'Excellent' }, { value: 'very_good', label: 'Very Good' }, { value: 'good', label: 'Good' }, { value: 'fair', label: 'Fair' }, { value: 'poor', label: 'Poor' }] },
      { id: 'phra_3', text: 'Does your child have any diagnosed medical conditions? (Select all that apply)', type: 'multi_choice', required: true, options: [{ value: 'asthma', label: 'Asthma or allergies' }, { value: 'adhd', label: 'ADHD or behavioral concerns' }, { value: 'diabetes', label: 'Diabetes' }, { value: 'obesity', label: 'Overweight or obesity' }, { value: 'developmental', label: 'Developmental delay or disability' }, { value: 'none', label: 'None' }] },
      { id: 'phra_4', text: 'Is your child up to date on recommended vaccinations?', type: 'single_choice', required: true, options: [{ value: 'yes', label: 'Yes' }, { value: 'partial', label: 'Partially — some are missing' }, { value: 'no', label: 'No' }, { value: 'unsure', label: 'Not sure' }] },
      { id: 'phra_5', text: 'How would you describe your child\'s diet on most days?', type: 'single_choice', required: true, options: [{ value: 'healthy', label: 'Mostly fruits, vegetables, and whole foods' }, { value: 'average', label: 'Mix of healthy and processed foods' }, { value: 'unhealthy', label: 'Mostly fast food or processed foods' }] },
      { id: 'phra_6', text: 'Does your child receive regular physical activity (at least 60 minutes per day)?', type: 'single_choice', required: true, options: [{ value: 'yes', label: 'Yes, most days' }, { value: 'sometimes', label: 'Sometimes' }, { value: 'rarely', label: 'Rarely or never' }] },
      { id: 'phra_7', text: "Do you have concerns about your child's behavior, mood, or emotional health?", type: 'single_choice', required: true, options: [{ value: 'no', label: 'No concerns' }, { value: 'minor', label: 'Minor concerns' }, { value: 'yes', label: 'Yes — I would like to discuss this' }] },
      { id: 'phra_8', text: 'Is there anything else about your child\'s health you\'d like your care team to know?', type: 'text', required: false },
    ],
  },

  // ── Oncology HRA ─────────────────────────────────────────────────────────
  {
    id: 'oncology_hra',
    title: 'Oncology HRA',
    description: 'A health risk assessment designed for members with a cancer diagnosis or cancer history to guide personalized care.',
    category: 'Chronic Condition',
    estimatedMinutes: 10,
    status: 'due',
    dueDate: '2026-04-15',
    questions: [
      { id: 'onc_1', text: 'What is your current cancer status?', type: 'single_choice', required: true, options: [{ value: 'active_treatment', label: 'Currently in active treatment' }, { value: 'surveillance', label: 'In remission — under surveillance' }, { value: 'history', label: 'History of cancer — no current diagnosis' }, { value: 'newly_diagnosed', label: 'Newly diagnosed — not yet started treatment' }] },
      { id: 'onc_2', text: 'Which of the following treatments are you currently receiving or have recently completed? (Select all that apply)', type: 'multi_choice', required: true, options: [{ value: 'chemo', label: 'Chemotherapy' }, { value: 'radiation', label: 'Radiation therapy' }, { value: 'surgery', label: 'Surgery' }, { value: 'immunotherapy', label: 'Immunotherapy' }, { value: 'hormone', label: 'Hormone therapy' }, { value: 'targeted', label: 'Targeted therapy' }, { value: 'none', label: 'None currently' }] },
      { id: 'onc_3', text: 'How would you rate your current pain level on most days?', type: 'single_choice', required: true, options: [{ value: 'none', label: 'No pain (0)' }, { value: 'mild', label: 'Mild (1–3)' }, { value: 'moderate', label: 'Moderate (4–6)' }, { value: 'severe', label: 'Severe (7–10)' }] },
      { id: 'onc_4', text: 'Are you experiencing any of the following side effects? (Select all that apply)', type: 'multi_choice', required: true, options: [{ value: 'fatigue', label: 'Fatigue or extreme tiredness' }, { value: 'nausea', label: 'Nausea or vomiting' }, { value: 'appetite', label: 'Loss of appetite or weight loss' }, { value: 'neuropathy', label: 'Numbness or tingling in hands/feet' }, { value: 'cognitive', label: 'Memory or concentration difficulties' }, { value: 'none', label: 'No significant side effects' }] },
      { id: 'onc_5', text: 'How is your emotional wellbeing since your diagnosis?', type: 'single_choice', required: true, options: [{ value: 'well', label: 'Managing well — feeling positive' }, { value: 'somewhat', label: 'Somewhat — some anxiety or sadness' }, { value: 'struggling', label: 'Struggling — significant distress' }, { value: 'support', label: 'I would like emotional or mental health support' }] },
      { id: 'onc_6', text: 'Do you have reliable support from family, friends, or a caregiver during your treatment?', type: 'single_choice', required: true, options: [{ value: 'yes', label: 'Yes — strong support system' }, { value: 'limited', label: 'Limited support' }, { value: 'no', label: 'No — I am managing largely on my own' }] },
      { id: 'onc_7', text: 'Do you have any questions or concerns about your treatment plan or prognosis you\'d like to discuss?', type: 'text', required: false },
    ],
  },

  // ── Fall Risk Prevention ──────────────────────────────────────────────────
  {
    id: 'fall_prevention',
    title: 'Fall Risk Prevention',
    description: 'An action-focused assessment to identify fall prevention strategies and home safety improvements.',
    category: 'General Health',
    estimatedMinutes: 6,
    status: 'due',
    dueDate: '2026-04-15',
    questions: [
      { id: 'fp_1', text: 'Have you made any changes to your home to reduce fall risk in the past 12 months? (Select all that apply)', type: 'multi_choice', required: true, options: [{ value: 'grab_bars', label: 'Installed grab bars in bathroom' }, { value: 'rugs', label: 'Removed loose rugs or clutter' }, { value: 'lighting', label: 'Improved lighting in hallways and stairs' }, { value: 'night_lights', label: 'Added night lights' }, { value: 'none', label: 'No changes made' }] },
      { id: 'fp_2', text: 'Do you currently use any assistive devices to help with balance or mobility?', type: 'multi_choice', required: true, options: [{ value: 'cane', label: 'Cane' }, { value: 'walker', label: 'Walker or rollator' }, { value: 'wheelchair', label: 'Wheelchair' }, { value: 'none', label: 'No devices' }] },
      { id: 'fp_3', text: 'Are you currently participating in any balance, strength, or fall prevention exercise programs?', type: 'single_choice', required: true, options: [{ value: 'yes', label: 'Yes' }, { value: 'no_interested', label: 'No, but I am interested' }, { value: 'no', label: 'No, and I am not interested at this time' }] },
      { id: 'fp_4', text: 'Do any of your current medications cause dizziness, drowsiness, or balance problems?', type: 'single_choice', required: true, options: [{ value: 'no', label: 'No' }, { value: 'yes', label: 'Yes' }, { value: 'unsure', label: 'Not sure' }] },
      { id: 'fp_5', text: 'Have you had a vision or hearing exam in the past 12 months?', type: 'single_choice', required: true, options: [{ value: 'both', label: 'Yes — both vision and hearing' }, { value: 'vision_only', label: 'Vision only' }, { value: 'hearing_only', label: 'Hearing only' }, { value: 'neither', label: 'Neither' }] },
      { id: 'fp_6', text: 'What additional fall prevention support would be most helpful for you?', type: 'text', required: false },
    ],
  },

  // ── TOC 1 Pre-Discharge ───────────────────────────────────────────────────
  {
    id: 'toc_pre',
    title: 'Transitions of Care (TOC) 1 Pre-Discharge',
    description: 'Completed before leaving the hospital or facility to ensure you have everything in place for a safe transition home.',
    category: 'General Health',
    estimatedMinutes: 7,
    status: 'due',
    dueDate: '2026-04-15',
    questions: [
      { id: 'tocp_1', text: 'Do you understand the reason for your hospitalization and your current diagnosis?', type: 'single_choice', required: true, options: [{ value: 'yes', label: 'Yes, clearly' }, { value: 'somewhat', label: 'Somewhat — I have some questions' }, { value: 'no', label: 'No — I need more explanation' }] },
      { id: 'tocp_2', text: 'Have you received and reviewed your discharge instructions with your care team?', type: 'single_choice', required: true, options: [{ value: 'yes', label: 'Yes — I understand them' }, { value: 'yes_questions', label: 'Yes — but I have questions' }, { value: 'no', label: 'Not yet' }] },
      { id: 'tocp_3', text: 'Do you have a follow-up appointment scheduled with your primary care provider or specialist?', type: 'single_choice', required: true, options: [{ value: 'yes', label: 'Yes — it is scheduled' }, { value: 'pending', label: 'Pending — being arranged' }, { value: 'no', label: 'No — not yet scheduled' }] },
      { id: 'tocp_4', text: 'Have any new medications been prescribed during this stay?', type: 'single_choice', required: true, options: [{ value: 'no', label: 'No new medications' }, { value: 'yes_understand', label: 'Yes — I understand how to take them' }, { value: 'yes_questions', label: 'Yes — I have questions about them' }] },
      { id: 'tocp_5', text: 'Do you have reliable transportation home from the facility?', type: 'single_choice', required: true, options: [{ value: 'yes', label: 'Yes' }, { value: 'needs_arrangement', label: 'No — transportation needs to be arranged' }] },
      { id: 'tocp_6', text: 'Will you have support at home (caregiver, family member, or home health) when you are discharged?', type: 'single_choice', required: true, options: [{ value: 'yes_caregiver', label: 'Yes — family or caregiver' }, { value: 'yes_homehealth', label: 'Yes — home health services arranged' }, { value: 'no', label: 'No — I will be on my own' }] },
      { id: 'tocp_7', text: 'What concerns do you have about going home that your care team should address before discharge?', type: 'text', required: false },
    ],
  },

  // ── TOC 3 Home Visit ──────────────────────────────────────────────────────
  {
    id: 'toc_home',
    title: 'Transitions of Care (TOC) 3 Home Visit',
    description: 'Completed during a home visit following discharge to assess your recovery and ensure ongoing support.',
    category: 'General Health',
    estimatedMinutes: 8,
    status: 'due',
    dueDate: '2026-04-15',
    questions: [
      { id: 'toch_1', text: 'How are you feeling since being discharged from the hospital or facility?', type: 'single_choice', required: true, options: [{ value: 'well', label: 'Well — recovering as expected' }, { value: 'okay', label: 'Okay — some discomfort but manageable' }, { value: 'struggling', label: 'Struggling — more difficult than expected' }, { value: 'worse', label: 'Worse — my condition seems to have declined' }] },
      { id: 'toch_2', text: 'Have you experienced any of the following symptoms since discharge? (Select all that apply)', type: 'multi_choice', required: true, options: [{ value: 'fever', label: 'Fever or chills' }, { value: 'pain', label: 'Increased pain or discomfort' }, { value: 'breathing', label: 'Shortness of breath' }, { value: 'swelling', label: 'New or worsening swelling' }, { value: 'confusion', label: 'Confusion or dizziness' }, { value: 'none', label: 'None of the above' }] },
      { id: 'toch_3', text: 'Have you attended your scheduled follow-up appointment(s) since discharge?', type: 'single_choice', required: true, options: [{ value: 'yes_all', label: 'Yes — attended all appointments' }, { value: 'yes_some', label: 'Attended some, have others scheduled' }, { value: 'no_scheduled', label: 'Not yet — appointments still upcoming' }, { value: 'no', label: 'No — appointments were not kept' }] },
      { id: 'toch_4', text: 'Are you taking all prescribed medications as directed?', type: 'single_choice', required: true, options: [{ value: 'yes', label: 'Yes — as prescribed' }, { value: 'mostly', label: 'Mostly — with occasional missed doses' }, { value: 'no', label: 'No — I have been unable to take them as directed' }] },
      { id: 'toch_5', text: 'Is your home environment safe and suitable for your recovery? (e.g. no trip hazards, accessible bathroom)', type: 'single_choice', required: true, options: [{ value: 'yes', label: 'Yes — my home is safe' }, { value: 'some_concerns', label: 'Some concerns — minor adjustments needed' }, { value: 'no', label: 'No — I have significant safety concerns' }] },
      { id: 'toch_6', text: 'Do you have adequate food, supplies, and support to continue your recovery at home?', type: 'single_choice', required: true, options: [{ value: 'yes', label: 'Yes — all needs are met' }, { value: 'some_gaps', label: 'Some gaps — I could use additional support' }, { value: 'no', label: 'No — I have significant unmet needs' }] },
      { id: 'toch_7', text: 'What questions or concerns can your care team help address today?', type: 'text', required: false },
    ],
  },

  // ── Maternal Health Assessment ───────────────────────────────────────────
  {
    id: 'maternal',
    title: 'Maternal Health Assessment',
    description: 'Prenatal health check-in to support you and your baby throughout your pregnancy.',
    category: 'General Health',
    estimatedMinutes: 8,
    status: 'due',
    dueDate: '2026-04-15',
    questions: [
      { id: 'mat_1', text: 'How many weeks pregnant are you?', type: 'single_choice', required: true, options: [{ value: 'lt13', label: 'Less than 13 weeks (1st trimester)' }, { value: '13_26', label: '13–26 weeks (2nd trimester)' }, { value: 'gt26', label: 'More than 26 weeks (3rd trimester)' }] },
      { id: 'mat_2', text: 'Have you had a prenatal care visit in the past 4 weeks?', type: 'single_choice', required: true, options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }, { value: 'scheduled', label: 'Not yet, but I have one scheduled' }] },
      { id: 'mat_3', text: 'Are you experiencing any of the following symptoms? (Select all that apply)', type: 'multi_choice', required: true, options: [{ value: 'nausea', label: 'Nausea or vomiting' }, { value: 'swelling', label: 'Swelling in hands, face, or feet' }, { value: 'bleeding', label: 'Vaginal bleeding or spotting' }, { value: 'pain', label: 'Severe abdominal or pelvic pain' }, { value: 'headache', label: 'Severe or persistent headaches' }, { value: 'none', label: 'None of the above' }] },
      { id: 'mat_4', text: 'How would you rate your overall physical health during this pregnancy?', type: 'single_choice', required: true, options: [{ value: 'excellent', label: 'Excellent' }, { value: 'good', label: 'Good' }, { value: 'fair', label: 'Fair' }, { value: 'poor', label: 'Poor' }] },
      { id: 'mat_5', text: 'How is your emotional wellbeing during this pregnancy?', type: 'single_choice', required: true, options: [{ value: 'great', label: 'Great — I feel positive and supported' }, { value: 'okay', label: 'Okay — some stress but managing' }, { value: 'struggling', label: 'Struggling — feeling anxious or depressed' }, { value: 'unsure', label: 'Not sure' }] },
      { id: 'mat_6', text: 'Do you have reliable support at home (partner, family, or caregiver) for your pregnancy?', type: 'single_choice', required: true, options: [{ value: 'yes', label: 'Yes' }, { value: 'somewhat', label: 'Somewhat' }, { value: 'no', label: 'No' }] },
      { id: 'mat_7', text: 'Is there anything else you would like your care team to know about your pregnancy?', type: 'text', required: false },
    ],
  },

  // ── Behavioral Health Assessment ─────────────────────────────────────────
  {
    id: 'behavioral',
    title: 'Behavioral Health Assessment',
    description: 'A brief screening to understand your mental and emotional wellbeing so your care team can best support you.',
    category: 'Behavioral Health',
    estimatedMinutes: 6,
    status: 'due',
    dueDate: '2026-04-15',
    questions: [
      { id: 'bh_1', text: 'Over the past 2 weeks, how often have you felt little interest or pleasure in doing things?', type: 'single_choice', required: true, options: [{ value: '0', label: 'Not at all', score: 0 }, { value: '1', label: 'Several days', score: 1 }, { value: '2', label: 'More than half the days', score: 2 }, { value: '3', label: 'Nearly every day', score: 3 }] },
      { id: 'bh_2', text: 'How often have you felt down, depressed, or hopeless?', type: 'single_choice', required: true, options: [{ value: '0', label: 'Not at all', score: 0 }, { value: '1', label: 'Several days', score: 1 }, { value: '2', label: 'More than half the days', score: 2 }, { value: '3', label: 'Nearly every day', score: 3 }] },
      { id: 'bh_3', text: 'How often have you felt nervous, anxious, or on edge?', type: 'single_choice', required: true, options: [{ value: '0', label: 'Not at all', score: 0 }, { value: '1', label: 'Several days', score: 1 }, { value: '2', label: 'More than half the days', score: 2 }, { value: '3', label: 'Nearly every day', score: 3 }] },
      { id: 'bh_4', text: 'Have you received mental health treatment (therapy, medication, or counseling) in the past 12 months?', type: 'single_choice', required: true, options: [{ value: 'yes', label: 'Yes' }, { value: 'no_interested', label: 'No, but I would like to be connected to services' }, { value: 'no', label: 'No, and I do not feel I need to' }] },
      { id: 'bh_5', text: 'How would you rate your current stress level on a typical day?', type: 'single_choice', required: true, options: [{ value: 'low', label: 'Low — I feel calm and in control' }, { value: 'moderate', label: 'Moderate — manageable but present' }, { value: 'high', label: 'High — stress is affecting my daily life' }, { value: 'very_high', label: 'Very high — I feel overwhelmed' }] },
      { id: 'bh_6', text: 'In the past 12 months, have you used alcohol or substances in a way that caused problems for you?', type: 'single_choice', required: true, options: [{ value: 'no', label: 'No' }, { value: 'occasionally', label: 'Occasionally' }, { value: 'frequently', label: 'Frequently' }, { value: 'prefer_not', label: 'Prefer not to answer' }] },
      { id: 'bh_7', text: 'Is there anything you would like your care team to know about your mental or emotional health?', type: 'text', required: false },
    ],
  },

  // ── Chronic Disease Management Assessment ────────────────────────────────
  {
    id: 'chronic',
    title: 'Chronic Disease Management Assessment',
    description: 'Helps your care team understand how you are managing your chronic condition and where support may be needed.',
    category: 'Chronic Condition',
    estimatedMinutes: 7,
    status: 'due',
    dueDate: '2026-04-15',
    questions: [
      { id: 'cd_1', text: 'Which chronic conditions are you currently managing? (Select all that apply)', type: 'multi_choice', required: true, options: [{ value: 'diabetes', label: 'Diabetes or pre-diabetes' }, { value: 'heart', label: 'Heart disease or heart failure' }, { value: 'hypertension', label: 'High blood pressure' }, { value: 'copd', label: 'Asthma or COPD' }, { value: 'ckd', label: 'Chronic kidney disease' }, { value: 'arthritis', label: 'Arthritis or chronic pain' }, { value: 'other', label: 'Other' }] },
      { id: 'cd_2', text: 'How often do you monitor your condition at home (e.g. blood sugar, blood pressure, weight)?', type: 'single_choice', required: true, options: [{ value: 'daily', label: 'Daily' }, { value: 'few_week', label: 'A few times a week' }, { value: 'weekly', label: 'Weekly' }, { value: 'rarely', label: 'Rarely or never' }, { value: 'na', label: 'Not applicable to my condition' }] },
      { id: 'cd_3', text: 'How would you rate your ability to manage your condition day-to-day?', type: 'single_choice', required: true, options: [{ value: 'excellent', label: 'Excellent — I feel confident and in control' }, { value: 'good', label: 'Good — mostly managing well' }, { value: 'fair', label: 'Fair — I struggle at times' }, { value: 'poor', label: 'Poor — I feel overwhelmed by my condition' }] },
      { id: 'cd_4', text: 'In the past 30 days, how many times did you experience a worsening of your symptoms?', type: 'single_choice', required: true, options: [{ value: '0', label: 'None' }, { value: '1_2', label: '1–2 times' }, { value: '3_5', label: '3–5 times' }, { value: 'gt5', label: 'More than 5 times' }] },
      { id: 'cd_5', text: 'Are you following your prescribed treatment plan (medications, diet, exercise)?', type: 'single_choice', required: true, options: [{ value: 'always', label: 'Always' }, { value: 'usually', label: 'Usually' }, { value: 'sometimes', label: 'Sometimes' }, { value: 'rarely', label: 'Rarely' }] },
      { id: 'cd_6', text: 'What barriers do you face in managing your condition? (Select all that apply)', type: 'multi_choice', required: false, options: [{ value: 'cost', label: 'Cost of medications or supplies' }, { value: 'side_effects', label: 'Side effects from treatment' }, { value: 'understanding', label: 'Difficulty understanding my condition' }, { value: 'motivation', label: 'Lack of motivation or energy' }, { value: 'transport', label: 'Transportation to appointments' }, { value: 'none', label: 'No significant barriers' }] },
    ],
  },

  // ── Medication Review Assessment ─────────────────────────────────────────
  {
    id: 'medication',
    title: 'Medication Review Assessment',
    description: 'A medication check-in to help your care team ensure your prescriptions are working safely and effectively.',
    category: 'General Health',
    estimatedMinutes: 5,
    status: 'due',
    dueDate: '2026-04-15',
    questions: [
      { id: 'med_1', text: 'How many prescription medications do you currently take on a regular basis?', type: 'single_choice', required: true, options: [{ value: 'none', label: 'None' }, { value: '1_3', label: '1–3 medications' }, { value: '4_6', label: '4–6 medications' }, { value: '7plus', label: '7 or more medications' }] },
      { id: 'med_2', text: 'How often do you have difficulty remembering to take your medications as prescribed?', type: 'single_choice', required: true, options: [{ value: 'never', label: 'Never' }, { value: 'rarely', label: 'Rarely' }, { value: 'sometimes', label: 'Sometimes' }, { value: 'often', label: 'Often or almost always' }] },
      { id: 'med_3', text: 'Have you experienced any side effects from your medications in the past 30 days?', type: 'single_choice', required: true, options: [{ value: 'no', label: 'No' }, { value: 'mild', label: 'Yes — mild and manageable' }, { value: 'significant', label: 'Yes — significant and affecting my daily life' }, { value: 'unsure', label: 'Not sure' }] },
      { id: 'med_4', text: 'In the past month, have you run out of any of your medications?', type: 'single_choice', required: true, options: [{ value: 'no', label: 'No' }, { value: 'yes_refilled', label: 'Yes, but I got a refill quickly' }, { value: 'yes_gap', label: 'Yes, and I went without for several days' }] },
      { id: 'med_5', text: 'Do you have any concerns about the cost of your medications?', type: 'single_choice', required: true, options: [{ value: 'no', label: 'No' }, { value: 'sometimes', label: 'Sometimes — I occasionally skip doses to save money' }, { value: 'yes', label: 'Yes — cost is a significant problem for me' }] },
      { id: 'med_6', text: 'Please list any concerns, questions, or new medications your care team should be aware of.', type: 'text', required: false },
    ],
  },

  // ── Social Determinants of Health Assessment ─────────────────────────────
  {
    id: 'sdoh',
    title: 'Social Determinants of Health Assessment',
    description: 'Helps us understand the social and environmental factors that may be affecting your health and wellbeing.',
    category: 'Social Determinants',
    estimatedMinutes: 6,
    status: 'due',
    dueDate: '2026-04-15',
    questions: [
      { id: 'sdoh_1', text: 'Which of the following best describes your current housing situation?', type: 'single_choice', required: true, options: [{ value: 'stable', label: 'I have stable, permanent housing' }, { value: 'temporary', label: 'I am in temporary or transitional housing' }, { value: 'risk', label: 'I am at risk of losing my housing' }, { value: 'homeless', label: 'I do not have stable housing' }] },
      { id: 'sdoh_2', text: 'In the past 12 months, have you worried about running out of food before you had money to buy more?', type: 'single_choice', required: true, options: [{ value: 'never', label: 'Never' }, { value: 'sometimes', label: 'Sometimes' }, { value: 'often', label: 'Often' }] },
      { id: 'sdoh_3', text: 'Do you have reliable transportation to get to medical appointments and other essential errands?', type: 'single_choice', required: true, options: [{ value: 'yes', label: 'Yes' }, { value: 'sometimes', label: 'Sometimes — it can be difficult' }, { value: 'no', label: 'No — transportation is a frequent barrier' }] },
      { id: 'sdoh_4', text: 'What is your current employment status?', type: 'single_choice', required: true, options: [{ value: 'employed', label: 'Employed full-time or part-time' }, { value: 'unemployed', label: 'Unemployed and looking for work' }, { value: 'retired', label: 'Retired' }, { value: 'disabled', label: 'Unable to work due to disability or illness' }, { value: 'other', label: 'Other' }] },
      { id: 'sdoh_5', text: 'Do you feel safe in your home and your neighborhood?', type: 'single_choice', required: true, options: [{ value: 'yes', label: 'Yes' }, { value: 'mostly', label: 'Mostly, with some concerns' }, { value: 'no', label: 'No — I do not feel safe' }, { value: 'prefer_not', label: 'Prefer not to answer' }] },
      { id: 'sdoh_6', text: 'Are there other social or financial needs affecting your health that you would like help with?', type: 'text', required: false },
    ],
  },

  // ── Functional Status Assessment ─────────────────────────────────────────
  {
    id: 'functional',
    title: 'Functional Status Assessment',
    description: 'Assesses your ability to perform everyday activities and identifies any support you may need.',
    category: 'General Health',
    estimatedMinutes: 6,
    status: 'due',
    dueDate: '2026-04-15',
    questions: [
      { id: 'fs_1', text: 'How would you rate your ability to perform daily activities (such as bathing, dressing, cooking, and housekeeping)?', type: 'single_choice', required: true, options: [{ value: 'independent', label: 'Fully independent — no help needed' }, { value: 'mostly', label: 'Mostly independent — occasional help' }, { value: 'some_help', label: 'I need help with some activities' }, { value: 'significant', label: 'I need significant assistance with most activities' }] },
      { id: 'fs_2', text: 'Do you need assistance with personal care activities (bathing, dressing, grooming, or toileting)?', type: 'single_choice', required: true, options: [{ value: 'no', label: 'No, I manage independently' }, { value: 'sometimes', label: 'Sometimes' }, { value: 'yes', label: 'Yes, I need regular help' }] },
      { id: 'fs_3', text: 'How would you describe your mobility?', type: 'single_choice', required: true, options: [{ value: 'fully_mobile', label: 'Fully mobile without assistance' }, { value: 'device', label: 'Mobile with a cane, walker, or other device' }, { value: 'limited', label: 'Limited — I have difficulty walking distances' }, { value: 'wheelchair', label: 'I primarily use a wheelchair' }] },
      { id: 'fs_4', text: 'Have you fallen or nearly fallen in the past 12 months?', type: 'single_choice', required: true, options: [{ value: 'no', label: 'No' }, { value: 'near_fall', label: 'Near fall, but did not fall' }, { value: 'yes_no_injury', label: 'Yes — fell, no injury' }, { value: 'yes_injury', label: 'Yes — fell and was injured' }] },
      { id: 'fs_5', text: 'Which of the following activities do you need help with? (Select all that apply)', type: 'multi_choice', required: false, options: [{ value: 'meals', label: 'Preparing meals' }, { value: 'housework', label: 'Light housework' }, { value: 'shopping', label: 'Shopping for groceries' }, { value: 'transport', label: 'Transportation' }, { value: 'finances', label: 'Managing finances or bills' }, { value: 'medications', label: 'Managing medications' }, { value: 'none', label: 'None — I manage all activities independently' }] },
      { id: 'fs_6', text: 'Is there anything else about your physical function or daily activities your care team should know?', type: 'text', required: false },
    ],
  },

  // ── Care Gaps Assessment ──────────────────────────────────────────────────
  {
    id: 'caregaps',
    title: 'Care Gaps Assessment',
    description: 'Identifies any recommended preventive screenings, vaccinations, or care visits you may be missing.',
    category: 'General Health',
    estimatedMinutes: 5,
    status: 'due',
    dueDate: '2026-04-15',
    questions: [
      { id: 'cg_1', text: 'When did you last have an annual wellness visit or physical exam?', type: 'single_choice', required: true, options: [{ value: 'past_year', label: 'Within the past year' }, { value: '1_2_years', label: '1–2 years ago' }, { value: 'gt2_years', label: 'More than 2 years ago' }, { value: 'never', label: 'Never or I am not sure' }] },
      { id: 'cg_2', text: 'Are you up to date on recommended cancer screenings? (colonoscopy, mammogram, Pap smear, etc.)', type: 'single_choice', required: true, options: [{ value: 'yes', label: 'Yes' }, { value: 'partial', label: 'Some, but not all' }, { value: 'no', label: 'No' }, { value: 'unsure', label: 'Not sure' }] },
      { id: 'cg_3', text: 'Have you received a flu shot in the past 12 months?', type: 'single_choice', required: true, options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }, { value: 'declined', label: 'No — I declined' }] },
      { id: 'cg_4', text: 'Are you up to date on other recommended vaccinations? (COVID-19, pneumonia, shingles, etc.)', type: 'single_choice', required: true, options: [{ value: 'yes', label: 'Yes, I believe so' }, { value: 'partial', label: 'Some, but not all' }, { value: 'no', label: 'No' }, { value: 'unsure', label: 'Not sure' }] },
      { id: 'cg_5', text: 'Have you completed recommended lab work (cholesterol, A1C, kidney function, etc.) in the past 12 months?', type: 'single_choice', required: true, options: [{ value: 'yes', label: 'Yes' }, { value: 'partial', label: 'Some, but not all' }, { value: 'no', label: 'No' }, { value: 'unsure', label: 'Not sure' }] },
      { id: 'cg_6', text: 'Are there any preventive services or screenings you have been meaning to schedule?', type: 'text', required: false },
    ],
  },

  // ── Transition of Care Assessment ────────────────────────────────────────
  {
    id: 'transition',
    title: 'Transition of Care Assessment',
    description: 'Supports a safe transition home following a hospital or facility stay by checking in on your recovery and needs.',
    category: 'General Health',
    estimatedMinutes: 6,
    status: 'due',
    dueDate: '2026-04-15',
    questions: [
      { id: 'toc_1', text: 'Were you recently discharged from a hospital, skilled nursing facility, or rehabilitation center?', type: 'single_choice', required: true, options: [{ value: 'yes_hospital', label: 'Yes — hospital' }, { value: 'yes_snf', label: 'Yes — skilled nursing or rehab facility' }, { value: 'yes_er', label: 'Yes — emergency room visit (no overnight stay)' }, { value: 'no', label: 'No recent discharge' }] },
      { id: 'toc_2', text: 'Do you feel you understand your discharge instructions and follow-up care plan?', type: 'single_choice', required: true, options: [{ value: 'yes', label: 'Yes, I understand clearly' }, { value: 'somewhat', label: 'Somewhat — I have some questions' }, { value: 'no', label: 'No — I am confused about my instructions' }] },
      { id: 'toc_3', text: 'Have you scheduled a follow-up appointment with your primary care provider or specialist since discharge?', type: 'single_choice', required: true, options: [{ value: 'yes_scheduled', label: 'Yes, it is scheduled' }, { value: 'yes_completed', label: 'Yes, I have already attended' }, { value: 'no', label: 'No, not yet' }] },
      { id: 'toc_4', text: 'Were you prescribed any new medications at discharge?', type: 'single_choice', required: true, options: [{ value: 'no', label: 'No' }, { value: 'yes_filled', label: 'Yes — I have filled them' }, { value: 'yes_not_filled', label: 'Yes — but I have not filled them yet' }, { value: 'unsure', label: 'Not sure' }] },
      { id: 'toc_5', text: 'How confident do you feel about managing your recovery at home?', type: 'single_choice', required: true, options: [{ value: 'very', label: 'Very confident' }, { value: 'somewhat', label: 'Somewhat confident' }, { value: 'not_very', label: 'Not very confident — I have concerns' }, { value: 'not_at_all', label: 'Not at all confident — I need more help' }] },
      { id: 'toc_6', text: 'Do you have adequate support at home during your recovery (caregiver, family, or home health aide)?', type: 'single_choice', required: true, options: [{ value: 'yes', label: 'Yes' }, { value: 'somewhat', label: 'Somewhat — limited support' }, { value: 'no', label: 'No — I am mostly on my own' }] },
      { id: 'toc_7', text: 'Please share any concerns or questions about your recovery that your care team should address.', type: 'text', required: false },
    ],
  },

  // ── Pediatric Developmental Assessment ───────────────────────────────────
  {
    id: 'pediatric',
    title: 'Pediatric Developmental Assessment',
    description: 'Evaluates your child\'s developmental progress and identifies any areas where early support may be beneficial.',
    category: 'General Health',
    estimatedMinutes: 7,
    status: 'due',
    dueDate: '2026-04-15',
    questions: [
      { id: 'ped_1', text: 'What is your child\'s current age?', type: 'single_choice', required: true, options: [{ value: '0_1', label: 'Under 1 year' }, { value: '1_3', label: '1–3 years' }, { value: '4_5', label: '4–5 years' }, { value: '6_10', label: '6–10 years' }, { value: '11_17', label: '11–17 years' }] },
      { id: 'ped_2', text: 'Do you have any concerns about your child\'s development, behavior, or learning?', type: 'single_choice', required: true, options: [{ value: 'no', label: 'No concerns' }, { value: 'minor', label: 'Minor concerns — nothing serious' }, { value: 'yes', label: 'Yes — I have specific concerns to discuss' }] },
      { id: 'ped_3', text: 'Has your child been diagnosed with any of the following? (Select all that apply)', type: 'multi_choice', required: true, options: [{ value: 'adhd', label: 'ADHD or attention difficulties' }, { value: 'autism', label: 'Autism spectrum disorder' }, { value: 'delay', label: 'Developmental or speech delay' }, { value: 'learning', label: 'Learning disability' }, { value: 'anxiety', label: 'Anxiety or behavioral disorder' }, { value: 'none', label: 'None of the above' }] },
      { id: 'ped_4', text: 'How would you describe your child\'s social interactions with peers and family?', type: 'single_choice', required: true, options: [{ value: 'age_appropriate', label: 'Age-appropriate and positive' }, { value: 'some_difficulty', label: 'Some difficulty — occasional challenges' }, { value: 'significant', label: 'Significant difficulty — frequent struggles' }] },
      { id: 'ped_5', text: 'Does your child currently receive any of the following services? (Select all that apply)', type: 'multi_choice', required: false, options: [{ value: 'speech', label: 'Speech therapy' }, { value: 'ot', label: 'Occupational therapy' }, { value: 'pt', label: 'Physical therapy' }, { value: 'behavioral', label: 'Behavioral therapy (ABA or other)' }, { value: 'special_ed', label: 'Special education services' }, { value: 'none', label: 'None currently' }] },
      { id: 'ped_6', text: 'Is there anything else about your child\'s development or health that you would like the care team to know?', type: 'text', required: false },
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
  hra: {
    hra_1: 'good',
    hra_2: 'same',
    hra_3: 'no',
    hra_5: '0',
    hra_6: 'yes',
    hra_7: ['diabetes', 'hypertension'],
    hra_8: '4-6',
    hra_9: 'None',
    hra_10: 'rarely',
    hra_pain: 'no',
    hra_11: '1-2',
    hra_12: 'somewhat_healthy',
    hra_13: '7-8',
    hra_14: 'never',
    hra_16: 'never',
    hra_17: 'no',
    hra_18: ['none'],
    hra_19: 'yes',
    hra_20: '2026-01-10',
    hra_21: 'no',
    hra_22: 'not_at_all',
    hra_24: 'not_at_all',
    hra_25: 'hardly_ever',
    hra_26: 'yes',
    hra_27: 'never',
    hra_28: 'no',
    hra_29: ['manage_condition'],
    hra_30: 'I am focused on keeping my diabetes under control.',
  },
  comprehensive: {
    comp_1: 'good',
    comp_2: ['diabetes'],
    comp_3: '0',
    comp_4: 'independent',
    comp_5: 'yes_all',
    comp_6: '4_6',
    comp_7: 'no',
    comp_8: ['manage_condition'],
    comp_9: 'No additional concerns at this time.',
  },
  functional: {
    fs_1: 'independent',
    fs_2: 'no',
    fs_3: 'fully_mobile',
    fs_4: 'no',
    fs_5: ['none'],
    fs_6: 'Managing well on my own.',
  },
  sdoh: {
    sdoh_1: 'stable',
    sdoh_2: 'never',
    sdoh_3: 'yes',
    sdoh_4: 'retired',
    sdoh_5: 'yes',
    sdoh_6: 'No additional needs at this time.',
  },
  pediatric_hra: {
    phra_1: '6_11',
    phra_2: 'excellent',
    phra_3: ['none'],
    phra_4: 'yes',
    phra_5: 'healthy',
    phra_6: 'yes',
    phra_7: 'no',
    phra_8: 'Child is developing well and meeting all milestones.',
  },
  oncology_hra: {
    onc_1: 'surveillance',
    onc_2: ['none'],
    onc_3: 'none',
    onc_4: ['none'],
    onc_5: 'well',
    onc_6: 'yes',
    onc_7: 'No current concerns about treatment plan.',
  },
  fall_prevention: {
    fp_1: ['grab_bars', 'rugs'],
    fp_2: ['none'],
    fp_3: 'yes',
    fp_4: 'no',
    fp_5: 'both',
    fp_6: 'Continue with current fall prevention routine.',
  },
  toc_pre: {
    tocp_1: 'yes',
    tocp_2: 'yes',
    tocp_3: 'yes',
    tocp_4: 'no',
    tocp_5: 'yes',
    tocp_6: 'yes_caregiver',
    tocp_7: 'Feel well prepared for discharge.',
  },
  toc_home: {
    toch_1: 'well',
    toch_2: ['none'],
    toch_3: 'yes_all',
    toch_4: 'yes',
    toch_5: 'yes',
    toch_6: 'yes',
    toch_7: 'Recovery is going smoothly.',
  },
}
