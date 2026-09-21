package com.example.data.ai

import android.util.Log
import com.example.BuildConfig
import com.example.data.model.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONArray
import org.json.JSONObject
import java.util.concurrent.TimeUnit

class GeminiMatchingService {

  private val client = OkHttpClient.Builder()
    .connectTimeout(60, TimeUnit.SECONDS)
    .readTimeout(60, TimeUnit.SECONDS)
    .writeTimeout(60, TimeUnit.SECONDS)
    .build()

  suspend fun matchFeeling(userInput: String): TieredMatchResult = withContext(Dispatchers.IO) {
    val trimmedInput = userInput.trim()

    // 1. Safety & Crisis Pre-Check (Immediate & deterministic for physical safety)
    val crisisInfo = evaluateCrisis(trimmedInput)
    if (crisisInfo != null) {
      val defaultPkg = SupportCatalog.findPackageById("emotional_struggles")
        ?: SupportCatalog.packages.first { it.id.contains("emotional") }
      return@withContext TieredMatchResult(
        userInput = trimmedInput,
        detectedNeeds = listOf("Safety & Crisis Intervention", "Immediate Emotional Protection"),
        empathySummary = "Your physical and emotional safety is the absolute highest priority right now. You do not have to carry this alone or navigate this in secret.",
        isCrisis = true,
        crisisAdvice = crisisInfo,
        tier1SelfHelp = MicroTool(
          id = "crisis_safety_anchor",
          title = "Immediate Safety Protocol & Grounding",
          category = "Crisis Support",
          type = ToolType.GROUNDING,
          description = "Take a breath in a safe, private space. If you are in physical danger, please tap the crisis line below or dial emergency services immediately.",
          instructions = listOf(
            "Move to a room or space where you have clear access to an exit.",
            "Keep this app or screen hidden if someone unsafe is nearby (use the Quick Safety Exit button at top).",
            "Reach out to the 24/7 National Domestic Violence Hotline: Call 1-800-799-7233 or text 'START' to 88788."
          )
        ),
        tier2Buddy = defaultPkg.buddyMatches.first(),
        tier2Community = defaultPkg.communities.first(),
        tier3Specialist = defaultPkg.specialist,
        helpline = HelplineResource(
          name = "National Domestic Violence Hotline",
          number = "1-800-799-7233",
          hours = "24/7 Free, Confidential & Multilingual",
          description = "Confidential support for relationship safety, safety planning, and local shelter resources."
        ),
        packageTitle = "Immediate Safety & Crisis Care",
        packageEmoji = "🛡️"
      )
    }

    // 2. High-Priority Relationship & Financial Abuse Escalation Check
    val escalationNotice = evaluateSpecificEscalation(trimmedInput)

    // 3. Try Gemini AI API if API key is configured
    val apiKey = try {
      BuildConfig.GEMINI_API_KEY
    } catch (e: Exception) {
      ""
    }

    if (!apiKey.isNullOrBlank() && apiKey != "MY_GEMINI_API_KEY") {
      try {
        val aiResult = callGeminiForMatch(trimmedInput, apiKey, escalationNotice)
        if (aiResult != null) {
          return@withContext aiResult
        }
      } catch (e: Exception) {
        Log.w("GeminiMatchingService", "Falling back to local matching engine", e)
      }
    }

    // 4. Fallback: Offline Smart Semantic Matcher
    return@withContext matchOffline(trimmedInput, escalationNotice)
  }

  private fun evaluateCrisis(input: String): String? {
    val lower = input.lowercase()
    val abuseTriggers = listOf(
      "hit me", "hits me", "abusive", "hurts me", "domestic violence",
      "strangled", "afraid of my husband", "afraid he will kill", "scared for my life", "threatened to kill"
    )
    val selfHarmTriggers = listOf(
      "suicide", "kill myself", "end my life", "don't want to wake up", "want to die", "harm myself"
    )

    if (abuseTriggers.any { lower.contains(it) }) {
      return "If you are experiencing domestic violence or fear for your physical safety, confidential help is available 24/7. Call 1-800-799-7233 or text 'START' to 88788 (National Domestic Violence Hotline)."
    }
    if (selfHarmTriggers.any { lower.contains(it) }) {
      return "If you are in deep distress or having thoughts of self-harm, please connect with someone who can support you right now. Call or text 988 (Suicide & Crisis Lifeline, free, 24/7)."
    }
    return null
  }

