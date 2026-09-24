// SuperShakti Catalog Dataset (Global Support, Real Coordinates, Zero Emojis)
import { GEOGRAPHIC_DIRECTORY, getAllStatesForCountry, getAllCitiesForCountryAndState, normalizeCountryCode } from './geoData.js';

export { GEOGRAPHIC_DIRECTORY, getAllStatesForCountry, getAllCitiesForCountryAndState };

export const COUNTRIES = {
  "US": {
    "code": "US",
    "name": "United States",
    "flag": "",
    "emergency": "911",
    "crisisHelplines": [
      {
        "name": "988 Crisis & Support Lifeline",
        "number": "988",
        "hours": "24/7 Call or Text 988 (English & Spanish)",
        "description": "Free, confidential 24/7 support for emotional distress, panic, or crisis.",
        "isTollFree": true,
        "sms": "988"
      },
      {
        "name": "National Domestic Violence Hotline",
        "number": "1-800-799-7233",
        "hours": "24/7 Confidential (Call or text START to 88788)",
        "description": "Safety planning, emergency refuge shelter triage, and domestic crisis support.",
        "isTollFree": true,
        "sms": "88788"
      },
      {
        "name": "Postpartum Support International (PSI) HelpLine",
        "number": "1-800-944-4773",
        "hours": "Daily 8am - 11pm EST (Call or Text 'HELP')",
        "description": "Trained volunteers providing perinatal depression, anxiety, and new mother resources.",
        "isTollFree": true,
        "sms": "1-800-944-4773"
      },
      {
        "name": "Cyber Civil Rights Initiative (CCRI) Helpline",
        "number": "1-844-878-2274",
        "hours": "24/7 Dedicated Non-Consensual Harm Help",
        "description": "Immediate guidance for women facing deepfakes, online harassment, and stalkerware.",
        "isTollFree": true
      }
    ],
    "mapCenter": [
      38.5,
      -96.0
    ],
    "mapZoom": 4
  },
  "GB": {
    "code": "GB",
    "name": "United Kingdom",
    "flag": "",
    "emergency": "999",
    "crisisHelplines": [
      {
        "name": "Samaritans UK",
        "number": "116 123",
        "hours": "24/7 Free Helpline",
        "description": "Round-the-clock non-judgmental listening support for anyone in distress.",
        "isTollFree": true
      },
      {
        "name": "National Domestic Abuse Helpline (Refuge)",
        "number": "0808 2000 247",
        "hours": "24/7 Freephone Nationwide",
        "description": "Empowering women and children escaping domestic abuse and coercive control.",
        "isTollFree": true
      },
      {
        "name": "PANDAS Foundation UK (Postnatal Support)",
        "number": "0808 1961 776",
        "hours": "Daily 11am - 10pm",
        "description": "Dedicated UK support for parents and carers coping with perinatal illness.",
        "isTollFree": true
      },
      {
        "name": "Revenge Porn Helpline (SWGfL UK)",
        "number": "0345 6000 459",
        "hours": "Mon - Fri 10am - 4pm",
        "description": "UK national service supporting victims of non-consensual intimate image abuse and deepfakes.",
        "isTollFree": false
      }
    ],
    "mapCenter": [
      53.5,
      -2.0
    ],
    "mapZoom": 6
  },
  "CA": {
    "code": "CA",
    "name": "Canada",
    "flag": "",
    "emergency": "911",
    "crisisHelplines": [
      {
        "name": "988 Crisis Helpline Canada",
        "number": "988",
        "hours": "24/7 Call or Text 988 (English & French)",
        "description": "Bilingual nationwide crisis distress and mental health support service.",
        "isTollFree": true,
        "sms": "988"
      },
      {
        "name": "Assaulted Women's Helpline (AWHL)",
        "number": "1-866-863-0511",
        "hours": "24/7 Anonymous & Confidential",
        "description": "Crisis line for all women in Ontario & Canada who have experienced any form of abuse.",
        "isTollFree": true
      },
      {
        "name": "ShelterSafe Canada",
        "number": "1-888-346-5806",
        "hours": "24/7 Online Directory & Help",
        "description": "Connecting women and children with safe emergency shelters and transition houses across Canada.",
        "isTollFree": true
      }
    ],
    "mapCenter": [
      53.0,
      -95.0
    ],
    "mapZoom": 4
  },
  "AU": {
    "code": "AU",
    "name": "Australia",
    "flag": "",
    "emergency": "000",
    "crisisHelplines": [
      {
        "name": "1800RESPECT Australia",
        "number": "1800 737 732",
        "hours": "24/7 National Sexual Assault, Domestic & Family Violence Line",
        "description": "Confidential counseling, safety planning, and referral for Australian women.",
        "isTollFree": true
      },
      {
        "name": "Lifeline Australia",
        "number": "13 11 14",
        "hours": "24/7 Crisis Support & Life Assistance",
        "description": "Free, confidential telephone crisis support service available across all states.",
        "isTollFree": true,
        "sms": "0477 13 11 14"
      },
      {
        "name": "PANDA (Perinatal Anxiety & Depression Australia)",
        "number": "1300 726 306",
        "hours": "Mon - Sat 9am - 7:30pm AEST",
        "description": "National helpline supporting women, partners, and families coping with perinatal mental health.",
        "isTollFree": true
      }
    ],
    "mapCenter": [
      -27.0,
      134.0
    ],
    "mapZoom": 4
  },
  "EU": {
    "code": "EU",
    "name": "European Union",
    "flag": "",
    "emergency": "112",
    "crisisHelplines": [
      {
        "name": "112 European Emergency Number",
        "number": "112",
        "hours": "24/7 Free across all EU Member States",
        "description": "Single European emergency number for immediate ambulance, police, or rescue.",
        "isTollFree": true
      },
      {
        "name": "Hilfetelefon Gewalt gegen Frauen (Germany & EU)",
        "number": "116 016",
        "hours": "24/7 Free in 18 Languages",
        "description": "German Federal helpline providing counseling for women affected by violence across Europe.",
        "isTollFree": true
      },
      {
        "name": "3919 Violences Femmes Info (France)",
        "number": "3919",
        "hours": "24/7 Free & Anonymous",
        "description": "National listening and referral line for women victims of domestic and gender violence.",
        "isTollFree": true
      },
      {
        "name": "Mental Health Europe Partner Network",
        "number": "116 123",
        "hours": "24/7 Emotional Support in EU Countries",
        "description": "Harmonized European emotional support and active listening telephone service.",
        "isTollFree": true
      }
    ],
    "mapCenter": [
      50.0,
      10.0
    ],
    "mapZoom": 4
  },
  "IN": {
    "code": "IN",
    "name": "India",
    "flag": "",
    "emergency": "112",
    "crisisHelplines": [
      {
        "name": "National Emergency & Women Help (India)",
        "number": "112",
        "hours": "24/7 National Emergency Support System",
        "description": "Unified pan-India emergency number for immediate safety and women distress response.",
        "isTollFree": true
      },
      {
        "name": "National Commission for Women (NCW) Helpline",
        "number": "7827170170",
        "hours": "24/7 Dedicated Women Helpline",
        "description": "Emergency support, legal aid, and counseling for women facing violence or harassment.",
        "isTollFree": true
      },
      {
        "name": "KIRAN National Mental Health Helpline",
        "number": "1800-599-0019",
        "hours": "24/7 Toll-Free in 13 Languages",
        "description": "Government of India mental health rehabilitation, anxiety, and panic support line.",
        "isTollFree": true
      },
      {
        "name": "Vandrevala Foundation Mental Health Support",
        "number": "9999 666 555",
        "hours": "24/7 Free, Confidential Tele-Counseling",
        "description": "Dedicated clinical psychologists and crisis de-escalation for emotional distress.",
        "isTollFree": true
      }
    ],
    "mapCenter": [
      22.0,
      78.5
    ],
    "mapZoom": 5
  },
  "GLOBAL": {
    "code": "GLOBAL",
    "name": "Global / International",
    "flag": "",
    "emergency": "Local Emergency Services",
    "crisisHelplines": [
      {
        "name": "Find A Helpline (Global Directory)",
        "number": "Visit findahelpline.com",
        "hours": "24/7 Free, Confidential Search in 130+ Countries",
        "description": "Direct, free access to crisis hotlines and emotional support centers worldwide.",
        "isTollFree": true,
        "url": "https://findahelpline.com/"
      },
      {
        "name": "Befrienders Worldwide International Network",
        "number": "Visit befrienders.org",
        "hours": "24/7 Multilingual Global Support",
        "description": "Global network of 349 emotional support centers across 32 countries.",
        "isTollFree": true,
        "url": "https://www.befrienders.org/"
      },
      {
        "name": "International Committee of the Red Cross (ICRC)",
        "number": "Visit icrc.org",
        "hours": "Global Humanitarian Assistance",
        "description": "Protection, health, and family reconnection for women in conflict and transition zones.",
        "isTollFree": true,
        "url": "https://www.icrc.org/"
      }
    ],
    "mapCenter": [
      28.0,
      15.0
    ],
    "mapZoom": 2
  }
};

