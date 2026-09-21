package com.example.ui.components

import android.content.Intent
import android.net.Uri
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Emergency
import androidx.compose.material.icons.filled.Spa
import androidx.compose.material.icons.filled.VisibilityOff
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp

import androidx.compose.material.icons.filled.Map
import androidx.compose.material.icons.filled.Star
import com.example.ui.components.ShaktiAvatarIcon

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SuperShakiTopBar(
  onQuickExit: () -> Unit,
  onOpenFeedback: () -> Unit = {},
  onOpenMap: () -> Unit = {},
  modifier: Modifier = Modifier
) {
  val context = LocalContext.current
  var showCrisisDialog by remember { mutableStateOf(false) }

  TopAppBar(
    modifier = modifier,
    title = {
      Row(verticalAlignment = Alignment.CenterVertically) {
        ShaktiAvatarIcon(size = 36.dp)
        Spacer(modifier = Modifier.width(10.dp))
        Column {
          Text(
            text = "SuperShaki",
            style = MaterialTheme.typography.titleMedium,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.primary
          )
          Text(
            text = "Feeling-First Support",
            style = MaterialTheme.typography.labelSmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
          )
        }
      }
    },
    actions = {
      // Advice Map Icon
      IconButton(
        onClick = onOpenMap,
        modifier = Modifier.testTag("topbar_advice_map_button")
      ) {
        Icon(
          imageVector = Icons.Default.Map,
          contentDescription = "Plotted Advice Map",
          tint = MaterialTheme.colorScheme.primary
        )
      }

      // Feedback Stars Icon
      IconButton(
        onClick = onOpenFeedback,
        modifier = Modifier.testTag("topbar_feedback_button")
      ) {
        Icon(
          imageVector = Icons.Default.Star,
          contentDescription = "Rate SuperShaki App",
          tint = androidx.compose.ui.graphics.Color(0xFFFFB800)
        )
      }

      // 24/7 Crisis Hotline Shortcut
      IconButton(
        onClick = { showCrisisDialog = true },
        modifier = Modifier.testTag("crisis_hotline_icon_button")
      ) {
        Icon(
          imageVector = Icons.Default.Emergency,
          contentDescription = "Crisis & Safety Lifeline",
          tint = MaterialTheme.colorScheme.error
        )
      }

      // Quick Safety Exit Button
      FilledTonalButton(
        onClick = onQuickExit,
        colors = ButtonDefaults.filledTonalButtonColors(
          containerColor = MaterialTheme.colorScheme.surfaceVariant
        ),
        shape = RoundedCornerShape(12.dp),
        contentPadding = PaddingValues(horizontal = 10.dp, vertical = 4.dp),
        modifier = Modifier
          .height(36.dp)
          .testTag("quick_safety_exit_button")
      ) {
        Icon(
          imageVector = Icons.Default.VisibilityOff,
          contentDescription = "Discreet Quick Exit",
          modifier = Modifier.size(16.dp),
          tint = MaterialTheme.colorScheme.onSurfaceVariant
        )
        Spacer(modifier = Modifier.width(6.dp))
        Text(
          text = "Quick Exit",
          style = MaterialTheme.typography.labelSmall,
          color = MaterialTheme.colorScheme.onSurfaceVariant
        )
      }
      Spacer(modifier = Modifier.width(8.dp))
    },
    colors = TopAppBarDefaults.topAppBarColors(
      containerColor = MaterialTheme.colorScheme.surface
    )
  )

  if (showCrisisDialog) {
    AlertDialog(
      onDismissRequest = { showCrisisDialog = false },
      title = {
        Text("Confidential Support & Crisis Lines", fontWeight = FontWeight.Bold)
      },
      text = {
        Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
          Text(
            "Free, confidential, available 24/7 for you or someone you care about:",
            style = MaterialTheme.typography.bodyMedium
          )

          Card(
            colors = CardDefaults.cardColors(
              containerColor = MaterialTheme.colorScheme.errorContainer.copy(alpha = 0.5f)
            ),
            modifier = Modifier.fillMaxWidth()
          ) {
            Column(modifier = Modifier.padding(12.dp)) {
              Text(
                "National Domestic Violence Hotline",
                style = MaterialTheme.typography.titleSmall,
                fontWeight = FontWeight.Bold,
                color = MaterialTheme.colorScheme.onErrorContainer
              )
              Text(
                "Call 1-800-799-7233 or text 'START' to 88788",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onErrorContainer
              )
              Spacer(modifier = Modifier.height(6.dp))
              Button(
                onClick = {
                  val intent = Intent(Intent.ACTION_DIAL, Uri.parse("tel:18007997233"))
                  context.startActivity(intent)
                },
                colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.error),
                modifier = Modifier.fillMaxWidth()
              ) {
                Text("Call 1-800-799-7233")
              }
            }
          }

          Card(
            colors = CardDefaults.cardColors(
              containerColor = MaterialTheme.colorScheme.secondaryContainer.copy(alpha = 0.6f)
            ),
            modifier = Modifier.fillMaxWidth()
          ) {
            Column(modifier = Modifier.padding(12.dp)) {
              Text(
                "988 Suicide & Crisis Lifeline",
                style = MaterialTheme.typography.titleSmall,
                fontWeight = FontWeight.Bold,
                color = MaterialTheme.colorScheme.onSecondaryContainer
              )
              Text(
                "Call or text 988 anytime for compassionate crisis support.",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSecondaryContainer
              )
              Spacer(modifier = Modifier.height(6.dp))
              FilledTonalButton(
                onClick = {
                  val intent = Intent(Intent.ACTION_DIAL, Uri.parse("tel:988"))
                  context.startActivity(intent)
                },
                modifier = Modifier.fillMaxWidth()
              ) {
                Text("Call 988 Lifeline")
              }
            }
          }
        }
      },
      confirmButton = {
        TextButton(onClick = { showCrisisDialog = false }) {
          Text("Close")
        }
      }
    )
  }
}
