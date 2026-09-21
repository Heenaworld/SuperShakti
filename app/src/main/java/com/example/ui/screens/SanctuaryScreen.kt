package com.example.ui.screens

import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.widget.Toast
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.data.local.BuddyConnectionEntity
import com.example.data.local.MatchHistoryEntity
import com.example.data.local.SavedToolEntity
import com.example.data.model.MicroTool
import com.example.data.model.ToolType
import java.text.SimpleDateFormat
import java.util.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SanctuaryScreen(
  savedTools: List<SavedToolEntity>,
  connectedBuddies: List<BuddyConnectionEntity>,
  history: List<MatchHistoryEntity>,
  onOpenTool: (MicroTool) -> Unit,
  onReopenHistory: (String) -> Unit,
  onDeleteHistory: (Long) -> Unit,
  onDisconnectBuddy: (String) -> Unit,
  modifier: Modifier = Modifier
) {
  val context = LocalContext.current
  var selectedTab by remember { mutableStateOf(0) }
  val tabs = listOf("Saved Tools", "My Buddies", "Care History")

  Column(
    modifier = modifier
      .fillMaxSize()
      .padding(horizontal = 20.dp, vertical = 12.dp),
    verticalArrangement = Arrangement.spacedBy(16.dp)
  ) {
    Column {
      Text(
        text = "My Sanctuary",
        style = MaterialTheme.typography.headlineMedium,
        fontWeight = FontWeight.Bold,
        color = MaterialTheme.colorScheme.onSurface
      )
      Text(
        text = "Your private care space. Stored securely and privately on your device.",
        style = MaterialTheme.typography.bodyMedium,
        color = MaterialTheme.colorScheme.onSurfaceVariant
      )
    }

    // Tab Row
    PrimaryTabRow(
      selectedTabIndex = selectedTab,
      containerColor = MaterialTheme.colorScheme.surface,
      modifier = Modifier.fillMaxWidth()
    ) {
      tabs.forEachIndexed { index, title ->
        Tab(
          selected = selectedTab == index,
          onClick = { selectedTab = index },
          text = {
            Text(
              text = title,
              fontWeight = if (selectedTab == index) FontWeight.Bold else FontWeight.Normal
            )
          }
        )
      }
    }

    when (selectedTab) {
      0 -> {
        // Saved Tools
        if (savedTools.isEmpty()) {
          EmptySanctuaryView(
            icon = Icons.Default.BookmarkBorder,
            title = "No saved tools yet",
            subtitle = "When you view breathing exercises, grounding tools, or communication scripts, tap the bookmark icon to save them here."
          )
        } else {
          LazyColumn(
            verticalArrangement = Arrangement.spacedBy(12.dp),
            modifier = Modifier.fillMaxSize()
          ) {
            items(savedTools) { tool ->
              Card(
                shape = RoundedCornerShape(18.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
                modifier = Modifier.fillMaxWidth()
              ) {
                Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
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
                        text = tool.category,
                        style = MaterialTheme.typography.labelSmall,
                        color = MaterialTheme.colorScheme.onPrimaryContainer,
                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                      )
                    }
                    Text(
                      text = tool.type,
                      style = MaterialTheme.typography.labelSmall,
                      color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                  }

                  Text(
                    text = tool.title,
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold
                  )
                  Text(
                    text = tool.description,
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                  )

                  if (tool.scriptContent != null) {
                    Surface(
                      shape = RoundedCornerShape(10.dp),
                      color = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f)
                    ) {
                      Row(
                        modifier = Modifier
                          .fillMaxWidth()
                          .padding(10.dp),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.SpaceBetween
                      ) {
                        Text(
                          text = "“${tool.scriptContent}”",
                          style = MaterialTheme.typography.bodySmall,
                          modifier = Modifier.weight(1f)
                        )
                        IconButton(
                          onClick = {
                            val cb = context.getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
                            cb.setPrimaryClip(ClipData.newPlainText("Script", tool.scriptContent))
                            Toast.makeText(context, "Script copied!", Toast.LENGTH_SHORT).show()
                          }
                        ) {
                          Icon(Icons.Default.ContentCopy, contentDescription = "Copy")
                        }
                      }
                    }
                  }

                  Button(
                    onClick = {
                      val toolTypeEnum = try {
                        ToolType.valueOf(tool.type)
                      } catch (e: Exception) {
                        ToolType.REFLECTION
                      }
                      onOpenTool(
                        MicroTool(
                          id = tool.id,
                          title = tool.title,
                          category = tool.category,
                          type = toolTypeEnum,
                          description = tool.description,
                          instructions = emptyList(),
                          scriptContent = tool.scriptContent
                        )
                      )
                    },
                    modifier = Modifier.fillMaxWidth()
                  ) {
                    Text("Practice Exercise")
                  }
                }
              }
            }
          }
        }
      }

      1 -> {
        // Connected Buddies
        if (connectedBuddies.isEmpty()) {
          EmptySanctuaryView(
            icon = Icons.Default.PeopleOutline,
            title = "No buddy connections yet",
            subtitle = "When you connect with a peer companion, your warm introductions and ongoing support circles will appear here so you never show up alone."
          )
        } else {
          LazyColumn(
            verticalArrangement = Arrangement.spacedBy(12.dp),
            modifier = Modifier.fillMaxSize()
          ) {
            items(connectedBuddies) { buddy ->
              Card(
                shape = RoundedCornerShape(18.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
                modifier = Modifier.fillMaxWidth()
              ) {
                Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                  Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                  ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                      Box(
                        modifier = Modifier
                          .size(46.dp)
                          .background(MaterialTheme.colorScheme.primary, CircleShape),
                        contentAlignment = Alignment.Center
                      ) {
                        Text(
                          text = buddy.avatarInitials,
                          style = MaterialTheme.typography.titleSmall,
                          fontWeight = FontWeight.Bold,
                          color = MaterialTheme.colorScheme.onPrimary
                        )
                      }
                      Spacer(modifier = Modifier.width(12.dp))
                      Column {
                        Text(
                          text = buddy.name,
                          style = MaterialTheme.typography.titleMedium,
                          fontWeight = FontWeight.Bold
                        )
                        Text(
                          text = buddy.status,
                          style = MaterialTheme.typography.labelSmall,
                          color = MaterialTheme.colorScheme.primary
                        )
                      }
                    }

                    IconButton(onClick = { onDisconnectBuddy(buddy.id) }) {
                      Icon(Icons.Default.DeleteOutline, contentDescription = "Remove Connection")
                    }
                  }

                  Text(
                    text = buddy.story,
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                  )

                  Surface(
                    shape = RoundedCornerShape(10.dp),
                    color = MaterialTheme.colorScheme.secondaryContainer.copy(alpha = 0.5f)
                  ) {
                    Column(modifier = Modifier.padding(10.dp)) {
                      Text(
                        text = "Your Introduction:",
                        style = MaterialTheme.typography.labelSmall,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.onSecondaryContainer
                      )
                      Spacer(modifier = Modifier.height(4.dp))
                      Text(
                        text = buddy.introMessage,
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSecondaryContainer
                      )
                    }
                  }
                }
              }
            }
          }
        }
      }

      2 -> {
        // Care History
        if (history.isEmpty()) {
          EmptySanctuaryView(
            icon = Icons.Default.History,
            title = "No feeling matches recorded",
            subtitle = "Your previous check-ins and tiered support maps will be saved here so you can revisit them anytime."
          )
        } else {
          val dateFormat = SimpleDateFormat("MMM d, yyyy • h:mm a", Locale.getDefault())
          LazyColumn(
            verticalArrangement = Arrangement.spacedBy(12.dp),
            modifier = Modifier.fillMaxSize()
          ) {
            items(history) { item ->
              Card(
                shape = RoundedCornerShape(18.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
                modifier = Modifier.fillMaxWidth()
              ) {
                Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                  Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                  ) {
                    Text(
                      text = dateFormat.format(Date(item.timestamp)),
                      style = MaterialTheme.typography.labelSmall,
                      color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                    IconButton(onClick = { onDeleteHistory(item.id) }) {
                      Icon(Icons.Default.Close, contentDescription = "Delete", modifier = Modifier.size(16.dp))
                    }
                  }

                  Text(
                    text = "“${item.userInput}”",
                    style = MaterialTheme.typography.bodyMedium,
                    fontWeight = FontWeight.Medium
                  )

                  Text(
                    text = "Needs: ${item.detectedNeeds}",
                    style = MaterialTheme.typography.labelSmall,
                    color = MaterialTheme.colorScheme.primary
                  )

                  Text(
                    text = item.empathySummary,
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                  )

                  FilledTonalButton(
                    onClick = { onReopenHistory(item.userInput) },
                    modifier = Modifier.fillMaxWidth()
                  ) {
                    Text("Re-visit Support Map")
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

@Composable
fun EmptySanctuaryView(
  icon: androidx.compose.ui.graphics.vector.ImageVector,
  title: String,
  subtitle: String
) {
  Column(
    modifier = Modifier
      .fillMaxWidth()
      .padding(32.dp),
    horizontalAlignment = Alignment.CenterHorizontally,
    verticalArrangement = Arrangement.Center
  ) {
    Icon(
      imageVector = icon,
      contentDescription = null,
      modifier = Modifier.size(56.dp),
      tint = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.5f)
    )
    Spacer(modifier = Modifier.height(16.dp))
    Text(
      text = title,
      style = MaterialTheme.typography.titleMedium,
      fontWeight = FontWeight.Bold
    )
    Spacer(modifier = Modifier.height(6.dp))
    Text(
      text = subtitle,
      style = MaterialTheme.typography.bodyMedium,
      color = MaterialTheme.colorScheme.onSurfaceVariant,
      textAlign = androidx.compose.ui.text.style.TextAlign.Center
    )
  }
}
