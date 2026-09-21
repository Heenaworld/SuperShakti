package com.example.ui.screens

import android.content.Intent
import android.net.Uri
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.slideInVertically
import androidx.compose.animation.slideOutVertically
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.gestures.detectTapGestures
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material.icons.outlined.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.geometry.CornerRadius
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.model.AdviceCategory
import com.example.data.model.AdvicePlace
import com.example.data.model.AdvicePlacesCatalog
import com.example.data.model.SupportPackage
import kotlin.math.pow
import kotlin.math.sqrt

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AdviceMapScreen(
  onBack: () -> Unit = {},
  onSelectPackage: ((SupportPackage) -> Unit)? = null,
  modifier: Modifier = Modifier
) {
  val context = LocalContext.current
  var searchQuery by remember { mutableStateOf("") }
  var selectedCategory by remember { mutableStateOf<AdviceCategory?>(null) }
  var selectedPlace by remember { mutableStateOf<AdvicePlace?>(AdvicePlacesCatalog.places.first()) }
  var isPlottedMapView by remember { mutableStateOf(true) }

  val filteredPlaces = remember(searchQuery, selectedCategory) {
    AdvicePlacesCatalog.places.filter { place ->
      val matchesCategory = selectedCategory == null || place.category == selectedCategory
      val matchesSearch = searchQuery.isBlank() ||
          place.name.contains(searchQuery, ignoreCase = true) ||
          place.adviceType.contains(searchQuery, ignoreCase = true) ||
          place.keyAdviceOffered.any { it.contains(searchQuery, ignoreCase = true) }
      matchesCategory && matchesSearch
    }
  }

  Column(
    modifier = modifier
      .fillMaxSize()
      .background(MaterialTheme.colorScheme.background)
  ) {
    // Header
    Surface(
      color = MaterialTheme.colorScheme.surface,
      tonalElevation = 2.dp,
      modifier = Modifier.fillMaxWidth()
    ) {
      Column(modifier = Modifier.padding(horizontal = 16.dp, vertical = 12.dp)) {
        Row(
          modifier = Modifier.fillMaxWidth(),
          verticalAlignment = Alignment.CenterVertically,
          horizontalArrangement = Arrangement.SpaceBetween
        ) {
          Row(verticalAlignment = Alignment.CenterVertically) {
            Text(text = "🗺️", fontSize = 24.sp)
            Spacer(modifier = Modifier.width(8.dp))
            Column {
              Text(
                text = "Plotted Advice Map",
                style = MaterialTheme.typography.titleLarge,
                fontWeight = FontWeight.Bold,
                color = MaterialTheme.colorScheme.onSurface
              )
              Text(
                text = "Safe centers for guidance, legal aid & support",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
              )
            }
          }

          // Toggle View
          Row(
            modifier = Modifier
              .clip(RoundedCornerShape(20.dp))
              .background(MaterialTheme.colorScheme.surfaceVariant)
              .padding(4.dp)
          ) {
            Surface(
              shape = RoundedCornerShape(16.dp),
              color = if (isPlottedMapView) MaterialTheme.colorScheme.primary else Color.Transparent,
              modifier = Modifier
                .clickable { isPlottedMapView = true }
                .padding(horizontal = 10.dp, vertical = 4.dp)
            ) {
              Text(
                text = "Map",
                style = MaterialTheme.typography.labelMedium,
                fontWeight = FontWeight.Bold,
                color = if (isPlottedMapView) MaterialTheme.colorScheme.onPrimary else MaterialTheme.colorScheme.onSurfaceVariant
              )
            }
            Surface(
              shape = RoundedCornerShape(16.dp),
              color = if (!isPlottedMapView) MaterialTheme.colorScheme.primary else Color.Transparent,
              modifier = Modifier
                .clickable { isPlottedMapView = false }
                .padding(horizontal = 10.dp, vertical = 4.dp)
            ) {
              Text(
                text = "List",
                style = MaterialTheme.typography.labelMedium,
                fontWeight = FontWeight.Bold,
                color = if (!isPlottedMapView) MaterialTheme.colorScheme.onPrimary else MaterialTheme.colorScheme.onSurfaceVariant
              )
            }
          }
        }

        Spacer(modifier = Modifier.height(10.dp))

        // Search Field
        OutlinedTextField(
          value = searchQuery,
          onValueChange = { searchQuery = it },
          placeholder = { Text("Search advice by topic (e.g. divorce, career, mental health)...") },
          leadingIcon = { Icon(Icons.Default.Search, contentDescription = "Search") },
          trailingIcon = {
            if (searchQuery.isNotEmpty()) {
              IconButton(onClick = { searchQuery = "" }) {
                Icon(Icons.Default.Close, contentDescription = "Clear")
              }
            }
          },
          singleLine = true,
          shape = RoundedCornerShape(14.dp),
          colors = TextFieldDefaults.colors(
            focusedContainerColor = MaterialTheme.colorScheme.surface,
            unfocusedContainerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f)
          ),
          modifier = Modifier
            .fillMaxWidth()
            .testTag("map_search_input")
        )

        Spacer(modifier = Modifier.height(8.dp))

        // Category Filter Chips
        LazyRow(
          horizontalArrangement = Arrangement.spacedBy(8.dp),
          modifier = Modifier.fillMaxWidth()
        ) {
          item {
            FilterChip(
              selected = selectedCategory == null,
              onClick = { selectedCategory = null },
              label = { Text("All Places (${AdvicePlacesCatalog.places.size})") }
            )
          }
          items(AdviceCategory.entries.toTypedArray()) { category ->
            FilterChip(
              selected = selectedCategory == category,
              onClick = {
                selectedCategory = if (selectedCategory == category) null else category
              },
              label = { Text("${category.iconEmoji} ${category.label}") }
            )
          }
        }
      }
    }

    if (isPlottedMapView) {
      // Interactive Plotted Map View
      Box(
        modifier = Modifier
          .fillMaxWidth()
          .weight(1f)
      ) {
        PlottedAdviceCanvasMap(
          places = filteredPlaces,
          selectedPlace = selectedPlace,
          onSelectPlace = { selectedPlace = it }
        )

        // Selected Place Bottom Card
        Column(
          modifier = Modifier
            .align(Alignment.BottomCenter)
            .fillMaxWidth()
            .padding(16.dp)
        ) {
          AnimatedVisibility(
            visible = selectedPlace != null,
            enter = slideInVertically(initialOffsetY = { it }) + fadeIn(),
            exit = slideOutVertically(targetOffsetY = { it }) + fadeOut(),
            modifier = Modifier.fillMaxWidth()
          ) {
            selectedPlace?.let { place ->
              AdvicePlaceCard(
                place = place,
                onDirections = {
                  val gmmIntentUri = Uri.parse("geo:0,0?q=${Uri.encode(place.name + ", " + place.address)}")
                  val mapIntent = Intent(Intent.ACTION_VIEW, gmmIntentUri)
                  try {
                    context.startActivity(mapIntent)
                  } catch (e: Exception) {
                    val browserIntent = Intent(Intent.ACTION_VIEW, Uri.parse("https://maps.google.com/?q=${Uri.encode(place.name + ", " + place.address)}"))
                    context.startActivity(browserIntent)
                  }
                },
                onCall = {
                  val callIntent = Intent(Intent.ACTION_DIAL, Uri.parse("tel:${place.phone}"))
                  context.startActivity(callIntent)
                }
              )
            }
          }
        }
      }
    } else {
      // Directory List View
      LazyColumn(
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
        modifier = Modifier
          .fillMaxWidth()
          .weight(1f)
      ) {
        items(filteredPlaces, key = { it.id }) { place ->
          AdvicePlaceCard(
            place = place,
            onDirections = {
              val gmmIntentUri = Uri.parse("geo:0,0?q=${Uri.encode(place.name + ", " + place.address)}")
              val mapIntent = Intent(Intent.ACTION_VIEW, gmmIntentUri)
              try {
                context.startActivity(mapIntent)
              } catch (e: Exception) {
                val browserIntent = Intent(Intent.ACTION_VIEW, Uri.parse("https://maps.google.com/?q=${Uri.encode(place.name + ", " + place.address)}"))
                context.startActivity(browserIntent)
              }
            },
            onCall = {
              val callIntent = Intent(Intent.ACTION_DIAL, Uri.parse("tel:${place.phone}"))
              context.startActivity(callIntent)
            }
          )
        }
      }
    }
  }
}

