package com.example.ui.components

import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.widget.Toast
import androidx.compose.animation.core.*
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.Dialog
import androidx.compose.ui.window.DialogProperties
import com.example.data.model.MicroTool
import com.example.data.model.ToolType
import kotlinx.coroutines.delay

@Composable
fun InteractiveToolDialog(
  tool: MicroTool,
  isSaved: Boolean,
  onToggleSave: () -> Unit,
  onDismiss: () -> Unit
) {
  val context = LocalContext.current

  Dialog(
    onDismissRequest = onDismiss,
    properties = DialogProperties(usePlatformDefaultWidth = false)
  ) {
    Card(
      modifier = Modifier
        .fillMaxWidth(0.92f)
        .fillMaxHeight(0.85f)
        .testTag("interactive_tool_dialog"),
      shape = RoundedCornerShape(28.dp),
      colors = CardDefaults.cardColors(
        containerColor = MaterialTheme.colorScheme.surface
      )
    ) {
      Column(
        modifier = Modifier
          .fillMaxSize()
          .padding(24.dp)
      ) {
        // Header
        Row(
          modifier = Modifier.fillMaxWidth(),
          horizontalArrangement = Arrangement.SpaceBetween,
          verticalAlignment = Alignment.CenterVertically
        ) {
          Surface(
            shape = RoundedCornerShape(12.dp),
            color = MaterialTheme.colorScheme.primaryContainer
          ) {
            Text(
              text = tool.category,
              style = MaterialTheme.typography.labelMedium,
              color = MaterialTheme.colorScheme.onPrimaryContainer,
              modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp)
            )
          }

          Row {
            IconButton(
              onClick = {
                onToggleSave()
                Toast.makeText(
                  context,
                  if (!isSaved) "Saved to My Sanctuary" else "Removed from Sanctuary",
                  Toast.LENGTH_SHORT
                ).show()
              },
              modifier = Modifier.testTag("save_tool_button")
            ) {
              Icon(
                imageVector = if (isSaved) Icons.Default.Bookmark else Icons.Default.BookmarkBorder,
                contentDescription = if (isSaved) "Saved" else "Save Tool",
                tint = MaterialTheme.colorScheme.primary
              )
            }
            IconButton(
              onClick = onDismiss,
              modifier = Modifier.testTag("close_tool_dialog_button")
            ) {
              Icon(imageVector = Icons.Default.Close, contentDescription = "Close")
            }
          }
        }

        Spacer(modifier = Modifier.height(12.dp))

        Text(
          text = tool.title,
          style = MaterialTheme.typography.headlineSmall,
          fontWeight = FontWeight.Bold,
          color = MaterialTheme.colorScheme.onSurface
        )

        Spacer(modifier = Modifier.height(6.dp))

        Text(
          text = tool.description,
          style = MaterialTheme.typography.bodyMedium,
          color = MaterialTheme.colorScheme.onSurfaceVariant
        )

        Spacer(modifier = Modifier.height(16.dp))
        HorizontalDivider(color = MaterialTheme.colorScheme.outlineVariant)
        Spacer(modifier = Modifier.height(16.dp))

        // Tool Content based on Type
        Column(
          modifier = Modifier
            .weight(1f)
            .verticalScroll(rememberScrollState()),
          verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
          when (tool.type) {
            ToolType.BREATHING -> {
              BreathingExerciseSection()
            }
            ToolType.SCRIPT -> {
              ScriptToolSection(
                script = tool.scriptContent ?: "No script provided.",
                onCopy = {
                  val clipboard = context.getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
                  clipboard.setPrimaryClip(ClipData.newPlainText("SuperShaki Script", tool.scriptContent))
                  Toast.makeText(context, "Script copied to clipboard!", Toast.LENGTH_SHORT).show()
                }
              )
            }
            ToolType.REFLECTION -> {
              ReflectionSection(instructions = tool.instructions, script = tool.scriptContent)
            }
            ToolType.GROUNDING -> {
              GroundingSection(instructions = tool.instructions)
            }
          }

          // Step Instructions
          if (tool.type != ToolType.BREATHING && tool.instructions.isNotEmpty()) {
            Text(
              text = "Practical Steps",
              style = MaterialTheme.typography.titleMedium,
              fontWeight = FontWeight.SemiBold
            )
            tool.instructions.forEachIndexed { idx, instruction ->
              Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.Top
              ) {
                Surface(
                  shape = CircleShape,
                  color = MaterialTheme.colorScheme.secondaryContainer,
                  modifier = Modifier.size(24.dp)
                ) {
                  Box(contentAlignment = Alignment.Center) {
                    Text(
                      text = "${idx + 1}",
                      style = MaterialTheme.typography.labelSmall,
                      color = MaterialTheme.colorScheme.onSecondaryContainer,
                      fontWeight = FontWeight.Bold
                    )
                  }
                }
                Spacer(modifier = Modifier.width(12.dp))
                Text(
                  text = instruction,
                  style = MaterialTheme.typography.bodyMedium,
                  color = MaterialTheme.colorScheme.onSurface
                )
              }
            }
          }
        }

        Spacer(modifier = Modifier.height(16.dp))

        Button(
          onClick = onDismiss,
          modifier = Modifier
            .fillMaxWidth()
            .testTag("done_tool_button"),
          colors = ButtonDefaults.buttonColors(
            containerColor = MaterialTheme.colorScheme.primary
          )
        ) {
          Text("Completed Exercise")
        }
      }
    }
  }
}

