package com.example.ui.screens

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.R
import com.example.data.model.SupportCatalog
import com.example.data.model.SupportPackage

import com.example.ui.components.ShaktiAvatarHeroCard

@Composable
fun HomeScreen(
  inputText: String,
  onInputChanged: (String) -> Unit,
  onAnalyze: () -> Unit,
  onSelectPrompt: (String) -> Unit,
  onOpenPackage: (SupportPackage) -> Unit,
  onOpenMap: () -> Unit = {},
  onOpenFeedback: () -> Unit = {},
  isAnalyzing: Boolean,
  modifier: Modifier = Modifier
) {
  val scrollState = rememberScrollState()

  val sampleFeelingPrompts = listOf(
    "I'm terrified AI is going to make my job obsolete and I feel so isolated working from home",
    "I've applied to hundreds of jobs, keep getting ghosted, and feel completely replaceable",
    "I feel like I've lost myself since having a baby",
    "My teenager won't talk to me anymore",
    "I feel invisible going back to work after years off",
    "I don't know who I am outside of my marriage",
    "I moved here for work and don't know a single person",
    "I'm the only one taking care of my mom and I'm exhausted",
    "I'm scared to check my bank account",
    "I say yes to everything and I'm running on empty",
    "I feel guilty about my everyday choices but don't know where to start",
    "I feel like a different person before my period",
    "I'm going back to school at 35 and feel out of place",
    "I don't have anyone to call when something good or bad happens",
    "I feel invisible now that I'm older",
    "Everything here is unfamiliar and I miss home"
  )

  val moodPulses = listOf(
    "Overwhelmed" to "🌊",
    "Invisible" to "🌫️",
    "Work Loneliness" to "💼",
    "AI Fear" to "🤖",
    "Exhausted" to "🔋",
    "Anxious" to "⚡",
    "Seeking Hope" to "🌱"
  )

  Column(
    modifier = modifier
      .fillMaxSize()
      .verticalScroll(scrollState)
      .padding(horizontal = 20.dp, vertical = 12.dp),
    verticalArrangement = Arrangement.spacedBy(20.dp)
  ) {
    // Shakti Avatar Sanctuary Guide Card
    ShaktiAvatarHeroCard(
      onOpenFeedback = onOpenFeedback
    )

    // Hero Banner Card
    Card(
      shape = RoundedCornerShape(24.dp),
      colors = CardDefaults.cardColors(
        containerColor = MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0.4f)
      ),
      modifier = Modifier.fillMaxWidth()
    ) {
      Column {
        Box(
          modifier = Modifier
            .fillMaxWidth()
            .height(140.dp)
            .clip(RoundedCornerShape(topStart = 24.dp, topEnd = 24.dp))
        ) {
          Image(
            painter = painterResource(id = R.drawable.hero_women_support_1789214317401),
            contentDescription = "Women sitting in an empathetic circle of support",
            contentScale = ContentScale.Crop,
            modifier = Modifier.fillMaxSize()
          )
        }

        Column(modifier = Modifier.padding(18.dp)) {
          Text(
            text = "Start from how you feel.",
            style = MaterialTheme.typography.titleLarge,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.primary
          )
          Spacer(modifier = Modifier.height(6.dp))
          Text(
            text = "Most apps expect you to label yourself. SuperShaki listens to what you're actually experiencing and connects you to immediate tools, girls groups, meetups, advice centers, and verified specialists.",
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.onSurfaceVariant
          )
        }
      }
    }

    // Plotted Advice Map & Feedback Quick Row
    Row(
      modifier = Modifier.fillMaxWidth(),
      horizontalArrangement = Arrangement.spacedBy(10.dp)
    ) {
      Card(
        shape = RoundedCornerShape(18.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
        modifier = Modifier
          .weight(1f)
          .clickable { onOpenMap() }
          .testTag("home_open_advice_map_btn")
      ) {
        Row(
          modifier = Modifier.padding(14.dp),
          verticalAlignment = Alignment.CenterVertically
        ) {
          Text(text = "🗺️", fontSize = 24.sp)
          Spacer(modifier = Modifier.width(10.dp))
          Column {
            Text(
              text = "Advice Map",
              style = MaterialTheme.typography.titleSmall,
              fontWeight = FontWeight.Bold
            )
            Text(
              text = "Plotted safe centers",
              style = MaterialTheme.typography.bodySmall,
              color = MaterialTheme.colorScheme.onSurfaceVariant
            )
          }
        }
      }

      Card(
        shape = RoundedCornerShape(18.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
        modifier = Modifier
          .weight(1f)
          .clickable { onOpenFeedback() }
          .testTag("home_rate_app_btn")
      ) {
        Row(
          modifier = Modifier.padding(14.dp),
          verticalAlignment = Alignment.CenterVertically
        ) {
          Text(text = "⭐", fontSize = 24.sp)
          Spacer(modifier = Modifier.width(10.dp))
          Column {
            Text(
              text = "Rate App",
              style = MaterialTheme.typography.titleSmall,
              fontWeight = FontWeight.Bold
            )
            Text(
              text = "Feedback & Stars",
              style = MaterialTheme.typography.bodySmall,
              color = MaterialTheme.colorScheme.onSurfaceVariant
            )
          }
        }
      }
    }

    // Feeling-First Input Card
    Card(
      shape = RoundedCornerShape(24.dp),
      colors = CardDefaults.cardColors(
        containerColor = MaterialTheme.colorScheme.surface
      ),
      elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
      modifier = Modifier.fillMaxWidth()
    ) {
      Column(modifier = Modifier.padding(20.dp)) {
        Row(verticalAlignment = Alignment.CenterVertically) {
          Icon(
            imageVector = Icons.Default.ChatBubbleOutline,
            contentDescription = null,
            tint = MaterialTheme.colorScheme.primary,
            modifier = Modifier.size(20.dp)
          )
          Spacer(modifier = Modifier.width(8.dp))
          Text(
            text = "What are you carrying today?",
            style = MaterialTheme.typography.titleMedium,
            fontWeight = FontWeight.SemiBold,
            color = MaterialTheme.colorScheme.onSurface
          )
        }

        Spacer(modifier = Modifier.height(12.dp))

        OutlinedTextField(
          value = inputText,
          onValueChange = onInputChanged,
          modifier = Modifier
            .fillMaxWidth()
            .heightIn(min = 110.dp)
            .testTag("feeling_input_field"),
          shape = RoundedCornerShape(16.dp),
          placeholder = {
            Text(
              "Describe what you are feeling in your own raw words — no clinical terms needed...",
              style = MaterialTheme.typography.bodyMedium,
              color = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.7f)
            )
          }
        )

        Spacer(modifier = Modifier.height(12.dp))

        // Mood Pulse Chips
        Text(
          text = "Quick Mood Anchor:",
          style = MaterialTheme.typography.labelSmall,
          color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        Spacer(modifier = Modifier.height(6.dp))
        LazyRow(
          horizontalArrangement = Arrangement.spacedBy(8.dp),
          modifier = Modifier.fillMaxWidth()
        ) {
          items(moodPulses) { (mood, emoji) ->
            FilterChip(
              selected = inputText.contains(mood, ignoreCase = true),
              onClick = {
                val updated = if (inputText.isBlank()) "I feel $mood. " else "$inputText I feel $mood. "
                onInputChanged(updated)
              },
              label = { Text("$emoji $mood") },
              shape = RoundedCornerShape(12.dp)
            )
          }
        }

        Spacer(modifier = Modifier.height(16.dp))

        Button(
          onClick = onAnalyze,
          enabled = inputText.isNotBlank() && !isAnalyzing,
          modifier = Modifier
            .fillMaxWidth()
            .height(50.dp)
            .testTag("find_support_button"),
          shape = RoundedCornerShape(14.dp),
          colors = ButtonDefaults.buttonColors(
            containerColor = MaterialTheme.colorScheme.primary
          )
        ) {
          if (isAnalyzing) {
            CircularProgressIndicator(
              modifier = Modifier.size(20.dp),
              color = MaterialTheme.colorScheme.onPrimary,
              strokeWidth = 2.dp
            )
            Spacer(modifier = Modifier.width(10.dp))
            Text("Interpreting your feelings...")
          } else {
            Icon(Icons.Default.AutoAwesome, contentDescription = null, modifier = Modifier.size(18.dp))
            Spacer(modifier = Modifier.width(8.dp))
            Text("Find Tiered Support", fontWeight = FontWeight.SemiBold)
          }
        }
      }
    }

    // Feeling-First Prompt Suggestions
    Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
      Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
      ) {
        Text(
          text = "Common Unspoken Struggles",
          style = MaterialTheme.typography.titleMedium,
          fontWeight = FontWeight.Bold
        )
        Text(
          text = "Tap to match",
          style = MaterialTheme.typography.labelSmall,
          color = MaterialTheme.colorScheme.primary
        )
      }

      Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
        sampleFeelingPrompts.take(4).forEach { prompt ->
          Card(
            shape = RoundedCornerShape(14.dp),
            colors = CardDefaults.cardColors(
              containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.45f)
            ),
            modifier = Modifier
              .fillMaxWidth()
              .clickable { onSelectPrompt(prompt) }
              .testTag("prompt_chip_${prompt.take(10)}")
          ) {
            Row(
              modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp, vertical = 12.dp),
              verticalAlignment = Alignment.CenterVertically,
              horizontalArrangement = Arrangement.SpaceBetween
            ) {
              Text(
                text = "“$prompt”",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurface,
                modifier = Modifier.weight(1f)
              )
              Icon(
                imageVector = Icons.AutoMirrored.Filled.ArrowForward,
                contentDescription = null,
                tint = MaterialTheme.colorScheme.primary,
                modifier = Modifier.size(16.dp)
              )
            }
          }
        }
      }
    }

    // The Tiered Response Engine (Explaining the 4 Tiers)
    Card(
      shape = RoundedCornerShape(20.dp),
      colors = CardDefaults.cardColors(
        containerColor = MaterialTheme.colorScheme.secondaryContainer.copy(alpha = 0.4f)
      ),
      modifier = Modifier.fillMaxWidth()
    ) {
      Column(modifier = Modifier.padding(18.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
        Text(
          text = "Our 4-Tier Severity Ladder",
          style = MaterialTheme.typography.titleSmall,
          fontWeight = FontWeight.Bold,
          color = MaterialTheme.colorScheme.onSecondaryContainer
        )
        Text(
          text = "When you share how you feel, SuperShaki doesn't just dump a random article. It connects you to an integrated ladder of care:",
          style = MaterialTheme.typography.bodySmall,
          color = MaterialTheme.colorScheme.onSecondaryContainer.copy(alpha = 0.9f)
        )

        Row(
          modifier = Modifier.fillMaxWidth(),
          horizontalArrangement = Arrangement.SpaceBetween
        ) {
          TierBadge(number = "1", title = "Immediate Self-Help", subtitle = "Tool / Script")
          TierBadge(number = "2", title = "Peer & Buddy", subtitle = "Never Walk In Alone")
          TierBadge(number = "3", title = "Specialist", subtitle = "Verified Therapists")
          TierBadge(number = "4", title = "Safety Net", subtitle = "24/7 Crisis Routing")
        }
      }
    }

    // Support Packages Front Door Preview
    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
      Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
      ) {
        Text(
          text = "15 Support Packages",
          style = MaterialTheme.typography.titleMedium,
          fontWeight = FontWeight.Bold
        )
        Text(
          text = "Explore all",
          style = MaterialTheme.typography.labelMedium,
          color = MaterialTheme.colorScheme.primary,
          modifier = Modifier.clickable { /* Handled in nav bar */ }
        )
      }

      LazyRow(
        horizontalArrangement = Arrangement.spacedBy(12.dp),
        modifier = Modifier.fillMaxWidth()
      ) {
        items(SupportCatalog.packages) { pkg ->
          Card(
            shape = RoundedCornerShape(18.dp),
            colors = CardDefaults.cardColors(
              containerColor = MaterialTheme.colorScheme.surface
            ),
            elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
            modifier = Modifier
              .width(180.dp)
              .height(170.dp)
              .clickable { onOpenPackage(pkg) }
              .testTag("package_card_${pkg.id}")
          ) {
            Column(
              modifier = Modifier
                .fillMaxSize()
                .padding(14.dp),
              verticalArrangement = Arrangement.SpaceBetween
            ) {
              Row(verticalAlignment = Alignment.CenterVertically) {
                Text(text = pkg.emoji, style = MaterialTheme.typography.headlineMedium)
              }

              Column {
                Text(
                  text = pkg.title,
                  style = MaterialTheme.typography.titleSmall,
                  fontWeight = FontWeight.Bold,
                  maxLines = 2
                )
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                  text = pkg.covers,
                  style = MaterialTheme.typography.bodySmall,
                  color = MaterialTheme.colorScheme.onSurfaceVariant,
                  maxLines = 2
                )
              }

              Row(verticalAlignment = Alignment.CenterVertically) {
                Text(
                  text = "View tools & buddy",
                  style = MaterialTheme.typography.labelSmall,
                  color = MaterialTheme.colorScheme.primary,
                  fontWeight = FontWeight.SemiBold
                )
                Spacer(modifier = Modifier.width(4.dp))
                Icon(
                  Icons.AutoMirrored.Filled.ArrowForward,
                  contentDescription = null,
                  modifier = Modifier.size(12.dp),
                  tint = MaterialTheme.colorScheme.primary
                )
              }
            }
          }
        }
      }
    }

    Spacer(modifier = Modifier.height(16.dp))
  }
}

@Composable
fun TierBadge(
  number: String,
  title: String,
  subtitle: String,
  modifier: Modifier = Modifier
) {
  Column(
    horizontalAlignment = Alignment.CenterHorizontally,
    modifier = modifier.width(72.dp)
  ) {
    Box(
      modifier = Modifier
        .size(28.dp)
        .background(MaterialTheme.colorScheme.primary, CircleShape),
      contentAlignment = Alignment.Center
    ) {
      Text(
        text = number,
        style = MaterialTheme.typography.labelMedium,
        fontWeight = FontWeight.Bold,
        color = MaterialTheme.colorScheme.onPrimary
      )
    }
    Spacer(modifier = Modifier.height(4.dp))
    Text(
      text = title,
      style = MaterialTheme.typography.labelSmall,
      fontWeight = FontWeight.SemiBold,
      color = MaterialTheme.colorScheme.onSurface,
      maxLines = 1
    )
    Text(
      text = subtitle,
      style = MaterialTheme.typography.bodySmall.copy(fontSize = 9.sp),
      color = MaterialTheme.colorScheme.onSurfaceVariant,
      maxLines = 1
    )
  }
}
