package com.example.data.model

enum class ToolType {
  SCRIPT,
  BREATHING,
  REFLECTION,
  GROUNDING
}

data class MicroTool(
  val id: String,
  val title: String,
  val category: String,
  val type: ToolType,
  val description: String,
  val instructions: List<String>,
  val scriptContent: String? = null,
  val durationMinutes: Int = 3
)

data class BuddyProfile(
  val id: String,
  val name: String,
  val age: Int,
  val avatarInitials: String,
  val story: String,
  val packageId: String,
  val experienceTags: List<String>,
  val warmIntroIcebreaker: String
)

data class CommunityCircle(
  val id: String,
  val name: String,
  val memberCount: Int,
  val description: String,
  val activeTopic: String,
  val safetyPledge: String
)

data class SpecialistProfile(
  val id: String,
  val name: String,
  val title: String,
  val credentials: String,
  val focus: String,
  val bookingInfo: String,
  val slidingScale: Boolean = true
)

data class HelplineResource(
  val name: String,
  val number: String,
  val hours: String = "24/7 Free & Confidential",
  val description: String,
  val isTollFree: Boolean = true
)

data class MeetupEvent(
  val id: String,
  val title: String,
  val dayTime: String,
  val location: String,
  val isVirtual: Boolean = false,
  val hostName: String,
  val attendeeCount: Int,
  val vibe: String,
  val description: String
)

data class GirlsGroup(
  val id: String,
  val name: String,
  val tagLine: String,
  val memberCount: Int,
  val meetingFrequency: String,
  val focusArea: String,
  val vibe: String,
  val activeChatSnippet: String = "Active sisterhood"
)

enum class AdviceCategory(val label: String, val iconEmoji: String) {
  MENTAL_HEALTH("Mental Health", "🧠"),
  LEGAL_RIGHTS("Legal & Rights", "⚖️"),
  CAREER_JOB("Career & Job", "💼"),
  WOMEN_HEALTH("Women's Health", "🌸"),
  COMMUNITY_SANCTUARY("Community Sanctuary", "🏡")
}

data class AdvicePlace(
  val id: String,
  val name: String,
  val category: AdviceCategory,
  val address: String,
  val distanceMiles: Double,
  val adviceType: String,
  val hours: String,
  val phone: String,
  val rating: Float = 4.9f,
  val mapCoordX: Float, // 0f..1f for canvas coordinate
  val mapCoordY: Float, // 0f..1f for canvas coordinate
  val isFreeOrSlidingScale: Boolean = true,
  val keyAdviceOffered: List<String>
)

data class AppFeedback(
  val id: String = java.util.UUID.randomUUID().toString(),
  val rating: Int, // 1 to 5 stars
  val selectedTags: List<String> = emptyList(),
  val comment: String = "",
  val timestamp: Long = System.currentTimeMillis()
)

data class SupportPackage(
  val id: String,
  val title: String,
  val emoji: String,
  val covers: String,
  val exampleInput: String,
  val feelingPrompts: List<String>,
  val selfCareScript: String,
  val communityDescription: String,
  val buddyMatchPrimer: String,
  val escalation: String? = null,
  val defaultMicroTool: MicroTool,
  val buddyMatches: List<BuddyProfile>,
  val communities: List<CommunityCircle>,
  val specialist: SpecialistProfile,
  val helpline: HelplineResource,
  val meetups: List<MeetupEvent> = emptyList(),
  val girlsGroups: List<GirlsGroup> = emptyList()
)

data class TieredMatchResult(
  val userInput: String,
  val detectedNeeds: List<String>,
  val empathySummary: String,
  val isCrisis: Boolean,
  val crisisAdvice: String? = null,
  val tier1SelfHelp: MicroTool,
  val tier2Buddy: BuddyProfile,
  val tier2Community: CommunityCircle,
  val tier3Specialist: SpecialistProfile,
  val helpline: HelplineResource,
  val escalationNotice: String? = null,
  val packageTitle: String = "Support Package",
  val packageEmoji: String = "🌸",
  val meetups: List<MeetupEvent> = emptyList(),
  val girlsGroups: List<GirlsGroup> = emptyList()
)

