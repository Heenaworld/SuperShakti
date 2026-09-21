package com.example.data.local

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import kotlinx.coroutines.flow.Flow

@Dao
interface SupportDao {

  // Match History
  @Query("SELECT * FROM match_history ORDER BY timestamp DESC")
  fun getAllMatchHistory(): Flow<List<MatchHistoryEntity>>

  @Insert(onConflict = OnConflictStrategy.REPLACE)
  suspend fun insertMatchHistory(match: MatchHistoryEntity): Long

  @Query("DELETE FROM match_history WHERE id = :id")
  suspend fun deleteMatchHistory(id: Long)

  // Saved Tools
  @Query("SELECT * FROM saved_tools ORDER BY savedAt DESC")
  fun getAllSavedTools(): Flow<List<SavedToolEntity>>

  @Query("SELECT EXISTS(SELECT 1 FROM saved_tools WHERE id = :toolId)")
  fun isToolSaved(toolId: String): Flow<Boolean>

  @Insert(onConflict = OnConflictStrategy.REPLACE)
  suspend fun insertSavedTool(tool: SavedToolEntity)

  @Query("DELETE FROM saved_tools WHERE id = :toolId")
  suspend fun deleteSavedTool(toolId: String)

  // Buddy Connections
  @Query("SELECT * FROM buddy_connections ORDER BY connectedAt DESC")
  fun getAllBuddyConnections(): Flow<List<BuddyConnectionEntity>>

  @Query("SELECT EXISTS(SELECT 1 FROM buddy_connections WHERE id = :buddyId)")
  fun isBuddyConnected(buddyId: String): Flow<Boolean>

  @Insert(onConflict = OnConflictStrategy.REPLACE)
  suspend fun insertBuddyConnection(buddy: BuddyConnectionEntity)

  @Query("DELETE FROM buddy_connections WHERE id = :buddyId")
  suspend fun deleteBuddyConnection(buddyId: String)
}
