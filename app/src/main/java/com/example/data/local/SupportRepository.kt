package com.example.data.local

import com.example.data.model.BuddyProfile
import com.example.data.model.MicroTool
import kotlinx.coroutines.flow.Flow

class SupportRepository(private val dao: SupportDao) {

  val allMatchHistory: Flow<List<MatchHistoryEntity>> = dao.getAllMatchHistory()
  val allSavedTools: Flow<List<SavedToolEntity>> = dao.getAllSavedTools()
  val allBuddyConnections: Flow<List<BuddyConnectionEntity>> = dao.getAllBuddyConnections()

  suspend fun saveMatchHistory(
    userInput: String,
    detectedNeeds: List<String>,
    empathySummary: String,
    primaryPackageId: String
  ): Long {
    return dao.insertMatchHistory(
      MatchHistoryEntity(
        userInput = userInput,
        detectedNeeds = detectedNeeds.joinToString(" • "),
        empathySummary = empathySummary,
        primaryPackageId = primaryPackageId
      )
    )
  }

  suspend fun deleteMatchHistory(id: Long) = dao.deleteMatchHistory(id)

  fun isToolSaved(toolId: String): Flow<Boolean> = dao.isToolSaved(toolId)

  suspend fun toggleSaveTool(tool: MicroTool, isCurrentlySaved: Boolean) {
    if (isCurrentlySaved) {
      dao.deleteSavedTool(tool.id)
    } else {
      dao.insertSavedTool(
        SavedToolEntity(
          id = tool.id,
          title = tool.title,
          category = tool.category,
          type = tool.type.name,
          description = tool.description,
          scriptContent = tool.scriptContent
        )
      )
    }
  }

  fun isBuddyConnected(buddyId: String): Flow<Boolean> = dao.isBuddyConnected(buddyId)

  suspend fun connectBuddy(buddy: BuddyProfile, introMessage: String) {
    dao.insertBuddyConnection(
      BuddyConnectionEntity(
        id = buddy.id,
        name = buddy.name,
        story = buddy.story,
        avatarInitials = buddy.avatarInitials,
        packageId = buddy.packageId,
        introMessage = introMessage
      )
    )
  }

  suspend fun disconnectBuddy(buddyId: String) = dao.deleteBuddyConnection(buddyId)
}