export const SUPPORT_PACKAGES = [
  {
    "id": "aging",
    "title": "Aging",
    "emoji": "",
    "covers": "Aging transitions, independence, changing appearances, ageism, rediscovering purpose",
    "exampleInput": "I feel invisible now that I'm older",
    "feelingPrompts": [
      "I feel invisible now that I'm older",
      "I'm scared of getting older and losing my independence",
      "I don't recognize myself in the mirror anymore and it scares me",
      "Everyone treats me differently since I got older"
    ],
    "selfCareScript": "Feeling invisible is a common, painful experience tied to how society treats aging \u2014 it's not a reflection of your actual value or vibrancy. Name one thing about this stage of life that feels newly free, even if it's small.",
    "communityDescription": "Women navigating aging and identity shifts later in life \u2014 from ageism in the workplace to redefining purpose and visibility on your own terms.",
    "buddyMatchPrimer": "Matched with someone in a similar life stage. Many members say this space feels like the only place people talk honestly about getting older without the marketing-brochure tone.",
    "escalation": null,
    "defaultMicroTool": {
      "id": "tool_aging_visibility",
      "title": "Reclaiming Visibility & Freedom",
      "category": "Aging & Self-Worth",
      "type": "REFLECTION",
      "durationMinutes": 3,
      "description": "Feeling invisible is tied to society's biases, not your value. Claim one freedom unique to this stage of life.",
      "instructions": [],
      "scriptContent": null
    },
    "buddyMatches": [],
    "communities": [
      {
        "id": "comm_aging_circle",
        "name": "Sovereign Years: Women Over 50",
        "memberCount": 2740,
        "description": "Women navigating aging and identity shifts later in life \u2014 from ageism in the workplace to redefining purpose and visibility.",
        "activeTopic": "What is something you stopped tolerating once you turned 50?",
        "safetyPledge": "Authentic discussion celebrating longevity and wisdom."
      }
    ],
    "specialist": {
      "name": "Aging Professional Referral Network",
      "title": "Certified Clinical & Navigational Specialists",
      "credentials": "Board-Certified Counselors, Licensed Psychologists & Accredited Navigators",
      "focus": "Evidence-based clinical support, sliding-scale therapy, and crisis guidance specialized in aging.",
      "bookingInfo": "Direct referral to licensed, accredited practitioners in your selected country.",
      "isVerifiedNetwork": true,
      "slidingScale": true
    },
    "helpline": {
      "name": "Eldercare Locator & Aging Warmline",
      "number": "1-800-677-1116",
      "hours": "24/7 via Friendship Line (1-800-971-0016)",
      "description": "National resource providing support for older adults, independence resources, and compassionate listeners.",
      "isTollFree": true
    },
    "meetups": [
      {
        "id": "meetup_red_hat",
        "title": "Red Hat Society Sisterhood Tea & Luncheon",
        "dayTime": "Saturdays, 1:00 PM",
        "location": "Local Tea Rooms & Chapter Houses",
        "isVirtual": false,
        "hostName": "Chapter Queen Facilitators",
        "attendeeCount": 25,
        "vibe": "Playful, joyful, celebrating wisdom and age",
        "description": "International women's movement focused on friendship, fun, and mutual support in second and third chapters of life.",
        "url": "https://redhatsociety.com/"
      },
      {
        "id": "meetup_aarp_voice",
        "title": "AARP Friendly Voice & Community Events",
        "dayTime": "On-demand & Weekly Streams",
        "location": "Virtual Nationwide Stream",
        "isVirtual": true,
        "hostName": "AARP Community Volunteer Network",
        "attendeeCount": 120,
        "vibe": "Warm phone check-ins and engaging discussions",
        "description": "Free program connecting older women with friendly phone conversations and virtual interest circles.",
        "url": "https://aarpcommunityconnections.org/"
      }
    ],
    "girlsGroups": [],
    "peerNetwork": {
      "networkName": "Aging Verified Peer Network",
      "facilitatorType": "Verified Community Facilitator & Peer Sisterhood Program",
      "description": "Real women who have navigated aging are ready to connect through vetted community cohorts and facilitated peer circles. No automated or fake profiles.",
      "applicationNote": "Open to all women seeking genuine lived-experience companion matching.",
      "verificationStatus": "Identity & Safe-Space Verified Community"
    },
    "image": "assets/packages/pkg_aging.jpg"
  },
  {
    "id": "ai_fear_digital_colonization_cybersecurity",
    "title": "AI Fear, Digital Sovereignty & Cyber Defense for Women",
    "emoji": "",
    "covers": "AI job replacement fear, algorithmic obsolescence, existential AI anxiety, digital colonization, big tech surveillance, EU AI Act rights, non-consensual deepfakes, and cybersecurity against women",
    "exampleInput": "I'm terrified AI is going to make my job obsolete, while tech companies exploit our data and deepfakes threaten women.",
    "feelingPrompts": [
      "I'm terrified AI is going to make my job and career obsolete and I won't be able to adapt",
      "I feel overwhelmed and anxious that AI systems are going to replace human livelihood and creative work",
      "I'm terrified AI deepfakes or stolen images will ruin my reputation or bodily dignity",
      "I feel paralyzed by digital colonization and big tech extracting our data without consent",
      "My ex or someone online is cyberstalking me, monitoring my devices, and I feel violated",
      "I feel existential dread about AI safety and how algorithmic systems exploit women",
      "How do I use the EU AI Act and digital privacy rights to protect my autonomy from biometric surveillance and automated replacement?",
      "I feel powerless against automated algorithmic decisions and online gender-based violence"
    ],
    "selfCareScript": "My digital identity, body, and consciousness belong to me. No algorithm, surveillance tool, or tech monopoly can strip away my human dignity. I take back control of my digital boundaries one step at a time.",
    "communityDescription": "A global sanctuary of women, ethical technologists, and cyber defense advocates fighting technology-facilitated gender-based violence (TFGBV), resisting digital colonization, and demanding algorithmic accountability.",
    "buddyMatchPrimer": "You've been matched with a fellow sister and digital safety advocate who has faced cyber harassment, algorithmic surveillance, and existential tech burnout.",
    "escalation": "If you are experiencing active cyberstalking, stalkerware on your phone, or non-consensual deepfake extortion, access emergency digital safety clinics immediately.",
    "defaultMicroTool": {
      "id": "tool_digital_boundary_shield",
      "title": "Digital Boundary & Cyber Hygiene Shield",
      "category": "Cyber Defense & Sovereignty",
      "type": "STEP_BY_STEP",
      "description": "A calming 6-step digital lockdown routine to reclaim privacy, audit biometric permissions, opt out of AI training sets, and de-escalate digital panic.",
      "instructions": [
        "Grounding Breath: Take three slow, deep exhales. Technology is a tool, not your master; your physical space is safe right now.",
        "Audit Device Permissions: Open Settings > Privacy & Security > Permissions. Review and revoke unneeded app permissions.",
        "Fortify Credentials: Enable 2-Factor Authentication using an authenticator app (e.g. Aegis or Google Authenticator) rather than SMS to prevent SIM-swapping.",
        "Opt-Out of AI Training: In your social accounts (Meta, LinkedIn, X, OpenAI), navigate to Data Privacy settings and switch off 'Allow personal data to train AI models'.",
        "Digital Evidence Preservation: If experiencing cyberstalking or deepfake threats, take timestamped screenshots with URLs before blocking or reporting.",
        "Invoke Legal Protections: Under the EU AI Act (Regulation 2024/1689) and GDPR, you have the right to request deletion of scraped biometric data and report high-risk manipulative AI systems."
      ],
      "scriptContent": "I formally invoke my statutory rights under data protection laws and the EU AI Act (Regulation 2024/1689). I demand the immediate removal and deletion of any biometric data, likeness, or synthetic representations generated or processed without my explicit consent.",
      "durationMinutes": 6
    },
    "buddyMatches": [],
    "communities": [
      {
        "id": "comm_digital_sovereignty",
        "name": "Digital Sovereignty & Decolonial AI Sisterhood",
        "memberCount": 3420,
        "description": "A global alliance of women, technologists, and activists rejecting digital colonization, confronting algorithmic bias, and building human-centered cyber defense.",
        "activeTopic": "How to exercise your EU AI Act rights against workplace emotion recognition and synthetic impersonation",
        "safetyPledge": "End-to-end encrypted discussion. Zero victim-blaming; complete solidarity with survivors of digital abuse."
      }
    ],
    "specialist": {
      "name": "AI Fear, Digital Sovereignty & Cyber Defense for Women Professional Referral Network",
      "title": "Certified Clinical & Navigational Specialists",
      "credentials": "Board-Certified Counselors, Licensed Psychologists & Accredited Navigators",
      "focus": "Evidence-based clinical support, sliding-scale therapy, and crisis guidance specialized in ai fear, digital sovereignty & cyber defense for women.",
      "bookingInfo": "Direct referral to licensed, accredited practitioners in your selected country.",
      "isVerifiedNetwork": true,
      "slidingScale": true
    },
    "helpline": {
      "name": "Cyber Civil Rights Initiative (CCRI) & Without My Consent Crisis Line",
      "number": "1-844-878-2274",
      "hours": "24/7 Free, Confidential Digital Harm Help",
      "description": "Specialized emergency support for women targeted by non-consensual intimate imagery, AI deepfakes, online harassment, and stalkerware.",
      "isTollFree": true
    },
    "meetups": [
      {
        "id": "meetup_women_in_ai",
        "title": "Women in AI Global Chapter Discussion & Co-Learning",
        "dayTime": "Every 2nd Tuesday, 6:00 PM EST",
        "location": "WAI Global Zoom Auditorium",
        "isVirtual": true,
        "hostName": "WAI Chapter Leaders",
        "attendeeCount": 95,
        "vibe": "Educational, uplifting, demystifying AI replacement and automation",
        "description": "Demystifying artificial intelligence, exploring career upskilling, and supporting women adapting to automated workplaces.",
        "url": "https://www.womeninai.co/events"
      },
      {
        "id": "meetup_waie_ethics",
        "title": "Women in AI Ethics (WAIE) Global Community Gatherings",
        "dayTime": "Bi-weekly Thursdays, 12:00 PM EST / 5:00 PM CET",
        "location": "Virtual Zoom Assembly",
        "isVirtual": true,
        "hostName": "Mia Shah & WAIE Council",
        "attendeeCount": 180,
        "vibe": "Intellectually empowering, radical care, decolonial advocacy",
        "description": "Safe community space to critique generative AI monopolies, discuss digital sovereignty, algorithmic resistance, and protect women's intellectual property.",
        "url": "https://womeninaiethics.org/"
      },
      {
        "id": "meetup_ccri_survivors",
        "title": "Cyber Civil Rights Initiative (CCRI) Survivor & Ally Circle",
        "dayTime": "Monthly 1st Saturday, 2:00 PM EST",
        "location": "Encrypted Virtual Group",
        "isVirtual": true,
        "hostName": "CCRI Facilitators",
        "attendeeCount": 75,
        "vibe": "Confidential, restorative justice, legal safety",
        "description": "Dedicated safe space for women impacted by non-consensual deepfakes, online harassment, image-based sexual abuse, and tech-facilitated stalking.",
        "url": "https://cybercivilrights.org/"
      }
    ],
    "girlsGroups": [
      {
        "id": "group_cyber_guardians",
        "name": "Cyber Guardians & Algorithmic Resistance League",
        "tagLine": "Protecting our bodies, data, and future from algorithmic exploitation",
        "memberCount": 2150,
        "meetingFrequency": "Bi-weekly Sundays at 5:00 PM",
        "focusArea": "Digital Self-Defense, EU AI Act Enforcement & Decolonial Tech",
        "vibe": "Empowering, protective, tech-savvy",
        "activeChatSnippet": "32 members shared digital privacy toolkits and stalkerware detection guides this week",
        "url": "https://womeninaiethics.org/"
      }
    ],
    "peerNetwork": {
      "networkName": "AI Fear, Digital Sovereignty & Cyber Defense for Women Verified Peer Network",
      "facilitatorType": "Verified Community Facilitator & Peer Sisterhood Program",
      "description": "Real women who have navigated ai fear, digital sovereignty & cyber defense for women are ready to connect through vetted community cohorts and facilitated peer circles. No automated or fake profiles.",
      "applicationNote": "Open to all women seeking genuine lived-experience companion matching.",
      "verificationStatus": "Identity & Safe-Space Verified Community"
    },
    "image": "assets/packages/pkg_ai_fear_digital_colonization_cybersecurity.jpg"
  },
  {
    "id": "career_changes",
    "title": "Career Changes",
    "emoji": "",
    "covers": "Career breaks, pivots, returning after maternity/caregiving, imposter syndrome",
    "exampleInput": "I feel invisible going back to work after years off",
    "feelingPrompts": [
      "I feel invisible going back to work after years off",
      "I don't know who I am outside of my job title",
      "I'm scared I've fallen behind everyone my age",
      "I want to change careers but I feel too old to start over"
    ],
    "selfCareScript": "A career break or pivot isn't a gap \u2014 it's a chapter. Write down one skill you built during this time that isn't on a resume (patience, crisis management, negotiation) \u2014 it's still a skill.",
    "communityDescription": "Women navigating career breaks, pivots, and 'starting over' at every age \u2014 from returning after maternity leave to a full industry change at 45. Real talk on interviews, confidence, and imposter feelings.",
    "buddyMatchPrimer": "Matched with someone at a similar career-transition stage. Great for interview practice, accountability on job applications, or just someone who gets the specific anxiety of re-entry.",
    "escalation": null,
    "defaultMicroTool": {
      "id": "tool_career_pivot",
      "title": "Career Gap Reframe Exercise",
      "category": "Career Confidence",
      "type": "SCRIPT",
      "durationMinutes": 3,
      "description": "A career break or pivot isn't a gap \u2014 it's a chapter. Honor the invisible skills you built.",
      "instructions": [],
      "scriptContent": null
    },
    "buddyMatches": [],
    "communities": [
      {
        "id": "comm_career_pivot",
        "name": "Second Chapters: Women Rerouting",
        "memberCount": 3150,
        "description": "Women navigating career breaks, pivots, and 'starting over' at every age \u2014 from returning after maternity leave to a full industry change at 45.",
        "activeTopic": "How did you translate your break into an interview superpower?",
        "safetyPledge": "Confidential resume & interview prep space, peer cheerleading."
      }
    ],
    "specialist": {
      "name": "Career Changes Professional Referral Network",
      "title": "Certified Clinical & Navigational Specialists",
      "credentials": "Board-Certified Counselors, Licensed Psychologists & Accredited Navigators",
      "focus": "Evidence-based clinical support, sliding-scale therapy, and crisis guidance specialized in career changes.",
      "bookingInfo": "Direct referral to licensed, accredited practitioners in your selected country.",
      "isVerifiedNetwork": true,
      "slidingScale": true
    },
    "helpline": {
      "name": "211 Career & Community Support Hotline",
      "number": "2-1-1",
      "hours": "24/7 Free & Confidential",
      "description": "Information and local referrals for job transition, training, and women's workforce resources.",
      "isTollFree": true
    },
    "meetups": [
      {
        "id": "meetup_tech_ladies",
        "title": "Tech Ladies Career Pivot & Returners Meetup",
        "dayTime": "Bi-weekly Tuesdays, 5:00 PM PST",
        "location": "Virtual Chapter Gathering",
        "isVirtual": true,
        "hostName": "Tech Ladies Community Leads",
        "attendeeCount": 85,
        "vibe": "Empowering, sisterly, hiring managers present",
        "description": "Connecting women returning from career breaks or making industry switches with mentors and job opportunities.",
        "url": "https://www.hiretechladies.com/community"
      },
      {
        "id": "meetup_elpha_network",
        "title": "Elpha Women's Career Office Hours",
        "dayTime": "Weekly Thursdays, 12:00 PM EST",
        "location": "Elpha Global Virtual Community",
        "isVirtual": true,
        "hostName": "Executive Women Mentors",
        "attendeeCount": 110,
        "vibe": "Authentic, candid salary talk, resume audits",
        "description": "Drop-in career guidance for women navigating salary negotiation, breaks, and career reinvention.",
        "url": "https://elpha.com/"
      }
    ],
    "girlsGroups": [],
    "peerNetwork": {
      "networkName": "Career Changes Verified Peer Network",
      "facilitatorType": "Verified Community Facilitator & Peer Sisterhood Program",
      "description": "Real women who have navigated career changes are ready to connect through vetted community cohorts and facilitated peer circles. No automated or fake profiles.",
      "applicationNote": "Open to all women seeking genuine lived-experience companion matching.",
      "verificationStatus": "Identity & Safe-Space Verified Community"
    },
    "image": "assets/packages/pkg_career_changes.jpg"
  },
  {
    "id": "caring_for_parents",
    "title": "Caring for Parents",
    "emoji": "",
    "covers": "Aging parents, caregiver burnout, sibling dynamics, anticipatory grief",
    "exampleInput": "I'm the only one taking care of my mom and I'm exhausted",
    "feelingPrompts": [
      "I'm the only one taking care of my mom and I'm exhausted",
      "I feel guilty for resenting how much caregiving takes from me",
      "I don't have time for anything else in my life anymore",
      "Watching my parent decline is breaking my heart"
    ],
    "selfCareScript": "Caregiver burnout is real and doesn't mean you love them less. Resentment and love can exist at the same time \u2014 it doesn't cancel out your devotion. Today, name one 15-minute block that's just for you, and protect it like an appointment.",
    "communityDescription": "Caregivers supporting aging or ill parents, sharing the exhaustion, the guilt, and the practical logistics nobody prepares you for \u2014 from sibling dynamics to navigating healthcare systems.",
    "buddyMatchPrimer": "Matched with another caregiver in a similar situation. Many people say this is the one group where they don't have to explain why they're tired all the time.",
    "escalation": null,
    "defaultMicroTool": {
      "id": "tool_caregiver_pause",
      "title": "15-Minute Sanctuary Boundary",
      "category": "Caregiver Respite",
      "type": "REFLECTION",
      "durationMinutes": 3,
      "description": "Resentment and love can exist at the same time. Protect one 15-minute block today like a sacred appointment.",
      "instructions": [],
      "scriptContent": null
    },
    "buddyMatches": [],
    "communities": [
      {
        "id": "comm_caregiver_circle",
        "name": "Daughters & Caregivers Network",
        "memberCount": 2670,
        "description": "Caregivers supporting aging or ill parents, sharing the exhaustion, guilt, and practical logistics nobody prepares you for.",
        "activeTopic": "How do you handle unhelpful siblings who don't contribute?",
        "safetyPledge": "Safe haven for venting without guilt or moral judgment."
      }
    ],
    "specialist": {
      "name": "Caring for Parents Professional Referral Network",
      "title": "Certified Clinical & Navigational Specialists",
      "credentials": "Board-Certified Counselors, Licensed Psychologists & Accredited Navigators",
      "focus": "Evidence-based clinical support, sliding-scale therapy, and crisis guidance specialized in caring for parents.",
      "bookingInfo": "Direct referral to licensed, accredited practitioners in your selected country.",
      "isVerifiedNetwork": true,
      "slidingScale": true
    },
    "helpline": {
      "name": "Eldercare Locator (U.S. Admin on Aging)",
      "number": "1-800-677-1116",
      "hours": "Mon-Fri 9am-8pm ET (24/7 Web Locator)",
      "description": "Trusted national directory connecting caregivers with local respite services, nutrition, and home health care.",
      "isTollFree": true
    },
    "meetups": [
      {
        "id": "meetup_fca_caregiver",
        "title": "Family Caregiver Alliance Weekly Support Group",
        "dayTime": "Wednesdays, 2:00 PM PST",
        "location": "FCA Virtual Caregiver Room",
        "isVirtual": true,
        "hostName": "FCA Clinical Social Worker",
        "attendeeCount": 25,
        "vibe": "Deep empathy, caregiver exhaustion relief",
        "description": "Safe space for women caring for aging parents with memory loss, chronic illness, or physical decline.",
        "url": "https://www.caregiver.org/connecting-caregivers/support-groups/"
      },
      {
        "id": "meetup_caregiver_space",
        "title": "The Caregiver Space Coffee & Unwind",
        "dayTime": "Fridays, 7:00 PM EST",
        "location": "Virtual Sisterhood Lounge",
        "isVirtual": true,
        "hostName": "Peer Caregiver Facilitators",
        "attendeeCount": 32,
        "vibe": "Relaxed, drop-in, cameras optional",
        "description": "Weekly chat to vent about family dynamics, guilt, and the loneliness of full-time elder caregiving.",
        "url": "https://thecaregiverspace.org/"
      }
    ],
    "girlsGroups": [],
    "peerNetwork": {
      "networkName": "Caring for Parents Verified Peer Network",
      "facilitatorType": "Verified Community Facilitator & Peer Sisterhood Program",
      "description": "Real women who have navigated caring for parents are ready to connect through vetted community cohorts and facilitated peer circles. No automated or fake profiles.",
      "applicationNote": "Open to all women seeking genuine lived-experience companion matching.",
      "verificationStatus": "Identity & Safe-Space Verified Community"
    },
    "image": "assets/packages/pkg_caring_for_parents.jpg"
  },
  {
    "id": "divorce_separation",
    "title": "Divorce / Separation",
    "emoji": "",
    "covers": "Breakups, demanding partner/boyfriend, relationship strain, boundary setting, separation, divorce recovery, co-parenting logistics, rebuilding identity outside relationships or marriage",
    "exampleInput": "I don't know who I am outside of my marriage",
    "feelingPrompts": [
      "I'm going through a painful breakup or relationship separation",
      "My partner is emotionally demanding and expects me to carry everything",
      "I have an emotionally demanding boyfriend and feel drained by the relationship",
      "I had an emotionally demanding boyfriend and job is also stress",
      "I don't know who I am outside of my marriage",
      "I feel like a failure for not making it work",
      "I'm scared to be alone after all these years",
      "Co-parenting with my ex is exhausting me"
    ],
    "selfCareScript": "Grief after a separation is real, even if it was your decision. You're allowed to miss parts of it and still know it was right. Today, do one thing that's just yours \u2014 a choice nobody else has a say in.",
    "communityDescription": "Women rebuilding after divorce or separation \u2014 from the legal maze to co-parenting logistics to rediscovering an identity outside a relationship. No judgment on where you are in the process.",
    "buddyMatchPrimer": "Matched with someone else navigating separation or divorce. Many members say this is the hardest thing to talk about with friends who are still married \u2014 here, it's the default.",
    "escalation": "If language suggests the relationship involved control, threats, or fear (not just sadness/loss), route to crisis/DV resources first, alongside \u2014 not instead of \u2014 community support.",
    "defaultMicroTool": {
      "id": "tool_divorce_autonomy",
      "title": "Autonomous Choice Grounding",
      "category": "Self-Reclamation",
      "type": "REFLECTION",
      "durationMinutes": 3,
      "description": "Grief after separation is real, even if it was your decision. Reconnect with a decision that is solely yours.",
      "instructions": [],
      "scriptContent": null
    },
    "buddyMatches": [],
    "communities": [
      {
        "id": "comm_rebloom_separation",
        "name": "Rebuilding After Separation",
        "memberCount": 1870,
        "description": "Women rebuilding after divorce or separation \u2014 from the legal maze to co-parenting logistics to rediscovering an identity outside a relationship.",
        "activeTopic": "What was the very first boundary you set that gave you your life back?",
        "safetyPledge": "Strict confidentiality; mutual legal and emotional safe-harbor."
      }
    ],
    "specialist": {
      "name": "Divorce / Separation Professional Referral Network",
      "title": "Certified Clinical & Navigational Specialists",
      "credentials": "Board-Certified Counselors, Licensed Psychologists & Accredited Navigators",
      "focus": "Evidence-based clinical support, sliding-scale therapy, and crisis guidance specialized in divorce / separation.",
      "bookingInfo": "Direct referral to licensed, accredited practitioners in your selected country.",
      "isVerifiedNetwork": true,
      "slidingScale": true
    },
    "helpline": {
      "name": "National Domestic Violence & Crisis Hotline",
      "number": "1-800-799-7233",
      "hours": "24/7 Call 1-800-799-SAFE or Text START to 88788",
      "description": "Confidential support for relationship safety, legal options, and immediate crisis assistance.",
      "isTollFree": true
    },
    "meetups": [
      {
        "id": "meetup_divorcecare",
        "title": "DivorceCare Weekly Support Group Gathering",
        "dayTime": "Weekly Meetings (In-Person & Online)",
        "location": "Local Community Centers Nationwide",
        "isVirtual": false,
        "hostName": "Community Group Leaders",
        "attendeeCount": 16,
        "vibe": "Safe harbor, confidential, grief recovery",
        "description": "Find a local or virtual support group helping you recover from separation, navigate legal stress, and rebuild identity.",
        "url": "https://www.divorcecare.org/findagroup"
      },
      {
        "id": "meetup_circles_divorce",
        "title": "Circles Up - Separation Healing Circle",
        "dayTime": "Tuesdays & Sundays, 8:00 PM EST",
        "location": "Circles Online Audio Room",
        "isVirtual": true,
        "hostName": "Mental Health Peer Guide",
        "attendeeCount": 28,
        "vibe": "Audio-only, anonymous, cozy and validating",
        "description": "Talk through co-parenting fatigue and rediscovering life after a major relationship split.",
        "url": "https://circlesup.com/"
      }
    ],
    "girlsGroups": [],
    "peerNetwork": {
      "networkName": "Divorce / Separation Verified Peer Network",
      "facilitatorType": "Verified Community Facilitator & Peer Sisterhood Program",
      "description": "Real women who have navigated divorce / separation are ready to connect through vetted community cohorts and facilitated peer circles. No automated or fake profiles.",
      "applicationNote": "Open to all women seeking genuine lived-experience companion matching.",
      "verificationStatus": "Identity & Safe-Space Verified Community"
    },
    "image": "assets/packages/pkg_divorce_separation.jpg"
  },
  {
    "id": "education",
    "title": "Education",
    "emoji": "",
    "covers": "Returning to school as an adult, mature student fears, upskilling, imposter syndrome",
    "exampleInput": "I'm going back to school at 35 and feel out of place",
    "feelingPrompts": [
      "I'm going back to school at 35 and feel out of place",
      "I feel too old to be learning something new",
      "I'm scared I won't keep up with younger classmates",
      "I don't know if I made the right choice going back to study"
    ],
    "selfCareScript": "Being the oldest in the room is a fact, not a flaw \u2014 your life experience is an asset in ways a 22-year-old classmate doesn't have yet. Give yourself permission to learn at your own pace.",
    "communityDescription": "Women returning to education or upskilling later in life, sharing the logistics and the confidence wobbles that come with starting over as a student.",
    "buddyMatchPrimer": "Matched with someone in a similar program or stage of study \u2014 a study buddy or just someone to text before a big exam.",
    "escalation": null,
    "defaultMicroTool": {
      "id": "tool_mature_student_reframe",
      "title": "Life Experience Asset Anchor",
      "category": "Academic Confidence",
      "type": "REFLECTION",
      "durationMinutes": 3,
      "description": "Being the oldest in the room is a fact, not a flaw. Your life experience is an invaluable academic asset.",
      "instructions": [],
      "scriptContent": null
    },
    "buddyMatches": [],
    "communities": [
      {
        "id": "comm_mature_students",
        "name": "Adult Learners & Second Degrees",
        "memberCount": 1810,
        "description": "Women returning to education or upskilling later in life, sharing logistics and confidence wobbles that come with starting over.",
        "activeTopic": "What study app or routine helped you balance homework with home responsibilities?",
        "safetyPledge": "Supportive, encouraging study community."
      }
    ],
    "specialist": {
      "name": "Education Professional Referral Network",
      "title": "Certified Clinical & Navigational Specialists",
      "credentials": "Board-Certified Counselors, Licensed Psychologists & Accredited Navigators",
      "focus": "Evidence-based clinical support, sliding-scale therapy, and crisis guidance specialized in education.",
      "bookingInfo": "Direct referral to licensed, accredited practitioners in your selected country.",
      "isVerifiedNetwork": true,
      "slidingScale": true
    },
    "helpline": {
      "name": "Federal Student Aid & Adult Education Center",
      "number": "1-800-433-3243",
      "hours": "Mon-Fri 8am-10pm ET",
      "description": "Official guidance for non-traditional student grants, financial aid, and program navigation.",
      "isTollFree": true
    },
    "meetups": [
      {
        "id": "meetup_aauw_education",
        "title": "AAUW Women in Higher Education Circles",
        "dayTime": "Monthly Thursdays, 7:00 PM EST",
        "location": "AAUW Virtual Learning Room",
        "isVirtual": true,
        "hostName": "Academic Advisors & Fellowship Alumni",
        "attendeeCount": 40,
        "vibe": "Intellectual, encouraging, scholarship guidance",
        "description": "Connecting women pursuing undergraduate, master's, or PhD programs after life transitions.",
        "url": "https://www.aauw.org/resources/programs/"
      }
    ],
    "girlsGroups": [],
    "peerNetwork": {
      "networkName": "Education Verified Peer Network",
      "facilitatorType": "Verified Community Facilitator & Peer Sisterhood Program",
      "description": "Real women who have navigated education are ready to connect through vetted community cohorts and facilitated peer circles. No automated or fake profiles.",
      "applicationNote": "Open to all women seeking genuine lived-experience companion matching.",
      "verificationStatus": "Identity & Safe-Space Verified Community"
    },
    "image": "assets/packages/pkg_education.jpg"
  },
  {
    "id": "emotional_struggles",
    "title": "Emotional Struggles",
    "emoji": "",
    "covers": "People-pleasing, boundary fatigue, emotional load, demanding relationships, burnout, acute life stress, feeling small or criticized",
    "exampleInput": "I say yes to everything and I'm running on empty",
    "feelingPrompts": [
      "I feel completely overwhelmed by an emotionally demanding partner",
      "I'm emotionally drained from managing demanding relationships and high stress at work",
      "I had an emotional demanding boyfriend and job is also stress",
      "I say yes to everything and I'm running on empty",
      "I'm the one who remembers everything and no one notices",
      "I feel small and criticized in my own home",
      "I don't even know what I want anymore, I just react to everyone else"
    ],
    "selfCareScript": "Try one boundary script today: 'I can't take that on right now.' No explanation required. Notice how much energy goes into justifying 'no' \u2014 you're allowed to just say it.",
    "communityDescription": "A space for the everyday emotional load \u2014 burnout, people-pleasing, boundary-setting, difficult relationships \u2014 the stuff that's hard to name but universally felt.",
    "buddyMatchPrimer": "Matched with someone also working on saying no / protecting their energy. A light accountability pairing \u2014 share one boundary win each week.",
    "escalation": "'I feel small and criticized in my own home' can range from normal relationship friction to real emotional abuse \u2014 the safety-triage layer should evaluate this input carefully rather than routing automatically to peer support alone.",
    "defaultMicroTool": {
      "id": "tool_boundary_script",
      "title": "The Clean 'No' Practice",
      "category": "Boundary Protection",
      "type": "SCRIPT",
      "durationMinutes": 3,
      "description": "Try one boundary script today: 'I can't take that on right now.' No explanation required.",
      "instructions": [],
      "scriptContent": null
    },
    "buddyMatches": [],
    "communities": [
      {
        "id": "comm_boundaries",
        "name": "Boundaries & Mental Load Circle",
        "memberCount": 4210,
        "description": "A space for the everyday emotional load \u2014 burnout, people-pleasing, boundary-setting, difficult relationships.",
        "activeTopic": "What request did you say 'no' to this week that felt scary?",
        "safetyPledge": "Mutual empowerment; respecting boundaries and confidentiality."
      }
    ],
    "specialist": {
      "name": "Emotional Struggles Professional Referral Network",
      "title": "Certified Clinical & Navigational Specialists",
      "credentials": "Board-Certified Counselors, Licensed Psychologists & Accredited Navigators",
      "focus": "Evidence-based clinical support, sliding-scale therapy, and crisis guidance specialized in emotional struggles.",
      "bookingInfo": "Direct referral to licensed, accredited practitioners in your selected country.",
      "isVerifiedNetwork": true,
      "slidingScale": true
    },
    "helpline": {
      "name": "988 Crisis & Support Lifeline",
      "number": "988",
      "hours": "24/7 Call or Text Free & Confidential",
      "description": "Immediate 24/7 support for emotional distress, overwhelming burnout, or severe mental health strain.",
      "isTollFree": true
    },
    "meetups": [
      {
        "id": "meetup_nami_connection",
        "title": "NAMI Connection Recovery Support Group",
        "dayTime": "Weekly In-Person & Zoom",
        "location": "National Alliance on Mental Illness Chapters",
        "isVirtual": true,
        "hostName": "NAMI Certified Peer Facilitators",
        "attendeeCount": 28,
        "vibe": "Confidential, trauma-informed, safe harbor",
        "description": "Free, peer-led support group for adults navigating anxiety, depression, bipolar, or emotional turmoil.",
        "url": "https://www.nami.org/Support-Education/Support-Groups/NAMI-Connection"
      },
      {
        "id": "meetup_heypeers_mental",
        "title": "HeyPeers Emotional Resilience Meeting",
        "dayTime": "Daily at Various Times",
        "location": "HeyPeers Live Platform",
        "isVirtual": true,
        "hostName": "Certified Peer Specialists",
        "attendeeCount": 35,
        "vibe": "Gentle, interactive, video/chat flexibility",
        "description": "Vetted video peer support communities for managing panic attacks, burnout, and daily grief.",
        "url": "https://heypeers.com/"
      }
    ],
    "girlsGroups": [],
    "peerNetwork": {
      "networkName": "Emotional Struggles Verified Peer Network",
      "facilitatorType": "Verified Community Facilitator & Peer Sisterhood Program",
      "description": "Real women who have navigated emotional struggles are ready to connect through vetted community cohorts and facilitated peer circles. No automated or fake profiles.",
      "applicationNote": "Open to all women seeking genuine lived-experience companion matching.",
      "verificationStatus": "Identity & Safe-Space Verified Community"
    },
    "image": "assets/packages/pkg_emotional_struggles.jpg"
  },
  {
    "id": "financial_difficulties",
    "title": "Financial Difficulties",
    "emoji": "",
    "covers": "Money stress, debt shame, financial dependence, budgeting anxiety",
    "exampleInput": "I'm scared to check my bank account",
    "feelingPrompts": [
      "I'm scared to check my bank account",
      "I feel ashamed that I don't understand money better",
      "I depend financially on someone else and it terrifies me",
      "I'm drowning in debt and don't know where to start"
    ],
    "selfCareScript": "Financial shame keeps people stuck more than the numbers themselves do. Pick one small, factual step today \u2014 just looking at one bill, one account balance \u2014 not fixing everything, just looking.",
    "communityDescription": "A judgment-free space to talk about money stress, financial independence, and starting over \u2014 including the emotional side that financial advice columns skip.",
    "buddyMatchPrimer": "Matched with someone working through similar financial goals \u2014 an accountability partner for budgeting check-ins, not a financial advisor. For professional advice, the app also offers referrals to licensed counselors.",
    "escalation": "If language suggests financial abuse or control by a partner (e.g., no access to money, monitored spending), treat this alongside the relationship-safety triage, not just as a budgeting issue.",
    "defaultMicroTool": {
      "id": "tool_financial_shame_break",
      "title": "Factual Neutrality Check",
      "category": "Financial Grounding",
      "type": "GROUNDING",
      "durationMinutes": 3,
      "description": "Financial shame keeps people stuck more than the numbers themselves. Take one neutral, factual step today.",
      "instructions": [],
      "scriptContent": null
    },
    "buddyMatches": [],
    "communities": [
      {
        "id": "comm_financial_circle",
        "name": "Women & Money Without Shame",
        "memberCount": 1950,
        "description": "A judgment-free space to talk about money stress, financial independence, and starting over \u2014 including the emotional side that financial advice columns skip.",
        "activeTopic": "What was the very first step that broke your financial avoidance?",
        "safetyPledge": "Strictly non-judgmental; no predatory schemes or investment promotion."
      }
    ],
    "specialist": {
      "name": "Financial Difficulties Professional Referral Network",
      "title": "Certified Clinical & Navigational Specialists",
      "credentials": "Board-Certified Counselors, Licensed Psychologists & Accredited Navigators",
      "focus": "Evidence-based clinical support, sliding-scale therapy, and crisis guidance specialized in financial difficulties.",
      "bookingInfo": "Direct referral to licensed, accredited practitioners in your selected country.",
      "isVerifiedNetwork": true,
      "slidingScale": true
    },
    "helpline": {
      "name": "National Foundation for Credit Counseling (NFCC)",
      "number": "1-800-388-2227",
      "hours": "Mon-Fri 8am-8pm ET",
      "description": "Nonprofit financial counseling, debt relief negotiation, and emergency financial coaching.",
      "isTollFree": true
    },
    "meetups": [
      {
        "id": "meetup_savvy_ladies",
        "title": "Savvy Ladies Free Financial Wellness Circle",
        "dayTime": "Thursdays at 1:00 PM EST",
        "location": "Savvy Ladies Virtual Clinic",
        "isVirtual": true,
        "hostName": "Certified Financial Planners (Volunteer)",
        "attendeeCount": 55,
        "vibe": "Shame-free, educational, practical steps",
        "description": "Free guidance for women taking control of their money, debt relief strategies, and budget rebuilding.",
        "url": "https://www.savvyladies.org/"
      },
      {
        "id": "meetup_debtors_anon",
        "title": "Debtors Anonymous Women's Meeting",
        "dayTime": "Daily Meetings Online & Local",
        "location": "DA Community Fellowship",
        "isVirtual": true,
        "hostName": "Fellowship Members",
        "attendeeCount": 40,
        "vibe": "Serene, spiritual recovery from money pressure",
        "description": "Supportive peer fellowship offering mutual hope for overcoming financial anxiety and compulsive spending.",
        "url": "https://debtorsanonymous.org/"
      }
    ],
    "girlsGroups": [],
    "peerNetwork": {
      "networkName": "Financial Difficulties Verified Peer Network",
      "facilitatorType": "Verified Community Facilitator & Peer Sisterhood Program",
      "description": "Real women who have navigated financial difficulties are ready to connect through vetted community cohorts and facilitated peer circles. No automated or fake profiles.",
      "applicationNote": "Open to all women seeking genuine lived-experience companion matching.",
      "verificationStatus": "Identity & Safe-Space Verified Community"
    },
    "image": "assets/packages/pkg_financial_difficulties.jpg"
  },
  {
    "id": "health_sports",
    "title": "Health & Sports",
    "emoji": "",
    "covers": "Hormonal balance, chronic fatigue, hair loss & bodily depletion, thyroid support, cycles, perimenopause, somatic movement",
    "exampleInput": "I feel like a different person before my period",
    "feelingPrompts": [
      "I am tired, my hair is falling out, and my body feels completely drained",
      "Unexplained hair loss, chronic fatigue, thyroid or hormonal imbalances",
      "I feel like a different person before my period",
      "I don't recognize my own moods anymore",
      "I want to move my body more but don't know where to start",
      "My hormones feel completely out of control",
      "Perimenopause brain fog, physical exhaustion, and bodily changes"
    ],
    "selfCareScript": "Hormonal shifts are physiological, not a character flaw \u2014 naming it as 'this is my hormones today' can reduce the shame spiral. Try one grounding movement break (a 5-minute walk) rather than pushing through.",
    "communityDescription": "Women talking openly about cycles, hormones, perimenopause/menopause, and physical wellbeing \u2014 including the moods, symptoms, and changes that don't get discussed enough.",
    "buddyMatchPrimer": "Matched with someone in a similar hormonal life stage. Useful for symptom comparison, workout accountability, or just feeling less alone in a body that feels unpredictable.",
    "escalation": null,
    "defaultMicroTool": {
      "id": "tool_hormonal_grounding",
      "title": "5-Minute Hormonal Grace Walk",
      "category": "Hormonal Somatics",
      "type": "GROUNDING",
      "durationMinutes": 3,
      "description": "Hormonal shifts are physiological, not a character flaw. Step outside for 5 minutes of gentle movement.",
      "instructions": [],
      "scriptContent": null
    },
    "buddyMatches": [],
    "communities": [
      {
        "id": "comm_hormones_circle",
        "name": "Cycles, Hormones & Vitality",
        "memberCount": 2280,
        "description": "Women talking openly about cycles, hormones, perimenopause/menopause, and physical wellbeing without shame.",
        "activeTopic": "How do you adjust your weekly expectations during your luteal phase?",
        "safetyPledge": "Body-positive, scientifically supportive community."
      }
    ],
    "specialist": {
      "name": "Health & Sports Professional Referral Network",
      "title": "Certified Clinical & Navigational Specialists",
      "credentials": "Board-Certified Counselors, Licensed Psychologists & Accredited Navigators",
      "focus": "Evidence-based clinical support, sliding-scale therapy, and crisis guidance specialized in health & sports.",
      "bookingInfo": "Direct referral to licensed, accredited practitioners in your selected country.",
      "isVerifiedNetwork": true,
      "slidingScale": true
    },
    "helpline": {
      "name": "Women's Health Info Center (HHS OWH)",
      "number": "1-800-994-9662",
      "hours": "Mon-Fri 9am-6pm ET",
      "description": "Official medical information helpline for women's reproductive, hormonal, and physical health questions.",
      "isTollFree": true
    },
    "meetups": [
      {
        "id": "meetup_black_girls_run",
        "title": "Black Girls RUN! Weekend 5K & Walk",
        "dayTime": "Every Saturday, 8:00 AM",
        "location": "Local City Trails & Tracks",
        "isVirtual": false,
        "hostName": "BGR Local Run Ambassadors",
        "attendeeCount": 45,
        "vibe": "High energy, celebratory, all paces welcomed",
        "description": "Nationwide sisterhood dedicated to encouraging African-American and all women to maintain healthy, active lifestyles.",
        "url": "https://blackgirlsrun.com/events/"
      }
    ],
    "girlsGroups": [],
    "peerNetwork": {
      "networkName": "Health & Sports Verified Peer Network",
      "facilitatorType": "Verified Community Facilitator & Peer Sisterhood Program",
      "description": "Real women who have navigated health & sports are ready to connect through vetted community cohorts and facilitated peer circles. No automated or fake profiles.",
      "applicationNote": "Open to all women seeking genuine lived-experience companion matching.",
      "verificationStatus": "Identity & Safe-Space Verified Community"
    },
    "image": "assets/packages/pkg_health_sports.jpg",
    "careTools": [
      {
        "id": "tool_hair_loss_vitality",
        "title": "Bodily Vitality & Hair Loss Somatic Sanctuary",
        "category": "Physical Health & Bodily Sovereignty",
        "type": "SOMATIC",
        "durationMinutes": 5,
        "description": "Hair loss and persistent exhaustion are real somatic signals from an overburdened nervous system or hormonal shift (thyroid, ferritin, perimenopause). Treat your body as a friend calling for gentle replenishment, not brokenness.",
        "instructions": [
          "Release hair tension: Gently massage scalp with warm fingertips without pulling or measuring.",
          "Somatic boundary: When physical depletion occurs, grant your nervous system permission to pause work output.",
          "Comprehensive lab checklist: Note ferritin, iron panel, thyroid TSH/Free T3/T4, vitamin D, and hormone markers to discuss safely with your care provider."
        ],
        "scriptContent": "My worth and beauty are not measured by a comb. My body is navigating heavy stress and deserves gentle nourishment, clinical investigation without shame, and unhurried rest."
      }
    ]
  },
  {
    "id": "job_search_remote_loneliness",
    "title": "Job Search, Career Uncertainty & Remote Work Loneliness",
    "emoji": "",
    "covers": "Job hunting fatigue, resume ghosting, remote work isolation, career transitions, unemployment anxiety, and workplace invisibility",
    "exampleInput": "I've applied to dozens of jobs, keep getting ghosted, and feel completely isolated working from home.",
    "feelingPrompts": [
      "I've applied to hundreds of jobs, sent countless resumes, and keep getting ghosted",
      "I work remotely from home and go days without speaking to another human",
      "I feel completely invisible, exhausted, and disposable in my career",
      "I was laid off and I don't know who I am outside of my job or how to start over",
      "I want to pivot into a new field after 40 but feel overwhelmed, intimidated, and uncertain"
    ],
    "selfCareScript": "Take a gentle breath and release tension from your neck and shoulders. Your worth as a human is not defined by an automated ATS rejection letter or cold job boards. Today, step away from LinkedIn for 2 hours, drink water, and connect with someone who loves you for who you are.",
    "communityDescription": "A supportive sanctuary for women navigating job hunts, career transitions, and remote work isolation without toxic hustle culture.",
    "buddyMatchPrimer": "Matched with a woman who pivoted after career transitions or overcome remote work isolation. Friendly peer support.",
    "escalation": null,
    "defaultMicroTool": {
      "id": "tool_job_rejection_reset",
      "title": "Job Rejection Reset & Human Worth Re-Anchoring",
      "category": "Career Sanctuary",
      "type": "SCRIPT",
      "durationMinutes": 4,
      "description": "De-couple your core human worth from cold job applications and resume ghosting.",
      "instructions": [
        "Close all job boards, tabs, and email clients for the next 20 minutes.",
        "Place your feet flat on the ground and take 3 deep belly breaths to signal safety to your nervous system.",
        "Acknowledge out loud: 'A company not hiring me is a market mismatch, not a character flaw.'",
        "Text or call one trusted friend or sister to talk about something completely unrelated to work.",
        "Write down 3 things you brought into this world that have nothing to do with productivity or income."
      ],
      "scriptContent": "My career is what I do; it is not who I am. My human intelligence, empathy, and resilience are undeniable. An automated rejection or cold market does not define my future or diminish my worth."
    },
    "buddyMatches": [],
    "communities": [
      {
        "id": "comm_career_pivot_remote",
        "name": "Remote Women & Career Transition Sanctuary",
        "memberCount": 3480,
        "description": "A supportive sanctuary for women navigating job searches, career pivots, and remote work fatigue with empathy.",
        "activeTopic": "How do you protect your peace while actively job hunting?",
        "safetyPledge": "No hustle shame, no toxic productivity advice. Just genuine sisterhood."
      }
    ],
    "specialist": {
      "name": "Career Transition & Workplace Mental Health Directory",
      "title": "Licensed Career Counselors & Workplace Psychologists",
      "credentials": "National Board for Certified Counselors (NBCC) & ICF Certified Career Coaches",
      "focus": "Career identity decoupling, layoff recovery, interview anxiety, and sliding-scale workplace counseling.",
      "bookingInfo": "Direct referral to certified career mental health specialists in your country.",
      "isVerifiedNetwork": true,
      "slidingScale": true
    },
    "helpline": {
      "name": "Worker Wellness & Career Distress Support",
      "number": "1-800-273-8255",
      "hours": "24/7 Free & Confidential",
      "description": "Emotional support for layoff distress, chronic job search depression, and career exhaustion.",
      "isTollFree": true
    },
    "meetups": [
      {
        "id": "meetup_remote_workers",
        "title": "Remote Women Co-Working & Accountability Lounge",
        "dayTime": "Daily Monday - Friday, 9:00 AM - 1:00 PM",
        "location": "Virtual Quiet Focus Room",
        "isVirtual": true,
        "hostName": "Remote Woman Community Host",
        "attendeeCount": 65,
        "vibe": "Quiet focus pomodoro blocks with friendly lunch break chat",
        "description": "Break the isolation of work-from-home life. Join women across the globe for quiet co-working and friendly lunchtime check-ins.",
        "url": "https://remotewoman.com/"
      },
      {
        "id": "meetup_tech_ladies_career",
        "title": "Tech Ladies Career Pivot & Job Search Circle",
        "dayTime": "Every Wednesday, 5:30 PM EST",
        "location": "Virtual Community Room",
        "isVirtual": true,
        "hostName": "Tech Ladies Community Leaders",
        "attendeeCount": 110,
        "vibe": "Empowering, supportive, resume reviews without gatekeeping",
        "description": "Weekly peer meetup sharing vetted opportunities, interview strategies, and mutual encouragement.",
        "url": "https://hiretechladies.com/"
      }
    ],
    "girlsGroups": [
      {
        "id": "group_pivot_sisters",
        "name": "The Career Pivot Sisters",
        "tagLine": "Women transforming job search fatigue into collective resilience",
        "memberCount": 2140,
        "meetingFrequency": "Bi-weekly Sundays at 6:00 PM",
        "focusArea": "Career Transitions, Ghosting Resilience & Support",
        "vibe": "Empowering, strategic, deeply supportive",
        "activeChatSnippet": "24 members shared job wins and mutual encouragement this week"
      },
      {
        "id": "group_remote_hearts",
        "name": "Remote & Connected Girls Circle",
        "tagLine": "Because working from home shouldn't mean feeling forgotten",
        "memberCount": 1150,
        "meetingFrequency": "Weekly Wednesday Evening Wind-Down",
        "focusArea": "Combating Work Isolation & Boundaries",
        "vibe": "Cozy, restorative, honest",
        "activeChatSnippet": "Sharing daily walking breaks & mindfulness check-ins"
      }
    ],
    "peerNetwork": {
      "networkName": "Career Transition & Remote Sisterhood Network",
      "facilitatorType": "Verified Community Facilitator & Peer Sisterhood Program",
      "description": "Real women who have overcome layoffs, prolonged job searching, and work-from-home isolation connect through vetted cohorts. Zero fake profiles.",
      "applicationNote": "Open to all women navigating career pivots or seeking peer companions.",
      "verificationStatus": "Identity & Safe-Space Verified Community"
    },
    "image": "assets/packages/pkg_job_search_remote_loneliness.jpg"
  },
  {
    "id": "loneliness_friends",
    "title": "Loneliness / Making Friends",
    "emoji": "",
    "covers": "Adult friendship, superficial relationships, feeling invisible, building chosen community",
    "exampleInput": "I don't have anyone to call when something good or bad happens",
    "feelingPrompts": [
      "I don't have anyone to call when something good or bad happens",
      "I don't know how to make friends as an adult",
      "All my friendships feel surface-level lately",
      "I feel invisible in my own life"
    ],
    "selfCareScript": "Loneliness is a signal, not a verdict on your worth. Today, send one low-stakes message to someone you've been meaning to reach out to \u2014 'thinking of you' is enough, it doesn't need to be a big gesture.",
    "communityDescription": "A space explicitly for people working on building or deepening friendships as adults \u2014 normalizing how hard and awkward this can be, and sharing what's actually worked.",
    "buddyMatchPrimer": "Matched with someone else looking to build new connections. Low-pressure first step \u2014 a coffee, a shared local event, or just a friendly ongoing chat.",
    "escalation": null,
    "defaultMicroTool": {
      "id": "tool_low_stakes_reachout",
      "title": "Low-Stakes Connection Reachout",
      "category": "Connection Practice",
      "type": "SCRIPT",
      "durationMinutes": 3,
      "description": "Loneliness is a signal, not a verdict on your worth. Send one low-stakes message today.",
      "instructions": [],
      "scriptContent": null
    },
    "buddyMatches": [],
    "communities": [
      {
        "id": "comm_friendships",
        "name": "Making Friends in Adulthood",
        "memberCount": 3890,
        "description": "A space explicitly for people working on building or deepening friendships as adults \u2014 normalizing how hard and awkward this can be.",
        "activeTopic": "What is the best low-pressure way to invite an acquaintance for tea?",
        "safetyPledge": "Warm, open-hearted, non-judgmental environment."
      }
    ],
    "specialist": {
      "name": "Loneliness / Making Friends Professional Referral Network",
      "title": "Certified Clinical & Navigational Specialists",
      "credentials": "Board-Certified Counselors, Licensed Psychologists & Accredited Navigators",
      "focus": "Evidence-based clinical support, sliding-scale therapy, and crisis guidance specialized in loneliness / making friends.",
      "bookingInfo": "Direct referral to licensed, accredited practitioners in your selected country.",
      "isVerifiedNetwork": true,
      "slidingScale": true
    },
    "helpline": {
      "name": "The Friendship Line (Institute on Aging)",
      "number": "1-800-971-0016",
      "hours": "24/7 Toll-Free & Confidential",
      "description": "Accredited national crisis and peer warmline offering compassionate conversation to combat loneliness and isolation.",
      "isTollFree": true
    },
    "meetups": [
      {
        "id": "meetup_dinner_party",
        "title": "The Dinner Party - Peer Tables for Women",
        "dayTime": "Bi-weekly Gatherings",
        "location": "Living Rooms, Cafes & Zoom Tables",
        "isVirtual": false,
        "hostName": "Table Hosts",
        "attendeeCount": 10,
        "vibe": "Intimate, warm potluck, heart-to-heart talk",
        "description": "A community of 20- and 30-somethings who have experienced significant loss or isolation, breaking bread together.",
        "url": "https://www.thedinnerparty.org/"
      }
    ],
    "girlsGroups": [],
    "peerNetwork": {
      "networkName": "Loneliness / Making Friends Verified Peer Network",
      "facilitatorType": "Verified Community Facilitator & Peer Sisterhood Program",
      "description": "Real women who have navigated loneliness / making friends are ready to connect through vetted community cohorts and facilitated peer circles. No automated or fake profiles.",
      "applicationNote": "Open to all women seeking genuine lived-experience companion matching.",
      "verificationStatus": "Identity & Safe-Space Verified Community"
    },
    "image": "assets/packages/pkg_loneliness_friends.jpg"
  },
  {
    "id": "migration",
    "title": "Migration / Adapting to a New Country",
    "emoji": "",
    "covers": "Immigration, culture shock, homesickness, language barriers, dual identity",
    "exampleInput": "Everything here is unfamiliar and I miss home",
    "feelingPrompts": [
      "Everything here is unfamiliar and I miss home",
      "I feel like I don't belong here or back home anymore",
      "The language barrier makes me feel so isolated",
      "I don't know how to build a life in a country that doesn't feel like mine yet"
    ],
    "selfCareScript": "Feeling caught between two places is a normal part of migration, not a sign you made the wrong choice. Today, do one small thing that connects you to home (a food, a song, a call) \u2014 you don't have to choose one identity over the other.",
    "communityDescription": "Women adapting to life in a new country, sharing what actually helps with culture shock, language barriers, and building a sense of home from scratch.",
    "buddyMatchPrimer": "Matched with someone from a similar background or in a similar stage of settling in. Great for practical tips (paperwork, local know-how) and the harder-to-name homesickness.",
    "escalation": null,
    "defaultMicroTool": {
      "id": "tool_home_thread",
      "title": "Home Thread Grounding",
      "category": "Cultural Anchor",
      "type": "GROUNDING",
      "durationMinutes": 3,
      "description": "Feeling caught between two places is normal. Do one small thing today that bridges your roots with your present.",
      "instructions": [],
      "scriptContent": null
    },
    "buddyMatches": [],
    "communities": [
      {
        "id": "comm_migration",
        "name": "Roots & Wings: Immigrant Women",
        "memberCount": 2050,
        "description": "Women adapting to life in a new country, sharing what actually helps with culture shock, language barriers, and building home.",
        "activeTopic": "How do you preserve your cultural traditions while embracing your new home?",
        "safetyPledge": "Multicultural solidarity and warm embrace for all backgrounds."
      }
    ],
    "specialist": {
      "name": "Migration / Adapting to a New Country Professional Referral Network",
      "title": "Certified Clinical & Navigational Specialists",
      "credentials": "Board-Certified Counselors, Licensed Psychologists & Accredited Navigators",
      "focus": "Evidence-based clinical support, sliding-scale therapy, and crisis guidance specialized in migration / adapting to a new country.",
      "bookingInfo": "Direct referral to licensed, accredited practitioners in your selected country.",
      "isVerifiedNetwork": true,
      "slidingScale": true
    },
    "helpline": {
      "name": "International Rescue Committee (IRC) HelpLine",
      "number": "1-888-927-4632",
      "hours": "Mon-Fri 9am-5pm (24/7 Multilingual Web)",
      "description": "Humanitarian and community support for immigrants, refugees, and families navigating new countries.",
      "isTollFree": true
    },
    "meetups": [
      {
        "id": "meetup_welcoming_america",
        "title": "Welcoming America Newcomer Sisterhood Meetup",
        "dayTime": "Fridays, 6:30 PM",
        "location": "Community Centers & Welcome Hubs",
        "isVirtual": false,
        "hostName": "Local Integration Leads",
        "attendeeCount": 35,
        "vibe": "Multicultural, celebratory, warm chai provided",
        "description": "Creating inclusive communities where newly arrived immigrant and refugee women can connect with local allies.",
        "url": "https://welcomingamerica.org/"
      }
    ],
    "girlsGroups": [
      {
        "id": "group_roots_wings",
        "name": "Roots & Wings Sisterhood",
        "tagLine": "Immigrant women navigating identity, career & building home",
        "memberCount": 1540,
        "meetingFrequency": "Weekly Tuesdays 7:00 PM",
        "focusArea": "Cultural adaptation, diasporic sisterhood & belonging",
        "vibe": "Multicultural, warm, deeply compassionate",
        "activeChatSnippet": "Active discussion now"
      }
    ],
    "peerNetwork": {
      "networkName": "Migration / Adapting to a New Country Verified Peer Network",
      "facilitatorType": "Verified Community Facilitator & Peer Sisterhood Program",
      "description": "Real women who have navigated migration / adapting to a new country are ready to connect through vetted community cohorts and facilitated peer circles. No automated or fake profiles.",
      "applicationNote": "Open to all women seeking genuine lived-experience companion matching.",
      "verificationStatus": "Identity & Safe-Space Verified Community"
    },
    "image": "assets/packages/pkg_migration.jpg"
  },
  {
    "id": "moving_new_city",
    "title": "Moving to a New City",
    "emoji": "",
    "covers": "Relocation, rebuilding a social circle, unfamiliar environments, feeling out of place",
    "exampleInput": "I moved here for work and don't know a single person",
    "feelingPrompts": [
      "I moved here for work and don't know a single person",
      "I feel so out of place in this new city",
      "I don't know how to make friends as an adult",
      "I miss my old life and I'm not sure I made the right choice"
    ],
    "selfCareScript": "Loneliness after a move is one of the most common, least-talked-about feelings \u2014 it doesn't mean you made a mistake. Pick one small, repeatable thing this week (same coffee shop, same class) \u2014 familiarity builds faster than friendship does.",
    "communityDescription": "People who've recently relocated, sharing what actually helped them build a life in a new place \u2014 from finding local groups to just admitting the first six months are hard.",
    "buddyMatchPrimer": "Matched with someone new to the area, or someone local happy to show a newcomer around. Great for a low-pressure first coffee or a local meetup buddy.",
    "escalation": null,
    "defaultMicroTool": {
      "id": "tool_moving_familiarity",
      "title": "Familiarity Anchor Micro-Habit",
      "category": "Relocation Grounding",
      "type": "GROUNDING",
      "durationMinutes": 3,
      "description": "Loneliness after a move doesn't mean you made a mistake. Familiarity builds faster than friendship.",
      "instructions": [],
      "scriptContent": null
    },
    "buddyMatches": [],
    "communities": [
      {
        "id": "comm_newcomers",
        "name": "New in Town: Relocated Women",
        "memberCount": 2140,
        "description": "People who've recently relocated, sharing what actually helped them build a life in a new place \u2014 from finding local groups to admitting the first 6 months are tough.",
        "activeTopic": "What's the best low-stakes activity to meet genuine locals?",
        "safetyPledge": "Welcoming and supportive; zero judgment on homesickness."
      }
    ],
    "specialist": {
      "name": "Moving to a New City Professional Referral Network",
      "title": "Certified Clinical & Navigational Specialists",
      "credentials": "Board-Certified Counselors, Licensed Psychologists & Accredited Navigators",
      "focus": "Evidence-based clinical support, sliding-scale therapy, and crisis guidance specialized in moving to a new city.",
      "bookingInfo": "Direct referral to licensed, accredited practitioners in your selected country.",
      "isVerifiedNetwork": true,
      "slidingScale": true
    },
    "helpline": {
      "name": "211 Community Resources & Welcome Directory",
      "number": "2-1-1",
      "hours": "24/7 Free & Confidential",
      "description": "Local community networks, newcomer navigation, and neighborhood resources.",
      "isTollFree": true
    },
    "meetups": [
      {
        "id": "meetup_bumble_bff",
        "title": "Bumble For Friends (BFF) City Meetups",
        "dayTime": "Weekly Local Hangouts",
        "location": "Local Coffee Shops & Parks",
        "isVirtual": false,
        "hostName": "Community Ambassadors",
        "attendeeCount": 20,
        "vibe": "Low-stakes coffee chat, friendly, open to newcomers",
        "description": "Discover local women who recently moved to your city and want to build a genuine circle of friends.",
        "url": "https://bumble.com/bff"
      },
      {
        "id": "meetup_global_meetup_women",
        "title": "Meetup.com New in Town Women's Group",
        "dayTime": "Weekends at 11:00 AM",
        "location": "Local Neighborhood Parks & Libraries",
        "isVirtual": false,
        "hostName": "Local City Organizer",
        "attendeeCount": 30,
        "vibe": "Welcoming, exploring local spots together",
        "description": "Casual neighborhood walks, museum drop-ins, and brunch for women settling into a new zip code.",
        "url": "https://www.meetup.com/find/?keywords=women+friends"
      }
    ],
    "girlsGroups": [],
    "peerNetwork": {
      "networkName": "Moving to a New City Verified Peer Network",
      "facilitatorType": "Verified Community Facilitator & Peer Sisterhood Program",
      "description": "Real women who have navigated moving to a new city are ready to connect through vetted community cohorts and facilitated peer circles. No automated or fake profiles.",
      "applicationNote": "Open to all women seeking genuine lived-experience companion matching.",
      "verificationStatus": "Identity & Safe-Space Verified Community"
    },
    "image": "assets/packages/pkg_moving_new_city.jpg"
  },
  {
    "id": "parenting",
    "title": "Parenting",
    "emoji": "",
    "covers": "Toddlers to teenagers, communication breakdowns, parental guilt and regulation",
    "exampleInput": "My teenager won't talk to me anymore",
    "feelingPrompts": [
      "My teenager won't talk to me anymore",
      "I feel like I'm failing at parenting every single day",
      "I don't know how to talk to my kid about what's going on in their life",
      "I feel guilty every time I lose my patience"
    ],
    "selfCareScript": "Parenting guilt usually means you care, not that you failed. Before reacting, try: 'I'm going to pause for 10 seconds before I respond.' One repaired moment after a hard one teaches your kid more than a perfect one ever could.",
    "communityDescription": "Parents of kids at every age \u2014 toddlers to teens \u2014 trading what's actually working (and what isn't) without judgment. Especially strong on the teenage-silence and communication-breakdown topics.",
    "buddyMatchPrimer": "Matched with a parent of a similarly-aged kid. Swap notes, vent, or just know someone else is in the exact same stage as you this week.",
    "escalation": null,
    "defaultMicroTool": {
      "id": "tool_parental_pause",
      "title": "10-Second De-escalation & Repair",
      "category": "Parental Regulation",
      "type": "REFLECTION",
      "durationMinutes": 3,
      "description": "Parenting guilt means you care, not that you failed. Take a 10-second pause before responding.",
      "instructions": [],
      "scriptContent": null
    },
    "buddyMatches": [],
    "communities": [
      {
        "id": "comm_parents_circle",
        "name": "Parenting in Progress",
        "memberCount": 2890,
        "description": "Parents of kids at every age \u2014 toddlers to teens \u2014 trading what's actually working (and what isn't) without judgment.",
        "activeTopic": "How do you reconnect with your teen after a big communication breakdown?",
        "safetyPledge": "Zero judgment. All parents learning and healing together."
      }
    ],
    "specialist": {
      "name": "Parenting Professional Referral Network",
      "title": "Certified Clinical & Navigational Specialists",
      "credentials": "Board-Certified Counselors, Licensed Psychologists & Accredited Navigators",
      "focus": "Evidence-based clinical support, sliding-scale therapy, and crisis guidance specialized in parenting.",
      "bookingInfo": "Direct referral to licensed, accredited practitioners in your selected country.",
      "isVerifiedNetwork": true,
      "slidingScale": true
    },
    "helpline": {
      "name": "Boys Town National Parent Hotline",
      "number": "1-800-448-3000",
      "hours": "24/7 Free & Confidential",
      "description": "Nationally accredited hotline providing round-the-clock crisis and parenting advice.",
      "isTollFree": true
    },
    "meetups": [
      {
        "id": "meetup_pep_parenting",
        "title": "Parent Encouragement Program (PEP) Peer Circles",
        "dayTime": "Thursdays at 7:30 PM",
        "location": "Online Community Room",
        "isVirtual": true,
        "hostName": "Certified Parent Educators",
        "attendeeCount": 35,
        "vibe": "Real-talk, non-judgmental, practical tools",
        "description": "Weekly interactive circles focused on de-escalation, teen communication, and managing parental guilt.",
        "url": "https://pepparent.org/"
      },
      {
        "id": "meetup_boystown_parent",
        "title": "Boys Town Positive Parenting Workshop",
        "dayTime": "Monthly Saturdays, 10:00 AM",
        "location": "Virtual Nationwide Stream",
        "isVirtual": true,
        "hostName": "Family Support Specialist",
        "attendeeCount": 60,
        "vibe": "Actionable, evidence-based, compassionate",
        "description": "Interactive Q&A tackling toddler boundary testing and adolescent communication walls.",
        "url": "https://www.boystown.org/parenting"
      }
    ],
    "girlsGroups": [],
    "peerNetwork": {
      "networkName": "Parenting Verified Peer Network",
      "facilitatorType": "Verified Community Facilitator & Peer Sisterhood Program",
      "description": "Real women who have navigated parenting are ready to connect through vetted community cohorts and facilitated peer circles. No automated or fake profiles.",
      "applicationNote": "Open to all women seeking genuine lived-experience companion matching.",
      "verificationStatus": "Identity & Safe-Space Verified Community"
    },
    "image": "assets/packages/pkg_parenting.jpg"
  },
  {
    "id": "pregnancy_new_parents",
    "title": "Pregnancy / New Parents",
    "emoji": "",
    "covers": "Pregnancy, fourth trimester, postpartum emotions, bonding and matrescence",
    "exampleInput": "I feel like I've lost myself since having a baby",
    "feelingPrompts": [
      "I feel like I've lost myself since having a baby",
      "I'm terrified I'm not going to be a good mom",
      "Nobody told me it would feel this lonely",
      "I don't feel connected to my baby yet and I feel so guilty"
    ],
    "selfCareScript": "Take one slow breath in for 4 counts, hold for 4, out for 6. You don't have to feel connected today for it to come later \u2014 bonding is a process, not a switch. Name one small thing that went okay today, even if it's just 'we both made it to bedtime.'",
    "communityDescription": "A space for new and expecting parents in the thick of it \u2014 the unfiltered version, not the highlight reel. People share what 3am really looks like, what nobody warns you about, and what actually helped.",
    "buddyMatchPrimer": "You've been matched with someone due around the same time / with a baby a similar age. This is casual \u2014 a quick hello, a shared due-date group chat, no pressure to talk every day.",
    "escalation": null,
    "defaultMicroTool": {
      "id": "tool_matrescence",
      "title": "Matrescence Breath & Reframe",
      "category": "Postpartum Grounding",
      "type": "BREATHING",
      "durationMinutes": 3,
      "description": "Take one slow breath in for 4 counts, hold for 4, out for 6. Bonding is a process, not an instant switch.",
      "instructions": [],
      "scriptContent": null
    },
    "buddyMatches": [],
    "communities": [
      {
        "id": "comm_fourth_trimester",
        "name": "The Unfiltered Fourth Trimester",
        "memberCount": 1420,
        "description": "A space for new and expecting parents in the thick of it \u2014 the unfiltered version, not the highlight reel. People share what 3am really looks like, what nobody warns you about, and what actually helped.",
        "activeTopic": "What do you wish someone told you about the first 6 weeks?",
        "safetyPledge": "Strict privacy. No mom-shaming or unsolicited medical advice permitted."
      }
    ],
    "specialist": {
      "name": "Pregnancy / New Parents Professional Referral Network",
      "title": "Certified Clinical & Navigational Specialists",
      "credentials": "Board-Certified Counselors, Licensed Psychologists & Accredited Navigators",
      "focus": "Evidence-based clinical support, sliding-scale therapy, and crisis guidance specialized in pregnancy / new parents.",
      "bookingInfo": "Direct referral to licensed, accredited practitioners in your selected country.",
      "isVerifiedNetwork": true,
      "slidingScale": true
    },
    "helpline": {
      "name": "Postpartum Support International (PSI) HelpLine",
      "number": "1-800-944-4773",
      "hours": "24/7 Call or text 'HELP' to 800-944-4773",
      "description": "Confidential support, encouragement, and resources for perinatal and postpartum mothers.",
      "isTollFree": true
    },
    "meetups": [
      {
        "id": "meetup_psi_online",
        "title": "PSI Online Perinatal Peer Support Groups",
        "dayTime": "Daily Multiple Times (Virtual)",
        "location": "Postpartum Support International (Zoom)",
        "isVirtual": true,
        "hostName": "PSI Trained Facilitators",
        "attendeeCount": 48,
        "vibe": "Crying babies welcome, warm, safe, completely free",
        "description": "Weekly virtual support groups for pregnant, postpartum, and adoptive mothers navigating isolation, anxiety, and matrescence.",
        "url": "https://www.postpartum.net/get-help/psi-online-support-groups/"
      },
      {
        "id": "meetup_motherhood_center",
        "title": "The Motherhood Center Support Group",
        "dayTime": "Wednesdays at 1:00 PM EST",
        "location": "Virtual Sisterhood Room",
        "isVirtual": true,
        "hostName": "Licensed Clinical Social Worker",
        "attendeeCount": 22,
        "vibe": "Therapeutic, validating, zero mom-guilt",
        "description": "Safe clinical and peer space designed specifically to process birth trauma and new parent identity changes.",
        "url": "https://www.themotherhoodcenter.com/classes-and-groups/"
      }
    ],
    "girlsGroups": [],
    "peerNetwork": {
      "networkName": "Pregnancy / New Parents Verified Peer Network",
      "facilitatorType": "Verified Community Facilitator & Peer Sisterhood Program",
      "description": "Real women who have navigated pregnancy / new parents are ready to connect through vetted community cohorts and facilitated peer circles. No automated or fake profiles.",
      "applicationNote": "Open to all women seeking genuine lived-experience companion matching.",
      "verificationStatus": "Identity & Safe-Space Verified Community"
    },
    "image": "assets/packages/pkg_pregnancy_new_parents.jpg"
  },
  {
    "id": "sustainability",
    "title": "Sustainability",
    "emoji": "",
    "covers": "Climate anxiety, eco-guilt, overwhelmed by global challenges, sustainable lifestyle",
    "exampleInput": "I feel guilty about my everyday choices but don't know where to start",
    "feelingPrompts": [
      "I feel guilty about my everyday choices but don't know where to start",
      "Climate anxiety is affecting my mental health",
      "I want to live more sustainably but it feels overwhelming",
      "I feel powerless about the state of the world"
    ],
    "selfCareScript": "Eco-anxiety is a sign you care, not a personal failure to fix everything alone. Pick one small, sustainable habit to focus on this month \u2014 not ten. Systemic problems need systemic solutions; your job isn't to carry it all personally.",
    "communityDescription": "People channeling climate concern into community and small, sustainable action \u2014 without the guilt-tripping or all-or-nothing pressure.",
    "buddyMatchPrimer": "Matched with someone building similar sustainable habits \u2014 swap tips, local resources, or just decompress about climate anxiety together.",
    "escalation": null,
    "defaultMicroTool": {
      "id": "tool_eco_habit",
      "title": "Single Sustainable Micro-Focus",
      "category": "Eco-Grounding",
      "type": "REFLECTION",
      "durationMinutes": 3,
      "description": "Eco-anxiety is a sign you care, not a personal failure. Focus on one small habit, not ten.",
      "instructions": [],
      "scriptContent": null
    },
    "buddyMatches": [],
    "communities": [
      {
        "id": "comm_climate_circle",
        "name": "Sustainable Living Without Guilt",
        "memberCount": 1430,
        "description": "People channeling climate concern into community and small, sustainable action \u2014 without guilt-tripping or all-or-nothing pressure.",
        "activeTopic": "What is one small habit that made you feel connected rather than overwhelmed?",
        "safetyPledge": "Encouragement only. Zero shame or purity testing."
      }
    ],
    "specialist": {
      "name": "Sustainability Professional Referral Network",
      "title": "Certified Clinical & Navigational Specialists",
      "credentials": "Board-Certified Counselors, Licensed Psychologists & Accredited Navigators",
      "focus": "Evidence-based clinical support, sliding-scale therapy, and crisis guidance specialized in sustainability.",
      "bookingInfo": "Direct referral to licensed, accredited practitioners in your selected country.",
      "isVerifiedNetwork": true,
      "slidingScale": true
    },
    "helpline": {
      "name": "Climate Psychology Alliance Support Line",
      "number": "988",
      "hours": "24/7 Crisis Support via 988",
      "description": "Emotional support and coping strategies for chronic climate distress, eco-grief, and anxiety.",
      "isTollFree": true
    },
    "meetups": [
      {
        "id": "meetup_women_cleantech",
        "title": "Women in Cleantech & Sustainability Global Meetup",
        "dayTime": "Monthly Wednesdays, 6:00 PM PST",
        "location": "Virtual & Regional Hubs",
        "isVirtual": true,
        "hostName": "WCS Chapter Leads",
        "attendeeCount": 70,
        "vibe": "Inspiring, eco-conscious, community action",
        "description": "Network of women advancing environmental sustainability, green living, and climate resilience.",
        "url": "https://www.womencleantechsustainability.org/events"
      }
    ],
    "girlsGroups": [],
    "peerNetwork": {
      "networkName": "Sustainability Verified Peer Network",
      "facilitatorType": "Verified Community Facilitator & Peer Sisterhood Program",
      "description": "Real women who have navigated sustainability are ready to connect through vetted community cohorts and facilitated peer circles. No automated or fake profiles.",
      "applicationNote": "Open to all women seeking genuine lived-experience companion matching.",
      "verificationStatus": "Identity & Safe-Space Verified Community"
    },
    "image": "assets/packages/pkg_sustainability.jpg"
  }
];