  private fun evaluateSpecificEscalation(input: String): String? {
    val lower = input.lowercase()
    val dvWords = listOf("control", "threat", "scared of him", "scared of her", "afraid", "yelled at", "trapped", "not allowed")
    val financialAbuse = listOf("no access to money", "monitored spending", "controls the money", "takes my paycheck", "won't let me work", "depend financially")
    val emotionalHostility = listOf("criticized in my own home", "small in my own home", "walking on eggshells", "afraid to speak up")

    if (financialAbuse.any { lower.contains(it) }) {
      return "Safety notice: If someone is controlling your access to money or monitoring your finances, this can be financial abuse. Confidential support and safety planning is available 24/7 at 1-800-799-7233."
    }
    if (emotionalHostility.any { lower.contains(it) } && dvWords.any { lower.contains(it) }) {
      return "Safety notice: Feeling small, criticized, or intimidated at home may indicate emotional or coercive control. Support resources are available alongside peer circles."
    }
    if (lower.contains("divorce") || lower.contains("separation") || lower.contains("ex-husband")) {
      if (dvWords.any { lower.contains(it) }) {
        return "Safety notice: Separation is often the most vulnerable phase of a high-conflict relationship. If there has been intimidation or threats, please consider contacting 1-800-799-7233 for safety planning."
      }
    }
    return null
  }

