package com.example.viewmodel

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.example.data.ai.GeminiMatchingService
import com.example.data.local.AppDatabase
import com.example.data.local.BuddyConnectionEntity
import com.example.data.local.MatchHistoryEntity
import com.example.data.local.SavedToolEntity
import com.example.data.local.SupportRepository
import com.example.data.model.AppFeedback
import com.example.data.model.BuddyProfile
import com.example.data.model.MicroTool
import com.example.data.model.SupportPackage
import com.example.data.model.TieredMatchResult
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

enum class AppScreen {
  HOME,
  RESULT,
  PACKAGES,
  PACKAGE_DETAIL,
  ADVICE_MAP,
  SANCTUARY
}

class SupportViewModel(application: Application) : AndroidViewModel(application) {

  private val repository: SupportRepository
  private val aiService = GeminiMatchingService()

  init {
    val database = AppDatabase.getDatabase(application)
    repository = SupportRepository(database.supportDao())
  }

  val matchHistory: StateFlow<List<MatchHistoryEntity>> = repository.allMatchHistory
    .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

  val savedTools: StateFlow<List<SavedToolEntity>> = repository.allSavedTools
    .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

  val connectedBuddies: StateFlow<List<BuddyConnectionEntity>> = repository.allBuddyConnections
    .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

  private val _currentScreen = MutableStateFlow(AppScreen.HOME)
  val currentScreen: StateFlow<AppScreen> = _currentScreen.asStateFlow()

  private val _feelingInput = MutableStateFlow("")
  val feelingInput: StateFlow<String> = _feelingInput.asStateFlow()

  private val _isAnalyzing = MutableStateFlow(false)
  val isAnalyzing: StateFlow<Boolean> = _isAnalyzing.asStateFlow()

  private val _matchResult = MutableStateFlow<TieredMatchResult?>(null)
  val matchResult: StateFlow<TieredMatchResult?> = _matchResult.asStateFlow()

  private val _selectedPackage = MutableStateFlow<SupportPackage?>(null)
  val selectedPackage: StateFlow<SupportPackage?> = _selectedPackage.asStateFlow()

  private val _activeInteractiveTool = MutableStateFlow<MicroTool?>(null)
  val activeInteractiveTool: StateFlow<MicroTool?> = _activeInteractiveTool.asStateFlow()

  private val _activeBuddyForIntro = MutableStateFlow<BuddyProfile?>(null)
  val activeBuddyForIntro: StateFlow<BuddyProfile?> = _activeBuddyForIntro.asStateFlow()

  private val _isQuickExitActive = MutableStateFlow(false)
  val isQuickExitActive: StateFlow<Boolean> = _isQuickExitActive.asStateFlow()

  // Meetup RSVP & Girls Group Membership
  private val _rsvpedMeetupIds = MutableStateFlow<Set<String>>(emptySet())
  val rsvpedMeetupIds: StateFlow<Set<String>> = _rsvpedMeetupIds.asStateFlow()

  private val _joinedGirlsGroupIds = MutableStateFlow<Set<String>>(emptySet())
  val joinedGirlsGroupIds: StateFlow<Set<String>> = _joinedGirlsGroupIds.asStateFlow()

  // App Feedback Stars Dialog & Submissions
  private val _isFeedbackDialogOpen = MutableStateFlow(false)
  val isFeedbackDialogOpen: StateFlow<Boolean> = _isFeedbackDialogOpen.asStateFlow()

  private val _feedbackList = MutableStateFlow<List<AppFeedback>>(
    listOf(
      AppFeedback(
        rating = 5,
        selectedTags = listOf("Sisterhood & Care", "Girls Groups", "Care Plan Accuracy"),
        comment = "SuperShaki helped me feel so seen during my postpartum anxiety. The sisterhood group is wonderful."
      )
    )
  )
  val feedbackList: StateFlow<List<AppFeedback>> = _feedbackList.asStateFlow()

  fun openFeedbackDialog() {
    _isFeedbackDialogOpen.value = true
  }

  fun closeFeedbackDialog() {
    _isFeedbackDialogOpen.value = false
  }

  fun submitFeedback(feedback: AppFeedback) {
    _feedbackList.value = listOf(feedback) + _feedbackList.value
  }

  fun toggleRsvpMeetup(meetupId: String) {
    val current = _rsvpedMeetupIds.value
    _rsvpedMeetupIds.value = if (current.contains(meetupId)) {
      current - meetupId
    } else {
      current + meetupId
    }
  }

  fun toggleJoinGirlsGroup(groupId: String) {
    val current = _joinedGirlsGroupIds.value
    _joinedGirlsGroupIds.value = if (current.contains(groupId)) {
      current - groupId
    } else {
      current + groupId
    }
  }

  fun onInputChanged(newText: String) {
    _feelingInput.value = newText
  }

  fun navigateTo(screen: AppScreen) {
    _currentScreen.value = screen
  }

  fun selectPromptAndAnalyze(promptText: String) {
    _feelingInput.value = promptText
    analyzeFeeling(promptText)
  }

  fun analyzeFeeling(input: String? = null) {
    val textToAnalyze = input ?: _feelingInput.value
    if (textToAnalyze.isBlank()) return

    viewModelScope.launch {
      _isAnalyzing.value = true
      val result = aiService.matchFeeling(textToAnalyze)
      _matchResult.value = result
      _isAnalyzing.value = false
      _currentScreen.value = AppScreen.RESULT

      // Save to local history
      val primaryPkg = result.tier2Buddy.packageId
      repository.saveMatchHistory(
        userInput = result.userInput,
        detectedNeeds = result.detectedNeeds,
        empathySummary = result.empathySummary,
        primaryPackageId = primaryPkg
      )
    }
  }

  fun openPackage(pkg: SupportPackage) {
    _selectedPackage.value = pkg
    _currentScreen.value = AppScreen.PACKAGE_DETAIL
  }

  fun openTool(tool: MicroTool) {
    _activeInteractiveTool.value = tool
  }

  fun closeTool() {
    _activeInteractiveTool.value = null
  }

  fun openBuddyIntro(buddy: BuddyProfile) {
    _activeBuddyForIntro.value = buddy
  }

  fun closeBuddyIntro() {
    _activeBuddyForIntro.value = null
  }

  fun toggleSaveTool(tool: MicroTool) {
    viewModelScope.launch {
      val isSaved = savedTools.value.any { it.id == tool.id }
      repository.toggleSaveTool(tool, isSaved)
    }
  }

  fun sendBuddyIntro(buddy: BuddyProfile, message: String) {
    viewModelScope.launch {
      repository.connectBuddy(buddy, message)
      _activeBuddyForIntro.value = null
    }
  }

  fun disconnectBuddy(buddyId: String) {
    viewModelScope.launch {
      repository.disconnectBuddy(buddyId)
    }
  }

  fun deleteHistory(id: Long) {
    viewModelScope.launch {
      repository.deleteMatchHistory(id)
    }
  }

  fun toggleQuickExit() {
    _isQuickExitActive.value = !_isQuickExitActive.value
  }
}
