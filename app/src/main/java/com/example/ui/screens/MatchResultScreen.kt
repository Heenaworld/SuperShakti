package com.example.ui.screens

import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.widget.Toast
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.window.Dialog
import androidx.compose.ui.window.DialogProperties
import com.example.data.model.BuddyProfile
import com.example.data.model.GirlsGroup
import com.example.data.model.MeetupEvent
import com.example.data.model.MicroTool
import com.example.data.model.TieredMatchResult
import com.example.ui.components.ShaktiAvatarIcon
import java.text.SimpleDateFormat
import java.util.*

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun MatchResultScreen(
  result: TieredMatchResult,
  onOpenTool: (MicroTool) -> Unit,
  onConnectBuddy: (BuddyProfile) -> Unit,
  onBack: () -> Unit,
  onOpenMap: () -> Unit = {},
  rsvpedMeetupIds: Set<String> = emptySet(),
  onToggleRsvpMeetup: (String) -> Unit = {},
  joinedGirlsGroupIds: Set<String> = emptySet(),
  onToggleJoinGirlsGroup: (String) -> Unit = {},
  modifier: Modifier = Modifier
) {
  val context = LocalContext.current
  val scrollState = rememberScrollState()
  var showReportDialog by remember { mutableStateOf(false) }

  Column(
    modifier = modifier
      .fillMaxSize()
      .verticalScroll(scrollState)
      .padding(horizontal = 20.dp, vertical = 12.dp),
    verticalArrangement = Arrangement.spacedBy(20.dp)
  ) {
    // Back navigation & Title with Shakti Avatar
    Row(
      modifier = Modifier.fillMaxWidth(),
      verticalAlignment = Alignment.CenterVertically,
      horizontalArrangement = Arrangement.SpaceBetween
    ) {
      Row(verticalAlignment = Alignment.CenterVertically) {
        IconButton(
          onClick = onBack,
          modifier = Modifier.testTag("back_from_results_button")
        ) {
          Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back")
        }
        Spacer(modifier = Modifier.width(6.dp))
        Column {
          Text(
            text = "Your Tiered Care Map",
            style = MaterialTheme.typography.titleLarge,
            fontWeight = FontWeight.Bold
          )
          Text(
            text = "${result.packageEmoji} ${result.packageTitle}",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.primary,
            fontWeight = FontWeight.SemiBold
          )
        }
      }

      ShaktiAvatarIcon(size = 42.dp)
    }

    // 1-Page Summary Report Trigger Banner
    Card(
      shape = RoundedCornerShape(18.dp),
      colors = CardDefaults.cardColors(
        containerColor = MaterialTheme.colorScheme.tertiaryContainer.copy(alpha = 0.6f)
      ),
      modifier = Modifier
        .fillMaxWidth()
        .clickable { showReportDialog = true }
        .testTag("open_one_page_report_banner")
    ) {
      Row(
        modifier = Modifier
          .fillMaxWidth()
          .padding(16.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.SpaceBetween
      ) {
        Row(
          modifier = Modifier.weight(1f),
          verticalAlignment = Alignment.CenterVertically
        ) {
          Surface(
            shape = CircleShape,
            color = MaterialTheme.colorScheme.tertiary,
            modifier = Modifier.size(42.dp)
          ) {
            Box(contentAlignment = Alignment.Center) {
              Icon(
                Icons.Default.Description,
                contentDescription = null,
                tint = MaterialTheme.colorScheme.onTertiary,
                modifier = Modifier.size(22.dp)
              )
            }
          }
          Spacer(modifier = Modifier.width(12.dp))
          Column {
            Text(
              text = "1-Page Care & Action Report",
              style = MaterialTheme.typography.titleSmall,
              fontWeight = FontWeight.Bold,
              color = MaterialTheme.colorScheme.onTertiaryContainer
            )
            Text(
              text = "Intake summary, analysis, multi-tiered solutions & advisory",
              style = MaterialTheme.typography.bodySmall,
              color = MaterialTheme.colorScheme.onTertiaryContainer.copy(alpha = 0.8f)
            )
          }
        }
        FilledTonalButton(
          onClick = { showReportDialog = true },
          shape = RoundedCornerShape(12.dp),
          colors = ButtonDefaults.filledTonalButtonColors(
            containerColor = MaterialTheme.colorScheme.tertiary,
            contentColor = MaterialTheme.colorScheme.onTertiary
          ),
          contentPadding = PaddingValues(horizontal = 14.dp, vertical = 6.dp)
        ) {
          Text("View", fontWeight = FontWeight.Bold)
        }
      }
    }

    // What you shared Card
    Card(
      shape = RoundedCornerShape(18.dp),
      colors = CardDefaults.cardColors(
        containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f)
      ),
      modifier = Modifier.fillMaxWidth()
    ) {
      Column(modifier = Modifier.padding(16.dp)) {
        Text(
          text = "What you shared (feeling intake):",
          style = MaterialTheme.typography.labelMedium,
          color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        Spacer(modifier = Modifier.height(6.dp))
        Text(
          text = "“${result.userInput}”",
          style = MaterialTheme.typography.bodyMedium,
          fontWeight = FontWeight.Medium,
          color = MaterialTheme.colorScheme.onSurface
        )
      }
    }

    // High Priority Escalation / Safety Notice if present
    if (result.escalationNotice != null) {
      Card(
        shape = RoundedCornerShape(18.dp),
        colors = CardDefaults.cardColors(
          containerColor = MaterialTheme.colorScheme.errorContainer.copy(alpha = 0.6f)
        ),
        modifier = Modifier.fillMaxWidth()
      ) {
        Row(
          modifier = Modifier.padding(16.dp),
          verticalAlignment = Alignment.Top
        ) {
          Icon(
            Icons.Default.Shield,
            contentDescription = null,
            tint = MaterialTheme.colorScheme.error,
            modifier = Modifier.size(24.dp)
          )
          Spacer(modifier = Modifier.width(12.dp))
          Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Text(
              text = "Safety & Relationship Notice",
              style = MaterialTheme.typography.titleSmall,
              fontWeight = FontWeight.Bold,
              color = MaterialTheme.colorScheme.onErrorContainer
            )
            Text(
              text = result.escalationNotice,
              style = MaterialTheme.typography.bodySmall,
              color = MaterialTheme.colorScheme.onErrorContainer
            )
          }
        }
      }
    }

    // Crisis Routing (Priority 1 if safety risk is present)
    if (result.isCrisis) {
      Card(
        shape = RoundedCornerShape(20.dp),
        colors = CardDefaults.cardColors(
          containerColor = MaterialTheme.colorScheme.errorContainer
        ),
        modifier = Modifier
          .fillMaxWidth()
          .border(2.dp, MaterialTheme.colorScheme.error, RoundedCornerShape(20.dp))
          .testTag("crisis_alert_card")
      ) {
        Column(modifier = Modifier.padding(18.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
          Row(verticalAlignment = Alignment.CenterVertically) {
            Icon(
              imageVector = Icons.Default.Emergency,
              contentDescription = null,
              tint = MaterialTheme.colorScheme.onErrorContainer,
              modifier = Modifier.size(24.dp)
            )
            Spacer(modifier = Modifier.width(10.dp))
            Text(
              text = "Priority Safety Escalation",
              style = MaterialTheme.typography.titleMedium,
              fontWeight = FontWeight.Bold,
              color = MaterialTheme.colorScheme.onErrorContainer
            )
          }

          Text(
            text = result.crisisAdvice ?: "Your physical and emotional safety is paramount.",
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.onErrorContainer
          )

          Button(
            onClick = {
              val intent = Intent(Intent.ACTION_DIAL, Uri.parse("tel:18007997233"))
              context.startActivity(intent)
            },
            colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.error),
            modifier = Modifier.fillMaxWidth()
          ) {
            Icon(Icons.Default.Phone, contentDescription = null, modifier = Modifier.size(18.dp))
            Spacer(modifier = Modifier.width(8.dp))
            Text("Call National Domestic Violence Hotline (24/7)")
          }
        }
      }
    }

    // Empathy Synthesis & Overlapping Needs Analysis
    Card(
      shape = RoundedCornerShape(24.dp),
      colors = CardDefaults.cardColors(
        containerColor = MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0.45f)
      ),
      modifier = Modifier.fillMaxWidth()
    ) {
      Column(modifier = Modifier.padding(20.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        Row(verticalAlignment = Alignment.CenterVertically) {
          Icon(
            imageVector = Icons.Default.Favorite,
            contentDescription = null,
            tint = MaterialTheme.colorScheme.primary,
            modifier = Modifier.size(20.dp)
          )
          Spacer(modifier = Modifier.width(8.dp))
          Text(
            text = "Emotional & Context Analysis",
            style = MaterialTheme.typography.titleMedium,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.primary
          )
        }

        Text(
          text = result.empathySummary,
          style = MaterialTheme.typography.bodyLarge,
          color = MaterialTheme.colorScheme.onSurface
        )

        HorizontalDivider(color = MaterialTheme.colorScheme.primary.copy(alpha = 0.2f))

        Text(
          text = "Interpreted Overlapping Needs:",
          style = MaterialTheme.typography.labelMedium,
          fontWeight = FontWeight.SemiBold,
          color = MaterialTheme.colorScheme.primary
        )

        FlowRow(
          horizontalArrangement = Arrangement.spacedBy(8.dp),
          verticalArrangement = Arrangement.spacedBy(8.dp),
          modifier = Modifier.fillMaxWidth()
        ) {
          result.detectedNeeds.forEach { need ->
            Surface(
              shape = RoundedCornerShape(12.dp),
              color = MaterialTheme.colorScheme.surface
            ) {
              Text(
                text = "✦ $need",
                style = MaterialTheme.typography.bodySmall,
                fontWeight = FontWeight.Medium,
                color = MaterialTheme.colorScheme.onSurface,
                modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp)
              )
            }
          }
        }
      }
    }

    // TIER 1: Immediate Self-Help Micro-Tool
    TierSectionHeader(
      tierNumber = "Tier 1 Solution",
      title = "Immediate Self-Care Action",
      subtitle = "Validates first, provides one concrete step in under 3 minutes"
    )

    Card(
      shape = RoundedCornerShape(20.dp),
      colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
      elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
      modifier = Modifier.fillMaxWidth()
    ) {
      Column(modifier = Modifier.padding(18.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        Row(
          modifier = Modifier.fillMaxWidth(),
          horizontalArrangement = Arrangement.SpaceBetween,
          verticalAlignment = Alignment.CenterVertically
        ) {
          Surface(
            shape = RoundedCornerShape(8.dp),
            color = MaterialTheme.colorScheme.secondaryContainer
          ) {
            Text(
              text = result.tier1SelfHelp.category,
              style = MaterialTheme.typography.labelSmall,
              color = MaterialTheme.colorScheme.onSecondaryContainer,
              modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
            )
          }

          Text(
            text = "${result.tier1SelfHelp.durationMinutes} min practice",
            style = MaterialTheme.typography.labelSmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
          )
        }

        Text(
          text = result.tier1SelfHelp.title,
          style = MaterialTheme.typography.titleMedium,
          fontWeight = FontWeight.Bold
        )

        Text(
          text = result.tier1SelfHelp.description,
          style = MaterialTheme.typography.bodyMedium,
          color = MaterialTheme.colorScheme.onSurfaceVariant
        )

        // Script snippet preview if present
        result.tier1SelfHelp.scriptContent?.let { script ->
          Surface(
            shape = RoundedCornerShape(12.dp),
            color = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f),
            modifier = Modifier.fillMaxWidth()
          ) {
            Column(modifier = Modifier.padding(12.dp)) {
              Text(
                text = "Guided Affirmation & Action:",
                style = MaterialTheme.typography.labelSmall,
                fontWeight = FontWeight.SemiBold,
                color = MaterialTheme.colorScheme.primary
              )
              Spacer(modifier = Modifier.height(4.dp))
              Text(
                text = "“$script”",
                style = MaterialTheme.typography.bodySmall,
                fontStyle = androidx.compose.ui.text.font.FontStyle.Italic,
                color = MaterialTheme.colorScheme.onSurfaceVariant
              )
            }
          }
        }

        Button(
          onClick = { onOpenTool(result.tier1SelfHelp) },
          colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primary),
          modifier = Modifier
            .fillMaxWidth()
            .testTag("open_micro_tool_button")
        ) {
          Icon(Icons.Default.PlayArrow, contentDescription = null, modifier = Modifier.size(18.dp))
          Spacer(modifier = Modifier.width(8.dp))
          Text("Begin Micro-Tool Now")
        }
      }
    }

    // TIER 2: Peer Mentorship & Community Solution
    TierSectionHeader(
      tierNumber = "Tier 2 Solution",
      title = "Peer Mentorship & Safe Circle",
      subtitle = "Walk in alongside someone who has lived this exact transition"
    )

    // Buddy Match Card (Mentor)
    Card(
      shape = RoundedCornerShape(20.dp),
      colors = CardDefaults.cardColors(
        containerColor = MaterialTheme.colorScheme.surface
      ),
      elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
      modifier = Modifier.fillMaxWidth()
    ) {
      Column(modifier = Modifier.padding(18.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        Row(
          modifier = Modifier.fillMaxWidth(),
          horizontalArrangement = Arrangement.SpaceBetween,
          verticalAlignment = Alignment.CenterVertically
        ) {
          Surface(
            shape = RoundedCornerShape(8.dp),
            color = MaterialTheme.colorScheme.primaryContainer
          ) {
            Text(
              text = "Matched Mentor Ally",
              style = MaterialTheme.typography.labelSmall,
              color = MaterialTheme.colorScheme.onPrimaryContainer,
              modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
            )
          }
          Text(
            text = "Mapped to ${result.packageTitle}",
            style = MaterialTheme.typography.labelSmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
          )
        }

        Row(verticalAlignment = Alignment.CenterVertically) {
          Box(
            modifier = Modifier
              .size(50.dp)
              .background(MaterialTheme.colorScheme.primary, CircleShape),
            contentAlignment = Alignment.Center
          ) {
            Text(
              text = result.tier2Buddy.avatarInitials,
              style = MaterialTheme.typography.titleMedium,
              fontWeight = FontWeight.Bold,
              color = MaterialTheme.colorScheme.onPrimary
            )
          }
          Spacer(modifier = Modifier.width(14.dp))
          Column {
            Text(
              text = "${result.tier2Buddy.name}, ${result.tier2Buddy.age}",
              style = MaterialTheme.typography.titleMedium,
              fontWeight = FontWeight.Bold
            )
            Text(
              text = "Lived-Experience Companion",
              style = MaterialTheme.typography.bodySmall,
              color = MaterialTheme.colorScheme.onSurfaceVariant
            )
          }
        }

        Text(
          text = result.tier2Buddy.story,
          style = MaterialTheme.typography.bodyMedium,
          color = MaterialTheme.colorScheme.onSurface
        )

        Surface(
          shape = RoundedCornerShape(10.dp),
          color = MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0.35f)
        ) {
          Row(
            modifier = Modifier
              .fillMaxWidth()
              .padding(10.dp),
            verticalAlignment = Alignment.CenterVertically
          ) {
            Icon(
              Icons.Default.ChatBubbleOutline,
              contentDescription = null,
              tint = MaterialTheme.colorScheme.primary,
              modifier = Modifier.size(16.dp)
            )
            Spacer(modifier = Modifier.width(8.dp))
            Text(
              text = "Prepared Intro: “${result.tier2Buddy.warmIntroIcebreaker}”",
              style = MaterialTheme.typography.bodySmall,
              color = MaterialTheme.colorScheme.onSurface
            )
          }
        }

        Button(
          onClick = { onConnectBuddy(result.tier2Buddy) },
          colors = ButtonDefaults.filledTonalButtonColors(),
          modifier = Modifier
            .fillMaxWidth()
            .testTag("connect_buddy_button")
        ) {
          Icon(Icons.Default.People, contentDescription = null, modifier = Modifier.size(18.dp))
          Spacer(modifier = Modifier.width(8.dp))
          Text("Connect With ${result.tier2Buddy.name}")
        }
      }
    }

    // Safe Community Circle Card
    Card(
      shape = RoundedCornerShape(20.dp),
      colors = CardDefaults.cardColors(
        containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.35f)
      ),
      modifier = Modifier.fillMaxWidth()
    ) {
      Column(modifier = Modifier.padding(18.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
        Row(
          modifier = Modifier.fillMaxWidth(),
          horizontalArrangement = Arrangement.SpaceBetween,
          verticalAlignment = Alignment.CenterVertically
        ) {
          Text(
            text = result.tier2Community.name,
            style = MaterialTheme.typography.titleSmall,
            fontWeight = FontWeight.Bold
          )
          Surface(
            shape = RoundedCornerShape(12.dp),
            color = MaterialTheme.colorScheme.surface
          ) {
            Text(
              text = "${result.tier2Community.memberCount} members",
              style = MaterialTheme.typography.labelSmall,
              modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
            )
          }
        }

        Text(
          text = result.tier2Community.description,
          style = MaterialTheme.typography.bodySmall,
          color = MaterialTheme.colorScheme.onSurfaceVariant
        )

        Surface(
          shape = RoundedCornerShape(10.dp),
          color = MaterialTheme.colorScheme.surface
        ) {
          Row(
            modifier = Modifier
              .fillMaxWidth()
              .padding(10.dp),
            verticalAlignment = Alignment.CenterVertically
          ) {
            Icon(
              Icons.Default.Forum,
              contentDescription = null,
              tint = MaterialTheme.colorScheme.primary,
              modifier = Modifier.size(16.dp)
            )
            Spacer(modifier = Modifier.width(8.dp))
            Text(
              text = "Active Circle Prompt: “${result.tier2Community.activeTopic}”",
              style = MaterialTheme.typography.labelSmall,
              color = MaterialTheme.colorScheme.onSurface
            )
          }
        }
      }
    }

    // Girls Groups in Solution
    if (result.girlsGroups.isNotEmpty()) {
      TierSectionHeader(
        tierNumber = "Girls Groups in Solution",
        title = "Dedicated Girls Circles",
        subtitle = "Small, safe sisterhood spaces gathering weekly"
      )

      result.girlsGroups.forEach { group ->
        val isJoined = joinedGirlsGroupIds.contains(group.id)
        Card(
          shape = RoundedCornerShape(20.dp),
          colors = CardDefaults.cardColors(
            containerColor = if (isJoined) MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0.35f) else MaterialTheme.colorScheme.surface
          ),
          elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
          modifier = Modifier
            .fillMaxWidth()
            .testTag("girls_group_card_${group.id}")
        ) {
          Column(modifier = Modifier.padding(18.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
            Row(
              modifier = Modifier.fillMaxWidth(),
              horizontalArrangement = Arrangement.SpaceBetween,
              verticalAlignment = Alignment.CenterVertically
            ) {
              Row(verticalAlignment = Alignment.CenterVertically) {
                Text(text = "🌸", fontSize = 20.sp)
                Spacer(modifier = Modifier.width(8.dp))
                Column {
                  Text(
                    text = group.name,
                    style = MaterialTheme.typography.titleSmall,
                    fontWeight = FontWeight.Bold
                  )
                  Text(
                    text = "${group.memberCount} sisters active",
                    style = MaterialTheme.typography.labelSmall,
                    color = MaterialTheme.colorScheme.primary
                  )
                }
              }

              Surface(
                shape = RoundedCornerShape(8.dp),
                color = MaterialTheme.colorScheme.secondaryContainer
              ) {
                Text(
                  text = group.meetingFrequency,
                  style = MaterialTheme.typography.labelSmall,
                  modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                )
              }
            }

            Text(
              text = group.tagLine,
              style = MaterialTheme.typography.bodyMedium,
              color = MaterialTheme.colorScheme.onSurface
            )

            Surface(
              shape = RoundedCornerShape(10.dp),
              color = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f)
            ) {
              Row(
                modifier = Modifier
                  .fillMaxWidth()
                  .padding(10.dp),
                verticalAlignment = Alignment.CenterVertically
              ) {
                Icon(
                  Icons.Default.VolunteerActivism,
                  contentDescription = null,
                  tint = MaterialTheme.colorScheme.primary,
                  modifier = Modifier.size(16.dp)
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                  text = "Focus: ${group.focusArea}",
                  style = MaterialTheme.typography.labelSmall,
                  color = MaterialTheme.colorScheme.onSurfaceVariant
                )
              }
            }

            group.activeChatSnippet?.let { snippet ->
              Text(
                text = "💬 $snippet",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                fontStyle = androidx.compose.ui.text.font.FontStyle.Italic
              )
            }

            Button(
              onClick = { onToggleJoinGirlsGroup(group.id) },
              colors = if (isJoined) ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.secondary) else ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primary),
              shape = RoundedCornerShape(12.dp),
              modifier = Modifier
                .fillMaxWidth()
                .testTag("join_girls_group_btn_${group.id}")
            ) {
              Icon(
                if (isJoined) Icons.Default.CheckCircle else Icons.Default.GroupAdd,
                contentDescription = null,
                modifier = Modifier.size(18.dp)
              )
              Spacer(modifier = Modifier.width(8.dp))
              Text(if (isJoined) "Joined ✓ (Chat Active)" else "Join Girls Group")
            }
          }
        }
      }
    }

    // Local & Virtual Meetups in Solution
    if (result.meetups.isNotEmpty()) {
      TierSectionHeader(
        tierNumber = "Meetups in Solution",
        title = "Local & Virtual Meetups",
        subtitle = "Real-world chai & coffee circles and virtual check-ins"
      )

      result.meetups.forEach { meetup ->
        val isRsvped = rsvpedMeetupIds.contains(meetup.id)
        Card(
          shape = RoundedCornerShape(20.dp),
          colors = CardDefaults.cardColors(
            containerColor = if (isRsvped) MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0.35f) else MaterialTheme.colorScheme.surface
          ),
          elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
          modifier = Modifier
            .fillMaxWidth()
            .testTag("meetup_card_${meetup.id}")
        ) {
          Column(modifier = Modifier.padding(18.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
            Row(
              modifier = Modifier.fillMaxWidth(),
              horizontalArrangement = Arrangement.SpaceBetween,
              verticalAlignment = Alignment.CenterVertically
            ) {
              Surface(
                shape = RoundedCornerShape(8.dp),
                color = if (meetup.isVirtual) MaterialTheme.colorScheme.tertiaryContainer else MaterialTheme.colorScheme.primaryContainer
              ) {
                Row(
                  verticalAlignment = Alignment.CenterVertically,
                  modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                ) {
                  Text(text = if (meetup.isVirtual) "💻 Virtual Meetup" else "☕ In-Person Meetup", style = MaterialTheme.typography.labelSmall, fontWeight = FontWeight.Bold)
                }
              }

              Text(
                text = "${meetup.attendeeCount} sisters attending",
                style = MaterialTheme.typography.labelSmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
              )
            }

            Text(
              text = meetup.title,
              style = MaterialTheme.typography.titleMedium,
              fontWeight = FontWeight.Bold
            )

            Row(verticalAlignment = Alignment.CenterVertically) {
              Icon(Icons.Default.Schedule, contentDescription = null, tint = MaterialTheme.colorScheme.primary, modifier = Modifier.size(16.dp))
              Spacer(modifier = Modifier.width(6.dp))
              Text(text = meetup.dayTime, style = MaterialTheme.typography.bodySmall, fontWeight = FontWeight.Medium)
            }

            Row(verticalAlignment = Alignment.CenterVertically) {
              Icon(Icons.Default.Place, contentDescription = null, tint = MaterialTheme.colorScheme.primary, modifier = Modifier.size(16.dp))
              Spacer(modifier = Modifier.width(6.dp))
              Text(text = meetup.location, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
            }

            Text(
              text = meetup.description,
              style = MaterialTheme.typography.bodySmall,
              color = MaterialTheme.colorScheme.onSurface
            )

            Surface(
              shape = RoundedCornerShape(8.dp),
              color = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f)
            ) {
              Row(
                modifier = Modifier
                  .fillMaxWidth()
                  .padding(8.dp),
                verticalAlignment = Alignment.CenterVertically
              ) {
                Text(text = "✨ Vibe: ${meetup.vibe} • Hosted by ${meetup.hostName}", style = MaterialTheme.typography.labelSmall)
              }
            }

            Button(
              onClick = { onToggleRsvpMeetup(meetup.id) },
              colors = if (isRsvped) ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.secondary) else ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primary),
              shape = RoundedCornerShape(12.dp),
              modifier = Modifier
                .fillMaxWidth()
                .testTag("rsvp_meetup_btn_${meetup.id}")
            ) {
              Icon(
                if (isRsvped) Icons.Default.EventAvailable else Icons.Default.Event,
                contentDescription = null,
                modifier = Modifier.size(18.dp)
              )
              Spacer(modifier = Modifier.width(8.dp))
              Text(if (isRsvped) "RSVP Confirmed ✓ (Calendar Set)" else "RSVP for Meetup")
            }
          }
        }
      }
    }

    // Nearby Plotted Advice Centers Shortcut
    Card(
      shape = RoundedCornerShape(20.dp),
      colors = CardDefaults.cardColors(
        containerColor = MaterialTheme.colorScheme.secondaryContainer.copy(alpha = 0.5f)
      ),
      modifier = Modifier
        .fillMaxWidth()
        .clickable { onOpenMap() }
        .testTag("match_result_open_map_card")
    ) {
      Row(
        modifier = Modifier.padding(16.dp),
        verticalAlignment = Alignment.CenterVertically
      ) {
        Text(text = "🗺️", fontSize = 28.sp)
        Spacer(modifier = Modifier.width(14.dp))
        Column(modifier = Modifier.weight(1f)) {
          Text(
            text = "Need In-Person Walk-In Advice?",
            style = MaterialTheme.typography.titleSmall,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.onSecondaryContainer
          )
          Text(
            text = "Explore verified legal aid desks, career advice centers, perinatal clinics & sisterhood drop-ins on our Plotted Map.",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSecondaryContainer.copy(alpha = 0.9f)
          )
        }
        Icon(
          Icons.AutoMirrored.Filled.ArrowForward,
          contentDescription = null,
          tint = MaterialTheme.colorScheme.primary
        )
      }
    }

    // TIER 3: Counsellor & Specialist Solution
    TierSectionHeader(
      tierNumber = "Tier 3 Solution",
      title = "Licensed Counsellor / Specialist",
      subtitle = "Credentialed professionals specializing in this specific struggle"
    )

    Card(
      shape = RoundedCornerShape(20.dp),
      colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
      elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
      modifier = Modifier.fillMaxWidth()
    ) {
      Column(modifier = Modifier.padding(18.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
        Row(
          modifier = Modifier.fillMaxWidth(),
          horizontalArrangement = Arrangement.SpaceBetween,
          verticalAlignment = Alignment.CenterVertically
        ) {
          Text(
            text = result.tier3Specialist.name,
            style = MaterialTheme.typography.titleMedium,
            fontWeight = FontWeight.Bold
          )
          if (result.tier3Specialist.slidingScale) {
            Surface(
              shape = RoundedCornerShape(8.dp),
              color = MaterialTheme.colorScheme.tertiaryContainer
            ) {
              Text(
                text = "Sliding Scale Available",
                style = MaterialTheme.typography.labelSmall,
                color = MaterialTheme.colorScheme.onTertiaryContainer,
                modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
              )
            }
          }
        }

        Text(
          text = "${result.tier3Specialist.title} • ${result.tier3Specialist.credentials}",
          style = MaterialTheme.typography.bodySmall,
          fontWeight = FontWeight.SemiBold,
          color = MaterialTheme.colorScheme.primary
        )

        Text(
          text = "Clinical Focus: ${result.tier3Specialist.focus}",
          style = MaterialTheme.typography.bodySmall,
          color = MaterialTheme.colorScheme.onSurface
        )

        Surface(
          shape = RoundedCornerShape(10.dp),
          color = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f)
        ) {
          Text(
            text = result.tier3Specialist.bookingInfo,
            style = MaterialTheme.typography.labelSmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            modifier = Modifier.padding(10.dp)
          )
        }
      }
    }

    // Helpline Solution Card
    TierSectionHeader(
      tierNumber = "Direct Resource",
      title = "Mapped Helpline Number",
      subtitle = "Confidential, toll-free guidance available anytime"
    )

    Card(
      shape = RoundedCornerShape(20.dp),
      colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
      elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
      modifier = Modifier.fillMaxWidth()
    ) {
      Column(modifier = Modifier.padding(18.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        Row(
          modifier = Modifier.fillMaxWidth(),
          horizontalArrangement = Arrangement.SpaceBetween,
          verticalAlignment = Alignment.CenterVertically
        ) {
          Column {
            Text(
              text = result.helpline.name,
              style = MaterialTheme.typography.titleMedium,
              fontWeight = FontWeight.Bold
            )
            Text(
              text = result.helpline.hours,
              style = MaterialTheme.typography.labelSmall,
              color = MaterialTheme.colorScheme.primary,
              fontWeight = FontWeight.Medium
            )
          }
          Surface(
            shape = RoundedCornerShape(8.dp),
            color = MaterialTheme.colorScheme.primaryContainer
          ) {
            Text(
              text = result.helpline.number,
              style = MaterialTheme.typography.labelMedium,
              fontWeight = FontWeight.Bold,
              color = MaterialTheme.colorScheme.onPrimaryContainer,
              modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp)
            )
          }
        }

        Text(
          text = result.helpline.description,
          style = MaterialTheme.typography.bodySmall,
          color = MaterialTheme.colorScheme.onSurfaceVariant
        )

        Button(
          onClick = {
            val dialNumber = result.helpline.number.replace(Regex("[^0-9]"), "")
            val intent = Intent(Intent.ACTION_DIAL, Uri.parse("tel:$dialNumber"))
            context.startActivity(intent)
          },
          colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primary),
          modifier = Modifier.fillMaxWidth()
        ) {
          Icon(Icons.Default.Phone, contentDescription = null, modifier = Modifier.size(18.dp))
          Spacer(modifier = Modifier.width(8.dp))
          Text("Call Helpline (${result.helpline.number})")
        }
      }
    }

    // Mandatory Disclaimer Box
    DisclaimerCard()

    // 1-Page Report Action Button at bottom
    Button(
      onClick = { showReportDialog = true },
      modifier = Modifier
        .fillMaxWidth()
        .height(54.dp)
        .testTag("bottom_view_report_button"),
      shape = RoundedCornerShape(16.dp),
      colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.tertiary)
    ) {
      Icon(Icons.Default.Description, contentDescription = null, modifier = Modifier.size(20.dp))
      Spacer(modifier = Modifier.width(8.dp))
      Text(
        "Open 1-Page Care & Action Report",
        style = MaterialTheme.typography.titleSmall,
        fontWeight = FontWeight.Bold
      )
    }

    Spacer(modifier = Modifier.height(24.dp))
  }

  // One-Page Report Full Dialog
  if (showReportDialog) {
    OnePageReportDialog(
      result = result,
      onDismiss = { showReportDialog = false }
    )
  }
}

