package com.example.data.model

object SupportCatalog {

  val packages: List<SupportPackage> = listOf(
    // 1. Pregnancy / New Parents
    SupportPackage(
      id = "pregnancy_new_parents",
      title = "Pregnancy / New Parents",
      emoji = "🤰",
      covers = "Pregnancy, fourth trimester, postpartum emotions, bonding and matrescence",
      exampleInput = "I feel like I've lost myself since having a baby",
      feelingPrompts = listOf(
        "I feel like I've lost myself since having a baby",
        "I'm terrified I'm not going to be a good mom",
        "Nobody told me it would feel this lonely",
        "I don't feel connected to my baby yet and I feel so guilty"
      ),
      selfCareScript = "Take one slow breath in for 4 counts, hold for 4, out for 6. You don't have to feel connected today for it to come later — bonding is a process, not a switch. Name one small thing that went okay today, even if it's just 'we both made it to bedtime.'",
      communityDescription = "A space for new and expecting parents in the thick of it — the unfiltered version, not the highlight reel. People share what 3am really looks like, what nobody warns you about, and what actually helped.",
      buddyMatchPrimer = "You've been matched with someone due around the same time / with a baby a similar age. This is casual — a quick hello, a shared due-date group chat, no pressure to talk every day.",
      escalation = null,
      defaultMicroTool = MicroTool(
        id = "tool_matrescence",
        title = "Matrescence Breath & Reframe",
        category = "Postpartum Grounding",
        type = ToolType.BREATHING,
        description = "Take one slow breath in for 4 counts, hold for 4, out for 6. Bonding is a process, not an instant switch.",
        instructions = listOf(
          "Place one hand on your chest and one on your lower belly.",
          "Inhale gently for 4 counts, hold for 4, and exhale smoothly for 6 counts.",
          "Remind yourself: You don't have to feel connected today for it to come later. Name one small thing that went okay today."
        ),
        scriptContent = "Take one slow breath in for 4 counts, hold for 4, out for 6. You don't have to feel connected today for it to come later — bonding is a process, not a switch. Name one small thing that went okay today, even if it's just 'we both made it to bedtime.'",
        durationMinutes = 3
      ),
      buddyMatches = listOf(
        BuddyProfile(
          id = "buddy_ananya_preg",
          name = "Ananya M.",
          age = 31,
          avatarInitials = "AM",
          story = "Mom of 16-month-old twins. Survived deep postpartum isolation and mourning my past self. I love helping new moms remember who they are.",
          packageId = "pregnancy_new_parents",
          experienceTags = listOf("Postpartum Identity", "Twins", "Sleep Deprivation"),
          warmIntroIcebreaker = "Hi Ananya, I just had my baby and I'm feeling really untethered right now. I saw your story and would love to say hello."
        )
      ),
      communities = listOf(
        CommunityCircle(
          id = "comm_fourth_trimester",
          name = "The Unfiltered Fourth Trimester",
          memberCount = 1420,
          description = "A space for new and expecting parents in the thick of it — the unfiltered version, not the highlight reel. People share what 3am really looks like, what nobody warns you about, and what actually helped.",
          activeTopic = "What do you wish someone told you about the first 6 weeks?",
          safetyPledge = "Strict privacy. No mom-shaming or unsolicited medical advice permitted."
        )
      ),
      specialist = SpecialistProfile(
        id = "spec_dr_maya",
        name = "Dr. Maya Raman, PMH-C",
        title = "Perinatal Mental Health Specialist & Doula",
        credentials = "LCSW, PMH-C Certified (Postpartum Support International)",
        focus = "Postpartum anxiety, birth trauma processing, bonding & identity reclamation",
        bookingInfo = "Accepts sliding scale & virtual telehealth sessions. Free 15-minute consultation."
      ),
      helpline = HelplineResource(
        name = "Postpartum Support International (PSI) HelpLine",
        number = "1-800-944-4773",
        hours = "24/7 Call or text 'HELP' to 800-944-4773",
        description = "Confidential support, encouragement, and resources for perinatal and postpartum mothers."
      )
    ),

    // 2. Parenting
    SupportPackage(
      id = "parenting",
      title = "Parenting",
      emoji = "👶",
      covers = "Toddlers to teenagers, communication breakdowns, parental guilt and regulation",
      exampleInput = "My teenager won't talk to me anymore",
      feelingPrompts = listOf(
        "My teenager won't talk to me anymore",
        "I feel like I'm failing at parenting every single day",
        "I don't know how to talk to my kid about what's going on in their life",
        "I feel guilty every time I lose my patience"
      ),
      selfCareScript = "Parenting guilt usually means you care, not that you failed. Before reacting, try: 'I'm going to pause for 10 seconds before I respond.' One repaired moment after a hard one teaches your kid more than a perfect one ever could.",
      communityDescription = "Parents of kids at every age — toddlers to teens — trading what's actually working (and what isn't) without judgment. Especially strong on the teenage-silence and communication-breakdown topics.",
      buddyMatchPrimer = "Matched with a parent of a similarly-aged kid. Swap notes, vent, or just know someone else is in the exact same stage as you this week.",
      escalation = null,
      defaultMicroTool = MicroTool(
        id = "tool_parental_pause",
        title = "10-Second De-escalation & Repair",
        category = "Parental Regulation",
        type = ToolType.REFLECTION,
        description = "Parenting guilt means you care, not that you failed. Take a 10-second pause before responding.",
        instructions = listOf(
          "Notice the tension rising in your chest or jaw.",
          "Pause for 10 full seconds before saying a word.",
          "Say to yourself: 'One repaired moment after a hard one teaches my child more than perfection ever could.'"
        ),
        scriptContent = "Parenting guilt usually means you care, not that you failed. Before reacting, try: 'I'm going to pause for 10 seconds before I respond.' One repaired moment after a hard one teaches your kid more than a perfect one ever could.",
        durationMinutes = 3
      ),
      buddyMatches = listOf(
        BuddyProfile(
          id = "buddy_elena_par",
          name = "Elena Vance",
          age = 44,
          avatarInitials = "EV",
          story = "Raised two teenage daughters through shut-down phases and slamming doors. Here to listen without judgment.",
          packageId = "parenting",
          experienceTags = listOf("Teenagers", "Parental Burnout", "Boundary Setting"),
          warmIntroIcebreaker = "Hi Elena, I'm really struggling to connect with my teenager right now. You mentioned going through this—hoping to hear how you held space."
        )
      ),
      communities = listOf(
        CommunityCircle(
          id = "comm_parents_circle",
          name = "Parenting in Progress",
          memberCount = 2890,
          description = "Parents of kids at every age — toddlers to teens — trading what's actually working (and what isn't) without judgment.",
          activeTopic = "How do you reconnect with your teen after a big communication breakdown?",
          safetyPledge = "Zero judgment. All parents learning and healing together."
        )
      ),
      specialist = SpecialistProfile(
        id = "spec_rachel_parenting",
        name = "Rachel O'Connor, LMFT",
        title = "Adolescent & Family System Counselor",
        credentials = "Licensed Marriage & Family Therapist, Conscious Parenting Coach",
        focus = "Parent-teen communication bridges, maternal nervous system regulation",
        bookingInfo = "Virtual sessions with evening availability."
      ),
      helpline = HelplineResource(
        name = "Boys Town National Parent Hotline",
        number = "1-800-448-3000",
        hours = "24/7 Free & Confidential",
        description = "Nationally accredited hotline providing round-the-clock crisis and parenting advice."
      )
    ),

    // 3. Career Changes
    SupportPackage(
      id = "career_changes",
      title = "Career Changes",
      emoji = "👩‍💼",
      covers = "Career breaks, pivots, returning after maternity/caregiving, imposter syndrome",
      exampleInput = "I feel invisible going back to work after years off",
      feelingPrompts = listOf(
        "I feel invisible going back to work after years off",
        "I don't know who I am outside of my job title",
        "I'm scared I've fallen behind everyone my age",
        "I want to change careers but I feel too old to start over"
      ),
      selfCareScript = "A career break or pivot isn't a gap — it's a chapter. Write down one skill you built during this time that isn't on a resume (patience, crisis management, negotiation) — it's still a skill.",
      communityDescription = "Women navigating career breaks, pivots, and 'starting over' at every age — from returning after maternity leave to a full industry change at 45. Real talk on interviews, confidence, and imposter feelings.",
      buddyMatchPrimer = "Matched with someone at a similar career-transition stage. Great for interview practice, accountability on job applications, or just someone who gets the specific anxiety of re-entry.",
      escalation = null,
      defaultMicroTool = MicroTool(
        id = "tool_career_pivot",
        title = "Career Gap Reframe Exercise",
        category = "Career Confidence",
        type = ToolType.SCRIPT,
        description = "A career break or pivot isn't a gap — it's a chapter. Honor the invisible skills you built.",
        instructions = listOf(
          "Write down one skill you built during this time that isn't on a resume.",
          "Notice how patience, crisis management, and negotiation are vital professional assets.",
          "Speak this script aloud: 'I bring lived maturity and focus that didn't exist years ago.'"
        ),
        scriptContent = "A career break or pivot isn't a gap — it's a chapter. Write down one skill you built during this time that isn't on a resume (patience, crisis management, negotiation) — it's still a skill.",
        durationMinutes = 3
      ),
      buddyMatches = listOf(
        BuddyProfile(
          id = "buddy_priya_career",
          name = "Priya Sen",
          age = 38,
          avatarInitials = "PS",
          story = "Returned to tech after a 5-year maternity break. Overcame heavy imposter syndrome and negotiated a senior product role.",
          packageId = "career_changes",
          experienceTags = listOf("Career Returner", "Imposter Syndrome", "Tech Pivot"),
          warmIntroIcebreaker = "Hi Priya! I'm preparing to rejoin the workforce after a multi-year pause and feeling anxious. I saw your journey and wanted to connect."
        )
      ),
      communities = listOf(
        CommunityCircle(
          id = "comm_career_pivot",
          name = "Second Chapters: Women Rerouting",
          memberCount = 3150,
          description = "Women navigating career breaks, pivots, and 'starting over' at every age — from returning after maternity leave to a full industry change at 45.",
          activeTopic = "How did you translate your break into an interview superpower?",
          safetyPledge = "Confidential resume & interview prep space, peer cheerleading."
        )
      ),
      specialist = SpecialistProfile(
        id = "spec_clara_career",
        name = "Clara Zhang",
        title = "Executive & Career Transition Coach",
        credentials = "PCC ICF Accredited Coach, Former HR Director",
        focus = "Confidence reclamation, interview scripting, salary negotiation after breaks",
        bookingInfo = "Bi-weekly strategy packages with resume review included."
      ),
      helpline = HelplineResource(
        name = "211 Career & Community Support Hotline",
        number = "2-1-1",
        hours = "24/7 Free & Confidential",
        description = "Information and local referrals for job transition, training, and women's workforce resources."
      )
    ),

    // 4. Divorce / Separation
    SupportPackage(
      id = "divorce_separation",
      title = "Divorce / Separation",
      emoji = "💔",
      covers = "Separation, divorce recovery, co-parenting logistics, rebuilding identity outside marriage",
      exampleInput = "I don't know who I am outside of my marriage",
      feelingPrompts = listOf(
        "I don't know who I am outside of my marriage",
        "I feel like a failure for not making it work",
        "I'm scared to be alone after all these years",
        "Co-parenting with my ex is exhausting me"
      ),
      selfCareScript = "Grief after a separation is real, even if it was your decision. You're allowed to miss parts of it and still know it was right. Today, do one thing that's just yours — a choice nobody else has a say in.",
      communityDescription = "Women rebuilding after divorce or separation — from the legal maze to co-parenting logistics to rediscovering an identity outside a relationship. No judgment on where you are in the process.",
      buddyMatchPrimer = "Matched with someone else navigating separation or divorce. Many members say this is the hardest thing to talk about with friends who are still married — here, it's the default.",
      escalation = "If language suggests the relationship involved control, threats, or fear (not just sadness/loss), route to crisis/DV resources first, alongside — not instead of — community support.",
      defaultMicroTool = MicroTool(
        id = "tool_divorce_autonomy",
        title = "Autonomous Choice Grounding",
        category = "Self-Reclamation",
        type = ToolType.REFLECTION,
        description = "Grief after separation is real, even if it was your decision. Reconnect with a decision that is solely yours.",
        instructions = listOf(
          "Take a slow breath and acknowledge your grief without judgment.",
          "Remind yourself: 'You're allowed to miss parts of it and still know it was right.'",
          "Decide on one small thing today that is just yours — a meal, a walk, a playlist."
        ),
        scriptContent = "Grief after a separation is real, even if it was your decision. You're allowed to miss parts of it and still know it was right. Today, do one thing that's just yours — a choice nobody else has a say in.",
        durationMinutes = 3
      ),
      buddyMatches = listOf(
        BuddyProfile(
          id = "buddy_jessica_divorce",
          name = "Jessica Taylor",
          age = 42,
          avatarInitials = "JT",
          story = "Divorced after 14 years. Rebuilt my credit, found a new community, and discovered self-trust I never knew I had.",
          packageId = "divorce_separation",
          experienceTags = listOf("Divorce Recovery", "Solo Parenting", "Rebuilding"),
          warmIntroIcebreaker = "Hi Jessica, I'm in the early weeks of separating and it feels overwhelming. Your journey gave me hope and I'd love to chat."
        )
      ),
      communities = listOf(
        CommunityCircle(
          id = "comm_rebloom_separation",
          name = "Rebuilding After Separation",
          memberCount = 1870,
          description = "Women rebuilding after divorce or separation — from the legal maze to co-parenting logistics to rediscovering an identity outside a relationship.",
          activeTopic = "What was the very first boundary you set that gave you your life back?",
          safetyPledge = "Strict confidentiality; mutual legal and emotional safe-harbor."
        )
      ),
      specialist = SpecialistProfile(
        id = "spec_karen_divorce",
        name = "Karen Morales, LMFT",
        title = "Divorce & High-Conflict Transition Specialist",
        credentials = "Licensed Marriage and Family Therapist, Certified Divorce Coach",
        focus = "Co-parenting boundaries, high-conflict partner recovery, post-split grief",
        bookingInfo = "Offers individual therapy and bi-weekly support cohorts."
      ),
      helpline = HelplineResource(
        name = "National Domestic Violence & Crisis Hotline",
        number = "1-800-799-7233",
        hours = "24/7 Call 1-800-799-SAFE or Text START to 88788",
        description = "Confidential support for relationship safety, legal options, and immediate crisis assistance."
      )
    ),

    // 5. Moving to a New City
    SupportPackage(
      id = "moving_new_city",
      title = "Moving to a New City",
      emoji = "🏠",
      covers = "Relocation, rebuilding a social circle, unfamiliar environments, feeling out of place",
      exampleInput = "I moved here for work and don't know a single person",
      feelingPrompts = listOf(
        "I moved here for work and don't know a single person",
        "I feel so out of place in this new city",
        "I don't know how to make friends as an adult",
        "I miss my old life and I'm not sure I made the right choice"
      ),
      selfCareScript = "Loneliness after a move is one of the most common, least-talked-about feelings — it doesn't mean you made a mistake. Pick one small, repeatable thing this week (same coffee shop, same class) — familiarity builds faster than friendship does.",
      communityDescription = "People who've recently relocated, sharing what actually helped them build a life in a new place — from finding local groups to just admitting the first six months are hard.",
      buddyMatchPrimer = "Matched with someone new to the area, or someone local happy to show a newcomer around. Great for a low-pressure first coffee or a local meetup buddy.",
      escalation = null,
      defaultMicroTool = MicroTool(
        id = "tool_moving_familiarity",
        title = "Familiarity Anchor Micro-Habit",
        category = "Relocation Grounding",
        type = ToolType.GROUNDING,
        description = "Loneliness after a move doesn't mean you made a mistake. Familiarity builds faster than friendship.",
        instructions = listOf(
          "Pick one small repeatable spot this week (a cafe, bakery, library corner, or park bench).",
          "Visit it at the same time twice this week. Just observe the surroundings without expectations.",
          "Remind yourself: 'The first six months in a new city are universally awkward.'"
        ),
        scriptContent = "Loneliness after a move is one of the most common, least-talked-about feelings — it doesn't mean you made a mistake. Pick one small, repeatable thing this week (same coffee shop, same class) — familiarity builds faster than friendship does.",
        durationMinutes = 3
      ),
      buddyMatches = listOf(
        BuddyProfile(
          id = "buddy_chloe_move",
          name = "Chloe Bennett",
          age = 29,
          avatarInitials = "CB",
          story = "Moved across the country alone for work knowing zero people. Created a regular cafe habit and slowly built an incredible chosen circle.",
          packageId = "moving_new_city",
          experienceTags = listOf("Relocation", "Making Friends", "Solo Living"),
          warmIntroIcebreaker = "Hi Chloe! I just moved to an unfamiliar city and am feeling pretty isolated. Would love to say hello to someone who's done this."
        )
      ),
      communities = listOf(
        CommunityCircle(
          id = "comm_newcomers",
          name = "New in Town: Relocated Women",
          memberCount = 2140,
          description = "People who've recently relocated, sharing what actually helped them build a life in a new place — from finding local groups to admitting the first 6 months are tough.",
          activeTopic = "What's the best low-stakes activity to meet genuine locals?",
          safetyPledge = "Welcoming and supportive; zero judgment on homesickness."
        )
      ),
      specialist = SpecialistProfile(
        id = "spec_samantha_move",
        name = "Dr. Samantha Reed, PsyD",
        title = "Relocation & Life Transition Psychologist",
        credentials = "Licensed Clinical Psychologist",
        focus = "Relocation grief, adult social anxiety, anchoring routines in new cities",
        bookingInfo = "Virtual sessions across multiple licensed states."
      ),
      helpline = HelplineResource(
        name = "211 Community Resources & Welcome Directory",
        number = "2-1-1",
        hours = "24/7 Free & Confidential",
        description = "Local community networks, newcomer navigation, and neighborhood resources."
      )
    ),

    // 6. Caring for Parents
    SupportPackage(
      id = "caring_for_parents",
      title = "Caring for Parents",
      emoji = "👵",
      covers = "Aging parents, caregiver burnout, sibling dynamics, anticipatory grief",
      exampleInput = "I'm the only one taking care of my mom and I'm exhausted",
      feelingPrompts = listOf(
        "I'm the only one taking care of my mom and I'm exhausted",
        "I feel guilty for resenting how much caregiving takes from me",
        "I don't have time for anything else in my life anymore",
        "Watching my parent decline is breaking my heart"
      ),
      selfCareScript = "Caregiver burnout is real and doesn't mean you love them less. Resentment and love can exist at the same time — it doesn't cancel out your devotion. Today, name one 15-minute block that's just for you, and protect it like an appointment.",
      communityDescription = "Caregivers supporting aging or ill parents, sharing the exhaustion, the guilt, and the practical logistics nobody prepares you for — from sibling dynamics to navigating healthcare systems.",
      buddyMatchPrimer = "Matched with another caregiver in a similar situation. Many people say this is the one group where they don't have to explain why they're tired all the time.",
      escalation = null,
      defaultMicroTool = MicroTool(
        id = "tool_caregiver_pause",
        title = "15-Minute Sanctuary Boundary",
        category = "Caregiver Respite",
        type = ToolType.REFLECTION,
        description = "Resentment and love can exist at the same time. Protect one 15-minute block today like a sacred appointment.",
        instructions = listOf(
          "Take a deep breath and validate: 'Resenting how much caregiving takes doesn't mean I don't love them.'",
          "Identify a 15-minute pocket today with zero caregiving tasks or phone notifications.",
          "Protect it with fierce kindness. You cannot pour from an empty cup."
        ),
        scriptContent = "Caregiver burnout is real and doesn't mean you love them less. Resentment and love can exist at the same time — it doesn't cancel out your devotion. Today, name one 15-minute block that's just for you, and protect it like an appointment.",
        durationMinutes = 3
      ),
      buddyMatches = listOf(
        BuddyProfile(
          id = "buddy_sarah_care",
          name = "Sarah Jenkins",
          age = 52,
          avatarInitials = "SJ",
          story = "Spent 4 years caring for my mother with Alzheimer's while working full-time. I understand the unspoken guilt and heavy fatigue deeply.",
          packageId = "caring_for_parents",
          experienceTags = listOf("Dementia Care", "Caregiver Burnout", "Sandwich Generation"),
          warmIntroIcebreaker = "Hi Sarah, I'm the primary caregiver for my parent and running on empty. It helps knowing someone else truly gets this."
        )
      ),
      communities = listOf(
        CommunityCircle(
          id = "comm_caregiver_circle",
          name = "Daughters & Caregivers Network",
          memberCount = 2670,
          description = "Caregivers supporting aging or ill parents, sharing the exhaustion, guilt, and practical logistics nobody prepares you for.",
          activeTopic = "How do you handle unhelpful siblings who don't contribute?",
          safetyPledge = "Safe haven for venting without guilt or moral judgment."
        )
      ),
      specialist = SpecialistProfile(
        id = "spec_linda_care",
        name = "Linda Martinez, LCSW",
        title = "Geriatric Care & Caregiver Burnout Specialist",
        credentials = "LCSW, Certified Caregiver Consultant",
        focus = "Caregiver exhaustion, sibling mediation, boundary preservation",
        bookingInfo = "Sliding-scale virtual consultations and support groups."
      ),
      helpline = HelplineResource(
        name = "Eldercare Locator (U.S. Admin on Aging)",
        number = "1-800-677-1116",
        hours = "Mon-Fri 9am-8pm ET (24/7 Web Locator)",
        description = "Trusted national directory connecting caregivers with local respite services, nutrition, and home health care."
      )
    ),

    // 7. Financial Difficulties
    SupportPackage(
      id = "financial_difficulties",
      title = "Financial Difficulties",
      emoji = "💰",
      covers = "Money stress, debt shame, financial dependence, budgeting anxiety",
      exampleInput = "I'm scared to check my bank account",
      feelingPrompts = listOf(
        "I'm scared to check my bank account",
        "I feel ashamed that I don't understand money better",
        "I depend financially on someone else and it terrifies me",
        "I'm drowning in debt and don't know where to start"
      ),
      selfCareScript = "Financial shame keeps people stuck more than the numbers themselves do. Pick one small, factual step today — just looking at one bill, one account balance — not fixing everything, just looking.",
      communityDescription = "A judgment-free space to talk about money stress, financial independence, and starting over — including the emotional side that financial advice columns skip.",
      buddyMatchPrimer = "Matched with someone working through similar financial goals — an accountability partner for budgeting check-ins, not a financial advisor. For professional advice, the app also offers referrals to licensed counselors.",
      escalation = "If language suggests financial abuse or control by a partner (e.g., no access to money, monitored spending), treat this alongside the relationship-safety triage, not just as a budgeting issue.",
      defaultMicroTool = MicroTool(
        id = "tool_financial_shame_break",
        title = "Factual Neutrality Check",
        category = "Financial Grounding",
        type = ToolType.GROUNDING,
        description = "Financial shame keeps people stuck more than the numbers themselves. Take one neutral, factual step today.",
        instructions = listOf(
          "Inhale slowly for 4 seconds, exhale for 6.",
          "Pick one single account balance or bill to look at for 30 seconds. Do not try to solve it today.",
          "Tell yourself: 'Numbers are neutral data, not a measure of my human worth.'"
        ),
        scriptContent = "Financial shame keeps people stuck more than the numbers themselves do. Pick one small, factual step today — just looking at one bill, one account balance — not fixing everything, just looking.",
        durationMinutes = 3
      ),
      buddyMatches = listOf(
        BuddyProfile(
          id = "buddy_aisha_fin",
          name = "Aisha Patel",
          age = 36,
          avatarInitials = "AP",
          story = "Crawled out of five-figure debt and total financial dependency after separation. Non-judgmental friend for weekly budgeting check-ins.",
          packageId = "financial_difficulties",
          experienceTags = listOf("Financial Reset", "Budgeting Buddy", "Independence"),
          warmIntroIcebreaker = "Hi Aisha, looking at my finances gives me intense anxiety. I saw your journey to independence and would love a supportive peer connection."
        )
      ),
      communities = listOf(
        CommunityCircle(
          id = "comm_financial_circle",
          name = "Women & Money Without Shame",
          memberCount = 1950,
          description = "A judgment-free space to talk about money stress, financial independence, and starting over — including the emotional side that financial advice columns skip.",
          activeTopic = "What was the very first step that broke your financial avoidance?",
          safetyPledge = "Strictly non-judgmental; no predatory schemes or investment promotion."
        )
      ),
      specialist = SpecialistProfile(
        id = "spec_marcus_fin",
        name = "Marcus Sterling, AFC",
        title = "Accredited Financial Counselor & Financial Therapist",
        credentials = "AFC (FINRA Foundation), Certified Financial Social Worker",
        focus = "Financial trauma, debt relief roadmap, emergency budget planning",
        bookingInfo = "Free initial assessment and income-based fees."
      ),
      helpline = HelplineResource(
        name = "National Foundation for Credit Counseling (NFCC)",
        number = "1-800-388-2227",
        hours = "Mon-Fri 8am-8pm ET",
        description = "Nonprofit financial counseling, debt relief negotiation, and emergency financial coaching."
      )
    ),

    // 8. Emotional Struggles
    SupportPackage(
      id = "emotional_struggles",
      title = "Emotional Struggles",
      emoji = "🧠",
      covers = "People-pleasing, boundary fatigue, emotional load, feeling small or criticized",
      exampleInput = "I say yes to everything and I'm running on empty",
      feelingPrompts = listOf(
        "I say yes to everything and I'm running on empty",
        "I'm the one who remembers everything and no one notices",
        "I feel small and criticized in my own home",
        "I don't even know what I want anymore, I just react to everyone else"
      ),
      selfCareScript = "Try one boundary script today: 'I can't take that on right now.' No explanation required. Notice how much energy goes into justifying 'no' — you're allowed to just say it.",
      communityDescription = "A space for the everyday emotional load — burnout, people-pleasing, boundary-setting, difficult relationships — the stuff that's hard to name but universally felt.",
      buddyMatchPrimer = "Matched with someone also working on saying no / protecting their energy. A light accountability pairing — share one boundary win each week.",
      escalation = "'I feel small and criticized in my own home' can range from normal relationship friction to real emotional abuse — the safety-triage layer should evaluate this input carefully rather than routing automatically to peer support alone.",
      defaultMicroTool = MicroTool(
        id = "tool_boundary_script",
        title = "The Clean 'No' Practice",
        category = "Boundary Protection",
        type = ToolType.SCRIPT,
        description = "Try one boundary script today: 'I can't take that on right now.' No explanation required.",
        instructions = listOf(
          "Notice where you feel guilt when someone asks you for a favor.",
          "Say the script aloud: 'I can't take that on right now.'",
          "Observe the urge to over-explain or apologize. Let the sentence stand on its own."
        ),
        scriptContent = "Try one boundary script today: 'I can't take that on right now.' No explanation required. Notice how much energy goes into justifying 'no' — you're allowed to just say it.",
        durationMinutes = 3
      ),
      buddyMatches = listOf(
        BuddyProfile(
          id = "buddy_nadia_emo",
          name = "Nadia Rossi",
          age = 34,
          avatarInitials = "NR",
          story = "Recovering chronic people-pleaser who spent decades accommodating everyone else. Now fiercely protecting my peace and nervous system.",
          packageId = "emotional_struggles",
          experienceTags = listOf("Boundary Setting", "Burnout", "Saying No"),
          warmIntroIcebreaker = "Hi Nadia! I'm running on empty from trying to keep everyone around me happy. Hoping to connect with a fellow recovering people-pleaser."
        )
      ),
      communities = listOf(
        CommunityCircle(
          id = "comm_boundaries",
          name = "Boundaries & Mental Load Circle",
          memberCount = 4210,
          description = "A space for the everyday emotional load — burnout, people-pleasing, boundary-setting, difficult relationships.",
          activeTopic = "What request did you say 'no' to this week that felt scary?",
          safetyPledge = "Mutual empowerment; respecting boundaries and confidentiality."
        )
      ),
      specialist = SpecialistProfile(
        id = "spec_aris_emo",
        name = "Dr. Aris Thorne, PhD",
        title = "Clinical Psychologist & Somatic Therapist",
        credentials = "PhD Clinical Psychology, Somatic Experiencing Practitioner",
        focus = "Emotional burnout, relational trauma, codependency, internal boundary reclamation",
        bookingInfo = "Telehealth sessions with sliding scale availability."
      ),
      helpline = HelplineResource(
        name = "988 Suicide & Crisis Lifeline",
        number = "988",
        hours = "24/7 Call or Text Free & Confidential",
        description = "Immediate 24/7 support for emotional distress, overwhelming burnout, or severe mental health strain."
      )
    ),

    // 9. Sustainability
    SupportPackage(
      id = "sustainability",
      title = "Sustainability",
      emoji = "🌱",
      covers = "Climate anxiety, eco-guilt, overwhelmed by global challenges, sustainable lifestyle",
      exampleInput = "I feel guilty about my everyday choices but don't know where to start",
      feelingPrompts = listOf(
        "I feel guilty about my everyday choices but don't know where to start",
        "Climate anxiety is affecting my mental health",
        "I want to live more sustainably but it feels overwhelming",
        "I feel powerless about the state of the world"
      ),
      selfCareScript = "Eco-anxiety is a sign you care, not a personal failure to fix everything alone. Pick one small, sustainable habit to focus on this month — not ten. Systemic problems need systemic solutions; your job isn't to carry it all personally.",
      communityDescription = "People channeling climate concern into community and small, sustainable action — without the guilt-tripping or all-or-nothing pressure.",
      buddyMatchPrimer = "Matched with someone building similar sustainable habits — swap tips, local resources, or just decompress about climate anxiety together.",
      escalation = null,
      defaultMicroTool = MicroTool(
        id = "tool_eco_habit",
        title = "Single Sustainable Micro-Focus",
        category = "Eco-Grounding",
        type = ToolType.REFLECTION,
        description = "Eco-anxiety is a sign you care, not a personal failure. Focus on one small habit, not ten.",
        instructions = listOf(
          "Take a slow grounding breath and look at the sky or a plant nearby.",
          "Release the weight of fixing the world alone: 'Systemic challenges require collective care, not personal perfection.'",
          "Pick one joyful, sustainable micro-habit to practice this week."
        ),
        scriptContent = "Eco-anxiety is a sign you care, not a personal failure to fix everything alone. Pick one small, sustainable habit to focus on this month — not ten. Systemic problems need systemic solutions; your job isn't to carry it all personally.",
        durationMinutes = 3
      ),
      buddyMatches = listOf(
        BuddyProfile(
          id = "buddy_leah_sus",
          name = "Leah Green",
          age = 28,
          avatarInitials = "LG",
          story = "Community composting organizer who burnt out trying to be 'zero waste.' Now prioritizing imperfect, joyful climate community over perfectionism.",
          packageId = "sustainability",
          experienceTags = listOf("Eco-Anxiety", "Sustainable Living", "Community Action"),
          warmIntroIcebreaker = "Hi Leah! I've been feeling paralyzed by eco-guilt lately and loved your approach to imperfect action."
        )
      ),
      communities = listOf(
        CommunityCircle(
          id = "comm_climate_circle",
          name = "Sustainable Living Without Guilt",
          memberCount = 1430,
          description = "People channeling climate concern into community and small, sustainable action — without guilt-tripping or all-or-nothing pressure.",
          activeTopic = "What is one small habit that made you feel connected rather than overwhelmed?",
          safetyPledge = "Encouragement only. Zero shame or purity testing."
        )
      ),
      specialist = SpecialistProfile(
        id = "spec_thomas_sus",
        name = "Dr. Thomas Doherty, PsyD",
        title = "Ecopsychologist & Climate Mental Health Consultant",
        credentials = "Licensed Psychologist, Founder of Sustainable Self",
        focus = "Climate anxiety, eco-grief processing, environmental activism resilience",
        bookingInfo = "Virtual consultations and climate grief workshops."
      ),
      helpline = HelplineResource(
        name = "Climate Psychology Alliance Support Line",
        number = "988",
        hours = "24/7 Crisis Support via 988",
        description = "Emotional support and coping strategies for chronic climate distress, eco-grief, and anxiety."
      )
    ),

    // 10. Health & Sports
    SupportPackage(
      id = "health_sports",
      title = "Health & Sports",
      emoji = "🏃",
      covers = "Hormonal shifts, menstrual cycles, perimenopause, body movement, emotional fatigue",
      exampleInput = "I feel like a different person before my period",
      feelingPrompts = listOf(
        "I feel like a different person before my period",
        "I don't recognize my own moods anymore",
        "I want to move my body more but don't know where to start",
        "My hormones feel completely out of control"
      ),
      selfCareScript = "Hormonal shifts are physiological, not a character flaw — naming it as 'this is my hormones today' can reduce the shame spiral. Try one grounding movement break (a 5-minute walk) rather than pushing through.",
      communityDescription = "Women talking openly about cycles, hormones, perimenopause/menopause, and physical wellbeing — including the moods, symptoms, and changes that don't get discussed enough.",
      buddyMatchPrimer = "Matched with someone in a similar hormonal life stage. Useful for symptom comparison, workout accountability, or just feeling less alone in a body that feels unpredictable.",
      escalation = null,
      defaultMicroTool = MicroTool(
        id = "tool_hormonal_grounding",
        title = "5-Minute Hormonal Grace Walk",
        category = "Hormonal Somatics",
        type = ToolType.GROUNDING,
        description = "Hormonal shifts are physiological, not a character flaw. Step outside for 5 minutes of gentle movement.",
        instructions = listOf(
          "Repeat to yourself: 'This is my hormones talking today, not my permanent character.'",
          "Put on comfortable shoes and take a gentle 5-minute walk at an easy pace.",
          "Allow your body to rest without forcing high productivity today."
        ),
        scriptContent = "Hormonal shifts are physiological, not a character flaw — naming it as 'this is my hormones today' can reduce the shame spiral. Try one grounding movement break (a 5-minute walk) rather than pushing through.",
        durationMinutes = 3
      ),
      buddyMatches = listOf(
        BuddyProfile(
          id = "buddy_tara_health",
          name = "Dr. Tara Douglas",
          age = 41,
          avatarInitials = "TD",
          story = "Navigating perimenopause and endometriosis through cycle syncing and gentle strength work. No toxic fitness culture, just honest bodily support.",
          packageId = "health_sports",
          experienceTags = listOf("Hormones", "Perimenopause", "Gentle Movement"),
          warmIntroIcebreaker = "Hi Tara! My cycle has been throwing my emotions for a loop. Would love to share notes with someone in the same stage."
        )
      ),
      communities = listOf(
        CommunityCircle(
          id = "comm_hormones_circle",
          name = "Cycles, Hormones & Vitality",
          memberCount = 2280,
          description = "Women talking openly about cycles, hormones, perimenopause/menopause, and physical wellbeing without shame.",
          activeTopic = "How do you adjust your weekly expectations during your luteal phase?",
          safetyPledge = "Body-positive, scientifically supportive community."
        )
      ),
      specialist = SpecialistProfile(
        id = "spec_rebecca_health",
        name = "Rebecca Miller, MS, RD, CEDS",
        title = "Women's Health & Hormonal Wellbeing Specialist",
        credentials = "Registered Dietitian, Certified Women's Hormonal Practitioner",
        focus = "PCOS, PMDD, cycle-synced nutrition, movement regulation",
        bookingInfo = "Accepts insurance & sliding scale telehealth."
      ),
      helpline = HelplineResource(
        name = "Women's Health Info Center (HHS OWH)",
        number = "1-800-994-9662",
        hours = "Mon-Fri 9am-6pm ET",
        description = "Official medical information helpline for women's reproductive, hormonal, and physical health questions."
      )
    ),

    // 11. Education
    SupportPackage(
      id = "education",
      title = "Education",
      emoji = "🎓",
      covers = "Returning to school as an adult, mature student fears, upskilling, imposter syndrome",
      exampleInput = "I'm going back to school at 35 and feel out of place",
      feelingPrompts = listOf(
        "I'm going back to school at 35 and feel out of place",
        "I feel too old to be learning something new",
        "I'm scared I won't keep up with younger classmates",
        "I don't know if I made the right choice going back to study"
      ),
      selfCareScript = "Being the oldest in the room is a fact, not a flaw — your life experience is an asset in ways a 22-year-old classmate doesn't have yet. Give yourself permission to learn at your own pace.",
      communityDescription = "Women returning to education or upskilling later in life, sharing the logistics and the confidence wobbles that come with starting over as a student.",
      buddyMatchPrimer = "Matched with someone in a similar program or stage of study — a study buddy or just someone to text before a big exam.",
      escalation = null,
      defaultMicroTool = MicroTool(
        id = "tool_mature_student_reframe",
        title = "Life Experience Asset Anchor",
        category = "Academic Confidence",
        type = ToolType.REFLECTION,
        description = "Being the oldest in the room is a fact, not a flaw. Your life experience is an invaluable academic asset.",
        instructions = listOf(
          "Take a deep breath and sit tall at your study space.",
          "Remind yourself: 'My life experience is an asset that younger classmates do not have yet.'",
          "Give yourself permission to learn and ask questions at your own natural pace."
        ),
        scriptContent = "Being the oldest in the room is a fact, not a flaw — your life experience is an asset in ways a 22-year-old classmate doesn't have yet. Give yourself permission to learn at your own pace.",
        durationMinutes = 3
      ),
      buddyMatches = listOf(
        BuddyProfile(
          id = "buddy_maya_edu",
          name = "Maya Lin",
          age = 37,
          avatarInitials = "ML",
          story = "Entered nursing school at 35 after a decade in retail. Survived the fear of being the oldest student in class and aced my boards.",
          packageId = "education",
          experienceTags = listOf("Adult Student", "Mid-Life Degree", "Study Buddy"),
          warmIntroIcebreaker = "Hi Maya! I'm starting classes again in my 30s and feeling so out of place. Your story gave me courage."
        )
      ),
      communities = listOf(
        CommunityCircle(
          id = "comm_mature_students",
          name = "Adult Learners & Second Degrees",
          memberCount = 1810,
          description = "Women returning to education or upskilling later in life, sharing logistics and confidence wobbles that come with starting over.",
          activeTopic = "What study app or routine helped you balance homework with home responsibilities?",
          safetyPledge = "Supportive, encouraging study community."
        )
      ),
      specialist = SpecialistProfile(
        id = "spec_patricia_edu",
        name = "Dr. Patricia Hughes, EdD",
        title = "Adult Learner Counselor & Academic Strategist",
        credentials = "Doctor of Education, Certified Academic Life Coach",
        focus = "Adult study habits, overcoming academic imposter syndrome, balancing family with school",
        bookingInfo = "Individual sessions and adult student group workshops."
      ),
      helpline = HelplineResource(
        name = "Federal Student Aid & Adult Education Center",
        number = "1-800-433-3243",
        hours = "Mon-Fri 8am-10pm ET",
        description = "Official guidance for non-traditional student grants, financial aid, and program navigation."
      )
    ),

    // 12. Loneliness / Making Friends
    SupportPackage(
      id = "loneliness_friends",
      title = "Loneliness / Making Friends",
      emoji = "🧑‍🤝‍🧑",
      covers = "Adult friendship, superficial relationships, feeling invisible, building chosen community",
      exampleInput = "I don't have anyone to call when something good or bad happens",
      feelingPrompts = listOf(
        "I don't have anyone to call when something good or bad happens",
        "I don't know how to make friends as an adult",
        "All my friendships feel surface-level lately",
        "I feel invisible in my own life"
      ),
      selfCareScript = "Loneliness is a signal, not a verdict on your worth. Today, send one low-stakes message to someone you've been meaning to reach out to — 'thinking of you' is enough, it doesn't need to be a big gesture.",
      communityDescription = "A space explicitly for people working on building or deepening friendships as adults — normalizing how hard and awkward this can be, and sharing what's actually worked.",
      buddyMatchPrimer = "Matched with someone else looking to build new connections. Low-pressure first step — a coffee, a shared local event, or just a friendly ongoing chat.",
      escalation = null,
      defaultMicroTool = MicroTool(
        id = "tool_low_stakes_reachout",
        title = "Low-Stakes Connection Reachout",
        category = "Connection Practice",
        type = ToolType.SCRIPT,
        description = "Loneliness is a signal, not a verdict on your worth. Send one low-stakes message today.",
        instructions = listOf(
          "Think of one person you've thought about in the last month.",
          "Send this clean text: 'Hey, was just thinking of you today and hope you're having a gentle week!'",
          "Put your phone face down. The act of reaching out is the success itself."
        ),
        scriptContent = "Loneliness is a signal, not a verdict on your worth. Today, send one low-stakes message to someone you've been meaning to reach out to — 'thinking of you' is enough, it doesn't need to be a big gesture.",
        durationMinutes = 3
      ),
      buddyMatches = listOf(
        BuddyProfile(
          id = "buddy_hannah_lonely",
          name = "Hannah Cooper",
          age = 33,
          avatarInitials = "HC",
          story = "Spent two years with zero close friends after college friendships faded. Started an adult dinner club and learned to embrace vulnerability in friendship.",
          packageId = "loneliness_friends",
          experienceTags = listOf("Adult Friendships", "Loneliness", "Vulnerability"),
          warmIntroIcebreaker = "Hi Hannah! I've been feeling really lonely and want to make genuine friends without feeling awkward. Would love to say hello."
        )
      ),
      communities = listOf(
        CommunityCircle(
          id = "comm_friendships",
          name = "Making Friends in Adulthood",
          memberCount = 3890,
          description = "A space explicitly for people working on building or deepening friendships as adults — normalizing how hard and awkward this can be.",
          activeTopic = "What is the best low-pressure way to invite an acquaintance for tea?",
          safetyPledge = "Warm, open-hearted, non-judgmental environment."
        )
      ),
      specialist = SpecialistProfile(
        id = "spec_julianne_lonely",
        name = "Dr. Julianne Holt, LCSW",
        title = "Relational Therapist & Connection Specialist",
        credentials = "LCSW, Author on Adult Belonging",
        focus = "Attachment styles in friendship, social anxiety, building intimate chosen community",
        bookingInfo = "Telehealth sessions and social connection coaching."
      ),
      helpline = HelplineResource(
        name = "The Friendship Line (Institute on Aging)",
        number = "1-800-971-0016",
        hours = "24/7 Toll-Free & Confidential",
        description = "Accredited national crisis and peer warmline offering compassionate conversation to combat loneliness and isolation."
      )
    ),

    // 13. Aging
    SupportPackage(
      id = "aging",
      title = "Aging",
      emoji = "👴",
      covers = "Aging transitions, independence, changing appearances, ageism, rediscovering purpose",
      exampleInput = "I feel invisible now that I'm older",
      feelingPrompts = listOf(
        "I feel invisible now that I'm older",
        "I'm scared of getting older and losing my independence",
        "I don't recognize myself in the mirror anymore and it scares me",
        "Everyone treats me differently since I got older"
      ),
      selfCareScript = "Feeling invisible is a common, painful experience tied to how society treats aging — it's not a reflection of your actual value or vibrancy. Name one thing about this stage of life that feels newly free, even if it's small.",
      communityDescription = "Women navigating aging and identity shifts later in life — from ageism in the workplace to redefining purpose and visibility on your own terms.",
      buddyMatchPrimer = "Matched with someone in a similar life stage. Many members say this space feels like the only place people talk honestly about getting older without the marketing-brochure tone.",
      escalation = null,
      defaultMicroTool = MicroTool(
        id = "tool_aging_visibility",
        title = "Reclaiming Visibility & Freedom",
        category = "Aging & Self-Worth",
        type = ToolType.REFLECTION,
        description = "Feeling invisible is tied to society's biases, not your value. Claim one freedom unique to this stage of life.",
        instructions = listOf(
          "Look in the mirror and offer your reflection a warm, respectful gaze.",
          "Affirm: 'My visibility and vibrancy are defined by my spirit, not by ageist conventions.'",
          "Identify one decision you made recently simply because you no longer need to impress anyone."
        ),
        scriptContent = "Feeling invisible is a common, painful experience tied to how society treats aging — it's not a reflection of your actual value or vibrancy. Name one thing about this stage of life that feels newly free, even if it's small.",
        durationMinutes = 3
      ),
      buddyMatches = listOf(
        BuddyProfile(
          id = "buddy_evelyn_aging",
          name = "Evelyn Ross",
          age = 63,
          avatarInitials = "ER",
          story = "Retired school administrator who had to redefine who I was when my career and kids moved on. Embracing this era with humor, deep friendships, and zero apologies.",
          packageId = "aging",
          experienceTags = listOf("Aging Gracefully", "Empty Nest", "New Chapters"),
          warmIntroIcebreaker = "Hi Evelyn! I'm feeling invisible as I grow older and struggling with the shift. Your joy in this stage is really inspiring."
        )
      ),
      communities = listOf(
        CommunityCircle(
          id = "comm_aging_circle",
          name = "Sovereign Years: Women Over 50",
          memberCount = 2740,
          description = "Women navigating aging and identity shifts later in life — from ageism in the workplace to redefining purpose and visibility.",
          activeTopic = "What is something you stopped tolerating once you turned 50?",
          safetyPledge = "Authentic discussion celebrating longevity and wisdom."
        )
      ),
      specialist = SpecialistProfile(
        id = "spec_miriam_aging",
        name = "Dr. Miriam Vance, PsyD",
        title = "Gerontological Psychologist & Purpose Coach",
        credentials = "Licensed Psychologist, Specializing in Midlife & Elder Transitions",
        focus = "Age-related grief, reclaiming social visibility, legacy and autonomous decision-making",
        bookingInfo = "Virtual and phone consultations."
      ),
      helpline = HelplineResource(
        name = "Eldercare Locator & Aging Warmline",
        number = "1-800-677-1116",
        hours = "24/7 via Friendship Line (1-800-971-0016)",
        description = "National resource providing support for older adults, independence resources, and compassionate listeners."
      )
    ),

    // 14. Migration / Adapting to a New Country
    SupportPackage(
      id = "migration",
      title = "Migration / Adapting to a New Country",
      emoji = "🌍",
      covers = "Immigration, culture shock, homesickness, language barriers, dual identity",
      exampleInput = "Everything here is unfamiliar and I miss home",
      feelingPrompts = listOf(
        "Everything here is unfamiliar and I miss home",
        "I feel like I don't belong here or back home anymore",
        "The language barrier makes me feel so isolated",
        "I don't know how to build a life in a country that doesn't feel like mine yet"
      ),
      selfCareScript = "Feeling caught between two places is a normal part of migration, not a sign you made the wrong choice. Today, do one small thing that connects you to home (a food, a song, a call) — you don't have to choose one identity over the other.",
      communityDescription = "Women adapting to life in a new country, sharing what actually helps with culture shock, language barriers, and building a sense of home from scratch.",
      buddyMatchPrimer = "Matched with someone from a similar background or in a similar stage of settling in. Great for practical tips (paperwork, local know-how) and the harder-to-name homesickness.",
      escalation = null,
      defaultMicroTool = MicroTool(
        id = "tool_home_thread",
        title = "Home Thread Grounding",
        category = "Cultural Anchor",
        type = ToolType.GROUNDING,
        description = "Feeling caught between two places is normal. Do one small thing today that bridges your roots with your present.",
        instructions = listOf(
          "Take a slow breath and ground your feet on the floor.",
          "Remind yourself: 'I carry my heritage inside me; it is not erased by being here.'",
          "Do one small thing that connects you to home: play a familiar song, brew a traditional tea, or call a loved one."
        ),
        scriptContent = "Feeling caught between two places is a normal part of migration, not a sign you made the wrong choice. Today, do one small thing that connects you to home (a food, a song, a call) — you don't have to choose one identity over the other.",
        durationMinutes = 3
      ),
      buddyMatches = listOf(
        BuddyProfile(
          id = "buddy_fatima_mig",
          name = "Fatima Al-Mansoor",
          age = 39,
          avatarInitials = "FA",
          story = "Immigrated seven years ago. Felt the deep ache of having no roots and struggling with English nuances. Now mentoring newly arrived women in building home.",
          packageId = "migration",
          experienceTags = listOf("Immigrant Journey", "Cultural Adaptation", "Homesickness"),
          warmIntroIcebreaker = "Hi Fatima! I moved here recently and everything feels so foreign and lonely. Seeing your story made me feel less stranded."
        )
      ),
      communities = listOf(
        CommunityCircle(
          id = "comm_migration",
          name = "Roots & Wings: Immigrant Women",
          memberCount = 2050,
          description = "Women adapting to life in a new country, sharing what actually helps with culture shock, language barriers, and building home.",
          activeTopic = "How do you preserve your cultural traditions while embracing your new home?",
          safetyPledge = "Multicultural solidarity and warm embrace for all backgrounds."
        )
      ),
      specialist = SpecialistProfile(
        id = "spec_giselle_mig",
        name = "Dr. Giselle Gomez, PhD",
        title = "Cross-Cultural & Acculturation Trauma Psychologist",
        credentials = "PhD Clinical Psychology, Multicultural Mental Health Fellow",
        focus = "Acculturation stress, diasporic identity, immigrant grief and adjustment",
        bookingInfo = "Bilingual telehealth sessions available."
      ),
      helpline = HelplineResource(
        name = "International Rescue Committee (IRC) HelpLine",
        number = "1-888-927-4632",
        hours = "Mon-Fri 9am-5pm (24/7 Multilingual Web)",
        description = "Humanitarian and community support for immigrants, refugees, and families navigating new countries."
      ),
      meetups = listOf(
        MeetupEvent(
          id = "meetup_mig_chai",
          title = "New to Town: Immigrant Women's Chai & Story Circle",
          dayTime = "Saturdays at 3:00 PM",
          location = "International Community Garden Cafe",
          isVirtual = false,
          hostName = "Fatima Al-Mansoor",
          attendeeCount = 16,
          vibe = "Warm tea, cross-cultural welcome, zero judgment",
          description = "Share stories, language tips, and warmth in a space where everyone understands starting over in a new culture."
        )
      ),
      girlsGroups = listOf(
        GirlsGroup(
          id = "group_roots_wings",
          name = "Roots & Wings Sisterhood",
          tagLine = "Immigrant women navigating identity, career & building home",
          memberCount = 1540,
          meetingFrequency = "Weekly Tuesdays 7:00 PM",
          focusArea = "Cultural adaptation, diasporic sisterhood & belonging",
          vibe = "Multicultural, warm, deeply compassionate"
        )
      )
    ),

    // 15. Job Search, Career Uncertainty & Remote Work Loneliness
    SupportPackage(
      id = "job_search_remote_loneliness",
      title = "Job Search, Career Uncertainty & Remote Work Loneliness",
      emoji = "💼",
      covers = "Job hunting fatigue, resume ghosting, remote work isolation, career transitions, unemployment anxiety, and workplace invisibility",
      exampleInput = "I've applied to dozens of jobs, keep getting ghosted, and feel completely isolated working from home.",
      feelingPrompts = listOf(
        "I've applied to hundreds of jobs, sent countless resumes, and keep getting ghosted",
        "I work remotely from home and go days without speaking to another human",
        "I feel completely invisible, exhausted, and disposable in my career",
        "I was laid off and I don't know who I am outside of my job or how to start over",
        "I want to pivot into a new field after 40 but feel overwhelmed, intimidated, and uncertain"
      ),
      selfCareScript = "Take a gentle breath and release tension from your neck and shoulders. Your worth as a human is not defined by an automated ATS rejection letter or cold job boards. Today, step away from job boards for 2 hours, drink water, and connect with someone who loves you for who you are.",
      communityDescription = "A supportive sanctuary for women navigating job hunts, career transitions, and remote work isolation without toxic hustle culture.",
      buddyMatchPrimer = "Matched with a woman who pivoted after career transitions or overcame remote work isolation. Friendly peer support.",
      escalation = null,
      defaultMicroTool = MicroTool(
        id = "tool_job_rejection_reset",
        title = "Job Rejection Reset & Human Worth Re-Anchoring",
        category = "Career Sanctuary",
        type = ToolType.SCRIPT,
        description = "De-couple your core human worth from cold job applications and resume ghosting.",
        instructions = listOf(
          "Close all job boards, tabs, and email clients for the next 20 minutes.",
          "Place your feet flat on the ground and take 3 deep belly breaths to signal safety to your nervous system.",
          "Acknowledge out loud: 'A company not hiring me is a market mismatch, not a character flaw.'",
          "Text or call one trusted friend or sister to talk about something completely unrelated to work.",
          "Write down 3 things you brought into this world that have nothing to do with productivity or income."
        ),
        scriptContent = "My career is what I do; it is not who I am. My human intelligence, empathy, and resilience are undeniable. An automated rejection or cold market does not define my future or diminish my worth.",
        durationMinutes = 4
      ),
      buddyMatches = listOf(
        BuddyProfile(
          id = "buddy_maya_career",
          name = "Maya Chen",
          age = 37,
          avatarInitials = "MC",
          story = "Survived prolonged job hunting fatigue and layoffs. Pivoted careers successfully and founded a local women's co-working circle.",
          packageId = "job_search_remote_loneliness",
          experienceTags = listOf("Career Transitions", "Layoff Recovery", "Sisterhood at Work"),
          warmIntroIcebreaker = "Hi Maya, I'm feeling exhausted by job applications and deeply lonely in my search. Seeing your journey gave me hope."
        ),
        BuddyProfile(
          id = "buddy_alicia_remote",
          name = "Alicia Vance",
          age = 42,
          avatarInitials = "AV",
          story = "Work-from-home loneliness hit me hard after transitioning remote. Started weekly co-working lunches for women to break the silence.",
          packageId = "job_search_remote_loneliness",
          experienceTags = listOf("Remote Work Loneliness", "Tech Transition", "Sisterhood at Work"),
          warmIntroIcebreaker = "Hi Alicia, working alone all day is draining my spirit. I'd love to connect with someone who understands remote isolation."
        )
      ),
      communities = listOf(
        CommunityCircle(
          id = "comm_career_pivot_remote",
          name = "Remote Women & Career Transition Sanctuary",
          memberCount = 3480,
          description = "A supportive sanctuary for women navigating job searches, career pivots, and remote work fatigue with empathy.",
          activeTopic = "How do you protect your peace while actively job hunting?",
          safetyPledge = "No hustle shame, no toxic productivity advice. Just genuine sisterhood."
        )
      ),
      specialist = SpecialistProfile(
        id = "spec_dr_kavita_career",
        name = "Dr. Kavita Sethi, PhD",
        title = "Career Psychologist & Workplace Mental Health Specialist",
        credentials = "PhD Industrial/Organizational Psychology, Certified Career Management Coach",
        focus = "Workplace isolation, layoff grief, career identity pivots, interview anxiety",
        bookingInfo = "Virtual consultations and sliding scale available for job seekers."
      ),
      helpline = HelplineResource(
        name = "Worker Wellness & Career Distress Lifeline",
        number = "1-800-273-8255",
        hours = "24/7 Free & Confidential (Call or text 988)",
        description = "Emotional support for job loss, severe workplace burnout, and career transition depression."
      ),
      meetups = listOf(
        MeetupEvent(
          id = "meetup_remote_cowork_zoom",
          title = "Remote Women Co-Working & Accountability Lounge",
          dayTime = "Daily Monday - Friday, 9:00 AM - 1:00 PM",
          location = "Virtual Quiet Focus Room",
          isVirtual = true,
          hostName = "Remote Woman Community Host",
          attendeeCount = 65,
          vibe = "Quiet focus pomodoro blocks with friendly lunch break chat",
          description = "Break the isolation of work-from-home life. Join women across the globe for quiet co-working and friendly lunchtime check-ins."
        ),
        MeetupEvent(
          id = "meetup_tech_ladies_career",
          title = "Tech Ladies Career Pivot & Job Search Circle",
          dayTime = "Every Wednesday, 5:30 PM EST",
          location = "Virtual Community Room",
          isVirtual = true,
          hostName = "Tech Ladies Community Leaders",
          attendeeCount = 110,
          vibe = "Empowering, supportive, resume reviews without gatekeeping",
          description = "Weekly peer meetup sharing vetted opportunities, interview strategies, and mutual encouragement."
        )
      ),
      girlsGroups = listOf(
        GirlsGroup(
          id = "group_pivot_sisters",
          name = "The Career Pivot Sisters",
          tagLine = "Women transforming job search fatigue into collective resilience",
          memberCount = 2140,
          meetingFrequency = "Bi-weekly Sundays at 6:00 PM",
          focusArea = "Career Transitions, Ghosting Resilience & Support",
          vibe = "Empowering, strategic, deeply supportive",
          activeChatSnippet = "24 members shared job wins and mutual encouragement this week"
        ),
        GirlsGroup(
          id = "group_remote_hearts",
          name = "Remote & Connected Girls Circle",
          tagLine = "Because working from home shouldn't mean feeling forgotten",
          memberCount = 1150,
          meetingFrequency = "Weekly Wednesday Evening Wind-Down",
          focusArea = "Combating Work Isolation & Boundaries",
          vibe = "Cozy, restorative, honest",
          activeChatSnippet = "Sharing daily walking breaks & mindfulness check-ins"
        )
      )
    ),
    // 16. AI Fear, Digital Colonization & Cyber Defense for Women
    SupportPackage(
      id = "ai_fear_digital_colonization_cybersecurity",
      title = "AI Fear, Digital Sovereignty & Cyber Defense for Women",
      emoji = "🛡️",
      covers = "AI job replacement fear, algorithmic obsolescence, existential AI anxiety, digital colonization, big tech surveillance, EU AI Act rights, non-consensual deepfakes, and cybersecurity against women",
      exampleInput = "I feel terrified by AI deepfakes, big tech surveillance, and digital colonization targeting women online.",
      feelingPrompts = listOf(
        "I'm terrified AI is going to make my job and career obsolete and I won't be able to adapt",
        "I feel overwhelmed and anxious that AI systems are going to replace human livelihood and creative work",
        "I'm terrified AI deepfakes or stolen images will ruin my reputation or bodily dignity",
        "I feel paralyzed by digital colonization and big tech extracting our data without consent",
        "My ex or someone online is cyberstalking me, monitoring my devices, and I feel violated",
        "I feel existential dread about AI safety and how algorithmic systems exploit women",
        "How do I use the EU AI Act and digital privacy rights to protect my autonomy from biometric surveillance and automated replacement?",
        "I feel powerless against automated algorithmic decisions and online gender-based violence"
      ),
      selfCareScript = "My digital identity, body, and consciousness belong to me. No algorithm, surveillance tool, or tech monopoly can strip away my human dignity. I take back control of my digital boundaries one step at a time.",
      communityDescription = "A global sanctuary of women, ethical technologists, and cyber defense advocates fighting technology-facilitated gender-based violence (TFGBV), resisting digital colonization, and demanding algorithmic accountability.",
      buddyMatchPrimer = "You've been matched with a fellow sister and digital safety advocate who has faced cyber harassment, algorithmic surveillance, and existential tech burnout.",
      escalation = "If you are experiencing active cyberstalking, stalkerware on your phone, or non-consensual deepfake extortion, access emergency digital safety clinics immediately.",
      defaultMicroTool = MicroTool(
        id = "tool_digital_boundary_shield",
        title = "Digital Boundary & Cyber Hygiene Shield",
        category = "Cyber Defense & Sovereignty",
        type = ToolType.STEP_BY_STEP,
        description = "A calming 6-step digital lockdown routine to reclaim privacy, audit biometric permissions, opt out of AI training sets, and de-escalate digital panic.",
        instructions = listOf(
          "Grounding Breath: Take three slow, deep exhales. Technology is a tool, not your master; your physical space is safe right now.",
          "Audit Device Permissions: Open Settings > Privacy & Security > Permissions. Revoke microphone, camera, and background location access for any unneeded applications.",
          "Fortify Credentials: Enable 2-Factor Authentication using an authenticator app (e.g. Aegis or Google Authenticator) rather than SMS to prevent SIM-swapping.",
          "Opt-Out of AI Training: In your social accounts (Meta, LinkedIn, X, OpenAI), navigate to Data Privacy settings and switch off 'Allow personal data to train AI models'.",
          "Digital Evidence Preservation: If experiencing cyberstalking or deepfake threats, take timestamped screenshots with URLs before blocking or reporting.",
          "Invoke Legal Protections: Under the EU AI Act (Regulation 2024/1689) and GDPR, you have the right to request deletion of scraped biometric data and report high-risk manipulative AI systems."
        ),
        scriptContent = "I formally invoke my statutory rights under data protection laws and the EU AI Act (Regulation 2024/1689). I demand the immediate removal and deletion of any biometric data, likeness, or synthetic representations generated or processed without my explicit consent.",
        durationMinutes = 6
      ),
      buddyMatches = listOf(
        BuddyProfile(
          id = "buddy_amina_cyber",
          name = "Amina Diallo",
          age = 34,
          avatarInitials = "AD",
          story = "Tech ethics researcher and survivor of online harassment from Dakar/Brussels. Experienced digital colonization and surveillance anxiety firsthand. Now coaching women in cyber self-defense, EU AI Act citizen protections, and reclaiming digital dignity.",
          packageId = "ai_fear_digital_colonization_cybersecurity",
          experienceTags = listOf("Digital Sovereignty", "EU AI Act Rights", "Cyber Harassment Defense", "Anti-Deepfake Safety", "Decolonial Tech"),
          warmIntroIcebreaker = "Hi Amina, I feel so overwhelmed by AI surveillance and cyber threats online. I saw your story and would love to learn how you found your peace and digital boundaries."
        )
      ),
      communities = listOf(
        CommunityCircle(
          id = "comm_digital_sovereignty",
          name = "Digital Sovereignty & Decolonial AI Sisterhood",
          memberCount = 3420,
          description = "A global alliance of women, technologists, and activists rejecting digital colonization, confronting algorithmic bias, and building human-centered cyber defense.",
          activeTopic = "How to exercise your EU AI Act rights against workplace emotion recognition and synthetic impersonation",
          safetyPledge = "End-to-end encrypted discussion. Zero victim-blaming; complete solidarity with survivors of digital abuse."
        )
      ),
      specialist = SpecialistProfile(
        id = "spec_dr_sofia_cyber",
        name = "Dr. Sofia Lindqvist, LL.M & CIPP/E",
        title = "Digital Rights Jurist & Cyber-Violence Counselor",
        credentials = "LL.M. Technology Law, Certified Information Privacy Professional (Europe), TFGBV Advocate",
        focus = "EU AI Act citizen enforcement, non-consensual deepfake takedowns, stalkerware forensic triage, and trauma-informed cybersecurity",
        bookingInfo = "Free 30-min confidential intake for women facing technology-facilitated harassment, deepfakes, or algorithmic exploitation.",
        slidingScale = true
      ),
      helpline = HelplineResource(
        name = "Cyber Civil Rights Initiative (CCRI) & Without My Consent Crisis Line",
        number = "1-844-878-2274",
        hours = "24/7 Free, Confidential Digital Harm Help",
        description = "Specialized emergency support for women targeted by non-consensual intimate imagery, AI deepfakes, online harassment, and stalkerware."
      ),
      meetups = listOf(
        MeetupEvent(
          id = "meetup_women_in_ai_ethics",
          title = "Women in AI Ethics (WAIE) Global Community Gatherings",
          dayTime = "Monthly Thursdays, 6:00 PM CET / 12:00 PM EST",
          location = "WAIE Global Virtual Hub",
          isVirtual = true,
          hostName = "WAIE Research & Ethics Council",
          attendeeCount = 115,
          vibe = "Visionary, decolonial, deeply empowering, welcoming",
          description = "Global coalition of women demanding ethical AI, dismantling digital colonization, and protecting marginalized communities from predatory automated systems."
        ),
        MeetupEvent(
          id = "meetup_ccri_cyber_defense",
          title = "Cyber Civil Rights Initiative (CCRI) Survivor & Ally Circle",
          dayTime = "Bi-weekly Tuesdays, 7:00 PM EST",
          location = "Confidential Encrypted Room",
          isVirtual = true,
          hostName = "CCRI Legal & Cyber Advocate",
          attendeeCount = 40,
          vibe = "Safe harbor, trauma-informed, legal & cyber tactics",
          description = "Peer and legal support for women combating non-consensual deepfakes, online harassment, and digital retaliation."
        )
      ),
      girlsGroups = listOf(
        GirlsGroup(
          id = "group_cyber_guardians",
          name = "Cyber Guardians & Algorithmic Resistance League",
          tagLine = "Protecting our bodies, data, and future from algorithmic exploitation",
          memberCount = 2150,
          meetingFrequency = "Bi-weekly Sundays at 5:00 PM",
          focusArea = "Digital Self-Defense, EU AI Act Enforcement & Decolonial Tech",
          vibe = "Empowering, protective, tech-savvy",
          activeChatSnippet = "32 members shared digital privacy toolkits and stalkerware detection guides this week"
        )
      )
    )
  )