export const ADVICE_CATEGORIES = {
  "MENTAL_HEALTH": {
    "key": "MENTAL_HEALTH",
    "label": "Mental Health",
    "icon": "🧠",
    "color": "#8b5cf6"
  },
  "LEGAL_RIGHTS": {
    "key": "LEGAL_RIGHTS",
    "label": "Legal & Rights",
    "icon": "⚖️",
    "color": "#3b82f6"
  },
  "CAREER_JOB": {
    "key": "CAREER_JOB",
    "label": "Career & Job",
    "icon": "💼",
    "color": "#10b981"
  },
  "WOMEN_HEALTH": {
    "key": "WOMEN_HEALTH",
    "label": "Women's Health",
    "icon": "🌸",
    "color": "#ec4899"
  },
  "COMMUNITY_SANCTUARY": {
    "key": "COMMUNITY_SANCTUARY",
    "label": "Community Sanctuary",
    "icon": "🏡",
    "color": "#f59e0b"
  }
};

export const ADVICE_PLACES = [
  {
    "id": "place_sf_womens_building",
    "name": "The Women's Building Community Sanctuary",
    "category": "COMMUNITY_SANCTUARY",
    "country": "US",
    "countryName": "United States",
    "city": "San Francisco, CA",
    "address": "3543 18th St, San Francisco, CA 94110",
    "lat": 37.7616,
    "lng": -122.4217,
    "mapCoordX": 0.28,
    "mapCoordY": 0.38,
    "phone": "+1 415-431-1180",
    "website": "https://www.womensbuilding.org",
    "hours": "Mon-Fri: 9:00 AM - 5:00 PM PST",
    "adviceType": "Sisterhood drop-in, housing support, legal immigration clinics, health navigation",
    "keyAdviceOffered": [
      "In-person confidential peer sisterhood drop-in space",
      "Free immigration, tenancy & family legal rights counseling",
      "Confidential physical sanctuary & community garden",
      "Direct referral to sliding-scale mental health counseling"
    ],
    "state": "California",
    "stateCode": "CA",
    "cityName": "San Francisco"
  },
  {
    "id": "place_la_downtown_womens_center",
    "name": "Downtown Women's Center Community Sanctuary",
    "category": "COMMUNITY_SANCTUARY",
    "country": "US",
    "countryName": "United States",
    "city": "Los Angeles, CA",
    "address": "442 S San Pedro St, Los Angeles, CA 90013",
    "lat": 34.0435,
    "lng": -118.2437,
    "mapCoordX": 0.29,
    "mapCoordY": 0.44,
    "phone": "+1 213-680-0600",
    "website": "https://downtownwomenscenter.org",
    "hours": "Daily: 8:00 AM - 4:00 PM PST",
    "adviceType": "Day center sanctuary, trauma-informed counseling, health clinics, job readiness",
    "keyAdviceOffered": [
      "Safe, welcoming day center exclusively for women",
      "Trauma recovery counseling and peer support groups",
      "Direct job readiness training and social enterprise employment",
      "On-site primary care and mental health access"
    ],
    "state": "California",
    "stateCode": "CA",
    "cityName": "Los Angeles"
  },
  {
    "id": "place_seattle_legal_aid",
    "name": "Sexual Violence Law Center & KCBA Family Law Clinic",
    "category": "LEGAL_RIGHTS",
    "country": "US",
    "countryName": "United States",
    "city": "Seattle, WA",
    "address": "1200 5th Ave Suite 700, Seattle, WA 98101",
    "lat": 47.6085,
    "lng": -122.3338,
    "mapCoordX": 0.27,
    "mapCoordY": 0.24,
    "phone": "+1 206-464-0838",
    "website": "https://svlawcenter.org",
    "hours": "Mon-Fri: 9:00 AM - 4:30 PM PST",
    "adviceType": "Confidential legal representation, protective order guidance, custody defense",
    "keyAdviceOffered": [
      "Trauma-informed victim legal representation",
      "Assistance with emergency civil protection orders",
      "Immigration U-Visa & VAWA legal counseling",
      "Safe family law guidance and court navigation"
    ],
    "state": "Washington",
    "stateCode": "WA",
    "cityName": "Seattle"
  },
  {
    "id": "place_workplace_legal_aid",
    "name": "Legal Aid at Work - Women's Rights Clinic",
    "category": "LEGAL_RIGHTS",
    "country": "US",
    "countryName": "United States",
    "city": "San Francisco, CA",
    "address": "180 Montgomery St Suite 600, San Francisco, CA 94104",
    "lat": 37.7906,
    "lng": -122.4022,
    "mapCoordX": 0.31,
    "mapCoordY": 0.36,
    "phone": "+1 415-864-8848",
    "website": "https://legalaidatwork.org",
    "hours": "Mon-Fri: 9:00 AM - 5:00 PM PST",
    "adviceType": "Pregnancy discrimination, harassment protection, pay equity, parental leave rights",
    "keyAdviceOffered": [
      "Free confidential workplace rights helpline for women",
      "Counseling on pregnancy accommodations and parental leave",
      "Legal recourse for sexual harassment and retaliation",
      "Remote and gig-worker wage rights advocacy"
    ],
    "state": "California",
    "stateCode": "CA",
    "cityName": "San Francisco"
  },
  {
    "id": "place_sanctuary_families_ny",
    "name": "Sanctuary for Families Clinical Counseling Sanctuary",
    "category": "MENTAL_HEALTH",
    "country": "US",
    "countryName": "United States",
    "city": "New York, NY",
    "address": "110 Wall St 11th Floor, New York, NY 10005",
    "lat": 40.7061,
    "lng": -74.0068,
    "mapCoordX": 0.72,
    "mapCoordY": 0.35,
    "phone": "+1 212-349-6009",
    "website": "https://sanctuaryforfamilies.org",
    "hours": "Mon-Fri: 9:00 AM - 5:00 PM EST",
    "adviceType": "Trauma-informed clinical counseling, crisis recovery, empowerment groups",
    "keyAdviceOffered": [
      "Free individual and group psychotherapy for women",
      "Crisis intervention and safety planning sanctuary",
      "Children and mothers healing cohorts",
      "Holistic wellness workshops and emotional resilience building"
    ],
    "state": "New York",
    "stateCode": "NY",
    "cityName": "New York"
  },
  {
    "id": "place_us_dress_for_success_ny",
    "name": "Dress for Success Worldwide HQ & Career Hub",
    "category": "CAREER_JOB",
    "country": "US",
    "countryName": "United States",
    "city": "New York, NY",
    "address": "545 8th Ave Suite 1100, New York, NY 10018",
    "lat": 40.7535,
    "lng": -73.9922,
    "mapCoordX": 0.73,
    "mapCoordY": 0.33,
    "phone": "+1 212-532-1922",
    "website": "https://dressforsuccess.org",
    "hours": "Mon-Fri: 9:00 AM - 5:00 PM EST",
    "adviceType": "Career re-entry, interview styling, salary negotiation, professional mentoring",
    "keyAdviceOffered": [
      "Free professional interview suiting & professional coaching",
      "Job search strategies and resume optimization clinics",
      "Financial literacy and economic independence workshops",
      "Global network of professional women mentors"
    ],
    "state": "New York",
    "stateCode": "NY",
    "cityName": "New York"
  },
  {
    "id": "place_us_chicago_womens_health",
    "name": "Chicago Women's Health Center",
    "category": "WOMEN_HEALTH",
    "country": "US",
    "countryName": "United States",
    "city": "Chicago, IL",
    "address": "1025 W Sunnyside Ave Suite 201, Chicago, IL 60640",
    "lat": 41.968,
    "lng": -87.658,
    "mapCoordX": 0.58,
    "mapCoordY": 0.34,
    "phone": "+1 773-935-6126",
    "website": "https://www.cwhc.org",
    "hours": "Mon-Thu: 9:00 AM - 7:00 PM CST, Fri: 9:00 AM - 4:00 PM CST",
    "adviceType": "Sliding-scale integrative health, gynecological care, counseling, trans health",
    "keyAdviceOffered": [
      "Sliding-scale comprehensive primary & reproductive healthcare",
      "Integrative alternative therapies: acupuncture and bodywork",
      "Trauma-informed counseling and support circles",
      "Empowered, patient-centered health education"
    ],
    "state": "Illinois",
    "stateCode": "IL",
    "cityName": "Chicago"
  },
  {
    "id": "place_tx_safe_alliance_austin",
    "name": "The SAFE Alliance Women & Family Sanctuary",
    "category": "CRISIS_SHELTER",
    "country": "US",
    "countryName": "United States",
    "city": "Austin, TX",
    "address": "4800 Manor Rd, Austin, TX 78723",
    "lat": 30.2974,
    "lng": -97.7027,
    "mapCoordX": 0.52,
    "mapCoordY": 0.72,
    "phone": "+1 512-267-7233",
    "website": "https://www.safeaustin.org",
    "hours": "24/7 Crisis Hotline & Walk-in Emergency Refuge",
    "adviceType": "Emergency refuge shelter, trauma counseling, sexual assault forensic clinic",
    "keyAdviceOffered": [
      "24/7 confidential safety planning and emergency refuge",
      "Specialized legal representation for protective orders",
      "Free medical forensic clinic with trauma advocates",
      "Children and family healing counseling programs"
    ],
    "state": "Texas",
    "stateCode": "TX",
    "cityName": "Austin"
  },
  {
    "id": "place_tx_houston_area_womens_center",
    "name": "Houston Area Women's Center (HAWC)",
    "category": "COMMUNITY_SANCTUARY",
    "country": "US",
    "countryName": "United States",
    "city": "Houston, TX",
    "address": "1010 Waugh Dr, Houston, TX 77019",
    "lat": 29.7578,
    "lng": -95.3986,
    "mapCoordX": 0.55,
    "mapCoordY": 0.75,
    "phone": "+1 713-528-2121",
    "website": "https://hawc.org",
    "hours": "24/7 Crisis Hotline & Day Resource Center",
    "adviceType": "Emergency housing, crisis hotline, hospital accompaniment, legal advocacy",
    "keyAdviceOffered": [
      "Free, confidential 24-hour crisis helpline",
      "Safe emergency shelter and supportive housing",
      "Accompaniment for survivors at hospitals and police stations",
      "Comprehensive career navigation and violence prevention"
    ],
    "state": "Texas",
    "stateCode": "TX",
    "cityName": "Houston"
  },
  {
    "id": "place_fl_lotus_house_miami",
    "name": "Lotus House Women & Children Sanctuary",
    "category": "CRISIS_SHELTER",
    "country": "US",
    "countryName": "United States",
    "city": "Miami, FL",
    "address": "217 NW 15th St, Miami, FL 33136",
    "lat": 25.7901,
    "lng": -80.1982,
    "mapCoordX": 0.82,
    "mapCoordY": 0.86,
    "phone": "+1 305-438-0556",
    "website": "https://lotushouse.org",
    "hours": "Daily: 24 Hours Intake & Healing Center",
    "adviceType": "Holistic shelter sanctuary, trauma counseling, maternal healthcare, job training",
    "keyAdviceOffered": [
      "Dedicated, dignified sanctuary exclusively for women and infants",
      "Trauma-informed counseling and youth arts therapies",
      "Full maternal health navigation and pediatric clinics",
      "Job readiness and social enterprise pathways"
    ],
    "state": "Florida",
    "stateCode": "FL",
    "cityName": "Miami"
  },
  {
    "id": "place_ga_wrc_atlanta",
    "name": "Women's Resource Center to End Domestic Violence",
    "category": "COMMUNITY_SANCTUARY",
    "country": "US",
    "countryName": "United States",
    "city": "Atlanta, GA",
    "address": "PO Box 171, Decatur, GA 30031 (Safe Address Dispatch)",
    "lat": 33.7748,
    "lng": -84.2963,
    "mapCoordX": 0.71,
    "mapCoordY": 0.62,
    "phone": "+1 404-688-9436",
    "website": "https://www.wrcdv.org",
    "hours": "24/7 Crisis Hotline & Safe Emergency Refuge",
    "adviceType": "24/7 Safe housing, legal clinic, emotional support, rapid financial micro-grants",
    "keyAdviceOffered": [
      "24-hour confidential crisis intervention & emergency housing",
      "Direct court advocacy for temporary protective orders",
      "Emergency financial assistance and transport vouchers",
      "Weekly survivor-led empowerment and support circles"
    ],
    "state": "Georgia",
    "stateCode": "GA",
    "cityName": "Atlanta"
  },
  {
    "id": "place_pa_women_against_abuse_philly",
    "name": "Women Against Abuse Legal Center & Sanctuary",
    "category": "LEGAL_RIGHTS",
    "country": "US",
    "countryName": "United States",
    "city": "Philadelphia, PA",
    "address": "100 S Broad St 5th Floor, Philadelphia, PA 19110",
    "lat": 39.9509,
    "lng": -75.1636,
    "mapCoordX": 0.81,
    "mapCoordY": 0.36,
    "phone": "+1 866-723-3014",
    "website": "https://www.womenagainstabuse.org",
    "hours": "Mon-Fri: 9:00 AM - 5:00 PM EST (24/7 Hotline)",
    "adviceType": "Free legal representation, emergency safe havens, trauma therapy, emergency shelter",
    "keyAdviceOffered": [
      "Free victim legal representation in Philadelphia family court",
      "Emergency confidential safe havens for individuals and children",
      "Community education and behavioral health therapy",
      "Philadelphia domestic violence crisis hotline dispatch"
    ],
    "state": "Pennsylvania",
    "stateCode": "PA",
    "cityName": "Philadelphia"
  },
  {
    "id": "place_ma_casa_myrna_boston",
    "name": "Casa Myrna Women's Sanctuary & Legal Clinic",
    "category": "COMMUNITY_SANCTUARY",
    "country": "US",
    "countryName": "United States",
    "city": "Boston, MA",
    "address": "38 Summer St 5th Floor, Boston, MA 02110",
    "lat": 42.3551,
    "lng": -71.0589,
    "mapCoordX": 0.88,
    "mapCoordY": 0.28,
    "phone": "+1 877-785-2020",
    "website": "https://casamyrna.org",
    "hours": "24/7 Safelink Statewide Helpline & Resource Center",
    "adviceType": "Multilingual legal advocacy, transitional housing, emergency shelter, youth mentorship",
    "keyAdviceOffered": [
      "Operators of SafeLink, Massachusetts statewide 24/7 hotline",
      "Specialized legal advocacy in immigration and family law",
      "Three confidential residential shelters with full family support",
      "Bilingual Spanish-English community counseling & economic stability"
    ],
    "state": "Massachusetts",
    "stateCode": "MA",
    "cityName": "Boston"
  },
  {
    "id": "place_co_gathering_place_denver",
    "name": "The Gathering Place Women's Daytime Sanctuary",
    "category": "COMMUNITY_SANCTUARY",
    "country": "US",
    "countryName": "United States",
    "city": "Denver, CO",
    "address": "1535 High St, Denver, CO 80218",
    "lat": 39.7408,
    "lng": -104.9653,
    "mapCoordX": 0.42,
    "mapCoordY": 0.46,
    "phone": "+1 303-321-4198",
    "website": "https://tgpdenver.org",
    "hours": "Mon-Fri: 8:30 AM - 4:00 PM MST",
    "adviceType": "Daytime community sanctuary, mental health counseling, physical health clinics, job access",
    "keyAdviceOffered": [
      "Safe daytime refuge exclusively serving women and trans individuals",
      "Trauma recovery counseling and peer support groups",
      "Access to hot meals, showers, and safe mail drop",
      "On-site legal aid clinics and family stability counseling"
    ],
    "state": "Colorado",
    "stateCode": "CO",
    "cityName": "Denver"
  },
  {
    "id": "place_dc_dc_volunteer_lawyers",
    "name": "DC Volunteer Lawyers Project Domestic Sanctuary Clinic",
    "category": "LEGAL_RIGHTS",
    "country": "US",
    "countryName": "United States",
    "city": "Washington D.C.",
    "address": "5335 Wisconsin Ave NW Suite 440, Washington, DC 20015",
    "lat": 38.9614,
    "lng": -77.0858,
    "mapCoordX": 0.78,
    "mapCoordY": 0.42,
    "phone": "+1 202-885-5542",
    "website": "https://www.dcvlp.org",
    "hours": "Mon-Fri: 9:00 AM - 5:00 PM EST",
    "adviceType": "Free legal representation, civil protection orders, child custody defense, immigration",
    "keyAdviceOffered": [
      "Free court representation for civil protection orders",
      "Holistic survivor legal advocacy with assigned crisis social workers",
      "Confidential weekly drop-in community clinics throughout DC",
      "Trauma-informed child advocacy and custody defense"
    ],
    "state": "District of Columbia",
    "stateCode": "DC",
    "cityName": "Washington D.C."
  },
  {
    "id": "place_uk_southall_black_sisters",
    "name": "Southall Black Sisters Advocacy & Resource Centre",
    "category": "COMMUNITY_SANCTUARY",
    "country": "GB",
    "countryName": "United Kingdom",
    "city": "London, UK",
    "address": "21 Avenue Rd, Southall, London UB1 3BL",
    "lat": 51.5065,
    "lng": -0.3776,
    "mapCoordX": 0.44,
    "mapCoordY": 0.28,
    "phone": "+44 20 8571 9595",
    "website": "https://southallblacksisters.org.uk",
    "hours": "Mon-Fri: 9:00 AM - 5:00 PM GMT",
    "adviceType": "Immigrant women's rights, domestic abuse advocacy, housing & emergency shelter",
    "keyAdviceOffered": [
      "Safe physical sanctuary with no recourse to public funds (NRPF) support",
      "Culturally sensitive advocacy in Hindi, Punjabi, Urdu & English",
      "Immigration and marital dispute guidance",
      "Emergency housing placement and legal referrals"
    ],
    "state": "England",
    "stateCode": "ENG",
    "cityName": "London"
  },
  {
    "id": "place_uk_rights_of_women",
    "name": "Rights of Women Legal Advice Centre",
    "category": "LEGAL_RIGHTS",
    "country": "GB",
    "countryName": "United Kingdom",
    "city": "London, UK",
    "address": "52-54 Featherstone St, London EC1Y 8RT",
    "lat": 51.5235,
    "lng": -0.089,
    "mapCoordX": 0.46,
    "mapCoordY": 0.27,
    "phone": "+44 20 7251 6577",
    "website": "https://rightsofwomen.org.uk",
    "hours": "Tue-Thu: 10:00 AM - 4:00 PM GMT",
    "adviceType": "Family law, divorce, domestic abuse, sexual violence, immigration law advice",
    "keyAdviceOffered": [
      "Free confidential legal advice by women solicitors",
      "Guidance through divorce, separation, and child arrangement orders",
      "Immigration and asylum law advice for vulnerable women",
      "Clear legal guides and online self-representation toolkits"
    ],
    "state": "England",
    "stateCode": "ENG",
    "cityName": "London"
  },
  {
    "id": "place_uk_working_chance",
    "name": "Working Chance Women's Career Hub",
    "category": "CAREER_JOB",
    "country": "GB",
    "countryName": "United Kingdom",
    "city": "London, UK",
    "address": "10 Rosebery Ave, London EC1R 4TF",
    "lat": 51.5255,
    "lng": -0.1085,
    "mapCoordX": 0.45,
    "mapCoordY": 0.26,
    "phone": "+44 20 7278 6444",
    "website": "https://workingchance.org",
    "hours": "Mon-Fri: 9:30 AM - 5:00 PM GMT",
    "adviceType": "Career coaching, employment placement, corporate mentoring, interview prep",
    "keyAdviceOffered": [
      "Specialized employment coaching helping women cross career barriers",
      "Direct placement with inclusive, forward-thinking UK employers",
      "Confidence building, CV masterclasses, and mock interviews",
      "Post-employment peer support and financial autonomy workshops"
    ],
    "state": "England",
    "stateCode": "ENG",
    "cityName": "London"
  },
  {
    "id": "place_uk_mind_womens_hub",
    "name": "Mind Women's Mental Health & Recovery Hub",
    "category": "MENTAL_HEALTH",
    "country": "GB",
    "countryName": "United Kingdom",
    "city": "London, UK",
    "address": "15-19 Broadway, London E15 4BQ",
    "lat": 51.5415,
    "lng": 0.001,
    "mapCoordX": 0.47,
    "mapCoordY": 0.28,
    "phone": "+44 20 8522 4110",
    "website": "https://www.mind.org.uk",
    "hours": "Mon-Fri: 9:00 AM - 5:30 PM GMT",
    "adviceType": "Women-only trauma therapy circles, anxiety recovery, perinatal depression support",
    "keyAdviceOffered": [
      "Confidential 1-on-1 counseling and peer support circles",
      "Specialist maternal mental health and postpartum support",
      "Mindfulness, gentle movement, and creative wellbeing sessions",
      "Safe space drop-in for women experiencing anxiety and isolation"
    ],
    "state": "England",
    "stateCode": "ENG",
    "cityName": "London"
  },
  {
    "id": "place_uk_wellbeing_of_women",
    "name": "Wellbeing of Women Health Information Centre",
    "category": "WOMEN_HEALTH",
    "country": "GB",
    "countryName": "United Kingdom",
    "city": "London, UK",
    "address": "10-18 Union St, London SE1 1SZ",
    "lat": 51.503,
    "lng": -0.093,
    "mapCoordX": 0.46,
    "mapCoordY": 0.29,
    "phone": "+44 20 3697 7000",
    "website": "https://www.wellbeingofwomen.org.uk",
    "hours": "Mon-Fri: 9:00 AM - 5:00 PM GMT",
    "adviceType": "Reproductive wellness, menopause navigation, endometriosis and pelvic pain care",
    "keyAdviceOffered": [
      "Evidence-based women's health guidance and clinical referrals",
      "Menopause workplace and personal support communities",
      "Endometriosis and reproductive health patient advocacy",
      "Free confidential health literature and webinars"
    ],
    "state": "England",
    "stateCode": "ENG",
    "cityName": "London"
  },
  {
    "id": "place_uk_scottish_womens_aid",
    "name": "Scottish Women's Aid Edinburgh Sanctuary",
    "category": "COMMUNITY_SANCTUARY",
    "country": "GB",
    "countryName": "United Kingdom",
    "city": "Edinburgh, Scotland",
    "address": "132 Rose St, Edinburgh EH2 3JD",
    "lat": 55.952,
    "lng": -3.201,
    "mapCoordX": 0.43,
    "mapCoordY": 0.18,
    "phone": "+44 800 027 1234",
    "website": "https://womensaid.scot",
    "hours": "24/7 Scotland Domestic Abuse & Forced Marriage Helpline",
    "adviceType": "Safe refuge, crisis helpline, legal advocacy, trauma recovery for women & children",
    "keyAdviceOffered": [
      "24/7 confidential Scottish national crisis support",
      "Emergency refuge shelter access across all Scottish local authorities",
      "Legal information and court advocacy under Scottish Law",
      "Specialist support for immigrant women and children"
    ],
    "state": "Scotland",
    "stateCode": "SCT",
    "cityName": "Edinburgh"
  },
  {
    "id": "place_uk_welsh_womens_aid",
    "name": "Welsh Women's Aid Cardiff Support Center",
    "category": "COMMUNITY_SANCTUARY",
    "country": "GB",
    "countryName": "United Kingdom",
    "city": "Cardiff, Wales",
    "address": "Pendragon House, Caversham Rd, Cardiff CF5 2TD",
    "lat": 51.488,
    "lng": -3.226,
    "mapCoordX": 0.41,
    "mapCoordY": 0.31,
    "phone": "+44 808 801 0800",
    "website": "https://welshwomensaid.org.uk",
    "hours": "24/7 Live Fear Free All-Wales Helpline",
    "adviceType": "Safe emergency accommodation, bilingual Welsh-English counseling, legal protection",
    "keyAdviceOffered": [
      "24/7 free, confidential all-Wales crisis helpline",
      "Direct placement in specialist women's refuges across Wales",
      "Bilingual Welsh and English legal guidance and advocacy",
      "Community recovery groups and children's workers"
    ],
    "state": "Wales",
    "stateCode": "WLS",
    "cityName": "Cardiff"
  },
  {
    "id": "place_ca_downtown_eastside_womens",
    "name": "Downtown Eastside Women's Centre",
    "category": "COMMUNITY_SANCTUARY",
    "country": "CA",
    "countryName": "Canada",
    "city": "Vancouver, BC",
    "address": "302 Columbia St, Vancouver, BC V6A 4J1",
    "lat": 49.2818,
    "lng": -123.1022,
    "mapCoordX": 0.24,
    "mapCoordY": 0.2,
    "phone": "+1 604-681-8480",
    "website": "https://dewc.ca",
    "hours": "Daily: 9:00 AM - 8:00 PM PST",
    "adviceType": "Women-only safe refuge, hot meals, elder support, advocacy & shelter linkage",
    "keyAdviceOffered": [
      "Drop-in sanctuary exclusively for self-identified women and children",
      "Indigenous women's programs, cultural healing and elder circles",
      "Victim advocacy and emergency housing placement",
      "Confidential counseling and harm reduction supplies"
    ],
    "state": "British Columbia",
    "stateCode": "BC",
    "cityName": "Vancouver"
  },
  {
    "id": "place_ca_barbra_schlifer",
    "name": "Barbra Schlifer Commemorative Clinic",
    "category": "LEGAL_RIGHTS",
    "country": "CA",
    "countryName": "Canada",
    "city": "Toronto, ON",
    "address": "489 College St Suite 503, Toronto, ON M6G 1A5",
    "lat": 43.6558,
    "lng": -79.4087,
    "mapCoordX": 0.65,
    "mapCoordY": 0.25,
    "phone": "+1 416-323-9149",
    "website": "https://schliferclinic.com",
    "hours": "Mon-Fri: 9:00 AM - 5:00 PM EST",
    "adviceType": "Free legal representation, trauma counseling, multilingual interpretation",
    "keyAdviceOffered": [
      "Free legal representation in family, immigration & criminal law",
      "Multilingual counseling in over 90 languages and dialects",
      "Specialized risk assessments and safety transition planning",
      "Trauma-informed court accompaniment and advocacy"
    ],
    "state": "Ontario",
    "stateCode": "ON",
    "cityName": "Toronto"
  },
  {
    "id": "place_ca_times_change_career",
    "name": "Times Change Women's Employment Association",
    "category": "CAREER_JOB",
    "country": "CA",
    "countryName": "Canada",
    "city": "Toronto, ON",
    "address": "365 Bloor St E Suite 1003, Toronto, ON M4W 3L4",
    "lat": 43.6702,
    "lng": -79.3812,
    "mapCoordX": 0.66,
    "mapCoordY": 0.24,
    "phone": "+1 416-927-1900",
    "website": "https://timeschange.org",
    "hours": "Mon-Fri: 9:00 AM - 4:30 PM EST",
    "adviceType": "Career counseling for women, educational upgrades, resume clinics, job clubs",
    "keyAdviceOffered": [
      "Free career guidance tailored specifically to women and newcomers",
      "Resume & LinkedIn optimization clinics and mock interview labs",
      "Computer training and digital literacy for women in career transitions",
      "Active job matching and hiring employer roundtables"
    ],
    "state": "Ontario",
    "stateCode": "ON",
    "cityName": "Toronto"
  },
  {
    "id": "place_ca_womens_health_clinic_winnipeg",
    "name": "Women's Health Clinic Winnipeg",
    "category": "WOMEN_HEALTH",
    "country": "CA",
    "countryName": "Canada",
    "city": "Winnipeg, MB",
    "address": "419 Graham Ave Unit A, Winnipeg, MB R3C 0M3",
    "lat": 49.892,
    "lng": -97.144,
    "mapCoordX": 0.45,
    "mapCoordY": 0.22,
    "phone": "+1 204-947-1517",
    "website": "https://womenshealthclinic.org",
    "hours": "Mon-Fri: 8:30 AM - 4:30 PM CST",
    "adviceType": "Non-judgmental feminist healthcare, postpartum circles, eating disorder care",
    "keyAdviceOffered": [
      "Community health clinic providing inclusive women's medical care",
      "Mothers and postpartum wellness support groups",
      "Trauma-informed eating disorder counseling",
      "Birth control education, pap clinics, and reproductive choices"
    ],
    "state": "Manitoba",
    "stateCode": "MB",
    "cityName": "Winnipeg"
  },
  {
    "id": "place_ca_trauma_therapy_toronto",
    "name": "Women's College Hospital Trauma Therapy Center",
    "category": "MENTAL_HEALTH",
    "country": "CA",
    "countryName": "Canada",
    "city": "Toronto, ON",
    "address": "76 Grenville St, Toronto, ON M5S 1B2",
    "lat": 43.6617,
    "lng": -79.3892,
    "mapCoordX": 0.65,
    "mapCoordY": 0.26,
    "phone": "+1 416-323-6400",
    "website": "https://www.womenscollegehospital.ca",
    "hours": "Mon-Fri: 9:00 AM - 5:00 PM EST",
    "adviceType": "Specialized trauma psychotherapy, anxiety recovery cohorts, holistic healing",
    "keyAdviceOffered": [
      "Comprehensive outpatient group psychotherapy for trauma recovery",
      "Specialized mental health programs for women with perinatal depression",
      "Evidence-based stabilization, mindfulness, and cognitive processing",
      "Accessible care covered by provincial health insurance"
    ],
    "state": "Ontario",
    "stateCode": "ON",
    "cityName": "Toronto"
  },
  {
    "id": "place_au_wire_melbourne",
    "name": "WIRE - Women's Information & Referral Exchange",
    "category": "COMMUNITY_SANCTUARY",
    "country": "AU",
    "countryName": "Australia",
    "city": "Melbourne, VIC",
    "address": "372 Albert St, East Melbourne, VIC 3002",
    "lat": -37.8099,
    "lng": 144.978,
    "mapCoordX": 0.82,
    "mapCoordY": 0.76,
    "phone": "+61 1300 134 130",
    "website": "https://www.wire.org.au",
    "hours": "Mon-Fri: 9:00 AM - 5:00 PM AEST",
    "adviceType": "Financial coaching, relationship breakdown guidance, housing navigation",
    "keyAdviceOffered": [
      "State-wide free support, referral and info service for Victorian women",
      "Confidential telephone and in-person drop-in center",
      "Financial capability coaching and family violence recovery",
      "Safe computer lounge and job-seeking resources"
    ],
    "state": "Victoria",
    "stateCode": "VIC",
    "cityName": "Melbourne"
  },
  {
    "id": "place_au_lous_place_sydney",
    "name": "Lou's Place Community Sanctuary for Women",
    "category": "COMMUNITY_SANCTUARY",
    "country": "AU",
    "countryName": "Australia",
    "city": "Sydney, NSW",
    "address": "182 Victoria St, Kings Cross, Sydney NSW 2010",
    "lat": -33.8745,
    "lng": 151.2225,
    "mapCoordX": 0.85,
    "mapCoordY": 0.74,
    "phone": "+61 2 9358 2038",
    "website": "https://www.lousplace.com.au",
    "hours": "Mon-Fri: 8:30 AM - 3:00 PM AEST",
    "adviceType": "Day center refuge, crisis counseling, legal aid clinic, creative workshops",
    "keyAdviceOffered": [
      "The only daytime drop-in sanctuary for women in Sydney",
      "Free hot meals, clothing boutique, laundry and shower facilities",
      "On-site legal clinic, psychology sessions and trauma case management",
      "Art therapy, sewing, creative writing, and yoga classes"
    ],
    "state": "New South Wales",
    "stateCode": "NSW",
    "cityName": "Sydney"
  },
  {
    "id": "place_au_womens_legal_victoria",
    "name": "Women's Legal Service Victoria",
    "category": "LEGAL_RIGHTS",
    "country": "AU",
    "countryName": "Australia",
    "city": "Melbourne, VIC",
    "address": "277 William St Level 8, Melbourne, VIC 3000",
    "lat": -37.814,
    "lng": 144.957,
    "mapCoordX": 0.81,
    "mapCoordY": 0.77,
    "phone": "+61 3 8622 0600",
    "website": "https://womenslegal.org.au",
    "hours": "Mon-Fri: 9:00 AM - 5:00 PM AEST",
    "adviceType": "Family law, family violence intervention, child protection, financial rights",
    "keyAdviceOffered": [
      "Free confidential legal representation and legal advice line",
      "Specialized family violence intervention order (FVIO) assistance",
      "Property settlement and child custody rights guidance",
      "Social work and holistic court support services"
    ],
    "state": "Victoria",
    "stateCode": "VIC",
    "cityName": "Melbourne"
  },
  {
    "id": "place_au_fitted_for_work",
    "name": "Fitted for Work Melbourne Career Hub",
    "category": "CAREER_JOB",
    "country": "AU",
    "countryName": "Australia",
    "city": "Melbourne, VIC",
    "address": "513 Bridge Rd, Richmond, VIC 3121",
    "lat": -37.8185,
    "lng": 145.008,
    "mapCoordX": 0.83,
    "mapCoordY": 0.77,
    "phone": "+61 3 9662 4289",
    "website": "https://fittedforwork.org",
    "hours": "Mon-Thu: 9:00 AM - 4:00 PM AEST",
    "adviceType": "Interview dressing, resume workshops, mentor matching, work readiness",
    "keyAdviceOffered": [
      "Free personal outfitting and styling for job interviews",
      "One-on-one resume development and interview preparation",
      "Work readiness workshops and women mentor matching",
      "Ongoing post-placement support to maintain financial security"
    ],
    "state": "Victoria",
    "stateCode": "VIC",
    "cityName": "Melbourne"
  },
  {
    "id": "place_au_jean_hailes_health",
    "name": "Jean Hailes for Women's Health Clinic",
    "category": "WOMEN_HEALTH",
    "country": "AU",
    "countryName": "Australia",
    "city": "Melbourne, VIC",
    "address": "173 Carinish Rd, Clayton, VIC 3168",
    "lat": -37.925,
    "lng": 145.122,
    "mapCoordX": 0.84,
    "mapCoordY": 0.79,
    "phone": "+61 3 9562 7555",
    "website": "https://www.jeanhailes.org.au",
    "hours": "Mon-Fri: 9:00 AM - 5:00 PM AEST",
    "adviceType": "Hormonal health, menopause counseling, PCOS, pelvic floor physical therapy",
    "keyAdviceOffered": [
      "National specialist women's health medical and naturopathic care",
      "Comprehensive menopause and perimenopause consultations",
      "PCOS and endometriosis management plans",
      "Women-focused clinical psychology and pelvic physiotherapy"
    ],
    "state": "Victoria",
    "stateCode": "VIC",
    "cityName": "Melbourne"
  },
  {
    "id": "place_au_panda_mental_health",
    "name": "PANDA Perinatal & Maternal Mental Health Sanctuary",
    "category": "MENTAL_HEALTH",
    "country": "AU",
    "countryName": "Australia",
    "city": "Melbourne, VIC",
    "address": "80-84 Johnston St, Fitzroy, Melbourne, VIC 3065",
    "lat": -37.7985,
    "lng": 144.9785,
    "mapCoordX": 0.82,
    "mapCoordY": 0.75,
    "phone": "+61 1300 726 306",
    "website": "https://panda.org.au",
    "hours": "Mon-Sat: 9:00 AM - 7:30 PM AEST",
    "adviceType": "Perinatal depression counseling, birth trauma processing, motherhood circles",
    "keyAdviceOffered": [
      "Specialist counseling for prenatal and postnatal anxiety & depression",
      "Non-judgmental telephone and telehealth clinical support for mothers",
      "Peer support buddy matching with women who have lived experience",
      "Mental health transition plans for new mothers and partners"
    ],
    "state": "Victoria",
    "stateCode": "VIC",
    "cityName": "Melbourne"
  },
  {
    "id": "place_eu_centre_hubertine_auclert",
    "name": "Centre Hubertine Auclert pour l'Égalité Femmes-Hommes",
    "category": "COMMUNITY_SANCTUARY",
    "country": "EU",
    "countryName": "European Union (France)",
    "city": "Paris, France",
    "address": "7 Rue Ernest Renan, 94200 Ivry-sur-Seine, Paris",
    "lat": 48.815,
    "lng": 2.382,
    "mapCoordX": 0.48,
    "mapCoordY": 0.35,
    "phone": "+33 1 75 62 18 40",
    "website": "https://www.centre-hubertine-auclert.fr",
    "hours": "Mon-Fri: 9:30 AM - 6:00 PM CET",
    "adviceType": "Women's rights advocacy, prevention of domestic violence, equal opportunities",
    "keyAdviceOffered": [
      "Regional resource center defending women's fundamental rights",
      "Orientation and direct connection to local emergency shelters in Île-de-France",
      "Support documentation for victims of cyber-harassment and sexism",
      "Gender equality and economic autonomy workshops"
    ],
    "state": "France",
    "stateCode": "FR",
    "cityName": "Paris"
  },
  {
    "id": "place_eu_begine_berlin",
    "name": "Begine Frauenkultur e.V. Sanctuary & Community Space",
    "category": "COMMUNITY_SANCTUARY",
    "country": "EU",
    "countryName": "European Union (Germany)",
    "city": "Berlin, Germany",
    "address": "Potsdamer Straße 139, 10783 Berlin",
    "lat": 52.4938,
    "lng": 13.3551,
    "mapCoordX": 0.52,
    "mapCoordY": 0.3,
    "phone": "+49 30 2151414",
    "website": "https://www.begine.de",
    "hours": "Tue-Sat: 5:00 PM - 11:00 PM CET",
    "adviceType": "Women-only meeting sanctuary, culture, counseling referral, peer sisterhood",
    "keyAdviceOffered": [
      "Safe physical meeting space and non-commercial sanctuary for women",
      "Peer counseling, transition circles, and self-help group hosting",
      "Cultural empowerment events, readings, and sisterhood gatherings",
      "Information clearinghouse for Berlin women's counseling services"
    ],
    "state": "Germany",
    "stateCode": "DE",
    "cityName": "Berlin"
  },
  {
    "id": "place_eu_european_womens_lobby",
    "name": "European Women's Lobby Resource & Advocacy Hub",
    "category": "LEGAL_RIGHTS",
    "country": "EU",
    "countryName": "European Union (Belgium)",
    "city": "Brussels, Belgium",
    "address": "18 Rue Hydraulique, 1210 Brussels, Belgium",
    "lat": 50.849,
    "lng": 4.372,
    "mapCoordX": 0.49,
    "mapCoordY": 0.32,
    "phone": "+32 2 217 90 20",
    "website": "https://www.womenlobby.org",
    "hours": "Mon-Fri: 9:00 AM - 5:30 PM CET",
    "adviceType": "EU-wide legal advocacy, violence prevention, economic independence, migrant rights",
    "keyAdviceOffered": [
      "Umbrella organization coordinating 2,000+ women's NGOs across Europe",
      "Pan-European directory of emergency hotlines and women's legal aid",
      "Advocacy toolkits on workplace pay transparency and equal pensions",
      "Support networks for migrant, refugee, and displaced European women"
    ],
    "state": "Belgium",
    "stateCode": "BE",
    "cityName": "Brussels"
  },
  {
    "id": "place_eu_lara_berlin_mental",
    "name": "LARA Krisen- und Beratungszentrum für Frauen",
    "category": "MENTAL_HEALTH",
    "country": "EU",
    "countryName": "European Union (Germany)",
    "city": "Berlin, Germany",
    "address": "Karl-Heinrich-Ulrichs-Straße 11, 10787 Berlin",
    "lat": 52.502,
    "lng": 13.355,
    "mapCoordX": 0.53,
    "mapCoordY": 0.3,
    "phone": "+49 30 2168888",
    "website": "https://lara-berlin.de",
    "hours": "Mon-Fri: 9:00 AM - 6:00 PM CET",
    "adviceType": "Crisis intervention, trauma counseling, multilingual psychological support",
    "keyAdviceOffered": [
      "Specialized crisis counseling for women facing traumatic experiences",
      "Multilingual counseling in German, English, Arabic, Farsi, and Polish",
      "Confidential psychological stabilization and somatic grounding",
      "Accompaniment to medical and legal appointments"
    ],
    "state": "Germany",
    "stateCode": "DE",
    "cityName": "Berlin"
  },
  {
    "id": "place_eu_maison_des_femmes",
    "name": "La Maison des Femmes Restorative Clinic",
    "category": "WOMEN_HEALTH",
    "country": "EU",
    "countryName": "European Union (France)",
    "city": "Paris (Saint-Denis), France",
    "address": "1 Chemin du Moulin Basset, 93200 Saint-Denis, France",
    "lat": 48.9362,
    "lng": 2.3574,
    "mapCoordX": 0.48,
    "mapCoordY": 0.34,
    "phone": "+33 1 42 35 61 28",
    "website": "https://www.lamaisondesfemmes.fr",
    "hours": "Mon-Fri: 9:00 AM - 5:00 PM CET",
    "adviceType": "Comprehensive medical care, trauma counseling, somatic therapy, legal linkage",
    "keyAdviceOffered": [
      "Sanctuary offering integrated physical and psychological care under one roof",
      "Consultations with gynecologists, midwives, and specialized doctors",
      "Art therapy, dance therapy, and EMDR trauma processing",
      "Police and legal intake without stepping outside the sanctuary"
    ],
    "state": "France",
    "stateCode": "FR",
    "cityName": "Saint-Denis (Paris)"
  },
  {
    "id": "place_eu_fraubio_berlin_career",
    "name": "Frau & Beruf e.V. Women's Career Navigation",
    "category": "CAREER_JOB",
    "country": "EU",
    "countryName": "European Union (Germany)",
    "city": "Berlin, Germany",
    "address": "Glogauer Straße 21, 10999 Berlin",
    "lat": 52.493,
    "lng": 13.439,
    "mapCoordX": 0.54,
    "mapCoordY": 0.31,
    "phone": "+49 30 6189032",
    "website": "https://frau-und-beruf-berlin.de",
    "hours": "Mon-Thu: 9:00 AM - 4:00 PM CET",
    "adviceType": "Career re-entry, qualification counseling, freelance coaching, salary negotiation",
    "keyAdviceOffered": [
      "Free individual career guidance for women returning to the labor market",
      "Support on balancing family care and professional re-entry",
      "Digital skills training, CV reviews, and interview simulations",
      "Networking circles and mentoring with professional women in Berlin"
    ],
    "state": "Germany",
    "stateCode": "DE",
    "cityName": "Berlin"
  },
  {
    "id": "place_in_sneha_mumbai",
    "name": "SNEHA Crisis Center & Women's Support System",
    "category": "COMMUNITY_SANCTUARY",
    "country": "IN",
    "countryName": "India",
    "city": "Mumbai, Maharashtra",
    "address": "Urban Health Centre, 60 Feet Rd, Dharavi, Mumbai 400017",
    "lat": 19.0434,
    "lng": 72.8567,
    "mapCoordX": 0.68,
    "mapCoordY": 0.5,
    "phone": "+91 98330 52684",
    "website": "https://snehamumbai.org",
    "hours": "Mon-Sat: 9:30 AM - 5:30 PM IST",
    "adviceType": "Domestic crisis intervention, maternal health counseling, legal guidance",
    "keyAdviceOffered": [
      "Free confidential counseling and crisis intervention for women in distress",
      "Mental health and trauma counseling with trained clinical social workers",
      "Free legal counseling for matrimonial disputes, custody & maintenance",
      "Referral to verified safe shelters across Greater Mumbai"
    ],
    "state": "Maharashtra",
    "stateCode": "MH",
    "cityName": "Mumbai"
  },
  {
    "id": "place_in_jagori_delhi",
    "name": "Jagori Women's Resource & Training Center",
    "category": "COMMUNITY_SANCTUARY",
    "country": "IN",
    "countryName": "India",
    "city": "New Delhi, Delhi",
    "address": "B-114 Shivalik, Malviya Nagar, New Delhi 110017",
    "lat": 28.5355,
    "lng": 77.21,
    "mapCoordX": 0.69,
    "mapCoordY": 0.44,
    "phone": "+91 11 2669 1219",
    "website": "https://www.jagori.org",
    "hours": "Mon-Fri: 10:00 AM - 5:30 PM IST",
    "adviceType": "Women's safety mapping, survivor counseling, legal awareness & sisterhood",
    "keyAdviceOffered": [
      "Safe space drop-in and telephone counseling for women facing harassment",
      "Legal awareness and rights education regarding the Domestic Violence Act",
      "Community sisterhood circles and youth feminist collectives",
      "Referrals to medical and shelter infrastructure across Delhi NCR"
    ],
    "state": "Delhi",
    "stateCode": "DL",
    "cityName": "New Delhi"
  },
  {
    "id": "place_in_majlis_legal_mumbai",
    "name": "Majlis Legal Centre for Women",
    "category": "LEGAL_RIGHTS",
    "country": "IN",
    "countryName": "India",
    "city": "Mumbai, Maharashtra",
    "address": "Golden Valley Apts, Kalina, Santacruz East, Mumbai 400098",
    "lat": 19.076,
    "lng": 72.868,
    "mapCoordX": 0.68,
    "mapCoordY": 0.51,
    "phone": "+91 22 2666 2394",
    "website": "https://majlislaw.com",
    "hours": "Mon-Fri: 10:00 AM - 6:00 PM IST",
    "adviceType": "Free legal aid, matrimonial litigation, property rights, maintenance claims",
    "keyAdviceOffered": [
      "Free legal representation for women in magistrate and family courts",
      "Protection order, maintenance, and child custody legal support",
      "Pre-litigation counseling and negotiated mutual settlements",
      "Multilingual legal guidance in Hindi, Marathi, and English"
    ],
    "state": "Maharashtra",
    "stateCode": "MH",
    "cityName": "Mumbai"
  },
  {
    "id": "place_in_bapu_trust_pune",
    "name": "Bapu Trust for Mind & Mental Wellness",
    "category": "MENTAL_HEALTH",
    "country": "IN",
    "countryName": "India",
    "city": "Pune, Maharashtra",
    "address": "Flat 3, B-12 Shardaram Park, Sassoon Rd, Pune 411001",
    "lat": 18.5284,
    "lng": 73.8743,
    "mapCoordX": 0.69,
    "mapCoordY": 0.52,
    "phone": "+91 20 2616 6378",
    "website": "https://baputrust.com",
    "hours": "Mon-Fri: 10:00 AM - 5:00 PM IST",
    "adviceType": "Trauma-informed mental health, arts-based therapy, community psychosocial care",
    "keyAdviceOffered": [
      "Non-coercive, rights-based mental health counseling for women",
      "Arts-based therapy, bodywork, and expressive healing circles",
      "Community emotional support groups and depression recovery",
      "Supportive care for caregivers and women facing deep burnout"
    ],
    "state": "Maharashtra",
    "stateCode": "MH",
    "cityName": "Pune"
  },
  {
    "id": "place_in_sheroes_career_noida",
    "name": "Sheroes Women's Career & Community Hub",
    "category": "CAREER_JOB",
    "country": "IN",
    "countryName": "India",
    "city": "Noida, Delhi NCR",
    "address": "A-12 Sector 4, Noida, Uttar Pradesh 201301",
    "lat": 28.586,
    "lng": 77.318,
    "mapCoordX": 0.7,
    "mapCoordY": 0.45,
    "phone": "+91 120 422 7954",
    "website": "https://sheroes.com",
    "hours": "Mon-Fri: 9:30 AM - 6:00 PM IST",
    "adviceType": "Career restart for women, remote work placements, mentorship & business loans",
    "keyAdviceOffered": [
      "Specialized career restart opportunities for women on career breaks",
      "Work-from-home and flexible employment matching",
      "Entrepreneurship incubation and micro-business guidance",
      "Women-only safe community forum and career counseling helpline"
    ],
    "state": "Uttar Pradesh (Delhi NCR)",
    "stateCode": "UP",
    "cityName": "Noida"
  },
  {
    "id": "place_in_sneha_health_center",
    "name": "SNEHA Center for Health & Reproductive Wellbeing",
    "category": "WOMEN_HEALTH",
    "country": "IN",
    "countryName": "India",
    "city": "Mumbai, Maharashtra",
    "address": "Chhotani Rd, Mahim West, Mumbai 400016",
    "lat": 19.037,
    "lng": 72.842,
    "mapCoordX": 0.67,
    "mapCoordY": 0.51,
    "phone": "+91 22 2444 3804",
    "website": "https://snehamumbai.org",
    "hours": "Mon-Sat: 9:00 AM - 5:00 PM IST",
    "adviceType": "Maternal health, nutrition, adolescent reproductive counseling, anemia prevention",
    "keyAdviceOffered": [
      "Free prenatal and postpartum health monitoring and nutrition clinics",
      "Adolescent and young women reproductive wellness workshops",
      "Anemia and menstrual health screening and support",
      "Community health worker home visitation and mental health support"
    ],
    "state": "Maharashtra",
    "stateCode": "MH",
    "cityName": "Mumbai"
  },
  {
    "id": "place_global_un_women_sanctuary",
    "name": "UN Women Headquarters & Global Sisterhood Portal",
    "category": "COMMUNITY_SANCTUARY",
    "country": "GLOBAL",
    "countryName": "Global Sanctuary",
    "city": "New York / Global Online",
    "address": "220 E 42nd St, New York, NY 10017",
    "lat": 40.7505,
    "lng": -73.974,
    "mapCoordX": 0.5,
    "mapCoordY": 0.4,
    "phone": "+1 646-781-4400",
    "website": "https://www.unwomen.org",
    "hours": "24/7 Global Resource Directory",
    "adviceType": "International women's rights directory, crisis coordination, policy support",
    "keyAdviceOffered": [
      "Global portal connecting women to vetted NGOs in 190+ countries",
      "International rights advocacy and emergency displacement guides",
      "Global campaign networks for gender equality and economic freedom",
      "Direct linkage to UN regional crisis response networks"
    ],
    "state": "International",
    "stateCode": "GLOBAL",
    "cityName": "Worldwide Online"
  },
  {
    "id": "place_global_women_for_women",
    "name": "Women for Women International Global Centre",
    "category": "CAREER_JOB",
    "country": "GLOBAL",
    "countryName": "Global Sanctuary",
    "city": "Washington, DC / Global",
    "address": "2000 M St NW Suite 200, Washington, DC 20036",
    "lat": 38.9055,
    "lng": -77.045,
    "mapCoordX": 0.51,
    "mapCoordY": 0.41,
    "phone": "+1 202-737-7705",
    "website": "https://www.womenforwomen.org",
    "hours": "Mon-Fri: 9:00 AM - 5:00 PM EST",
    "adviceType": "Economic self-reliance, vocational skills, business micro-grants, sisterhood cohorts",
    "keyAdviceOffered": [
      "Year-long economic empowerment and vocational training programs",
      "Financial literacy, savings circles, and business management training",
      "Women's rights education and community leadership development",
      "Lifelong international sister-to-sister sponsorship network"
    ],
    "state": "International",
    "stateCode": "GLOBAL",
    "cityName": "Worldwide Online"
  },
  {
    "id": "place_global_equality_now",
    "name": "Equality Now International Legal Secretariat",
    "category": "LEGAL_RIGHTS",
    "country": "GLOBAL",
    "countryName": "Global Sanctuary",
    "city": "Global (New York / London / Nairobi)",
    "address": "1500 Broadway Suite 501, New York, NY 10036",
    "lat": 40.757,
    "lng": -73.9855,
    "mapCoordX": 0.49,
    "mapCoordY": 0.39,
    "phone": "+1 212-586-0906",
    "website": "https://equalitynow.org",
    "hours": "Mon-Fri: 9:00 AM - 6:00 PM EST",
    "adviceType": "International human rights defense, gender discrimination law, cross-border justice",
    "keyAdviceOffered": [
      "International legal directory for women seeking justice across borders",
      "Strategic litigation for gender-based discrimination and digital abuse",
      "Emergency international advocacy for women facing severe human rights breaches",
      "Global legal knowledge-base and legal aid referrals"
    ],
    "state": "International",
    "stateCode": "GLOBAL",
    "cityName": "Worldwide Online"
  }
];