@Composable
fun PlottedAdviceCanvasMap(
  places: List<AdvicePlace>,
  selectedPlace: AdvicePlace?,
  onSelectPlace: (AdvicePlace) -> Unit,
  modifier: Modifier = Modifier
) {
  var canvasSize by remember { mutableStateOf(Size.Zero) }

  Box(
    modifier = modifier
      .fillMaxSize()
      .background(Color(0xFFF7F2E9)) // Warm parchment map base
      .pointerInput(places, canvasSize) {
        detectTapGestures { tapOffset ->
          if (canvasSize.width <= 0f || canvasSize.height <= 0f) return@detectTapGestures

          // Find nearest place to tap
          var closestPlace: AdvicePlace? = null
          var minDistance = Float.MAX_VALUE

          places.forEach { place ->
            val placeX = place.mapCoordX * canvasSize.width
            val placeY = place.mapCoordY * canvasSize.height
            val dist = sqrt(
              (tapOffset.x - placeX).pow(2) + (tapOffset.y - placeY).pow(2)
            )
            // Tap tolerance of 48dp equivalent (~120px)
            if (dist < 140f && dist < minDistance) {
              minDistance = dist
              closestPlace = place
            }
          }

          closestPlace?.let { onSelectPlace(it) }
        }
      }
  ) {
    // Canvas rendering styled city terrain & road grid
    Canvas(modifier = Modifier.fillMaxSize()) {
      canvasSize = size

      // 1. Soft park green zones
      val parkColor = Color(0xFFE4EEDF)
      drawRoundRect(
        color = parkColor,
        topLeft = Offset(size.width * 0.05f, size.height * 0.12f),
        size = Size(size.width * 0.38f, size.height * 0.22f),
        cornerRadius = CornerRadius(24f, 24f)
      )
      drawRoundRect(
        color = parkColor,
        topLeft = Offset(size.width * 0.58f, size.height * 0.55f),
        size = Size(size.width * 0.35f, size.height * 0.30f),
        cornerRadius = CornerRadius(24f, 24f)
      )

      // 2. Serene River curve (pale soft blue)
      val riverColor = Color(0xFFD8E7F0)
      val riverPath = Path().apply {
        moveTo(size.width * 0.0f, size.height * 0.48f)
        cubicTo(
          size.width * 0.35f, size.height * 0.42f,
          size.width * 0.65f, size.height * 0.68f,
          size.width * 1.0f, size.height * 0.52f
        )
      }
      drawPath(
        path = riverPath,
        color = riverColor,
        style = Stroke(width = 38f)
      )

      // 3. Grid road network
      val roadColor = Color(0xFFEDE4D7)
      val mainRoadColor = Color(0xFFE3D8C8)

      // Horizontal avenues
      for (i in 1..6) {
        val y = size.height * (i / 7f)
        drawLine(
          color = if (i % 2 == 0) mainRoadColor else roadColor,
          start = Offset(0f, y),
          end = Offset(size.width, y),
          strokeWidth = if (i % 2 == 0) 14f else 8f
        )
      }

      // Vertical boulevards
      for (i in 1..5) {
        val x = size.width * (i / 6f)
        drawLine(
          color = if (i % 2 == 0) mainRoadColor else roadColor,
          start = Offset(x, 0f),
          end = Offset(x, size.height),
          strokeWidth = if (i % 2 == 0) 14f else 8f
        )
      }

      // 4. City center district overlay
      drawCircle(
        brush = Brush.radialGradient(
          colors = listOf(Color(0xFFFFFAF2).copy(alpha = 0.5f), Color.Transparent),
          center = Offset(size.width * 0.5f, size.height * 0.45f),
          radius = size.width * 0.4f
        ),
        radius = size.width * 0.4f,
        center = Offset(size.width * 0.5f, size.height * 0.45f)
      )
    }

    // Interactive Plotted Pins on Canvas Overlay
    places.forEach { place ->
      val isSelected = selectedPlace?.id == place.id

      Box(
        modifier = Modifier
          .fillMaxSize()
      ) {
        // Pin Composable positioned at normalized map coordinates
        Box(
          modifier = Modifier
            .fillMaxSize()
            .padding(
              start = 0.dp,
              top = 0.dp
            )
        ) {
          PlottedPinMarker(
            place = place,
            isSelected = isSelected,
            onClick = { onSelectPlace(place) },
            modifier = Modifier
              .align(Alignment.TopStart)
              .offset(
                x = (place.mapCoordX * 340).dp,
                y = (place.mapCoordY * 420).dp
              )
          )
        }
      }
    }

    // Map Legend Overlay in top-left
    Surface(
      shape = RoundedCornerShape(12.dp),
      color = MaterialTheme.colorScheme.surface.copy(alpha = 0.92f),
      shadowElevation = 3.dp,
      modifier = Modifier
        .align(Alignment.TopStart)
        .padding(12.dp)
    ) {
      Row(
        verticalAlignment = Alignment.CenterVertically,
        modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp)
      ) {
        Text(text = "📍 Tap any pin to view free advice options", style = MaterialTheme.typography.labelSmall)
      }
    }
  }
}