@Composable
fun DisclaimerCard(modifier: Modifier = Modifier) {
  Card(
    shape = RoundedCornerShape(18.dp),
    colors = CardDefaults.cardColors(
      containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.55f)
    ),
    modifier = modifier.fillMaxWidth()
  ) {
    Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
      Row(verticalAlignment = Alignment.CenterVertically) {
        Icon(
          Icons.Default.Info,
          contentDescription = null,
          tint = MaterialTheme.colorScheme.primary,
          modifier = Modifier.size(20.dp)
        )
        Spacer(modifier = Modifier.width(8.dp))
        Text(
          text = "Important Professional Disclaimer",
          style = MaterialTheme.typography.titleSmall,
          fontWeight = FontWeight.Bold,
          color = MaterialTheme.colorScheme.onSurface
        )
      }
      Text(
        text = "This care map and its recommendations are created solely for emotional validation, self-care grounding, and peer connection. They do NOT constitute medical, clinical, psychiatric, psychological, legal, or financial diagnosis, treatment, or advice. Always talk to a licensed medical doctor, certified therapist, lawyer, or credentialed expert before implementing major life, legal, medical, or treatment changes. If you are in immediate danger, experiencing domestic violence, or having thoughts of self-harm, please contact 988 or 1-800-799-7233 immediately.",
        style = MaterialTheme.typography.bodySmall,
        color = MaterialTheme.colorScheme.onSurfaceVariant,
        lineHeight = 18.sp
      )
    }
  }
}