  fun getMeetupsForPackage(packageId: String): List<MeetupEvent> {
    val pkg = findPackageById(packageId) ?: packages.first()
    return getMeetupsForPackage(pkg)
  }

  fun getMeetupsForPackage(pkg: SupportPackage): List<MeetupEvent> {
    if (pkg.meetups.isNotEmpty()) return pkg.meetups
    return listOf(
      MeetupEvent(
        id = "meetup_${pkg.id}_circle",
        title = "${pkg.title} Women's Circle & Chai",
        dayTime = "Weekly Saturdays, 11:00 AM",
        location = "Lotus Blossom Community Sanctuary & Zoom Room",
        isVirtual = false,
        hostName = pkg.buddyMatches.firstOrNull()?.name ?: "Sister Guide",
        attendeeCount = 12,
        vibe = "Gentle, confidential, warm chai provided",
        description = "A compassionate drop-in gathering for women navigating ${pkg.title.lowercase()}. No pressure to speak; come as you are."
      ),
      MeetupEvent(
        id = "meetup_${pkg.id}_evening",
        title = "${pkg.title} Midweek Evening Wind-Down",
        dayTime = "Wednesdays, 7:30 PM EST",
        location = "Virtual Sisterhood Room",
        isVirtual = true,
        hostName = "Community Peer Host",
        attendeeCount = 24,
        vibe = "Cozy clothes, camera optional, soothing meditation",
        description = "Virtual check-in to untangle midweek emotions and share real-world peer strategies."
      )
    )
  }

