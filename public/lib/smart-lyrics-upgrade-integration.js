/**
 * SONIQ Smart Lyrics Import Upgrade Integration Layer
 *
 * Provides Save/Paste/Copy functionality and state management for:
 * - Enhanced import/paste with analysis
 * - Version history and undo/redo
 * - Auto-save to localStorage and Supabase
 * - Copy with metadata and changelog export
 * - Keyboard shortcuts
 *
 * Patches existing UI without breaking functionality
 */

// ═══════════════════════════════════════════════════════════════════
// STATE MANAGER: History stack and undo/redo
// ═══════════════════════════════════════════════════════════════════

const liuStateManager = {
  // Stack of {lyrics, score, title, timestamp, changesSummary}
  history: [],
  historyIdx: -1,
  maxHistory: 50,

  // Save current state to history
  push(lyrics, score, title, changesSummary) {
    // Remove any redo states when new action taken
    if (this.historyIdx < this.history.length - 1) {
      this.history = this.history.slice(0, this.historyIdx + 1);
    }

    this.history.push({
      lyrics,
      score: typeof score === 'number' ? score : null,
      title: title || 'Upgraded Song',
      timestamp: Date.now(),
      changesSummary: changesSummary || 'Upgrade applied'
    });

    // Keep only last N states
    if (this.history.length > this.maxHistory) {
      this.history = this.history.slice(-this.maxHistory);
    }

    this.historyIdx = this.history.length - 1;
  },

  // Get current state
  current() {
    if (this.historyIdx >= 0 && this.historyIdx < this.history.length) {
      return this.history[this.historyIdx];
    }
    return null;
  },

  // Undo to previous state
  undo() {
    if (this.historyIdx > 0) {
      this.historyIdx--;
      return this.current();
    }
    return null;
  },

  // Redo to next state
  redo() {
    if (this.historyIdx < this.history.length - 1) {
      this.historyIdx++;
      return this.current();
    }
    return null;
  },

  // Reset to original (first state)
  undoAll() {
    if (this.history.length > 0) {
      this.historyIdx = 0;
      return this.current();
    }
    return null;
  },

  // Check if undo/redo available
  canUndo() {
    return this.historyIdx > 0;
  },

  canRedo() {
    return this.historyIdx < this.history.length - 1;
  },

  // Clear history
  reset() {
    this.history = [];
    this.historyIdx = -1;
  }
};

// ═══════════════════════════════════════════════════════════════════
// LIU IMPORT: Enhanced paste/import handler
// ═══════════════════════════════════════════════════════════════════

function liuImportLyrics() {
  // Use existing paste modal
  const modal = document.getElementById('paste-modal');
  if (!modal) {
    toast('Paste modal not found');
    return;
  }

  modal.style.display = 'block';
  modal.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Focus textarea and clear previous
  setTimeout(() => {
    const ta = document.getElementById('paste-area');
    if (ta) {
      ta.focus();
      ta.value = '';
    }
  }, 150);
}

function liuProcessImportedLyrics(lyricsText, title) {
  if (!lyricsText || !lyricsText.trim()) {
    toast('Paste some lyrics first');
    return;
  }

  // Show loading state
  toast('Analyzing lyrics...');

  // Load into editor (uses existing function)
  loadLyricsIntoEditor(lyricsText, title || 'Smart Imported Song');

  // Clear paste area
  const ta = document.getElementById('paste-area');
  if (ta) ta.value = '';

  // Initialize state manager with imported lyrics
  liuStateManager.reset();
  liuStateManager.push(lyricsText, null, title || 'Original Import', 'Initial import');

  // Trigger analysis callback
  if (typeof liuOnAnalysisComplete === 'function') {
    liuOnAnalysisComplete({
      lyrics: lyricsText,
      title: title || 'Imported Song',
      lineCount: lyricsText.split('\n').length
    });
  }

  toast('✓ Lyrics analyzed and loaded');
}

// Intercept existing loadPasted function
const originalLoadPasted = window.loadPasted;
window.loadPasted = function() {
  const ta = document.getElementById('paste-area');
  const raw = ta?.value || '';
  if (!raw.trim()) {
    toast('Paste some lyrics first');
    return;
  }
  liuProcessImportedLyrics(raw, 'Pasted Song');
};

