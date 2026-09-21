package com.example.ui.theme

import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.dynamicDarkColorScheme
import androidx.compose.material3.dynamicLightColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.LocalContext

private val DarkColorScheme =
  darkColorScheme(
    primary = WarmRosePrimaryDark,
    onPrimary = WarmRoseOnPrimaryDark,
    primaryContainer = WarmRoseContainerDark,
    onPrimaryContainer = WarmRoseOnContainerDark,
    secondary = CalmingSageSecondaryDark,
    onSecondary = CalmingSageOnSecondaryDark,
    secondaryContainer = CalmingSageContainerDark,
    onSecondaryContainer = CalmingSageOnContainerDark,
    tertiary = AmberWarmTertiaryDark,
    onTertiary = AmberWarmOnContainerDark,
    tertiaryContainer = AmberWarmContainerDark,
    onTertiaryContainer = AmberWarmOnContainerDark,
    background = GentleWarmDarkBackground,
    surface = GentleWarmDarkSurface,
    surfaceVariant = GentleWarmDarkSurfaceVariant,
    outline = GentleLinenOutlineDark,
    error = CrisisRed,
    errorContainer = CrisisRedContainer,
    onError = CrisisRedOnContainer
  )

private val LightColorScheme =
  lightColorScheme(
    primary = WarmCoralPrimary,
    onPrimary = WarmCoralOnPrimary,
    primaryContainer = WarmCoralContainer,
    onPrimaryContainer = WarmCoralOnContainer,
    secondary = CalmingSageSecondary,
    onSecondary = CalmingSageOnSecondary,
    secondaryContainer = CalmingSageContainer,
    onSecondaryContainer = CalmingSageOnContainer,
    tertiary = AmberWarmTertiary,
    onTertiary = AmberWarmOnContainer,
    tertiaryContainer = AmberWarmContainer,
    onTertiaryContainer = AmberWarmOnContainer,
    background = GentleIvoryBackground,
    surface = GentleIvorySurface,
    surfaceVariant = GentleIvorySurfaceVariant,
    outline = GentleIvoryOutline,
    error = CrisisRed,
    errorContainer = CrisisRedContainer,
    onError = CrisisRedOnContainer
  )

@Composable
fun MyApplicationTheme(
  darkTheme: Boolean = false, // Default to radiant warm soothing light colors, never black
  dynamicColor: Boolean = false, // Keep intentional warm colors rather than phone wallpaper
  content: @Composable () -> Unit,
) {
  val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme

  MaterialTheme(colorScheme = colorScheme, typography = Typography, content = content)
}