@Composable
fun PlottedPinMarker(
  place: AdvicePlace,
  isSelected: Boolean,
  onClick: () -> Unit,
  modifier: Modifier = Modifier
) {
  val categoryColor = when (place.category) {
    AdviceCategory.LEGAL_RIGHTS -> Color(0xFF6B4226) // Deep Bronze
    AdviceCategory.CAREER_JOB -> Color(0xFFC04C28) // Warm Terracotta
    AdviceCategory.WOMEN_HEALTH -> Color(0xFFB03A5A) // Warm Rose
    AdviceCategory.MENTAL_HEALTH -> Color(0xFF4A6B53) // Soothing Sage
    AdviceCategory.COMMUNITY_SANCTUARY -> Color(0xFFBF751D) // Radiant Amber
  }

  Column(
    horizontalAlignment = Alignment.CenterHorizontally,
    modifier = modifier
      .clickable(onClick = onClick)
      .testTag("map_pin_${place.id}")
  ) {
    // Pin Head
    Box(
      contentAlignment = Alignment.Center,
      modifier = Modifier
        .size(if (isSelected) 44.dp else 36.dp)
        .shadow(if (isSelected) 8.dp else 4.dp, shape = CircleShape)
        .clip(CircleShape)
        .background(if (isSelected) categoryColor else Color.White)
        .border(
          width = if (isSelected) 3.dp else 2.dp,
          color = if (isSelected) Color.White else categoryColor,
          shape = CircleShape
        )
    ) {
      Text(
        text = place.category.iconEmoji,
        fontSize = if (isSelected) 18.sp else 14.sp
      )
    }

    // Label pill if selected
    if (isSelected) {
      Surface(
        shape = RoundedCornerShape(8.dp),
        color = MaterialTheme.colorScheme.inverseSurface,
        shadowElevation = 4.dp,
        modifier = Modifier.padding(top = 2.dp)
      ) {
        Text(
          text = place.name,
          style = MaterialTheme.typography.labelSmall,
          color = MaterialTheme.colorScheme.inverseOnSurface,
          maxLines = 1,
          overflow = TextOverflow.Ellipsis,
          modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
        )
      }
    }
  }
}

