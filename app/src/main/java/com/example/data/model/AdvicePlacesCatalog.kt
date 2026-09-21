package com.example.data.model

object AdvicePlacesCatalog {

  val places: List<AdvicePlace> = listOf(
    AdvicePlace(
      id = "place_womens_legal_clinic",
      name = "Women's Law & Rights Advocacy Clinic",
      category = AdviceCategory.LEGAL_RIGHTS,
      address = "420 Civic Center Plaza, Suite 210",
      distanceMiles = 0.8,
      adviceType = "Free Family & Separation Legal Advice Desk",
      hours = "Mon - Thu: 9:00 AM - 5:00 PM • Walk-in triage daily",
      phone = "1-800-555-5342",
      rating = 4.9f,
      mapCoordX = 0.32f,
      mapCoordY = 0.28f,
      isFreeOrSlidingScale = true,
      keyAdviceOffered = listOf(
        "Confidential legal guidance for divorce, separation & custody",
        "Free protective orders and financial entitlement consultations",
        "No ID check or legal immigration status required for advice"
      )
    ),
    AdvicePlace(
      id = "place_career_transition_hub",
      name = "Women's Career & AI Upskilling Center",
      category = AdviceCategory.CAREER_JOB,
      address = "850 Innovation Parkway, Floor 3",
      distanceMiles = 1.4,
      adviceType = "Career Coaching, AI Anxiety Support & Resume Mentorship",
      hours = "Mon - Fri: 8:30 AM - 6:30 PM • Sat 10 AM - 2 PM",
      phone = "1-800-555-7284",
      rating = 4.95f,
      mapCoordX = 0.68f,
      mapCoordY = 0.35f,
      isFreeOrSlidingScale = true,
      keyAdviceOffered = listOf(
        "1-on-1 career transition coaching and AI tools navigation",
        "Combating remote work isolation & community co-working desk",
        "Resume and interview preparation after maternity or life gaps"
      )
    ),
    AdvicePlace(
      id = "place_perinatal_wellness",
      name = "Lotus Perinatal & Maternal Health Sanctuary",
      category = AdviceCategory.WOMEN_HEALTH,
      address = "124 Rosewood Gardens Blvd",
      distanceMiles = 1.9,
      adviceType = "Postpartum Mental Health, Doula & Matrescence Advice",
      hours = "Daily: 8:00 AM - 7:00 PM (Drop-ins & Quiet Nursery)",
      phone = "1-800-555-4673",
      rating = 5.0f,
      mapCoordX = 0.45f,
      mapCoordY = 0.58f,
      isFreeOrSlidingScale = true,
      keyAdviceOffered = listOf(
        "Maternal mental health screening & postpartum emotional care",
        "Free lactation and non-judgmental baby bonding circles",
        "Quiet sensory room for overwhelmed mothers and new parents"
      )
    ),
    AdvicePlace(
      id = "place_mental_health_sanctuary",
      name = "Serene Mind Community Counseling Hub",
      category = AdviceCategory.MENTAL_HEALTH,
      address = "310 Olive Grove Way",
      distanceMiles = 2.3,
      adviceType = "Sliding Scale & Walk-in Therapy Advice Clinic",
      hours = "Mon - Sat: 9:00 AM - 8:00 PM",
      phone = "1-800-555-3275",
      rating = 4.85f,
      mapCoordX = 0.22f,
      mapCoordY = 0.65f,
      isFreeOrSlidingScale = true,
      keyAdviceOffered = listOf(
        "Crisis de-escalation, grief processing & panic attack grounding",
        "Trauma-informed, female-identifying clinicians",
        "Free 30-minute introductory advice and therapeutic matching"
      )
    ),
    AdvicePlace(
      id = "place_sisterhood_drop_in",
      name = "Shakti Sisterhood Center & Tea Sanctuary",
      category = AdviceCategory.COMMUNITY_SANCTUARY,
      address = "55 Harmonious Avenue",
      distanceMiles = 0.6,
      adviceType = "Safe Drop-in Space, Peer Guidance & Girls Group Meetups",
      hours = "Tue - Sun: 10:00 AM - 9:00 PM",
      phone = "1-800-555-8327",
      rating = 5.0f,
      mapCoordX = 0.55f,
      mapCoordY = 0.42f,
      isFreeOrSlidingScale = true,
      keyAdviceOffered = listOf(
        "Free herbal tea, cozy library, and zero-pressure seating",
        "Weekly drop-in advice desks with lived-experience mentors",
        "Emergency quiet respite room with soundproofing and safety exits"
      )
    ),
    AdvicePlace(
      id = "place_financial_empowerment",
      name = "Women's Financial Dignity & Budgeting Clinic",
      category = AdviceCategory.LEGAL_RIGHTS,
      address = "715 Commerce Street, Suite 104",
      distanceMiles = 2.8,
      adviceType = "Debt Relief, Independent Bank Setup & Financial Abuse Help",
      hours = "Mon, Wed, Fri: 10:00 AM - 4:00 PM",
      phone = "1-800-555-3462",
      rating = 4.9f,
      mapCoordX = 0.78f,
      mapCoordY = 0.72f,
      isFreeOrSlidingScale = true,
      keyAdviceOffered = listOf(
        "Confidential account setup for women regaining independence",
        "Negotiating student or credit card debt without panic",
        "Safety planning when finances are monitored by a partner"
      )
    ),
    AdvicePlace(
      id = "place_caregivers_respite",
      name = "Elder Caregiver Guidance & Respite Center",
      category = AdviceCategory.COMMUNITY_SANCTUARY,
      address = "98 Heritage Oak Drive",
      distanceMiles = 3.4,
      adviceType = "Elder Care Navigation, Respite Support & Sibling Mediation",
      hours = "Mon - Fri: 9:00 AM - 5:00 PM",
      phone = "1-800-555-2273",
      rating = 4.88f,
      mapCoordX = 0.15f,
      mapCoordY = 0.40f,
      isFreeOrSlidingScale = true,
      keyAdviceOffered = listOf(
        "Navigating elder care subsidies, memory care & insurance hurdles",
        "Caregiver burnout counseling & emotional boundary advice",
        "Free weekend adult day respite matching"
      )
    ),
    AdvicePlace(
      id = "place_immigrant_roots",
      name = "Global Sisterhood & Newcomer Welcome Center",
      category = AdviceCategory.COMMUNITY_SANCTUARY,
      address = "202 International Boulevard",
      distanceMiles = 3.9,
      adviceType = "Multilingual Community Support, Language Practice & Advice",
      hours = "Mon - Sat: 9:00 AM - 6:00 PM",
      phone = "1-800-555-4722",
      rating = 4.95f,
      mapCoordX = 0.85f,
      mapCoordY = 0.18f,
      isFreeOrSlidingScale = true,
      keyAdviceOffered = listOf(
        "Free cross-cultural translation and paperwork guidance",
        "Friendly women's conversation circles & friendship pairing",
        "Cultural identity preservation and neighborhood orientation"
      )
    )
  )
}
