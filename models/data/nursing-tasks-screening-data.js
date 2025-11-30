module.exports = {
  routes: [
    'Oral', 
    'Eye or ear drops',
    'Intravenous/IV',
    'Topical',
    'Injections (Including insulin)',
    'Nebulizer',
    'Nasal',
    'Sublingual (under the tongue)',
    'Enteral tube/naso-gastric (NG)/gastric (G-tube)',
    'Metered dose inhaler (by mouth)',
    'Suppositories (rectal or vaginal)'
  ],
  sections:[
    {
      title: 'Special Procedures', 
      items: [
        'Does the individual require assistance from paid staff to measure pulse, respiration, blood pressure, temperature, weight, fluid intake or output, oxygen saturation or glucose levels?',
        'Does the individual require assistance from paid staff to perform sterile procedures? (e.g., wound care including bed sores, tracheostomy care/suctioning, urinary catheter placement and care)',
        'Does the individual require assistance from paid staff to use a CPAP, BiPAP or other oxygen therapy?',
        'Does the individual require assistance from paid staff to use a vagal nerve stimulator for seizure control?',
        'Does the individual require assistance from paid staff to administer PRN medication to manage behavior?'
      ]
    },
    {
      title: 'Eating', 
      items: [
        'Does the individual require paid staff to provide intravenous/IV nutrition or NG or G-tube feeding, special diets or additives (e.g., thickening agents) for oral feeding?',
        'Does the individual require paid staff to intervene due to a history of frequent choking episodes?'
      ]
    },
    {
      title: 'Bathing', 
      items: [
        `Does the individual require paid staff to bathe him/her using specific bathing techniques because the individual has a
        chronic condition (e.g., brittle bone disease, history of aspiration or GERD (gastric reflux), etc.) that would put the individual
        at significant risk for injury if the paid staff were not skilled in the specific bathing techniques?`
      ]
    },
    {
      title: 'Toileting', 
      items: [
        'Does the individual require paid staff to perform urinary catheterization, either long term or occasionally?',
        'Does the individual require paid staff to intervene due to a history of bowel impactions/chronic constipation that required medical intervention?'
      ]
    },
    {
      title: 'Mobility', 
      items: [
        'Does the individual require paid staff to change his/her position to prevent skin breakdown?',
        'Does the individual require paid staff to use a mechanical lift to transfer him/her?',
        'Does the individual require the use of physical or mechanical restraints by paid staff?'
      ]
    }
  ],
  reviews: [
    `As the program provider for the individual identified above, I have reviewed the information provided and agree that the
    documentation regarding nursing tasks is correct and that the individual’s health and safety can be ensured without an RN
    assessment by the provider’s RN or nursing services on the individual’s IPC. An LVN will not provide on-call services for this
    individual. An assessment by the provider’s RN is not required for this individual.`,
    `As the program provider for the individual identified above, I have reviewed the information provided and, based on the documentation
    regarding nursing tasks, have determined the individual’s health and safety CANNOT be ensured without an RN assessment by the
    provider’s RN or nursing services on the individual’s IPC or that an LVN participating in the LVN ON-Call Pilot may provide on-call
    services for this individual.`
  ]
}