@Composable
fun AdvicePlaceCard(
  place: AdvicePlace,
  onDirections: () -> Unit,
  onCall: () -> Unit,
  modifier: Modifier = Modifier
) {
  Card(
    shape = RoundedCornerShape(18.dp),
    colors = CardDefaults.cardColors(
      containerColor = MaterialTheme.colorScheme.surface
    ),
    elevation = CardDefaults.cardElevation(defaultElevation = 4.dp),
    modifier = modifier
      .fillMaxWidth()
      .border(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.2f), RoundedCornerShape(18.dp))
      .testTag("advice_card_${place.id}")
  ) {
    Column(modifier = Modifier.padding(16.dp)) {
      Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
      ) {
        Surface(
          shape = RoundedCornerShape(8.dp),
          color = MaterialTheme.colorScheme.primaryContainer
        ) {
          Row(
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
          ) {
            Text(text = place.category.iconEmoji, fontSize = 12.sp)
            Spacer(modifier = Modifier.width(4.dp))
            Text(
              text = place.category.label,
              style = MaterialTheme.typography.labelSmall,
              fontWeight = FontWeight.Bold,
              color = MaterialTheme.colorScheme.onPrimaryContainer
            )
          }
        }

        Row(verticalAlignment = Alignment.CenterVertically) {
          Text(text = "⭐", fontSize = 13.sp)
          Spacer(modifier = Modifier.width(2.dp))
          Text(
            text = "${place.rating}",
            style = MaterialTheme.typography.labelMedium,
            fontWeight = FontWeight.Bold
          )
          Spacer(modifier = Modifier.width(8.dp))
          Surface(
            shape = RoundedCornerShape(6.dp),
            color = MaterialTheme.colorScheme.surfaceVariant
          ) {
            Text(
              text = "${place.distanceMiles} mi away",
              style = MaterialTheme.typography.labelSmall,
              modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
            )
          }
        }
      }

      Spacer(modifier = Modifier.height(8.dp))

      Text(
        text = place.name,
        style = MaterialTheme.typography.titleMedium,
        fontWeight = FontWeight.Bold
      )

      // Advice highlight banner
      Surface(
        shape = RoundedCornerShape(8.dp),
        color = MaterialTheme.colorScheme.tertiaryContainer.copy(alpha = 0.5f),
        modifier = Modifier
          .fillMaxWidth()
          .padding(vertical = 6.dp)
      ) {
        Row(
          verticalAlignment = Alignment.CenterVertically,
          modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp)
        ) {
          Text(text = "💡 Advice focus: ", fontWeight = FontWeight.Bold, style = MaterialTheme.typography.bodySmall)
          Text(text = place.adviceType, style = MaterialTheme.typography.bodySmall)
        }
      }

      Row(
        verticalAlignment = Alignment.CenterVertically,
        modifier = Modifier.padding(vertical = 2.dp)
      ) {
        Icon(
          Icons.Outlined.Place,
          contentDescription = null,
          tint = MaterialTheme.colorScheme.primary,
          modifier = Modifier.size(16.dp)
        )
        Spacer(modifier = Modifier.width(6.dp))
        Text(
          text = place.address,
          style = MaterialTheme.typography.bodySmall,
          color = MaterialTheme.colorScheme.onSurfaceVariant
        )
      }

      Row(
        verticalAlignment = Alignment.CenterVertically,
        modifier = Modifier.padding(vertical = 2.dp)
      ) {
        Icon(
          Icons.Outlined.Schedule,
          contentDescription = null,
          tint = MaterialTheme.colorScheme.primary,
          modifier = Modifier.size(16.dp)
        )
        Spacer(modifier = Modifier.width(6.dp))
        Text(
          text = place.hours,
          style = MaterialTheme.typography.bodySmall,
          color = MaterialTheme.colorScheme.onSurfaceVariant
        )
      }

      Spacer(modifier = Modifier.height(8.dp))

      Text(
        text = "Key advice provided:",
        style = MaterialTheme.typography.labelMedium,
        fontWeight = FontWeight.Bold
      )
      place.keyAdviceOffered.forEach { adviceBullet ->
        Row(
          modifier = Modifier.padding(vertical = 2.dp),
          verticalAlignment = Alignment.Top
        ) {
          Text(text = "•", color = MaterialTheme.colorScheme.primary, modifier = Modifier.padding(end = 6.dp))
          Text(
            text = adviceBullet,
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurface
          )
        }
      }

      Spacer(modifier = Modifier.height(12.dp))

      // Action Buttons
      Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.spacedBy(8.dp)
      ) {
        Button(
          onClick = onDirections,
          shape = RoundedCornerShape(12.dp),
          modifier = Modifier
            .weight(1f)
            .testTag("btn_directions_${place.id}")
        ) {
          Icon(Icons.Default.Navigation, contentDescription = null, modifier = Modifier.size(16.dp))
          Spacer(modifier = Modifier.width(6.dp))
          Text("Get Directions", fontSize = 13.sp)
        }

        OutlinedButton(
          onClick = onCall,
          shape = RoundedCornerShape(12.dp),
          modifier = Modifier
            .weight(1f)
            .testTag("btn_call_${place.id}")
        ) {
          Icon(Icons.Default.Phone, contentDescription = null, modifier = Modifier.size(16.dp))
          Spacer(modifier = Modifier.width(6.dp))
          Text("Call Desk", fontSize = 13.sp)
        }
      }
    }
  }
}