@Composable
fun OnePageReportDialog(
  result: TieredMatchResult,
  onDismiss: () -> Unit
) {
  val context = LocalContext.current
  val reportDate = remember {
    SimpleDateFormat("MMMM dd, yyyy • hh:mm a", Locale.getDefault()).format(Date())
  }
  val reportText = remember(result, reportDate) {
    buildFormattedReportString(result, reportDate)
  }
  val scrollState = rememberScrollState()

  Dialog(
    onDismissRequest = onDismiss,
    properties = DialogProperties(usePlatformDefaultWidth = false)
  ) {
    Surface(
      modifier = Modifier
        .fillMaxSize()
        .padding(horizontal = 12.dp, vertical = 20.dp),
      shape = RoundedCornerShape(24.dp),
      color = MaterialTheme.colorScheme.surface,
      tonalElevation = 6.dp
    ) {
      Column(modifier = Modifier.fillMaxSize()) {
        // Modal Header Bar
        Row(
          modifier = Modifier
            .fillMaxWidth()
            .background(MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0.4f))
            .padding(horizontal = 18.dp, vertical = 14.dp),
          horizontalArrangement = Arrangement.SpaceBetween,
          verticalAlignment = Alignment.CenterVertically
        ) {
          Row(verticalAlignment = Alignment.CenterVertically) {
            Icon(
              Icons.Default.Description,
              contentDescription = null,
              tint = MaterialTheme.colorScheme.primary,
              modifier = Modifier.size(24.dp)
            )
            Spacer(modifier = Modifier.width(10.dp))
            Column {
              Text(
                text = "1-Page Care & Action Report",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold
              )
              Text(
                text = "Private On-Device Care Summary",
                style = MaterialTheme.typography.labelSmall,
                color = MaterialTheme.colorScheme.primary
              )
            }
          }
          IconButton(onClick = onDismiss) {
            Icon(Icons.Default.Close, contentDescription = "Close")
          }
        }

        // Printable Document Body
        Column(
          modifier = Modifier
            .weight(1f)
            .verticalScroll(scrollState)
            .padding(20.dp),
          verticalArrangement = Arrangement.spacedBy(18.dp)
        ) {
          // Document Header
          Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.Top
          ) {
            Column {
              Text(
                text = "SuperShaki",
                style = MaterialTheme.typography.headlineSmall,
                fontWeight = FontWeight.Black,
                color = MaterialTheme.colorScheme.primary
              )
              Text(
                text = "Feeling-First Women's Care & Matching",
                style = MaterialTheme.typography.labelSmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
              )
            }
            Surface(
              shape = RoundedCornerShape(8.dp),
              color = MaterialTheme.colorScheme.secondaryContainer
            ) {
              Text(
                text = "CONFIDENTIAL",
                style = MaterialTheme.typography.labelSmall,
                fontWeight = FontWeight.Bold,
                color = MaterialTheme.colorScheme.onSecondaryContainer,
                modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
              )
            }
          }

          Text(
            text = "Generated on: $reportDate",
            style = MaterialTheme.typography.labelSmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
          )

          HorizontalDivider()

          // 1. WHAT YOU DESCRIBED
          ReportSection(
            number = "1",
            title = "WHAT YOU DESCRIBED (INTAKE)"
          ) {
            Surface(
              shape = RoundedCornerShape(12.dp),
              color = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.4f),
              modifier = Modifier.fillMaxWidth()
            ) {
              Text(
                text = "“${result.userInput}”",
                style = MaterialTheme.typography.bodyMedium,
                fontStyle = androidx.compose.ui.text.font.FontStyle.Italic,
                modifier = Modifier.padding(14.dp)
              )
            }
          }

          // 2. EMOTIONAL & CONTEXT ANALYSIS
          ReportSection(
            number = "2",
            title = "EMOTIONAL & CONTEXT ANALYSIS"
          ) {
            Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
              Text(
                text = "Primary Transition Domain: ${result.packageEmoji} ${result.packageTitle}",
                style = MaterialTheme.typography.bodyMedium,
                fontWeight = FontWeight.SemiBold,
                color = MaterialTheme.colorScheme.primary
              )

              Text(
                text = "Interpreted Overlapping Needs:",
                style = MaterialTheme.typography.labelMedium,
                fontWeight = FontWeight.Bold
              )

              result.detectedNeeds.forEach { need ->
                Text(
                  text = "  • $need",
                  style = MaterialTheme.typography.bodyMedium
                )
              }

              Spacer(modifier = Modifier.height(4.dp))
              Text(
                text = "Root Empathy & Understanding:",
                style = MaterialTheme.typography.labelMedium,
                fontWeight = FontWeight.Bold
              )
              Text(
                text = result.empathySummary,
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurface
              )

              if (result.escalationNotice != null) {
                Surface(
                  shape = RoundedCornerShape(10.dp),
                  color = MaterialTheme.colorScheme.errorContainer.copy(alpha = 0.5f),
                  modifier = Modifier.fillMaxWidth()
                ) {
                  Column(modifier = Modifier.padding(12.dp)) {
                    Text(
                      text = "Safety & Escalation Evaluation:",
                      style = MaterialTheme.typography.labelSmall,
                      fontWeight = FontWeight.Bold,
                      color = MaterialTheme.colorScheme.error
                    )
                    Text(
                      text = result.escalationNotice,
                      style = MaterialTheme.typography.bodySmall,
                      color = MaterialTheme.colorScheme.onErrorContainer
                    )
                  }
                }
              }
            }
          }

          // 3. SOLUTIONS & ACTION PLAN GIVEN
          ReportSection(
            number = "3",
            title = "SOLUTIONS & ACTION PLAN GIVEN"
          ) {
            Column(verticalArrangement = Arrangement.spacedBy(14.dp)) {
              // Tier 1 Self-Care
              Surface(
                shape = RoundedCornerShape(12.dp),
                color = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.35f),
                modifier = Modifier.fillMaxWidth()
              ) {
                Column(modifier = Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                  Text(
                    text = "Tier 1: Immediate Self-Care Action (${result.tier1SelfHelp.durationMinutes} min)",
                    style = MaterialTheme.typography.labelMedium,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.primary
                  )
                  Text(
                    text = "${result.tier1SelfHelp.title} (${result.tier1SelfHelp.category})",
                    style = MaterialTheme.typography.bodyMedium,
                    fontWeight = FontWeight.SemiBold
                  )
                  result.tier1SelfHelp.instructions.forEachIndexed { idx, step ->
                    Text(
                      text = "  ${idx + 1}. $step",
                      style = MaterialTheme.typography.bodySmall
                    )
                  }
                  result.tier1SelfHelp.scriptContent?.let { script ->
                    Text(
                      text = "  Script: “$script”",
                      style = MaterialTheme.typography.bodySmall,
                      fontStyle = androidx.compose.ui.text.font.FontStyle.Italic
                    )
                  }
                }
              }

              // Tier 2 Peer Ally & Community
              Surface(
                shape = RoundedCornerShape(12.dp),
                color = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.35f),
                modifier = Modifier.fillMaxWidth()
              ) {
                Column(modifier = Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                  Text(
                    text = "Tier 2: Peer Mentorship & Community Circle",
                    style = MaterialTheme.typography.labelMedium,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.primary
                  )
                  Text(
                    text = "Mentor: ${result.tier2Buddy.name}, Age ${result.tier2Buddy.age}",
                    style = MaterialTheme.typography.bodyMedium,
                    fontWeight = FontWeight.SemiBold
                  )
                  Text(
                    text = "Mentor Lived Experience: ${result.tier2Buddy.story}",
                    style = MaterialTheme.typography.bodySmall
                  )
                  Text(
                    text = "Icebreaker: “${result.tier2Buddy.warmIntroIcebreaker}”",
                    style = MaterialTheme.typography.bodySmall,
                    fontStyle = androidx.compose.ui.text.font.FontStyle.Italic
                  )
                  Text(
                    text = "Community: ${result.tier2Community.name} (${result.tier2Community.memberCount} members)",
                    style = MaterialTheme.typography.bodySmall,
                    fontWeight = FontWeight.Medium
                  )
                  if (result.girlsGroups.isNotEmpty()) {
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                      text = "Girls Groups in Solution:",
                      style = MaterialTheme.typography.labelSmall,
                      fontWeight = FontWeight.Bold,
                      color = MaterialTheme.colorScheme.primary
                    )
                    result.girlsGroups.forEach { gg ->
                      Text(
                        text = "• ${gg.name} (${gg.meetingFrequency}): ${gg.tagLine}",
                        style = MaterialTheme.typography.bodySmall
                      )
                    }
                  }
                  if (result.meetups.isNotEmpty()) {
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                      text = "Meetups in Solution:",
                      style = MaterialTheme.typography.labelSmall,
                      fontWeight = FontWeight.Bold,
                      color = MaterialTheme.colorScheme.primary
                    )
                    result.meetups.forEach { m ->
                      Text(
                        text = "• ${m.title} (${m.dayTime} at ${m.location}): ${m.description}",
                        style = MaterialTheme.typography.bodySmall
                      )
                    }
                  }
                }
              }

              // Tier 3 Counsellor
              Surface(
                shape = RoundedCornerShape(12.dp),
                color = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.35f),
                modifier = Modifier.fillMaxWidth()
              ) {
                Column(modifier = Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                  Text(
                    text = "Tier 3: Licensed Specialist / Counsellor",
                    style = MaterialTheme.typography.labelMedium,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.primary
                  )
                  Text(
                    text = "${result.tier3Specialist.name} • ${result.tier3Specialist.title} (${result.tier3Specialist.credentials})",
                    style = MaterialTheme.typography.bodyMedium,
                    fontWeight = FontWeight.SemiBold
                  )
                  Text(
                    text = "Focus: ${result.tier3Specialist.focus}",
                    style = MaterialTheme.typography.bodySmall
                  )
                  Text(
                    text = result.tier3Specialist.bookingInfo,
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                  )
                }
              }

              // Helpline
              Surface(
                shape = RoundedCornerShape(12.dp),
                color = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.35f),
                modifier = Modifier.fillMaxWidth()
              ) {
                Column(modifier = Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                  Text(
                    text = "Direct Helpline Support",
                    style = MaterialTheme.typography.labelMedium,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.primary
                  )
                  Text(
                    text = "${result.helpline.name}: ${result.helpline.number} (${result.helpline.hours})",
                    style = MaterialTheme.typography.bodyMedium,
                    fontWeight = FontWeight.SemiBold
                  )
                  Text(
                    text = result.helpline.description,
                    style = MaterialTheme.typography.bodySmall
                  )
                }
              }
            }
          }

          // 4. MANDATORY DISCLAIMER
          ReportSection(
            number = "4",
            title = "MANDATORY PROFESSIONAL DISCLAIMER"
          ) {
            Surface(
              shape = RoundedCornerShape(12.dp),
              color = MaterialTheme.colorScheme.errorContainer.copy(alpha = 0.45f),
              border = androidx.compose.foundation.BorderStroke(1.dp, MaterialTheme.colorScheme.error.copy(alpha = 0.4f)),
              modifier = Modifier.fillMaxWidth()
            ) {
              Column(modifier = Modifier.padding(14.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                Text(
                  text = "PLEASE READ BEFORE IMPLEMENTING ANY ADVICE:",
                  style = MaterialTheme.typography.labelSmall,
                  fontWeight = FontWeight.Bold,
                  color = MaterialTheme.colorScheme.onErrorContainer
                )
                Text(
                  text = "This Care & Action Report is prepared solely for personal reflection, emotional validation, self-care grounding, and peer connection. It does NOT constitute medical, psychological, psychiatric, legal, or financial diagnosis, treatment, or professional advice. Always talk to a licensed medical doctor, certified psychologist/therapist, attorney, or financial expert before implementing major life, legal, medical, or psychological changes. If you are experiencing domestic abuse, acute crisis, or thoughts of self-harm, please dial 988 or 1-800-799-7233 immediately.",
                  style = MaterialTheme.typography.bodySmall,
                  color = MaterialTheme.colorScheme.onErrorContainer,
                  lineHeight = 18.sp
                )
              }
            }
          }
        }

        // Action Toolbar
        HorizontalDivider()
        Row(
          modifier = Modifier
            .fillMaxWidth()
            .padding(14.dp),
          horizontalArrangement = Arrangement.spacedBy(10.dp)
        ) {
          OutlinedButton(
            onClick = {
              val clipboard = context.getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
              val clip = ClipData.newPlainText("SuperShaki Report", reportText)
              clipboard.setPrimaryClip(clip)
              Toast.makeText(context, "Report copied to clipboard", Toast.LENGTH_SHORT).show()
            },
            modifier = Modifier.weight(1f),
            shape = RoundedCornerShape(12.dp)
          ) {
            Icon(Icons.Default.ContentCopy, contentDescription = null, modifier = Modifier.size(16.dp))
            Spacer(modifier = Modifier.width(6.dp))
            Text("Copy", maxLines = 1)
          }

          OutlinedButton(
            onClick = {
              val shareIntent = Intent(Intent.ACTION_SEND).apply {
                type = "text/plain"
                putExtra(Intent.EXTRA_SUBJECT, "SuperShaki Care & Action Plan Report")
                putExtra(Intent.EXTRA_TEXT, reportText)
              }
              context.startActivity(Intent.createChooser(shareIntent, "Share Care Report"))
            },
            modifier = Modifier.weight(1f),
            shape = RoundedCornerShape(12.dp)
          ) {
            Icon(Icons.Default.Share, contentDescription = null, modifier = Modifier.size(16.dp))
            Spacer(modifier = Modifier.width(6.dp))
            Text("Share", maxLines = 1)
          }

          Button(
            onClick = onDismiss,
            modifier = Modifier.weight(1.1f),
            shape = RoundedCornerShape(12.dp),
            colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primary)
          ) {
            Text("Done")
          }
        }
      }
    }
  }
}