// ═══════════════════════════════════════════════════════════════════
// LIU SAVE: Save upgraded lyrics with version history
// ═══════════════════════════════════════════════════════════════════

async function liuSaveLyrics(lyricsText, metadata = {}) {
  if (!lyricsText || !lyricsText.trim()) {
    toast('No lyrics to save');
    return false;
  }

  const title = metadata.title || S.editorSong?.title || S.currentSong?.title || 'Upgraded Song';
  const genre = metadata.genre || S.currentSong?.genre || '';
  const topic = metadata.topic || S.currentSong?.topic || '';
  const score = typeof metadata.score === 'number' ? metadata.score : null;

  // Create song object following SONIQ pattern
  const song = {
    id: S.currentSong?.id || (Date.now().toString(36) + Math.random().toString(36).slice(2, 6)),
    title: title + (metadata.isUpgraded ? ' (upgraded)' : ''),
    lyrics: lyricsText,
    genre: genre,
    topic: topic,
    style: S.currentSong?.style || '',
    brief: S.currentSong?.brief || '',
    structure: S.currentSong?.structure || '',
    notes: S.currentSong?.notes || '',
    score: score,
    ts: Date.now(),
    // Track that this came from upgrade system
    _liuVersion: 1,
    _liuOriginalId: S.currentSong?.id
  };

  // Update current song in app state
  S.currentSong = song;

  // Also update editor state
  if (S.editorSong) {
    S.editorSong.lyrics = lyricsText;
    S.editorSong.title = song.title;
  }

  // Add/update in library following existing pattern
  const existing = S.library.findIndex(s => s.id === song.id);
  if (existing >= 0) {
    S.library[existing] = song;
  } else {
    S.library.unshift(song);
  }

  // Limit library size
  if (S.library.length > 200) {
    S.library = S.library.slice(0, 200);
  }

  // Persist to localStorage
  persistLib();

  // Auto-save to server if connected
  if (S.session?.access_token) {
    autoSaveSongToServer(song);
  }

  // Add to state history
  liuStateManager.push(
    lyricsText,
    score,
    title,
    metadata.changesSummary || 'Lyrics saved'
  );

  toast(`✓ ${metadata.isUpgraded ? 'Upgraded lyrics' : 'Lyrics'} saved to library`);
  trackEvent('liu_save', {
    genre: genre,
    topic: topic,
    isUpgraded: metadata.isUpgraded
  });

  return true;
}

// Auto-save after each upgrade
function liuAutoSave() {
  if (!S.editorSong?.lyrics) return;

  liuSaveLyrics(S.editorSong.lyrics, {
    title: S.editorSong.title,
    genre: S.editorSong.genre,
    topic: S.editorSong.topic,
    changesSummary: 'Auto-saved'
  });
}

// ═══════════════════════════════════════════════════════════════════
// LIU COPY: Export upgraded lyrics with optional metadata
// ═══════════════════════════════════════════════════════════════════

function liuCopyLyrics() {
  const lyrics = S.editorSong?.lyrics || S.currentSong?.lyrics || '';
  if (!lyrics) {
    toast('No lyrics to copy');
    return;
  }

  safeCopy(lyrics, 'Upgraded lyrics copied');
  trackEvent('liu_copy', { hasScore: !!S.currentSong?.score });
}

function liuCopyWithMetadata() {
  const lyrics = S.editorSong?.lyrics || S.currentSong?.lyrics || '';
  if (!lyrics) {
    toast('No lyrics to copy');
    return;
  }

  let output = '';

  // Title and metadata
  if (S.editorSong?.title || S.currentSong?.title) {
    output += `SONG: ${S.editorSong?.title || S.currentSong?.title}\n`;
  }

  if (S.currentSong?.genre) {
    output += `GENRE: ${S.currentSong.genre}\n`;
  }

  if (S.currentSong?.topic) {
    output += `TOPIC: ${S.currentSong.topic}\n`;
  }

  if (typeof S.currentSong?.score === 'number') {
    output += `QUALITY SCORE: ${S.currentSong.score}/100\n`;
  }

  output += '\n─────────────────────\n\n';
  output += lyrics;

  safeCopy(output, 'Lyrics + metadata copied');
  trackEvent('liu_copy_metadata');
}

// ═══════════════════════════════════════════════════════════════════
// LIU CHANGELOG: Export formatted list of improvements
// ═══════════════════════════════════════════════════════════════════