  private fun callGeminiForMatch(userInput: String, apiKey: String, escalationNotice: String?): TieredMatchResult? {
    val prompt = """
      You are the emotional interpreter for SuperShaki, a feeling-first women's support platform.
      A woman has shared what she is going through in her own raw words:
      "$userInput"

      Instructions:
      1. Detect 2 to 4 underlying, often overlapping needs (e.g. Postpartum Matrescence, Boundary Fatigue, Caregiver Exhaustion, Imposter Syndrome).
      2. Write a warm, compassionate empathy validation (2-3 sentences) affirming that what she is carrying makes sense, validating first before providing solutions.
      3. Select the best matching Support Package from this list:
         job_search_ai_loneliness, pregnancy_new_parents, parenting, career_changes, divorce_separation, moving_new_city, caring_for_parents, financial_difficulties, emotional_struggles, sustainability, health_sports, education, loneliness_friends, aging, migration
      4. Generate a tailored immediate self-help micro-tool that validates first, then offers one small concrete micro-step.

      Respond ONLY with valid JSON in this exact structure:
      {
        "primaryPackageId": "one of the IDs listed above",
        "detectedNeeds": ["Need 1", "Need 2", "Need 3"],
        "empathySummary": "Warm validation text...",
        "customToolTitle": "Specific Tool Name",
        "customToolCategory": "Category",
        "customToolScript": "Validation followed by 1 small concrete step",
        "customToolInstructions": ["Step 1", "Step 2", "Step 3"]
      }
    """.trimIndent()

    val requestJson = JSONObject().apply {
      put("contents", JSONArray().apply {
        put(JSONObject().apply {
          put("parts", JSONArray().apply {
            put(JSONObject().apply { put("text", prompt) })
          })
        })
      })
      put("generationConfig", JSONObject().apply {
        put("responseMimeType", "application/json")
        put("temperature", 0.3)
      })
    }

    val request = Request.Builder()
      .url("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=$apiKey")
      .post(requestJson.toString().toRequestBody("application/json".toMediaType()))
      .build()

    val response = client.newCall(request).execute()
    if (!response.isSuccessful) {
      val errBody = response.body?.string()
      Log.e("GeminiMatchingService", "Gemini API error code: ${response.code}, body: $errBody")
      return null
    }

    val responseBody = response.body?.string() ?: return null
    val root = JSONObject(responseBody)
    val candidates = root.optJSONArray("candidates") ?: return null
    if (candidates.length() == 0) return null

    val firstCandidate = candidates.getJSONObject(0)
    val text = firstCandidate.getJSONObject("content").getJSONArray("parts").getJSONObject(0).getString("text")

    val parsedJson = JSONObject(text.trim())
    val packageId = parsedJson.optString("primaryPackageId", "emotional_struggles")
    val selectedPkg = SupportCatalog.findPackageById(packageId)
      ?: SupportCatalog.packages.first { it.id.contains("emotional") }

    val detectedNeedsList = mutableListOf<String>()
    val needsJson = parsedJson.optJSONArray("detectedNeeds")
    if (needsJson != null) {
      for (i in 0 until needsJson.length()) {
        detectedNeedsList.add(needsJson.getString(i))
      }
    }
    if (detectedNeedsList.isEmpty()) {
      detectedNeedsList.addAll(listOf("Unspoken Mental Load", selectedPkg.title, "Emotional Regulation"))
    }

    val instructionsList = mutableListOf<String>()
    val instrJson = parsedJson.optJSONArray("customToolInstructions")
    if (instrJson != null) {
      for (i in 0 until instrJson.length()) {
        instructionsList.add(instrJson.getString(i))
      }
    }
    if (instructionsList.isEmpty()) {
      instructionsList.addAll(selectedPkg.defaultMicroTool.instructions)
    }

    val customTool = MicroTool(
      id = "custom_${System.currentTimeMillis()}",
      title = parsedJson.optString("customToolTitle", selectedPkg.defaultMicroTool.title),
      category = parsedJson.optString("customToolCategory", selectedPkg.defaultMicroTool.category),
      type = selectedPkg.defaultMicroTool.type,
      description = selectedPkg.defaultMicroTool.description,
      instructions = instructionsList,
      scriptContent = parsedJson.optString("customToolScript", selectedPkg.selfCareScript)
    )

    return TieredMatchResult(
      userInput = userInput,
      detectedNeeds = detectedNeedsList,
      empathySummary = parsedJson.optString("empathySummary", "We hear how deeply you are feeling this. What you are carrying makes complete sense, and giving voice to it is a brave first step."),
      isCrisis = false,
      tier1SelfHelp = customTool,
      tier2Buddy = selectedPkg.buddyMatches.first(),
      tier2Community = selectedPkg.communities.first(),
      tier3Specialist = selectedPkg.specialist,
      helpline = selectedPkg.helpline,
      escalationNotice = escalationNotice ?: selectedPkg.escalation,
      packageTitle = selectedPkg.title,
      packageEmoji = selectedPkg.emoji,
      meetups = SupportCatalog.getMeetupsForPackage(selectedPkg),
      girlsGroups = SupportCatalog.getGirlsGroupsForPackage(selectedPkg)
    )
  }