export function findPackageById(id) {
  if (!id) return SUPPORT_PACKAGES[0];
  const clean = id.trim().toLowerCase();
  
  // All AI-related concerns (including AI job replacement) route to Package 16
  if (
    clean.includes('ai') ||
    clean.includes('algorithm') ||
    clean.includes('deepfake') ||
    clean.includes('surveillance') ||
    clean.includes('coloniz') ||
    clean.includes('cyber') ||
    clean.includes('eu ai') ||
    clean.includes('biometric') ||
    clean.includes('stalkerware') ||
    clean.includes('obsolete')
  ) {
    const aiPkg = SUPPORT_PACKAGES.find(p => p.id === 'ai_fear_digital_colonization_cybersecurity');
    if (aiPkg) return aiPkg;
  }

  // Pure job search, layoffs, ghosting, remote work isolation routes to Package 15
  if (
    clean.includes('job') ||
    clean.includes('resume') ||
    clean.includes('ghosted') ||
    clean.includes('remote') ||
    clean.includes('work from home') ||
    clean.includes('laid off') ||
    clean.includes('unemploy') ||
    clean.includes('career')
  ) {
    const jobPkg = SUPPORT_PACKAGES.find(p => p.id === 'job_search_remote_loneliness' || p.id === 'job_search_ai_loneliness');
    if (jobPkg) return jobPkg;
  }

  return SUPPORT_PACKAGES.find(pkg => {
    return (
      pkg.id.toLowerCase() === clean ||
      pkg.id.replace(/_/g, '') === clean.replace(/_/g, '') ||
      pkg.id.startsWith(clean) ||
      clean.startsWith(pkg.id) ||
      (clean.includes('preg') && pkg.id.includes('preg')) ||
      (clean.includes('career') && pkg.id.includes('career')) ||
      (clean.includes('divorce') && pkg.id.includes('divorce')) ||
      (clean.includes('mov') && pkg.id.includes('mov')) ||
      (clean.includes('parent') && !clean.includes('preg') && pkg.id === 'parenting') ||
      (clean.includes('care') && clean.includes('parent') && pkg.id === 'caring_for_parents') ||
      (clean.includes('finan') && pkg.id.includes('financial')) ||
      (clean.includes('lonel') && pkg.id.includes('loneliness'))
    );
  }) || SUPPORT_PACKAGES[0];
}