function liuExportChangelog() {
  const history = liuStateManager.history;

  if (history.length < 2) {
    toast('No changes to export');
    return;
  }

  let changelog = `LYRICS UPGRADE CHANGELOG\n`;
  changelog += `Song: ${S.currentSong?.title || 'Untitled'}\n`;
  changelog += `Generated: ${new Date().toLocaleString()}\n`;
  changelog += `\n${'─'.repeat(50)}\n\n`;

  history.forEach((state, idx) => {
    const date = new Date(state.timestamp).toLocaleTimeString();
    changelog += `[${idx}] ${date} — ${state.changesSummary}\n`;

    if (typeof state.score === 'number') {
      changelog += `    Quality Score: ${state.score}/100\n`;
    }

    changelog += `    Lines: ${state.lyrics.split('\n').length}\n`;
    changelog += '\n';
  });

  changelog += `${'─'.repeat(50)}\n`;
  changelog += `Total improvements: ${history.length - 1}\n`;

  safeCopy(changelog, 'Changelog copied');
  trackEvent('liu_export_changelog', { versionCount: history.length });
}

// ═══════════════════════════════════════════════════════════════════
// LIU UNDO/REDO: Navigate history
// ═══════════════════════════════════════════════════════════════════

function liuUndo() {
  const prev = liuStateManager.undo();
  if (!prev) {
    toast('Nothing to undo');
    return;
  }

  // Load previous state into editor
  loadLyricsIntoEditor(prev.lyrics, prev.title);
  toast(`↶ Undone: ${prev.changesSummary}`);
  trackEvent('liu_undo');
}

function liuRedo() {
  const next = liuStateManager.redo();
  if (!next) {
    toast('Nothing to redo');
    return;
  }

  // Load next state into editor
  loadLyricsIntoEditor(next.lyrics, next.title);
  toast(`↷ Redone: ${next.changesSummary}`);
  trackEvent('liu_redo');
}

function liuUndoAll() {
  const original = liuStateManager.undoAll();
  if (!original) {
    toast('No history to revert to');
    return;
  }

  loadLyricsIntoEditor(original.lyrics, original.title);
  toast('↶ Reverted to original imported lyrics');
  trackEvent('liu_undo_all');
}

// ═══════════════════════════════════════════════════════════════════
// LIU EVENT SYSTEM: Callbacks for score/analysis changes
// ═══════════════════════════════════════════════════════════════════

const liuEventCallbacks = {
  onScoreChange: [],
  onAnalysisComplete: [],
  onImport: []
};

function liuOnScoreChange(callback) {
  if (typeof callback === 'function') {
    liuEventCallbacks.onScoreChange.push(callback);
  }
}

function liuTriggerScoreChange(score, metadata) {
  liuEventCallbacks.onScoreChange.forEach(cb => {
    try {
      cb(score, metadata);
    } catch (e) {
      console.error('Score change callback error:', e);
    }
  });

  // Update current song score
  if (S.currentSong) {
    S.currentSong.score = score;
  }
}

function liuOnAnalysisComplete(data) {
  liuEventCallbacks.onAnalysisComplete.forEach(cb => {
    try {
      cb(data);
    } catch (e) {
      console.error('Analysis complete callback error:', e);
    }
  });
}

// ═══════════════════════════════════════════════════════════════════
// LIU STATE QUERIES: Get current state information
// ═══════════════════════════════════════════════════════════════════

function liuGetCurrentState() {
  return {
    lyrics: S.editorSong?.lyrics || S.currentSong?.lyrics || '',
    title: S.editorSong?.title || S.currentSong?.title || '',
    genre: S.currentSong?.genre || '',
    topic: S.currentSong?.topic || '',
    score: S.currentSong?.score || null,
    lineCount: (S.editorSong?.lyrics || S.currentSong?.lyrics || '').split('\n').length,
    hasHistory: liuStateManager.history.length > 1,
    canUndo: liuStateManager.canUndo(),
    canRedo: liuStateManager.canRedo(),
    historyCount: liuStateManager.history.length,
    currentHistoryIdx: liuStateManager.historyIdx,
    changes: liuStateManager.history.map(h => ({
      timestamp: h.timestamp,
      summary: h.changesSummary,
      score: h.score
    }))
  };
}