  fun getGirlsGroupsForPackage(packageId: String): List<GirlsGroup> {
    val pkg = findPackageById(packageId) ?: packages.first()
    return getGirlsGroupsForPackage(pkg)
  }

  fun getGirlsGroupsForPackage(pkg: SupportPackage): List<GirlsGroup> {
    if (pkg.girlsGroups.isNotEmpty()) return pkg.girlsGroups
    return listOf(
      GirlsGroup(
        id = "group_${pkg.id}_core",
        name = "${pkg.title} Sisterhood Circle",
        tagLine = "Holding space for every nuance of ${pkg.title.lowercase()}",
        memberCount = 1240,
        meetingFrequency = "Weekly Gatherings & Daily Chat",
        focusArea = pkg.covers,
        vibe = "Authentic, confidential, 100% sisterly support",
        activeChatSnippet = "16 members active in safe chat right now"
      )
    )
  }

  fun findPackageById(id: String): SupportPackage? {
    val clean = id.trim().lowercase()
    return packages.firstOrNull { pkg ->
      pkg.id.equals(clean, ignoreCase = true) ||
          pkg.id.replace("_", "").equals(clean.replace("_", ""), ignoreCase = true) ||
          pkg.id.startsWith(clean) ||
          clean.startsWith(pkg.id) ||
          (clean.contains("coloniz") && pkg.id.contains("coloniz")) ||
          (clean.contains("cyber") && pkg.id.contains("cyber")) ||
          (clean.contains("eu ai") && pkg.id.contains("ai_fear")) ||
          (clean.contains("ai safety") && pkg.id.contains("ai_fear")) ||
          (clean.contains("deepfake") && pkg.id.contains("cyber")) ||
          (clean.contains("ai") && pkg.id.contains("ai_fear")) ||
          (clean.contains("algorithm") && pkg.id.contains("ai_fear")) ||
          (clean.contains("obsolete") && pkg.id.contains("ai_fear")) ||
          (clean.contains("job") && !clean.contains("ai") && (pkg.id.contains("job_search") || pkg.id.contains("career"))) ||
          (clean.contains("resume") && (pkg.id.contains("job_search") || pkg.id.contains("career"))) ||
          (clean.contains("remote") && pkg.id.contains("job_search")) ||
          (clean.contains("preg") && pkg.id.contains("preg")) ||
          (clean.contains("career") && pkg.id.contains("career")) ||
          (clean.contains("divorce") && pkg.id.contains("divorce")) ||
          (clean.contains("mov") && pkg.id.contains("mov")) ||
          (clean.contains("parent") && !clean.contains("preg") && pkg.id == "parenting") ||
          (clean.contains("care") && clean.contains("parent") && pkg.id == "caring_for_parents") ||
          (clean.contains("finan") && pkg.id.contains("financial")) ||
          (clean.contains("lonel") && pkg.id.contains("loneliness"))
    }
  }
}