@Composable
fun BreathingExerciseSection() {
  var isBreathingActive by remember { mutableStateOf(true) }
  var breathPhase by remember { mutableStateOf("Inhale deeply") }
  var countdown by remember { mutableStateOf(4) }

  val infiniteTransition = rememberInfiniteTransition(label = "breath")
  val scale by infiniteTransition.animateFloat(
    initialValue = 0.8f,
    targetValue = 1.25f,
    animationSpec = infiniteRepeatable(
      animation = tween(4000, easing = FastOutSlowInEasing),
      repeatMode = RepeatMode.Reverse
    ),
    label = "scale"
  )

  LaunchedEffect(isBreathingActive) {
    while (isBreathingActive) {
      breathPhase = "Inhale softly through nose"
      for (i in 4 downTo 1) {
        countdown = i
        delay(1000)
      }
      breathPhase = "Hold gently"
      for (i in 4 downTo 1) {
        countdown = i
        delay(1000)
      }
      breathPhase = "Long slow exhale through mouth"
      for (i in 6 downTo 1) {
        countdown = i
        delay(1000)
      }
    }
  }

  Column(
    modifier = Modifier
      .fillMaxWidth()
      .padding(vertical = 12.dp),
    horizontalAlignment = Alignment.CenterHorizontally
  ) {
    Box(
      modifier = Modifier
        .size(170.dp)
        .scale(scale)
        .clip(CircleShape)
        .background(MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0.65f))
        .border(3.dp, MaterialTheme.colorScheme.primary, CircleShape),
      contentAlignment = Alignment.Center
    ) {
      Column(horizontalAlignment = Alignment.CenterHorizontally) {
        Text(
          text = "$countdown",
          style = MaterialTheme.typography.displaySmall,
          fontWeight = FontWeight.Bold,
          color = MaterialTheme.colorScheme.onPrimaryContainer
        )
        Text(
          text = "seconds",
          style = MaterialTheme.typography.labelSmall,
          color = MaterialTheme.colorScheme.onPrimaryContainer.copy(alpha = 0.8f)
        )
      }
    }

    Spacer(modifier = Modifier.height(20.dp))

    Text(
      text = breathPhase,
      style = MaterialTheme.typography.titleMedium,
      fontWeight = FontWeight.Medium,
      color = MaterialTheme.colorScheme.primary,
      textAlign = TextAlign.Center
    )
    Spacer(modifier = Modifier.height(6.dp))
    Text(
      text = "Allows your parasympathetic nervous system to disengage fight-or-flight.",
      style = MaterialTheme.typography.bodySmall,
      color = MaterialTheme.colorScheme.onSurfaceVariant,
      textAlign = TextAlign.Center
    )
  }
}

