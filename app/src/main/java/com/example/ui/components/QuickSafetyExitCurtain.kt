package com.example.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.WbSunny
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.unit.dp

@Composable
fun QuickSafetyExitCurtain(
  onReturn: () -> Unit,
  modifier: Modifier = Modifier
) {
  Box(
    modifier = modifier
      .fillMaxSize()
      .background(Color(0xFFF0F4F8))
      .padding(32.dp),
    contentAlignment = Alignment.Center
  ) {
    Column(
      horizontalAlignment = Alignment.CenterHorizontally,
      verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
      Icon(
        imageVector = Icons.Default.WbSunny,
        contentDescription = "Weather Icon",
        modifier = Modifier.size(64.dp),
        tint = Color(0xFFF59E0B)
      )
      Text(
        text = "Sunny & Mild • 72°F",
        style = MaterialTheme.typography.headlineSmall,
        color = Color(0xFF1E293B)
      )
      Text(
        text = "Next rain chance Thursday afternoon.\nLight breeze from the west at 6 mph.",
        style = MaterialTheme.typography.bodyMedium,
        color = Color(0xFF64748B)
      )

      Spacer(modifier = Modifier.height(48.dp))

      Button(
        onClick = onReturn,
        colors = ButtonDefaults.buttonColors(
          containerColor = Color(0xFFE2E8F0),
          contentColor = Color(0xFF475569)
        ),
        modifier = Modifier.testTag("resume_app_button")
      ) {
        Icon(
          imageVector = Icons.Default.Lock,
          contentDescription = "Resume App",
          modifier = Modifier.size(16.dp)
        )
        Spacer(modifier = Modifier.width(8.dp))
        Text("Resume SuperShaki")
      }
    }
  }
}
