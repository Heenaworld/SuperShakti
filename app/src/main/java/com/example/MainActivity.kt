package com.example

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Category
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.Map
import androidx.compose.material.icons.filled.Psychology
import androidx.compose.material.icons.outlined.Category
import androidx.compose.material.icons.outlined.FavoriteBorder
import androidx.compose.material.icons.outlined.Map
import androidx.compose.material.icons.outlined.Psychology
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.ui.components.BuddyIntroDialog
import com.example.ui.components.FeedbackDialog
import com.example.ui.components.InteractiveToolDialog
import com.example.ui.components.QuickSafetyExitCurtain
import com.example.ui.components.SuperShakiTopBar
import com.example.ui.screens.*
import com.example.ui.theme.MyApplicationTheme
import com.example.viewmodel.AppScreen
import com.example.viewmodel.SupportViewModel

class MainActivity : ComponentActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    enableEdgeToEdge()
    setContent {
      MyApplicationTheme {
        SuperShakiApp()
      }
    }
  }
}

@Composable
fun SuperShakiApp(
  viewModel: SupportViewModel = viewModel()
) {
  val currentScreen by viewModel.currentScreen.collectAsStateWithLifecycle()
  val feelingInput by viewModel.feelingInput.collectAsStateWithLifecycle()
  val isAnalyzing by viewModel.isAnalyzing.collectAsStateWithLifecycle()
  val matchResult by viewModel.matchResult.collectAsStateWithLifecycle()
  val selectedPackage by viewModel.selectedPackage.collectAsStateWithLifecycle()
  val activeTool by viewModel.activeInteractiveTool.collectAsStateWithLifecycle()
  val activeBuddy by viewModel.activeBuddyForIntro.collectAsStateWithLifecycle()
  val isQuickExitActive by viewModel.isQuickExitActive.collectAsStateWithLifecycle()

  val savedTools by viewModel.savedTools.collectAsStateWithLifecycle()
  val connectedBuddies by viewModel.connectedBuddies.collectAsStateWithLifecycle()
  val matchHistory by viewModel.matchHistory.collectAsStateWithLifecycle()

  val rsvpedMeetupIds by viewModel.rsvpedMeetupIds.collectAsStateWithLifecycle()
  val joinedGirlsGroupIds by viewModel.joinedGirlsGroupIds.collectAsStateWithLifecycle()
  val isFeedbackDialogOpen by viewModel.isFeedbackDialogOpen.collectAsStateWithLifecycle()

  // Discreet Safety Curtain
  if (isQuickExitActive) {
    QuickSafetyExitCurtain(
      onReturn = { viewModel.toggleQuickExit() }
    )
    return
  }

  // Handle system back navigation
  BackHandler(enabled = currentScreen != AppScreen.HOME) {
    when (currentScreen) {
      AppScreen.PACKAGE_DETAIL -> viewModel.navigateTo(AppScreen.PACKAGES)
      AppScreen.RESULT -> viewModel.navigateTo(AppScreen.HOME)
      AppScreen.ADVICE_MAP -> viewModel.navigateTo(AppScreen.HOME)
      else -> viewModel.navigateTo(AppScreen.HOME)
    }
  }

  Scaffold(
    modifier = Modifier.fillMaxSize(),
    topBar = {
      SuperShakiTopBar(
        onQuickExit = { viewModel.toggleQuickExit() },
        onOpenFeedback = { viewModel.openFeedbackDialog() },
        onOpenMap = { viewModel.navigateTo(AppScreen.ADVICE_MAP) }
      )
    },
    bottomBar = {
      NavigationBar(
        containerColor = MaterialTheme.colorScheme.surface,
        tonalElevation = NavigationBarDefaults.Elevation
      ) {
        NavigationBarItem(
          selected = currentScreen == AppScreen.HOME || currentScreen == AppScreen.RESULT,
          onClick = { viewModel.navigateTo(AppScreen.HOME) },
          icon = {
            Icon(
              if (currentScreen == AppScreen.HOME || currentScreen == AppScreen.RESULT)
                Icons.Default.Psychology
              else
                Icons.Outlined.Psychology,
              contentDescription = "Feelings"
            )
          },
          label = { Text("Feelings") },
          modifier = Modifier.testTag("nav_tab_feelings")
        )

        NavigationBarItem(
          selected = currentScreen == AppScreen.PACKAGES || currentScreen == AppScreen.PACKAGE_DETAIL,
          onClick = { viewModel.navigateTo(AppScreen.PACKAGES) },
          icon = {
            Icon(
              if (currentScreen == AppScreen.PACKAGES || currentScreen == AppScreen.PACKAGE_DETAIL)
                Icons.Default.Category
              else
                Icons.Outlined.Category,
              contentDescription = "Packages"
            )
          },
          label = { Text("15 Packages") },
          modifier = Modifier.testTag("nav_tab_packages")
        )

        NavigationBarItem(
          selected = currentScreen == AppScreen.ADVICE_MAP,
          onClick = { viewModel.navigateTo(AppScreen.ADVICE_MAP) },
          icon = {
            Icon(
              if (currentScreen == AppScreen.ADVICE_MAP)
                Icons.Default.Map
              else
                Icons.Outlined.Map,
              contentDescription = "Advice Map"
            )
          },
          label = { Text("Advice Map") },
          modifier = Modifier.testTag("nav_tab_advice_map")
        )

        NavigationBarItem(
          selected = currentScreen == AppScreen.SANCTUARY,
          onClick = { viewModel.navigateTo(AppScreen.SANCTUARY) },
          icon = {
            Icon(
              if (currentScreen == AppScreen.SANCTUARY)
                Icons.Default.Favorite
              else
                Icons.Outlined.FavoriteBorder,
              contentDescription = "Sanctuary"
            )
          },
          label = { Text("Sanctuary") },
          modifier = Modifier.testTag("nav_tab_sanctuary")
        )
      }
    }
  ) { innerPadding ->
    Surface(
      modifier = Modifier
        .fillMaxSize()
        .padding(innerPadding),
      color = MaterialTheme.colorScheme.background
    ) {
      when (currentScreen) {
        AppScreen.HOME -> {
          HomeScreen(
            inputText = feelingInput,
            onInputChanged = { viewModel.onInputChanged(it) },
            onAnalyze = { viewModel.analyzeFeeling() },
            onSelectPrompt = { viewModel.selectPromptAndAnalyze(it) },
            onOpenPackage = { viewModel.openPackage(it) },
            onOpenMap = { viewModel.navigateTo(AppScreen.ADVICE_MAP) },
            onOpenFeedback = { viewModel.openFeedbackDialog() },
            isAnalyzing = isAnalyzing
          )
        }

        AppScreen.RESULT -> {
          matchResult?.let { result ->
            MatchResultScreen(
              result = result,
              onOpenTool = { viewModel.openTool(it) },
              onConnectBuddy = { viewModel.openBuddyIntro(it) },
              onBack = { viewModel.navigateTo(AppScreen.HOME) },
              onOpenMap = { viewModel.navigateTo(AppScreen.ADVICE_MAP) },
              rsvpedMeetupIds = rsvpedMeetupIds,
              onToggleRsvpMeetup = { viewModel.toggleRsvpMeetup(it) },
              joinedGirlsGroupIds = joinedGirlsGroupIds,
              onToggleJoinGirlsGroup = { viewModel.toggleJoinGirlsGroup(it) }
            )
          } ?: run {
            HomeScreen(
              inputText = feelingInput,
              onInputChanged = { viewModel.onInputChanged(it) },
              onAnalyze = { viewModel.analyzeFeeling() },
              onSelectPrompt = { viewModel.selectPromptAndAnalyze(it) },
              onOpenPackage = { viewModel.openPackage(it) },
              onOpenMap = { viewModel.navigateTo(AppScreen.ADVICE_MAP) },
              onOpenFeedback = { viewModel.openFeedbackDialog() },
              isAnalyzing = isAnalyzing
            )
          }
        }

        AppScreen.PACKAGES -> {
          PackagesScreen(
            onSelectPackage = { viewModel.openPackage(it) },
            onSelectPrompt = { viewModel.selectPromptAndAnalyze(it) },
            onConnectBuddy = { viewModel.openBuddyIntro(it) }
          )
        }

        AppScreen.PACKAGE_DETAIL -> {
          selectedPackage?.let { pkg ->
            PackageDetailScreen(
              pkg = pkg,
              onBack = { viewModel.navigateTo(AppScreen.PACKAGES) },
              onSelectPrompt = { viewModel.selectPromptAndAnalyze(it) },
              onOpenTool = { viewModel.openTool(it) },
              onConnectBuddy = { viewModel.openBuddyIntro(it) }
            )
          } ?: run {
            PackagesScreen(
              onSelectPackage = { viewModel.openPackage(it) },
              onSelectPrompt = { viewModel.selectPromptAndAnalyze(it) },
              onConnectBuddy = { viewModel.openBuddyIntro(it) }
            )
          }
        }

        AppScreen.ADVICE_MAP -> {
          AdviceMapScreen(
            onBack = { viewModel.navigateTo(AppScreen.HOME) },
            onSelectPackage = { pkg ->
              viewModel.openPackage(pkg)
            }
          )
        }

        AppScreen.SANCTUARY -> {
          SanctuaryScreen(
            savedTools = savedTools,
            connectedBuddies = connectedBuddies,
            history = matchHistory,
            onOpenTool = { viewModel.openTool(it) },
            onReopenHistory = { viewModel.selectPromptAndAnalyze(it) },
            onDeleteHistory = { viewModel.deleteHistory(it) },
            onDisconnectBuddy = { viewModel.disconnectBuddy(it) }
          )
        }
      }
    }
  }

  // Feedback Stars Dialog
  if (isFeedbackDialogOpen) {
    FeedbackDialog(
      onDismiss = { viewModel.closeFeedbackDialog() },
      onSubmit = { fb ->
        viewModel.submitFeedback(fb)
      }
    )
  }

  // Active Interactive Tool Modal Dialog (Breathing, Script copy, Grounding, Reflection)
  activeTool?.let { tool ->
    val isSaved = savedTools.any { it.id == tool.id }
    InteractiveToolDialog(
      tool = tool,
      isSaved = isSaved,
      onToggleSave = { viewModel.toggleSaveTool(tool) },
      onDismiss = { viewModel.closeTool() }
    )
  }

  // Active Buddy Match Warm Introduction Dialog
  activeBuddy?.let { buddy ->
    BuddyIntroDialog(
      buddy = buddy,
      onSendIntro = { introText ->
        viewModel.sendBuddyIntro(buddy, introText)
      },
      onDismiss = { viewModel.closeBuddyIntro() }
    )
  }
}