export function getMeetupsForPackage(pkg) {
  if (pkg.meetups && pkg.meetups.length > 0) return pkg.meetups;
  return [
    {
      id: `meetup_${pkg.id}_circle`,
      title: `${pkg.title} Women's Circle & Chai`,
      dayTime: 'Weekly Saturdays, 11:00 AM',
      location: 'Lotus Blossom Community Sanctuary & Zoom Room',
      isVirtual: false,
      hostName: (pkg.buddyMatches && pkg.buddyMatches[0]?.name) || 'Sister Guide',
      attendeeCount: 12,
      vibe: 'Gentle, confidential, warm chai provided',
      description: `A compassionate drop-in gathering for women navigating ${pkg.title.toLowerCase()}. No pressure to speak; come as you are.`
    },
    {
      id: `meetup_${pkg.id}_evening`,
      title: `${pkg.title} Midweek Evening Wind-Down`,
      dayTime: 'Wednesdays, 7:30 PM EST',
      location: 'Virtual Sisterhood Room',
      isVirtual: true,
      hostName: 'Community Peer Host',
      attendeeCount: 24,
      vibe: 'Cozy clothes, camera optional, soothing meditation',
      description: 'Virtual check-in to untangle midweek emotions and share real-world peer strategies.'
    }
  ];
}

