package com.example.data.local

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "match_history")
data class MatchHistoryEntity(
  @PrimaryKey(autoGenerate = true) val id: Long = 0,
  val userInput: String,
  val detectedNeeds: String,
  val empathySummary: String,
  val primaryPackageId: String,
  val timestamp: Long = System.currentTimeMillis(),
  val isFavorite: Boolean = false
)

@Entity(tableName = "saved_tools")
data class SavedToolEntity(
  @PrimaryKey val id: String,
  val title: String,
  val category: String,
  val type: String,
  val description: String,
  val scriptContent: String?,
  val savedAt: Long = System.currentTimeMillis()
)

@Entity(tableName = "buddy_connections")
data class BuddyConnectionEntity(
  @PrimaryKey val id: String,
  val name: String,
  val story: String,
  val avatarInitials: String,
  val packageId: String,
  val connectedAt: Long = System.currentTimeMillis(),
  val introMessage: String,
  val status: String = "Connected"
)
