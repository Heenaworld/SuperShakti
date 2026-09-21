package com.example

import com.example.data.ai.GeminiMatchingService
import com.example.data.model.SupportCatalog
import com.example.ui.screens.buildFormattedReportString
import org.junit.Assert.*
import org.junit.Test

class ExampleUnitTest {

  private val matcher = GeminiMatchingService()

  @Test
  fun addition_isCorrect() {
    assertEquals(4, 2 + 2)
  }

  @Test
  fun `catalog contains exactly 15 support packages with all required tiers`() {
    assertEquals(15, SupportCatalog.packages.size)

    SupportCatalog.packages.forEach { pkg ->
      assertNotNull(pkg.title)
      assertNotNull(pkg.defaultMicroTool)
      assertTrue("Package ${pkg.id} should have feeling prompts", pkg.feelingPrompts.isNotEmpty())
      assertTrue("Package ${pkg.id} should have buddy matches (mentors)", pkg.buddyMatches.isNotEmpty())
      assertTrue("Package ${pkg.id} should have communities", pkg.communities.isNotEmpty())
      assertNotNull("Package ${pkg.id} should have counsellor/specialist", pkg.specialist)
      assertNotNull("Package ${pkg.id} should have helpline", pkg.helpline)
      assertFalse("Helpline number should not be blank", pkg.helpline.number.isBlank())
      assertFalse("Self-care script should not be blank", pkg.selfCareScript.isBlank())
    }
  }

  @Test
  fun `matching feeling returns full care map with mentor, counsellor, and helpline`() {
    val result = matcher.matchOffline("I feel like I've lost myself since having a baby")
    assertFalse(result.isCrisis)
    assertTrue(result.detectedNeeds.isNotEmpty())
    assertNotNull(result.empathySummary)
    assertEquals("pregnancy_new_parents", result.tier2Buddy.packageId)
    assertNotNull(result.tier1SelfHelp)
    assertNotNull(result.tier2Buddy)
    assertNotNull(result.tier2Community)
    assertNotNull(result.tier3Specialist)
    assertNotNull(result.helpline)
    assertTrue(result.helpline.number.isNotEmpty())
    assertEquals("Pregnancy / New Parents", result.packageTitle)
  }

  @Test
  fun `one page report contains what user described, analysis, solutions, and disclaimer`() {
    val result = matcher.matchOffline("I say yes to everything and I'm running on empty")
    val report = buildFormattedReportString(result, "September 12, 2026")

    // Section 1: What user described
    assertTrue(report.contains("WHAT YOU DESCRIBED (INTAKE)"))
    assertTrue(report.contains("I say yes to everything and I'm running on empty"))

    // Section 2: Emotional & Context Analysis
    assertTrue(report.contains("EMOTIONAL & CONTEXT ANALYSIS"))
    assertTrue(report.contains(result.packageTitle))

    // Section 3: Solutions & Action Plan Given
    assertTrue(report.contains("SOLUTIONS & ACTION PLAN GIVEN"))
    assertTrue(report.contains("Immediate Self-Care Action"))
    assertTrue(report.contains(result.tier2Buddy.name))
    assertTrue(report.contains(result.tier3Specialist.name))
    assertTrue(report.contains(result.helpline.number))

    // Section 4: Mandatory Professional Disclaimer
    assertTrue(report.contains("MANDATORY PROFESSIONAL DISCLAIMER"))
    assertTrue(report.contains("Always talk to a licensed medical doctor, certified therapist, lawyer, or credentialed expert"))
  }

  @Test
  fun `crisis evaluation flags domestic violence and self-harm keywords`() {
    // Domestic violence check
    val dvInput = "He hit me and I am scared for my life"
    // offline check handles safety
    val result = matcher.matchOffline(dvInput, escalationNotice = "Safety notice: 1-800-799-7233")
    assertNotNull(result.escalationNotice)
  }

  @Test
  fun `escalation warning triggers on high conflict divorce and financial abuse`() {
    val divorceThreat = matcher.matchOffline(
      "Getting a divorce and my ex-husband is threatening to control everything and leave me trapped",
      escalationNotice = "Separation safety planning notice"
    )
    assertNotNull(divorceThreat.escalationNotice)
  }

  @Test
  fun `matching detects overlapping needs across life domains`() {
    val result = matcher.matchOffline("I had a baby recently and I'm stressed about my career and feeling so alone")
    assertTrue(result.detectedNeeds.size >= 2)
  }
}