export function getGirlsGroupsForPackage(pkg) {
  if (pkg.girlsGroups && pkg.girlsGroups.length > 0) return pkg.girlsGroups;
  return [
    {
      id: `group_${pkg.id}_core`,
      name: `${pkg.title} Sisterhood Circle`,
      tagLine: `Holding space for every nuance of ${pkg.title.toLowerCase()}`,
      memberCount: 1240,
      meetingFrequency: 'Weekly Gatherings & Daily Chat',
      focusArea: pkg.covers,
      vibe: 'Authentic, confidential, 100% sisterly support',
      activeChatSnippet: '16 members active in safe chat right now'
    }
  ];
}

export function getHelplinesForCountry(countryCode) {
  const country = COUNTRIES[countryCode] || COUNTRIES['US'];
  return country.crisisHelplines || COUNTRIES['US'].crisisHelplines;
}

export function getPlacesForCountry(countryCode) {
  if (!countryCode || countryCode === 'ALL') return ADVICE_PLACES;
  const filtered = ADVICE_PLACES.filter(p => p.country === countryCode);
  return filtered.length > 0 ? filtered : ADVICE_PLACES;
}

export function getStatesForCountry(countryCode) {
  const normCode = normalizeCountryCode(countryCode);
  const officialStates = getAllStatesForCountry(countryCode);
  const stateMap = new Map();

  // Populate from official comprehensive directory first (all 50 US states, UK regions, Canadian provinces, etc.)
  officialStates.forEach(s => {
    stateMap.set(s.name, { name: s.name, code: s.code || s.name, count: 0 });
  });

  // Calculate matching sanctuary counts from ADVICE_PLACES
  let places = ADVICE_PLACES;
  if (countryCode && countryCode !== 'ALL') {
    places = places.filter(p => p.country === normCode || (normCode === 'GB' && p.country === 'UK'));
  }
  places.forEach(p => {
    const sName = p.state || '';
    if (sName) {
      if (!stateMap.has(sName)) {
        stateMap.set(sName, { name: sName, code: p.stateCode || sName, count: 0 });
      }
      stateMap.get(sName).count++;
    }
  });

  return Array.from(stateMap.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export function getCitiesForCountryAndState(countryCode, stateCodeOrName) {
  const officialCities = getAllCitiesForCountryAndState(countryCode, stateCodeOrName);
  const cityMap = new Map();

  // Populate from official comprehensive directory first
  officialCities.forEach(cityName => {
    cityMap.set(cityName, { name: cityName, count: 0 });
  });

  // Calculate matching sanctuary counts from ADVICE_PLACES
  let places = ADVICE_PLACES;
  if (countryCode && countryCode !== 'ALL') {
    const normCode = normalizeCountryCode(countryCode);
    places = places.filter(p => p.country === normCode || (normCode === 'GB' && p.country === 'UK'));
  }
  if (stateCodeOrName && stateCodeOrName !== 'ALL') {
    places = places.filter(p => 
      (p.state || '').toLowerCase() === stateCodeOrName.toLowerCase() || 
      (p.stateCode || '').toLowerCase() === stateCodeOrName.toLowerCase()
    );
  }
  places.forEach(p => {
    const cName = p.cityName || p.city;
    if (cName) {
      if (!cityMap.has(cName)) {
        cityMap.set(cName, { name: cName, count: 0 });
      }
      cityMap.get(cName).count++;
    }
  });

  return Array.from(cityMap.values()).sort((a, b) => a.name.localeCompare(b.name));
}
