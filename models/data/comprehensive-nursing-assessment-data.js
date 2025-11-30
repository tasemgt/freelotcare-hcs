module.exports = {
  review: {
    healthCareTeam: [
      'Primary Care:', 'Psychiatrist:', 'Neurologist:', 'Dentist:', 'Optometrist:'
    ],
    support:[
      'Client Responsible Adult (CRA):', 'Guardian:'
    ],
    healthHistory: [
      'Axis I:', 'Axis II:', 'Axis III:', 'Axis IV:', 'History of Major Medical/Surgical Occurrences:'
    ]
  },
  systems: {
    neurological: [
      'Headaches', 'Pupils equal and reactive to light and accommodation', 'Heat/cold reflex', 'Dizziness',
      'Tremors', 'Extrapyramidal symptoms', 'Impaired balance/coordination', 'Numbness/tingling/Paresthesia',
      'Medication side effects', 'Paralysis', 'Petit Mal', 'Clonic (repretitive jerking)', 'Absence', 'Tonic (muscle rigidity)',
      'Myoclonic (sporadic Jerking)', 'Atonic (loss of muscle tone)'
    ],
    een:[
      {
        title: 'Eye/Vision',
        checks: ['Clear', 'Red', 'Right impaired', 'Left impaired', 'Adaptive aid']
      },
      {
        title: 'Ears/Hearing',
        checks: ['Normal', 'Ringing', 'Right impaired', 'Left impaired', 'Adaptive aid']
      },
      {
        title: 'Nose/Smell',
        checks: ['Within normal limits', 'Smell intact', 'Smell not intact', 'Nose bleed', 'Frequent sinus congestion', 'Frequent sinus infection']
      },
      {
        title: 'Oral',
        checks: ['Within normal limits', 'Difficulty chewing', 'Mouth pain', 'Halitosis', 'Dentures', 'Endentulous', 'Involuntary tongue movement', 'Dry mouth from medications']
      },
      {
        title: 'Throat',
        checks: ['Within normal limits', 'Sore throats', 'Difficulty speaking', 'Difficulty swallowing', 'Tonsil enlargement', 'Thyroid enlargement', 'History of choking']
      }
    ],
    cardiovascular: [
      'Chest pain', 'Cool/Numb extremities', 'Capillary refil less than or equal to two seconds', 'Edema', 'Activities of daily living (ADL) limitations', 'Compression stockings'
    ],
    respiratory: {
      breathing: ['Slow', 'Normal', 'Rapid', 'Shallow', 'Painful'],
      illness: [
        'Short of breath', 'Feeding tube', 'Tracheostomy', 'Wheezing', 'Positioning orders', 'Continuous positive airway presure (CPAP)', 'Cough', 'Aspiration history', 'Inhalation agent',
        'Productive', 'Pneumonia history'
      ]
    },
    gastro: {
      type: ['Gastrostomy', 'Jejunostomy', 'No tube'],
      bowel: ['Bowel sounds', 'Last bowel movement', 'Bowel habits (frequency and description)'],
      others: ['Continent', 'Reflux', 'History of risk constipation', 'Frequent nausea', 'Straining pain', 'History of risk impaction', 'Frequent vomiting', 'Diarrhea', 'Bowel program',
        'Indigestion', 'Odd stools', 'Medications influencing bowels (laxatives, anti-diarrheals, Iron, Calcium, Anticholinergics, etc.)', 'Heartburn', 'Hemorrhoids', 'Apetite loss',
        'Independent toileting'
      ]
    },
    musculoskeletal: [
      'Pain', 'Prosthesis', 'Impaired range of motion', 'Weakness', 'Deformity', 'Impaired gait', 'Stiffness', 'Contractures', 'Adaptive equipment'
    ],
    genitourinary: [
      'Incontinent', 'Flank pain', 'Sexually active', 'Stress', 'Urge', 'History of urinary tract infections', 'Prostate issues', 'Bladder program', 'Discharge', 'Frequent urination',
      'Itching', 'Cloudy/dark urine', 'Hemodialysis', 'Bloody urine', 'Peritoneal dialysis'
    ],
    integumentary: {
      skin: ['Normal', 'Moist', 'Dry', 'Cyanotic', 'Warm', 'Pale', 'Jaundice', 'Cold', 'Dusky', 'Flushed'],
      illness: ['Open wound', 'Rash', 'Blemished', 'Bruising', 'Diaphoretic', 'Poor skin turgor', 'Breakdown related to adaptive aids/prosthesis', 'Risk for breakdown', 'History of breakdown']
    },
    endocrine:  {
      types: ['Thyroid dysfunction', 'Atypical antiphychotics or other medications affecting blood sugar', 'Pre-Diabetic hypoglycemic/hyperglycemic episodes'],
      diabetes: [
        'Diet', 'Oral Medications', 'Insulin', 'Other injectable medication to manage diabetes'
      ]
    }
  },
  healthStatus:{
    immunizations: [
      'DPT', 'TOPV', 'HIB', 'MMR', 'TD', 'TDS', 'FLU SHOT'
    ],
    nutritional: {
      assessments: [ 'Orally', 'Via jejunostomy tube', 'Via gastrotomy tube', 'Other' ],
      items: [
        'Recent weight change', 'Recent changes in appetite/medication', 'Satisfied with current weight', 'Food use as a coping mechanism',
        'Assistive devices with eating', 'Use of medications that can cause difficulty swallowing (e.g., Abilify, other psychoactives),', 'Knowledge of 4 basic food groups',
        'Access to healthy/appropriate diet', 'Dietary deficiencies', 'Adequate fluid intake', 'Nutritional supplements', 'Interactions with medications and food'
      ]
    },
    mentalStatus: {
      appearance: [
        {
          title: 'Posture:',
          items: ['Normal', 'Rigid', 'Slouched']
        },
        {
          title: 'Grooming and Dress:',
          items: ['Appropriate', 'Inappropriate', 'Disheveled', 'Neat']
        },
        {
          title: 'Facial Expression:',
          items: ['Calm', 'Alert', 'Stressed', 'Perplexed', 'Tense', 'Dazed']
        },
        {
          title: 'Eye Contact:',
          items: ['Eyes not open', 'Good contact', 'Avoids contact', 'Stares']
        },
        {
          title: 'Speech Quality:',
          items: ['Clear', 'Slow', 'Slurred', 'Loud', 'Rapid', 'Incoherent', 'Mute']
        }
      ],
      mood: [
        'Cooperative', 'Excited', 'Irritable', 'Uncooperative', 'Agitated', 'Scared', 'Depressed', 'Anxious', 'Hostile',
        'Euphoric', 'Suspicious', 'Angry'
      ]
    },
    cognition: [
      {
        title: 'Cognitive impairment',
        items: ['Mild', 'Moderate', 'Severe', 'Profound']
      },
      {
        title: 'Oriented',
        items: ['Person', 'Place', 'Time']
      },
      {
        title: 'Attention span',
        items: ['Easily distracted']
      },
      {
        title: 'Memory',
        items: ['Remote', 'Recent', 'Immediate recall']
      },
      {
        title: 'Emotions',
        items: ['Euphoric', 'Happy', 'Apathetic', 'Sadness', 'Depressed', 'Anxious', 'Irritable', 'Hostage feelings', 'Emotional lability',
          'Inappropriate affect'
        ]
      }
    ],
    thoughts: [
      {
        title: 'Delusions',
        items: ['Grandeur', 'Persecutory', 'Somatic', 'Other']
      },
      {
        title: 'Hallucinations',
        items: ['Visual', 'Auditory', 'Tactile', 'Olfactory']
      },
      {
        title: 'Thought process',
        items: ['Coherent Organized', 'Logical']
      },
      {
        title: 'Thought content',
        items: ['Phobias', 'Hypochondria', 'Antisocial urges', 'Obsessions', 'Suicidal ideations', 'Homicidal ideations']
      }
    ],
    behaviors: {
      headers: [
        'Are medications used to control any behaviors?',
        'Currently has a formal Behavior Plan?'
      ],
      items: [
        'Hurtful to self', 'Hurtful to others', 'Destructive to property', 'Pica', 'Resists care', 'Socially offensive/Disruptive Behavior',
        'At risk behavior of Wandering', 'At risk behavior of Elopement', 'At risk behavior of Sexually aggressive behavior', 'History of suicide attempt',
        'Other serious behavior'
      ]
    },
    communication: [
      'Verbal', 'Limited verbal', 'Gestures', 'Sign language', 'Facial expressions', 'Eye movement', 'Paralinguistics (sounds)', 
      'Touch', 'Body language', 'Acting out', 'Head banging', 'Augmented communication device'
    ]
  },
  assessment: {
    decisions: [
      `Probably can make higher level decisions (such as whether to undergo or withdraw life sustaining treatments that require understanding the nature, probable consequences, 
        burdens and risks of proposed treatment).`,
      `Probably can make limited decisions that require simple understanding, able to direct own health care, including delegated tasks.`,
      `Probably can express agreement with decisions proposed by someone else.`,
      `Cannot effectively participate in any kind of health care decision making.`
    ],
    supportSystems : [
      'CRA', 'Host Home or Companion Care (HH/CC) Provider', 'Guardian/Other'
    ],
    worksheets: [
      {
        title: 'Self-Administration of Medication.',
        content: `Individual knows hoe to safely take each medication (what, why) dose, route, time of each medication. The individual is competent to safely self-administer medications independently
        or independently with ancillary aid provided to the individual in the individual's self-administered medication treatment or regimen, such as reminding an individual to take a 
        medication at the prescribed time, opening and closing a medication container, pouring a predetermined quantity of liquid to be ingested, returning a medication to the proper storing area, 
        and assisting in reordering medications from a pharmacy. No RN Delegation is necessary. [225.1(a)(3)]`
      },
      {
        title: 'Administration of medication to an indidvidual by a paid unlicensed person(s) to ensure that medications are received safely.',
        content: `Administration of medications includes removal of an individual/unit dose from a previously dispensed, properly labeled container; verifying it with the medication order; giving the correct
        medication and the correct dose to the proper individual at the proper time by the proper route; and accurately recording the time and dose given. [TX BON 225.4(2)]. Check the following that apply:`
      },
      {
        title: 'CRA can safely direct as an HMA. No RN delegation is necessary.',
        content: `The individual has a single identified CRA whose knowledge, abilities and availability qualifies the administration of oral medications (by mouth or through a permanently placed feeding tube)
        as an HMA exempt from delegation and is appropriate per RN judgment. Medications may be administered for stable and predictable conditions (not initial doses and/or for acute conditions) without RN supervision
        provided that the CRA is willing, able and agrees in writing to train the unlicensed person(s) in performing the task at least once to assure competence and will be immediately accessible in person or by
        telecommunications to the unlicensed person(s) when the task is performed. [225.4(8), 225.8]`
      },
      {
        title: 'RN delegation necessary to ensure safe medication administration.',
        content: `RN can safely authorize unlicensed personnel to administer medications for stable and predictable conditions as defined in 225.4(11) not requiring nursing judgment. Competency of each unlicensed
        personnel, including the ability to recognize and inform the RN of client changes related to the task must be verified by RN. The six rights of delegation (the right task, the right person to whom the delegation 
          is made, the right circumstances, the right direction and communication by the RN, the right supervision, and the right documentation) and all criteria at 225.9 must be met. CRA lacks knowledge, abilities and/or
          availability per 225.8 to direct as an HMA. Individual (if competent), CRA (if one exists) or Provider Advocate Committee (PAC) must approve the decision of the RN to delegate tasks in writing. See delegation
           criteria at 225.9, 225.10`
      },
      {
        title: 'The RN has determined that delegation is not required because the parent/LAR/foster care provider can assume responsibility and accountability for the individual\'s health care.',
        content: `The RN has considered the length of time the individual has been living in the home, the relationship of the individual and foster care provider, the supports available to the foster care provider, and has
        determined that the foster care provider can safely assume this responsibility. The RN will serve as a resource, consultant or educator, and will intervene when necessary to ensure safe and effective care. [225.6(a)(3)]
        Documentation of subsequent interventions, including when additional follow-up is needed, will be a part of the RN's nursing care plan.`
      },
      {
        title: 'The RN has determined that delegation is not required for oral, topical and metered dose inhalers.',
        content: `The RN has determined that the medications not being delegated to paid unlicensed personnel are for a stable or predictable condition. The RN or LVN, under the direction of an RN, has trained and determined the
        paid unlicensed personnel competency. [Human Resources Code, Chapter 161, Subchapter D]`
      }
    ],
    consultants: [
      'Provider Advocate Committee (PAC)',
      'Legally Authorized Representative (LAR)',
      'Client Responsible Adult (CRA)',
      'Individual'
    ]
  },
  summary: {
    impressions: [
      'Strengths as related to health',
      'Consultations recommended',
      'Summary'
    ]
  }
}