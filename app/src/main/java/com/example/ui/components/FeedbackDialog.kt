package com.example.ui.components

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.Star
import androidx.compose.material.icons.outlined.Star
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.window.Dialog
import com.example.data.model.AppFeedback

@Composable
fun FeedbackDialog(
  onDismiss: () -> Unit,
  onSubmit: (AppFeedback) -> Unit
) {
  var rating by remember { mutableIntStateOf(5) }
  var comment by remember { mutableStateOf("") }
  var selectedTags by remember { mutableStateOf(setOf("Sisterhood & Care", "Girls Groups")) }
  var isSubmitted by remember { mutableStateOf(false) }

  val availableTags = listOf(
    "Care Plan Accuracy",
    "Girls Groups",
    "Sisterhood & Care",
    "Mentor Match",
    "Advice Places Map",
    "Safety & Privacy",
    "Easy to Use"
  )

  val ratingDescription = when (rating) {
    1 -> "Needs major improvement"
    2 -> "Somewhat helpful"
    3 -> "Good & comforting"
    4 -> "Deeply supportive"
    5 -> "Life-changing Sisterhood & Sanctuary! ⭐"
    else -> ""
  }

  Dialog(onDismissRequest = onDismiss) {
    Surface(
      shape = RoundedCornerShape(24.dp),
      color = MaterialTheme.colorScheme.surface,
      tonalElevation = 6.dp,
      modifier = Modifier
        .fillMaxWidth()
        .padding(8.dp)
        .testTag("app_feedback_dialog")
    ) {
      Column(
        modifier = Modifier.padding(22.dp),
        horizontalAlignment = Alignment.CenterHorizontally
      ) {
        // Close icon
        Row(
          modifier = Modifier.fillMaxWidth(),
          horizontalArrangement = Arrangement.End
        ) {
          IconButton(onClick = onDismiss, modifier = Modifier.size(28.dp)) {
            Icon(Icons.Default.Close, contentDescription = "Close")
          }
        }

        if (!isSubmitted) {
          Text(text = "✨", fontSize = 32.sp)
          Spacer(modifier = Modifier.height(4.dp))
          Text(
            text = "Rate Your Experience",
            style = MaterialTheme.typography.titleLarge,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.onSurface
          )
          Text(
            text = "How has SuperShaki supported you?",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
          )

          Spacer(modifier = Modifier.height(16.dp))

          // 5 Interactive Stars
          Row(
            horizontalArrangement = Arrangement.Center,
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier.fillMaxWidth()
          ) {
            for (starIndex in 1..5) {
              val isSelected = starIndex <= rating
              IconButton(
                onClick = { rating = starIndex },
                modifier = Modifier
                  .size(48.dp)
                  .testTag("feedback_star_$starIndex")
              ) {
                Icon(
                  imageVector = if (isSelected) Icons.Filled.Star else Icons.Outlined.Star,
                  contentDescription = "$starIndex Stars",
                  tint = if (isSelected) Color(0xFFFFB800) else MaterialTheme.colorScheme.outline.copy(alpha = 0.4f),
                  modifier = Modifier.size(36.dp)
                )
              }
            }
          }

          Text(
            text = ratingDescription,
            style = MaterialTheme.typography.labelMedium,
            fontWeight = FontWeight.SemiBold,
            color = MaterialTheme.colorScheme.primary,
            modifier = Modifier.padding(vertical = 4.dp)
          )

          Spacer(modifier = Modifier.height(12.dp))

          // Tags Selection
          Text(
            text = "What resonated most?",
            style = MaterialTheme.typography.labelSmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            modifier = Modifier.align(Alignment.Start)
          )
          Spacer(modifier = Modifier.height(6.dp))

          LazyRow(
            horizontalArrangement = Arrangement.spacedBy(6.dp),
            modifier = Modifier.fillMaxWidth()
          ) {
            items(availableTags) { tag ->
              val isTagSelected = selectedTags.contains(tag)
              Surface(
                shape = RoundedCornerShape(12.dp),
                color = if (isTagSelected) MaterialTheme.colorScheme.primaryContainer else MaterialTheme.colorScheme.surfaceVariant,
                modifier = Modifier
                  .clickable {
                    selectedTags = if (isTagSelected) {
                      selectedTags - tag
                    } else {
                      selectedTags + tag
                    }
                  }
                  .padding(1.dp)
              ) {
                Text(
                  text = tag,
                  style = MaterialTheme.typography.labelSmall,
                  color = if (isTagSelected) MaterialTheme.colorScheme.onPrimaryContainer else MaterialTheme.colorScheme.onSurfaceVariant,
                  modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp)
                )
              }
            }
          }

          Spacer(modifier = Modifier.height(14.dp))

          // Comment Field
          OutlinedTextField(
            value = comment,
            onValueChange = { comment = it },
            placeholder = { Text("Leave a message or thought for our community (optional)...") },
            maxLines = 3,
            shape = RoundedCornerShape(14.dp),
            modifier = Modifier
              .fillMaxWidth()
              .testTag("feedback_comment_input")
          )

          Spacer(modifier = Modifier.height(18.dp))

          Button(
            onClick = {
              val fb = AppFeedback(
                rating = rating,
                selectedTags = selectedTags.toList(),
                comment = comment
              )
              onSubmit(fb)
              isSubmitted = true
            },
            shape = RoundedCornerShape(14.dp),
            modifier = Modifier
              .fillMaxWidth()
              .height(48.dp)
              .testTag("submit_feedback_button")
          ) {
            Text("Submit Feedback ⭐", fontWeight = FontWeight.Bold)
          }
        } else {
          // Submission Confirmation
          Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            modifier = Modifier.padding(vertical = 16.dp)
          ) {
            Box(
              contentAlignment = Alignment.Center,
              modifier = Modifier
                .size(64.dp)
                .clip(CircleShape)
                .background(MaterialTheme.colorScheme.primaryContainer)
            ) {
              Icon(
                Icons.Default.Favorite,
                contentDescription = null,
                tint = MaterialTheme.colorScheme.primary,
                modifier = Modifier.size(32.dp)
              )
            }
            Spacer(modifier = Modifier.height(12.dp))
            Text(
              text = "Thank You, Sister!",
              style = MaterialTheme.typography.titleLarge,
              fontWeight = FontWeight.Bold
            )
            Spacer(modifier = Modifier.height(6.dp))
            Text(
              text = "Your feedback of $rating stars helps nurture this sanctuary for women worldwide. You are seen, valued, and never alone.",
              style = MaterialTheme.typography.bodyMedium,
              textAlign = TextAlign.Center,
              color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            Spacer(modifier = Modifier.height(20.dp))
            Button(
              onClick = onDismiss,
              shape = RoundedCornerShape(12.dp),
              modifier = Modifier.fillMaxWidth()
            ) {
              Text("Back to Sanctuary")
            }
          }
        }
      }
    }
  }
}