@Composable
fun ReportSection(
  number: String,
  title: String,
  content: @Composable () -> Unit
) {
  Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
    Row(verticalAlignment = Alignment.CenterVertically) {
      Surface(
        shape = CircleShape,
        color = MaterialTheme.colorScheme.primary,
        modifier = Modifier.size(22.dp)
      ) {
        Box(contentAlignment = Alignment.Center) {
          Text(
            text = number,
            style = MaterialTheme.typography.labelSmall,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.onPrimary
          )
        }
      }
      Spacer(modifier = Modifier.width(8.dp))
      Text(
        text = title,
        style = MaterialTheme.typography.titleSmall,
        fontWeight = FontWeight.Bold,
        color = MaterialTheme.colorScheme.onSurface
      )
    }
    content()
  }
}

fun buildFormattedReportString(result: TieredMatchResult, dateString: String): String {
  val instructions = result.tier1SelfHelp.instructions.mapIndexed { idx, it -> "${idx + 1}. $it" }.joinToString("\n")
  return """
======================================================
SUPERSHAKI CARE & ACTION PLAN REPORT
Confidential On-Device Personal Summary
Generated: $dateString
======================================================

1. WHAT YOU DESCRIBED (INTAKE):
“${result.userInput}”

2. EMOTIONAL & CONTEXT ANALYSIS:
• Primary Domain: ${result.packageEmoji} ${result.packageTitle}
• Interpreted Needs:
  ${result.detectedNeeds.joinToString("\n  ") { "• $it" }}
• Empathy & Understanding:
  ${result.empathySummary}
${result.escalationNotice?.let { "\n• Safety & Escalation Notice:\n  $it\n" } ?: ""}

3. SOLUTIONS & ACTION PLAN GIVEN:
[Tier 1: Immediate Self-Care Action]
• Tool: ${result.tier1SelfHelp.title} (${result.tier1SelfHelp.durationMinutes} min)
• Practice Steps:
$instructions
${result.tier1SelfHelp.scriptContent?.let { "• Guided Script: \"$it\"" } ?: ""}

[Tier 2: Peer Mentorship & Community]
• Mentor Ally: ${result.tier2Buddy.name}, Age ${result.tier2Buddy.age}
• Mentor Background: ${result.tier2Buddy.story}
• Ready-to-Send Intro: "${result.tier2Buddy.warmIntroIcebreaker}"
• Community Circle: ${result.tier2Community.name} (${result.tier2Community.memberCount} members)
• Active Circle Prompt: "${result.tier2Community.activeTopic}"
${if (result.girlsGroups.isNotEmpty()) "• Dedicated Girls Groups in Solution:\n" + result.girlsGroups.joinToString("\n") { "    - ${it.name} (${it.meetingFrequency}): ${it.tagLine} [Focus: ${it.focusArea}]" } else ""}
${if (result.meetups.isNotEmpty()) "• Local & Virtual Meetups in Solution:\n" + result.meetups.joinToString("\n") { "    - ${it.title} (${it.dayTime} at ${it.location}) [Vibe: ${it.vibe}]" } else ""}

[Tier 3: Licensed Counsellor / Specialist]
• Counselor: ${result.tier3Specialist.name}
• Credentials: ${result.tier3Specialist.title} (${result.tier3Specialist.credentials})
• Focus: ${result.tier3Specialist.focus}
• Consultation & Sliding Scale: ${result.tier3Specialist.bookingInfo}

[Direct Helpline Support]
• Helpline: ${result.helpline.name}
• Contact: ${result.helpline.number} (${result.helpline.hours})
• Details: ${result.helpline.description}

======================================================
4. MANDATORY PROFESSIONAL DISCLAIMER:
This Care & Action Report is prepared solely for personal reflection, emotional validation, and peer support options. It does NOT constitute medical, clinical, psychiatric, legal, or financial diagnosis, treatment, or professional advice. Always talk to a licensed medical doctor, certified therapist, lawyer, or credentialed expert before implementing major life, medical, legal, or psychological changes. If you are in immediate danger or experiencing domestic violence, please contact 988 or 1-800-799-7233 immediately.
======================================================
""".trimIndent()
}

@Composable
fun TierSectionHeader(
  tierNumber: String,
  title: String,
  subtitle: String,
  modifier: Modifier = Modifier
) {
  Column(modifier = modifier.fillMaxWidth()) {
    Surface(
      shape = RoundedCornerShape(6.dp),
      color = MaterialTheme.colorScheme.primaryContainer
    ) {
      Text(
        text = tierNumber.uppercase(),
        style = MaterialTheme.typography.labelSmall,
        fontWeight = FontWeight.Bold,
        color = MaterialTheme.colorScheme.onPrimaryContainer,
        modifier = Modifier.padding(horizontal = 8.dp, vertical = 2.dp)
      )
    }
    Spacer(modifier = Modifier.height(4.dp))
    Text(
      text = title,
      style = MaterialTheme.typography.titleMedium,
      fontWeight = FontWeight.Bold
    )
    Text(
      text = subtitle,
      style = MaterialTheme.typography.bodySmall,
      color = MaterialTheme.colorScheme.onSurfaceVariant
    )
  }
}