function liuGetMetrics() {
  const lyrics = S.editorSong?.lyrics || S.currentSong?.lyrics || '';
  const lines = lyrics.split('\n');

  return {
    totalLines: lines.length,
    lyricsLines: lines.filter(l => l.trim() && !/^\[/.test(l.trim())).length,
    sectionTags: lines.filter(l => /^\[/.test(l.trim())).length,
    totalWords: lyrics.split(/\s+/).filter(w => w).length,
    averageLineLength: lyrics.split('\n').reduce((a, l) => a + l.length, 0) / lines.length
  };
}

// ═══════════════════════════════════════════════════════════════════
// KEYBOARD SHORTCUTS
// ═══════════════════════════════════════════════════════════════════

function liuInitKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Only in editor context
    if (document.activeElement?.id === 'paste-area' ||
        document.activeElement?.closest('.ll-input')) {

      // Ctrl/Cmd + V in paste area → trigger import
      if ((e.ctrlKey || e.metaKey) && e.key === 'v' &&
          document.activeElement?.id === 'paste-area') {
        // Allow default paste behavior
        return;
      }

      // Ctrl/Cmd + S → save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        liuAutoSave();
      }

      // Ctrl/Cmd + Z → undo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        liuUndo();
      }

      // Ctrl/Cmd + Shift + Z → redo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey) {
        e.preventDefault();
        liuRedo();
      }

      // Ctrl/Cmd + C when lyrics selected → copy
      if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        const sel = window.getSelection().toString();
        if (sel && (S.editorSong?.lyrics || S.currentSong?.lyrics)) {
          // Let default copy work, show confirmation
          setTimeout(() => {
            toast('✓ Copied to clipboard');
          }, 50);
        }
      }
    }
  });
}

// ═══════════════════════════════════════════════════════════════════
// LIU INITIALIZATION: Hook into existing SONIQ UI
// ═══════════════════════════════════════════════════════════════════

function liuInit() {
  // Initialize state manager
  liuStateManager.reset();

  // Set up keyboard shortcuts
  liuInitKeyboardShortcuts();

  // Patch existing buttons to use new flow
  liuHookExistingUI();

  console.log('✓ Smart Lyrics Upgrade system initialized');
}

function liuHookExistingUI() {
  // Hook paste modal submit button if exists
  const pasteBtn = Array.from(document.querySelectorAll('button')).find(b =>
    b.textContent.includes('Paste') &&
    b.parentElement?.closest('#paste-modal')
  );

  if (pasteBtn) {
    pasteBtn.onclick = () => {
      const ta = document.getElementById('paste-area');
      if (ta?.value) {
        liuProcessImportedLyrics(ta.value, 'Pasted Song');
      }
    };
  }

  // Hook save button
  const saveBtn = document.getElementById('gen-save-btn') ||
                   Array.from(document.querySelectorAll('button')).find(b =>
                     b.textContent.includes('Save') || b.textContent.includes('💾')
                   );

  if (saveBtn) {
    const originalOnclick = saveBtn.onclick;
    saveBtn.onclick = () => {
      if (originalOnclick && typeof originalOnclick === 'function') {
        originalOnclick.call(saveBtn);
      }
      // Also trigger upgrade system save
      setTimeout(() => {
        if (S.editorSong?.lyrics || S.currentSong?.lyrics) {
          liuAutoSave();
        }
      }, 100);
    };
  }
}

// ═══════════════════════════════════════════════════════════════════
// EXPORT PUBLIC API
// ═══════════════════════════════════════════════════════════════════

window.liuImportLyrics = liuImportLyrics;
window.liuProcessImportedLyrics = liuProcessImportedLyrics;
window.liuSaveLyrics = liuSaveLyrics;
window.liuAutoSave = liuAutoSave;
window.liuCopyLyrics = liuCopyLyrics;
window.liuCopyWithMetadata = liuCopyWithMetadata;
window.liuExportChangelog = liuExportChangelog;
window.liuUndo = liuUndo;
window.liuRedo = liuRedo;
window.liuUndoAll = liuUndoAll;
window.liuOnScoreChange = liuOnScoreChange;
window.liuGetCurrentState = liuGetCurrentState;
window.liuGetMetrics = liuGetMetrics;
window.liuInit = liuInit;
window.liuStateManager = liuStateManager;

// Auto-initialize when SONIQ is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', liuInit);
} else {
  // DOM already loaded
  setTimeout(liuInit, 100);
}