@Composable
fun ScriptToolSection(
  script: String,
  onCopy: () -> Unit
) {
  Column(
    modifier = Modifier.fillMaxWidth(),
    verticalArrangement = Arrangement.spacedBy(12.dp)
  ) {
    Text(
      text = "Copyable Communication Script",
      style = MaterialTheme.typography.titleMedium,
      fontWeight = FontWeight.SemiBold
    )

    Card(
      shape = RoundedCornerShape(16.dp),
      colors = CardDefaults.cardColors(
        containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f)
      ),
      modifier = Modifier.fillMaxWidth()
    ) {
      Column(modifier = Modifier.padding(16.dp)) {
        Text(
          text = "“$script”",
          style = MaterialTheme.typography.bodyLarge,
          color = MaterialTheme.colorScheme.onSurfaceVariant,
          lineHeight = MaterialTheme.typography.bodyLarge.lineHeight
        )
        Spacer(modifier = Modifier.height(14.dp))
        Button(
          onClick = onCopy,
          colors = ButtonDefaults.filledTonalButtonColors(),
          modifier = Modifier
            .fillMaxWidth()
            .testTag("copy_script_button")
        ) {
          Icon(Icons.Default.ContentCopy, contentDescription = null, modifier = Modifier.size(18.dp))
          Spacer(modifier = Modifier.width(8.dp))
          Text("Copy Script to Clipboard")
        }
      }
    }
  }
}

@Composable
fun ReflectionSection(
  instructions: List<String>,
  script: String?
) {
  Column(
    modifier = Modifier.fillMaxWidth(),
    verticalArrangement = Arrangement.spacedBy(12.dp)
  ) {
    if (script != null) {
      Card(
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(
          containerColor = MaterialTheme.colorScheme.secondaryContainer.copy(alpha = 0.7f)
        ),
        modifier = Modifier.fillMaxWidth()
      ) {
        Column(modifier = Modifier.padding(16.dp)) {
          Text(
            text = "Affirmation Anchor",
            style = MaterialTheme.typography.labelMedium,
            color = MaterialTheme.colorScheme.onSecondaryContainer
          )
          Spacer(modifier = Modifier.height(6.dp))
          Text(
            text = "“$script”",
            style = MaterialTheme.typography.titleMedium,
            color = MaterialTheme.colorScheme.onSecondaryContainer,
            fontWeight = FontWeight.Medium
          )
        }
      }
    }
  }
}

@Composable
fun GroundingSection(instructions: List<String>) {
  Column(
    modifier = Modifier.fillMaxWidth(),
    verticalArrangement = Arrangement.spacedBy(12.dp)
  ) {
    Surface(
      shape = RoundedCornerShape(16.dp),
      color = MaterialTheme.colorScheme.tertiaryContainer.copy(alpha = 0.6f)
    ) {
      Row(
        modifier = Modifier
          .fillMaxWidth()
          .padding(16.dp),
        verticalAlignment = Alignment.CenterVertically
      ) {
        Icon(
          imageVector = Icons.Default.SelfImprovement,
          contentDescription = null,
          tint = MaterialTheme.colorScheme.onTertiaryContainer,
          modifier = Modifier.size(32.dp)
        )
        Spacer(modifier = Modifier.width(16.dp))
        Text(
          text = "Bring your attention gently back into the present room. Your body is supported right now.",
          style = MaterialTheme.typography.bodyMedium,
          color = MaterialTheme.colorScheme.onTertiaryContainer
        )
      }
    }
  }
}