  fun matchOffline(userInput: String, escalationNotice: String? = null): TieredMatchResult {
    val lower = userInput.lowercase()

    // Match keywords to support packages
    val matchedScores = SupportCatalog.packages.map { pkg ->
      var score = 0
      val keywords = when (pkg.id) {
        "job_search_ai_loneliness" -> listOf("ai", "artificial intelligence", "job search", "work loneliness", "remote work", "wfh", "laid off", "automation", "obsolete", "taking jobs", "ghosted", "resume", "applications", "working alone", "tech pivot")
        "pregnancy_new_parents" -> listOf("baby", "pregnant", "postpartum", "birth", "newborn", "pumping", "matrescence", "nursing", "fourth trimester", "good mom", "connected to my baby")
        "parenting" -> listOf("teenager", "kid", "child", "son", "daughter", "mother", "patience", "parenting", "default parent", "failing at parenting")
        "career_changes" -> listOf("work", "job", "career", "interview", "resume", "laid off", "return to work", "imposter", "pivot", "outside of my job", "too old to start over")
        "divorce_separation" -> listOf("divorce", "separated", "separation", "ex-husband", "marriage", "split", "custody", "co-parenting", "outside of my marriage", "alone after all these years")
        "moving_new_city" -> listOf("moved", "relocated", "new city", "transplant", "apartment", "neighborhood", "don't know a single person", "out of place", "miss my old life")
        "caring_for_parents" -> listOf("mom", "mother", "dad", "father", "elderly", "dementia", "caregiver", "taking care of", "caregiving", "parent decline", "resenting")
        "financial_difficulties" -> listOf("money", "bank account", "debt", "afford", "financial", "bills", "broke", "credit card", "depend financially", "drowning in debt")
        "emotional_struggles" -> listOf("say yes", "empty", "burnout", "mental load", "people-pleasing", "exhausted", "anxious", "overwhelmed", "running on empty", "remembers everything", "small and criticized")
        "sustainability" -> listOf("eco", "climate", "guilt", "zero waste", "planet", "sustainable", "choices", "state of the world", "powerless")
        "health_sports" -> listOf("period", "menopause", "perimenopause", "hormone", "cycle", "bleeding", "pms", "pmdd", "body", "brain fog", "different person before my period")
        "education" -> listOf("school", "study", "degree", "university", "college", "older student", "mature student", "going back to school", "classmates", "too old to be learning")
        "loneliness_friends" -> listOf("lonely", "loneliness", "isolated", "no friends", "anyone to call", "superficial", "surface-level", "alone", "make friends as an adult")
        "aging" -> listOf("aging", "getting older", "wrinkles", "invisible", "older", "independence", "in the mirror", "losing my independence")
        "migration" -> listOf("country", "immigrant", "abroad", "foreign", "accent", "language", "homesick", "miss home", "unfamiliar", "don't belong here")
        else -> emptyList()
      }

      for (kw in keywords) {
        if (lower.contains(kw)) {
          score += 2
        }
      }
      for (prompt in pkg.feelingPrompts) {
        if (lower.contains(prompt.lowercase())) {
          score += 6
        }
      }
      pkg to score
    }

    val topMatch = matchedScores.maxByOrNull { it.second }?.takeIf { it.second > 0 }?.first
      ?: SupportCatalog.findPackageById("job_search_ai_loneliness").takeIf { lower.contains("ai") || lower.contains("job") || lower.contains("remote") }
      ?: SupportCatalog.findPackageById("emotional_struggles")
      ?: SupportCatalog.packages.first()

    // Identify multi-domain overlapping needs based on keyword presence
    val detectedNeeds = mutableListOf<String>()
    when {
      lower.contains("ai") || lower.contains("automation") || lower.contains("remote") || lower.contains("wfh") -> detectedNeeds.add("AI Anxiety & Remote Work Isolation")
      lower.contains("baby") || lower.contains("postpartum") || lower.contains("mom") -> detectedNeeds.add("Postpartum Matrescence")
      lower.contains("work") || lower.contains("career") || lower.contains("job") -> detectedNeeds.add("Professional Identity Reclamation")
      lower.contains("alone") || lower.contains("lonely") || lower.contains("friends") || lower.contains("call") -> detectedNeeds.add("Relational Isolation")
      lower.contains("caregiver") || lower.contains("parents") -> detectedNeeds.add("Caregiver Burnout")
      lower.contains("divorce") || lower.contains("marriage") || lower.contains("partner") -> detectedNeeds.add("Marital & Identity Untangling")
      lower.contains("money") || lower.contains("debt") || lower.contains("bank") -> detectedNeeds.add("Financial Vulnerability")
      lower.contains("tired") || lower.contains("empty") || lower.contains("exhausted") || lower.contains("burnout") -> detectedNeeds.add("Nervous System Depletion")
      lower.contains("hormone") || lower.contains("period") -> detectedNeeds.add("Physiological & Hormonal Shift")
      lower.contains("school") || lower.contains("study") -> detectedNeeds.add("Adult Academic Transition")
      lower.contains("country") || lower.contains("home") -> detectedNeeds.add("Acculturation & Homesickness")
      lower.contains("older") || lower.contains("aging") -> detectedNeeds.add("Longevity & Visibility Transition")
    }

    if (detectedNeeds.isEmpty()) {
      detectedNeeds.add("Unspoken Emotional Load")
      detectedNeeds.add(topMatch.title)
    } else if (detectedNeeds.size == 1) {
      detectedNeeds.add(topMatch.title)
    }

    val empathySummary = when (topMatch.id) {
      "job_search_ai_loneliness" -> "The velocity of AI developments and the isolation of remote job hunting can make you feel replaceable and unseen. Your empathy, strategic discernment, and unique lived perspective can never be automated. You belong in the future of work, and you do not have to navigate this alone."
      "pregnancy_new_parents" -> "Becoming a mother rewrites your physiology, identity, and emotions all at once. Bonding is a gradual journey, and missing your independent self while loving your baby is completely normal."
      "parenting" -> "Parenting in moments of silence or struggle can feel deeply lonely. The fact that you care so much shows your heart, and one repaired moment after a hard one teaches your child invaluable resilience."
      "career_changes" -> "Stepping back or pivoting in your career is one of life's most vulnerable transitions. Your wisdom, crisis-management, and lived experience are tremendous assets that no resume gap can diminish."
      "divorce_separation" -> "Untangling your life and identity from a marriage is like finding your footing on shifting ground. You are allowed to grieve the past and still know your future deserves peace."
      "moving_new_city" -> "Loneliness after a move is one of the most common, least-talked-about experiences. Feeling disoriented doesn't mean you made the wrong choice; community takes gentle time to grow."
      "caring_for_parents" -> "Being the anchor for an aging parent while holding your own life together is a profound and heavy balance. Resentment and devotion can exist in the same breath without canceling your love."
      "financial_difficulties" -> "Carrying financial shame or worry weighs on every quiet hour of the day. Facing the numbers neutrally without self-blame is the first brave step toward lasting independence."
      "emotional_struggles" -> "Saying yes to everyone else while starving your own energy is an exhausting, invisible load. Your tiredness is real, and your boundaries are worth protecting without apology."
      "sustainability" -> "Eco-anxiety is a reflection of your deep care for the world, not a personal failure to fix everything alone. Systemic challenges need collective care; your role is to take gentle, manageable steps."
      "health_sports" -> "Hormonal shifts are physiological, not character flaws. Naming what your body is experiencing helps lift the shame spiral and invites compassionate care."
      "education" -> "Entering an academic setting as an adult takes tremendous courage. Being the oldest in the room means you bring invaluable perspective and life experience that younger peers don't have yet."
      "loneliness_friends" -> "Craving genuine adult connection without superficiality is a universal human ache. Loneliness is a signal to gently reach out, not a verdict on your worthiness."
      "aging" -> "Feeling invisible as you grow older is a reflection of societal blind spots, never your true vibrancy. This chapter holds the gift of self-ownership and living on your own terms."
      "migration" -> "Feeling caught between two worlds is a natural part of moving to a new country. You don't have to choose between your roots and your future; you carry your heritage wherever you walk."
      else -> "We hear how deeply you are feeling this. What you are carrying is real, and giving voice to it is a brave first step toward having the support you deserve."
    }

    return TieredMatchResult(
      userInput = userInput,
      detectedNeeds = detectedNeeds,
      empathySummary = empathySummary,
      isCrisis = false,
      tier1SelfHelp = topMatch.defaultMicroTool,
      tier2Buddy = topMatch.buddyMatches.first(),
      tier2Community = topMatch.communities.first(),
      tier3Specialist = topMatch.specialist,
      helpline = topMatch.helpline,
      escalationNotice = escalationNotice ?: topMatch.escalation,
      packageTitle = topMatch.title,
      packageEmoji = topMatch.emoji,
      meetups = SupportCatalog.getMeetupsForPackage(topMatch),
      girlsGroups = SupportCatalog.getGirlsGroupsForPackage(topMatch)
    )
  }
}
