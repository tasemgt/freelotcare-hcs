const mongoose = require('mongoose');

const comprehensiveNursingAssessmentSchema = new mongoose.Schema({
  individualName:{
    type: String,
    required: [true, 'Individual name is required']
  },
  dob: {
    type: Date,
    required: [true, 'Date of Birth is required']
  },
  todaysDate: {
    type: Date,
    required: [true, 'Date is required']
  },
  review: {
    title: String,
    healthCareTeam: {
      title: String,
      content: [{
        title: String, practitioner: String, lastSeen: Date, comment: String
      }]
    },
    supports: {
      content: [{
        title: String, relationship: String, telephoneNo: String
      }]
    },
    healthHistory: {
      title: String,
      history: [{
        title: String, diagnosis: String
      }]
    },
    currentMedications:[{
      medication: String, dose: String, freq: String, route: String, purpose: String, sideEffects: String
    }],
    rN: String,
    individual: String,
    date: Date
  },
  currentStatus: {
    title: String,
    currentHistory: [{
      history: String,
      response: String
    }],
    vitalSigns: {
      bloodPressure: String,
      pulse: {
        rate: String, rhythm: String,
      },
      respirations: {
        rate: String, rhythm: String
      },
      temperature: String,
      painLevel: String,
      bloodSugar: String,
      weight: String,
      Height: String,
      comments: String
    },
    labs: String,
    rN: String,
    individual: String,
    date: Date,
    assessment: {
      response: String,
      types: {
        neurological: Boolean,
        musculoskeletal: Boolean,
        unknown: Boolean
      },
      comments: String
    }
  },
  systemsReview: {
    title: String,
    neurological: {
      aims: { title: String, response: String},
      illness: [{
        title: String, response: String
      }],
      seizures: {
        response: String, frequency: String, duration: String
      },
      comments: String
    },
    een: [{
      title: String,
      checks: [{
        name: String,
        checked: Boolean
      }]
    }],
    throat: {
      checks: [{
        name: String,
        checked: Boolean
      }],
      swallowStudy: String,
      results: String,
      comments: String,
      date: Date
    },
    cardiovascular:{ 
      questions: [{
        name: String,
        response: String
      }],
      normalRange: String, comments: String
    },
    respiratory: {
      breathing: [
        {type: String, checked: Boolean}
      ],
      others: [{
        name: String, response: String
      }],
      oxygen:{
        response: String,
        type: String
      },
      comments: String
    },
    gastrointestinal: {
      type: [
        {name: String, checked: Boolean}
      ],
      bowel: [{
        name: String, desc: String
      }],
      others: [{
        name: String, response: String
      }],
      comments: String
    },
    musculoskeletal: {
      comments: String,
      others: [{
        name: String, response: String
      }]
    },
    genitourinary: {
      comments: String,
      others: [{
        name: String, response: String
      }],
      menopausal: {
        response: String,
        date: Date
      },
      menstrualDate: Date
    },
    integumentary: {
      comments: String,
      skinAssessment: String,
      skin: [{
        name: String, checked: Boolean
      }],
      others: [{ name: String, response: String}]
    },
    endocrine: { 
      management: [{ name: String, checked: Boolean}],
      bSRange: String,
      types: [{
        name: String, 
        response: String
      }], 
      diabetesType: String,
      comments: String
    },
    rn: String,
    individual: String,
    date: Date
  },
  healthStatus: {
    immunizationDates: {
      dates: [{
        title: String,
        date: Date
      }],
      comments: String
    },
    nutritional: {
      methods: [{
        method: String,
        checked: Boolean
      }],
      gain:{
        checked: Boolean,
        lbs: String
      },
      lossOver: {
        checked: Boolean,
        text: String
      },
      liquidConsistency: String,
      foodTexture: String,
      therapeuticDiet: String,
      reasonOrderedBy: String,
      weightRange: String,
      numberOfMeals: String,
      assessment: [{
        item: String,
        response: String
      }],
      comments: String
    },
    sleepPatterns: String,
    activityLevel: String,
    substanceUse: String,
    homeLife: String,
    dayActivity: String,
    socialLife: String,
    spiritualLife: String,
    copingSkills: String,
    mentalStatus: {
      appearance: [{
        title: String,
        items: [{ item: String, checked: Boolean }],
        other: String
      }],
      mood:{
        items: [{
          item: String,
          checked: Boolean
        }],
        other: String
      }
    },
    cognition: [{
      title: String,
      items: [{ item: String, response: String }]
    }],
    thoughts: {
      checks: [{
        title: { name: String, response: String},
        items: [{ item: String, response: String }]
      }],
      comments: String
    },
    challengingBehaviors: {
      headers: [{ question: String, response: String }],
      behaviors: [{
        item: String,
        frequency: String,
        severity: String,
        lastExhibited: String
      }],
      comments: String
    },
    communication: {
      primaryLanguage: String,
      normalMethods:{
        methods: [{
          method: String,
          response: String
        }],
        communicationDeviceType: String,
        otherBehaviors: String
      },
      painMethods:{
        methods: [{
          method: String,
          response: String
        }],
        communicationDeviceType: String,
        otherBehaviors: String,
        painScaleUse: String,
        painScaleType: String,
        comments: String
      } 
    }
  },
  implementationAssessment:{
    decisionMaking: [{
      item: String,
      checked: Boolean
    }],
    supportSystems: [
      {
        item: String,
        checks: {
          adequate: String, 
          reliable: String, 
          available: String, 
          effectiveCommunicator: String
        }
      }
    ],
    needToReassess:[{
      healthTopic: String,
      longTermNeed: { text: String, response: String },
      statusChangePossible: {text: String, response: String },
      frequencyOfReassessment: String
    }],
    knowledgeDemonstrations: {
      demonstrations: [{
        healthTopic: String,
        typeOfDem: String,
        individual: String,
        cra: String,
        hhcc: String
      }],
      comments: String
    },
    sectionA: {
      check: Boolean,
      item: String,
      printedName: String,
      signature: String,
      date: Date
    },
    sectionB:{
      check: Boolean,
      item: String,
      printedName: String,
      signature: String,
      date: Date
    },
    sectionC: {
      check: Boolean,
      printedName: String,
      signature: String,
      date: Date
    },
    safeAdministrationOfMedications: {
      rnDelegationWorksheet: {
        attached: Boolean,
        nA: Boolean
      },
      items: [{
        title: String,
        item: String,
        checked: Boolean
      }],
      unDelegatedRoutes: String,
      unDelegatedMedications: String
    },
    nurseSupervision: {
      unlicensedPersonnel: String,
      items: [{
        item: String,
        checked: Boolean
      }],
      consultantsOtherCheck: Boolean,
      consultantsOtherValue: String,

      frequencyOfRNMonitoring: {
        onceWithin: Boolean,
        onceWithinFirst: String,
        monthly: Boolean,
        quarterly: Boolean,
        onceYearAdditionally: Boolean,
        annually: Boolean,
        other: Boolean,
        otherValue: String
      },
      frequencyOfAdditionalRNMonitoring: {
        notApplicable: Boolean,
        onceWithin: Boolean,
        monthly: Boolean,
        quarterly: Boolean,
        onceYearAdditionally: Boolean,
        notes: String
      }
    }
  },
  summary: {
    title:String,
    clinicalImpressions: [{
      title: String,
      content: String
    }],
    nursingServicePlan:{
      title: String,
      content: String
    },
    interventionStrategies: {
      objectives: [{
        objectives: {title: String, content: String},
        startDate: {title: String, content: Date},
        targetCompletion: {title: String, content: Date},
        units: {title: String, content: String},
        totalUnits: {title: String, content: String}
      }],
      nursingUnitsNeeded: {
        rn: String,
        rnSpecialized: String,
        lvn: String,
        lvnSpecialized: String,
        desiredOutcomes: String
      },
      printedName: String,
      signature: String,
      date: Date
    },
    reviewOfAssessment: {
      reviewDate: Date,
      purpose: String,
      descriptionOfReview: String,
      actionTaken: String,
      noChangeRequired: Boolean,
      changesInNursingPlan: String,
      rnSignature: String,
      date: String
    },

    rN: String,
    individual: String,
    date: Date

  }
    
});


module.exports = mongoose.model('ComprehensiveNursingAssessment', comprehensiveNursingAssessmentSchema);