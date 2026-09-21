package com.example.ui.components

import androidx.compose.animation.core.*
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AutoAwesome
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.scale
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.R

@Composable
fun ShaktiAvatarIcon(
  modifier: Modifier = Modifier,
  size: Dp = 38.dp,
  onClick: (() -> Unit)? = null
) {
  val infiniteTransition = rememberInfiniteTransition(label = "pulse")
  val pulseScale by infiniteTransition.animateFloat(
    initialValue = 1f,
    targetValue = 1.05f,
    animationSpec = infiniteRepeatable(
      animation = tween(2000, easing = FastOutSlowInEasing),
      repeatMode = RepeatMode.Reverse
    ),
    label = "scale"
  )

  Box(
    contentAlignment = Alignment.Center,
    modifier = modifier
      .size(size)
      .let { if (onClick != null) it.clickable(onClick = onClick) else it }
  ) {
    // Glowing golden halo
    Box(
      modifier = Modifier
        .size(size)
        .scale(pulseScale)
        .clip(CircleShape)
        .background(
          Brush.radialGradient(
            colors = listOf(Color(0xFFFFB800).copy(alpha = 0.6f), Color.Transparent)
          )
        )
    )

    // Avatar image
    Image(
      painter = painterResource(id = R.drawable.img_shakti_avatar),
      contentDescription = "Shakti Avatar Guide",
      contentScale = ContentScale.Crop,
      modifier = Modifier
        .size(size - 4.dp)
        .clip(CircleShape)
        .border(1.5.dp, Color(0xFFFFD56B), CircleShape)
        .testTag("shakti_avatar_icon")
    )
  }
}

@Composable
fun ShaktiAvatarHeroCard(
  onOpenFeedback: () -> Unit = {},
  modifier: Modifier = Modifier
) {
  var showWisdomDialog by remember { mutableStateOf(false) }

  Card(
    shape = RoundedCornerShape(22.dp),
    colors = CardDefaults.cardColors(
      containerColor = Color(0xFFFFF7ED) // Warm luminous apricot-ivory
    ),
    elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
    modifier = modifier
      .fillMaxWidth()
      .border(1.dp, Color(0xFFFFD7B2), RoundedCornerShape(22.dp))
      .testTag("shakti_avatar_hero_card")
  ) {
    Row(
      modifier = Modifier
        .fillMaxWidth()
        .padding(16.dp),
      verticalAlignment = Alignment.CenterVertically
    ) {
      // Large Avatar with golden border
      Box(
        contentAlignment = Alignment.Center,
        modifier = Modifier
          .size(80.dp)
          .clickable { showWisdomDialog = true }
      ) {
        // Subtle outer aura
        Box(
          modifier = Modifier
            .size(80.dp)
            .clip(CircleShape)
            .background(
              Brush.radialGradient(
                colors = listOf(Color(0xFFFFB300).copy(alpha = 0.35f), Color.Transparent)
              )
            )
        )

        Image(
          painter = painterResource(id = R.drawable.img_shakti_avatar),
          contentDescription = "Shakti Guide",
          contentScale = ContentScale.Crop,
          modifier = Modifier
            .size(72.dp)
            .clip(CircleShape)
            .border(2.5.dp, Color(0xFFFFC043), CircleShape)
            .shadow(6.dp, CircleShape)
            .testTag("shakti_avatar_hero_image")
        )
      }

      Spacer(modifier = Modifier.width(16.dp))

      Column(modifier = Modifier.weight(1f)) {
        Row(verticalAlignment = Alignment.CenterVertically) {
          Surface(
            shape = RoundedCornerShape(8.dp),
            color = Color(0xFFFFE2C6)
          ) {
            Row(
              verticalAlignment = Alignment.CenterVertically,
              modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
            ) {
              Icon(
                Icons.Default.AutoAwesome,
                contentDescription = null,
                tint = Color(0xFFB54924),
                modifier = Modifier.size(12.dp)
              )
              Spacer(modifier = Modifier.width(4.dp))
              Text(
                text = "YOUR SANCTUARY GUIDE",
                style = MaterialTheme.typography.labelSmall,
                fontWeight = FontWeight.Bold,
                fontSize = 10.sp,
                color = Color(0xFF7A2A0C)
              )
            }
          }
        }

        Spacer(modifier = Modifier.height(4.dp))

        Text(
          text = "I am Shakti. You are held here.",
          style = MaterialTheme.typography.titleMedium,
          fontWeight = FontWeight.Bold,
          color = Color(0xFF3B1E13)
        )

        Text(
          text = "Every feeling you carry is valid. Tap to discover sisterhood meetups, mentors & advice.",
          style = MaterialTheme.typography.bodySmall,
          color = Color(0xFF6B483B)
        )
      }
    }
  }

  if (showWisdomDialog) {
    AlertDialog(
      onDismissRequest = { showWisdomDialog = false },
      confirmButton = {
        TextButton(onClick = { showWisdomDialog = false }) {
          Text("Receive with Grace", fontWeight = FontWeight.Bold)
        }
      },
      title = {
        Row(verticalAlignment = Alignment.CenterVertically) {
          ShaktiAvatarIcon(size = 32.dp)
          Spacer(modifier = Modifier.width(8.dp))
          Text("A Word from Shakti", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
        }
      },
      text = {
        Text(
          text = "“No matter how heavy the world feels right now, your inner light cannot be extinguished. In our sanctuary, you don't have to carry it all by yourself. We connect you with sisters who have walked your path.”",
          style = MaterialTheme.typography.bodyMedium,
          lineHeight = 22.sp
        )
      }
    )
  }
}
