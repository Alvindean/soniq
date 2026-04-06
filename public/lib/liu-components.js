/**
 * SONIQ Smart Lyrics Upgrade - UI Components
 * Complete CSS, HTML templates, and JS rendering functions
 * Prefix: liu- (lyrics import upgrade)
 */

// ============================================================================
// CSS STYLES (insert into <style> block in index.html)
// ============================================================================
const LIU_STYLES = `
/* LIU Component Variables */
:root {
  --liu-red: #f87171;
  --liu-red-bg: rgba(248, 113, 113, 0.08);
  --liu-red-line: rgba(248, 113, 113, 0.28);

  --liu-green: #4ade80;
  --liu-green-bg: rgba(74, 222, 128, 0.08);
  --liu-green-line: rgba(74, 222, 128, 0.28);

  --liu-gray-soft: rgba(255, 255, 255, 0.04);
}

/* Score Dashboard Panel */
.liu-score-dashboard {
  background: var(--s2);
  border: 1px solid var(--b2);
  border-radius: var(--r3);
  padding: 24px;
  margin-bottom: 24px;
}

.liu-score-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
}

.liu-score-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--tx1);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.liu-score-toggle {
  display: flex;
  gap: 4px;
  background: var(--s3);
  border: 1px solid var(--b2);
  border-radius: var(--r2);
  padding: 4px;
}

.liu-toggle-btn {
  padding: 6px 12px;
  background: none;
  border: none;
  color: var(--tx3);
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  border-radius: var(--r1);
  transition: all 0.15s;
  letter-spacing: 0.02em;
}

.liu-toggle-btn.active {
  background: var(--s4);
  color: var(--tx1);
  box-shadow: inset 0 1px 0 0 var(--b3);
}

.liu-overall-score {
  display: flex;
  align-items: flex-end;
  gap: 16px;
}

.liu-score-number {
  font-size: 48px;
  font-weight: 700;
  color: var(--amber);
  font-family: var(--mono);
  line-height: 1;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.liu-score-number.improving {
  animation: scoreImprove 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.liu-score-label {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.liu-score-label-text {
  font-size: 11px;
  color: var(--tx3);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-weight: 600;
}

.liu-score-impact {
  font-size: 13px;
  font-weight: 700;
  color: var(--liu-green);
}

/* Score Metrics Grid */
.liu-metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
}

.liu-metric-item {
  background: var(--s3);
  border: 1px solid var(--b2);
  border-radius: var(--r2);
  padding: 12px;
  transition: all 0.15s;
}

.liu-metric-item:hover {
  border-color: var(--b3);
  background: var(--s4);
}

.liu-metric-label {
  font-size: 10px;
  font-weight: 700;
  color: var(--tx3);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 8px;
}

.liu-metric-bar-wrap {
  height: 6px;
  background: var(--s5);
  border-radius: 99px;
  margin-bottom: 8px;
  overflow: hidden;
}

.liu-metric-bar {
  height: 100%;
  border-radius: 99px;
  background: var(--amber);
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.liu-metric-bar.red {
  background: var(--liu-red);
}

.liu-metric-bar.amber {
  background: var(--amber);
}

.liu-metric-bar.green {
  background: var(--liu-green);
}

.liu-metric-value {
  font-size: 13px;
  font-weight: 700;
  color: var(--tx1);
  font-family: var(--mono);
}

/* Issue Cards */
.liu-issues-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.liu-issue-card {
  background: var(--s2);
  border: 1px solid var(--b2);
  border-radius: var(--r3);
  padding: 16px;
  display: flex;
  gap: 12px;
  transition: all 0.15s;
  position: relative;
  overflow: hidden;
}

.liu-issue-card.fixed {
  opacity: 0.6;
  border-color: var(--b1);
}

.liu-issue-card.fixed::after {
  content: '✓';
  position: absolute;
  right: 12px;
  top: 12px;
  font-size: 20px;
  color: var(--liu-green);
  font-weight: 700;
  animation: issueFixed 0.4s ease;
}

.liu-issue-icon {
  font-size: 20px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--s3);
  border-radius: var(--r2);
}

.liu-issue-content {
  flex: 1;
  min-width: 0;
}

.liu-issue-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.liu-issue-type {
  font-size: 12px;
  font-weight: 700;
  color: var(--tx1);
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.liu-severity-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: 99px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.liu-severity-critical {
  background: rgba(248, 113, 113, 0.12);
  color: var(--liu-red);
  border: 1px solid var(--liu-red-line);
}

.liu-severity-warning {
  background: var(--amberbg);
  color: var(--amber);
  border: 1px solid var(--amberline);
}

.liu-severity-info {
  background: var(--liu-green-bg);
  color: var(--liu-green);
  border: 1px solid var(--liu-green-line);
}

.liu-affected-line {
  font-size: 11px;
  color: var(--tx3);
  margin-bottom: 8px;
}

.liu-affected-line strong {
  color: var(--tx2);
}

.liu-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 10px;
  font-size: 12px;
}

.liu-text-block {
  padding: 8px 10px;
  background: var(--s3);
  border: 1px solid var(--b2);
  border-radius: var(--r1);
  color: var(--tx2);
  line-height: 1.4;
  word-break: break-word;
}

.liu-text-block.removed {
  background: rgba(248, 113, 113, 0.06);
  border-color: var(--liu-red-line);
  color: var(--liu-red);
  text-decoration: line-through;
}

.liu-text-block.added {
  background: rgba(74, 222, 128, 0.06);
  border-color: var(--liu-green-line);
  color: var(--liu-green);
}

.liu-impact-badge {
  display: inline-block;
  padding: 4px 8px;
  background: var(--liu-green-bg);
  border: 1px solid var(--liu-green-line);
  border-radius: var(--r1);
  color: var(--liu-green);
  font-size: 11px;
  font-weight: 700;
  font-family: var(--mono);
}

.liu-issue-actions {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}

.liu-fix-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 7px 12px;
  border-radius: var(--r2);
  border: 1px solid var(--b2);
  background: var(--s3);
  color: var(--tx1);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}

.liu-fix-btn:hover:not(:disabled) {
  background: var(--s4);
  border-color: var(--amberline);
  color: var(--amber);
  transform: translateY(-1px);
}

.liu-fix-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Fix All Button */
.liu-fix-all-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  border-radius: var(--r2);
  border: 1px solid var(--amberline);
  background: var(--amber);
  color: #08080a;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s;
  margin-bottom: 16px;
}

.liu-fix-all-btn:hover {
  background: #ffc820;
  transform: translateY(-1px);
}

.liu-fix-all-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Genre Migration Panel */
.liu-genre-panel {
  background: var(--s2);
  border: 1px solid var(--b2);
  border-radius: var(--r3);
  padding: 24px;
  margin-bottom: 24px;
}

.liu-genre-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
}

.liu-current-genre {
  display: flex;
  align-items: center;
  gap: 8px;
}

.liu-genre-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: var(--s3);
  border: 1px solid var(--b2);
  border-radius: var(--r2);
  font-size: 13px;
  font-weight: 600;
  color: var(--tx1);
}

.liu-genre-match {
  font-size: 11px;
  color: var(--tx3);
  font-family: var(--mono);
}

.liu-available-genres {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
  margin-bottom: 16px;
}

.liu-genre-option {
  padding: 12px;
  background: var(--s3);
  border: 1px solid var(--b2);
  border-radius: var(--r2);
  text-align: center;
  cursor: pointer;
  transition: all 0.15s;
}

.liu-genre-option:hover {
  border-color: var(--amberline);
  background: var(--s4);
}

.liu-genre-option.selected {
  border-color: var(--amber);
  background: var(--amberbg);
  color: var(--amber);
}

.liu-genre-name {
  font-size: 12px;
  font-weight: 700;
  color: var(--tx1);
  margin-bottom: 4px;
}

.liu-genre-option.selected .liu-genre-name {
  color: var(--amber);
}

.liu-score-prediction {
  font-size: 11px;
  color: var(--tx3);
  font-family: var(--mono);
}

.liu-migrate-preview {
  background: var(--s3);
  border: 1px solid var(--b2);
  border-radius: var(--r2);
  padding: 12px;
  font-size: 11px;
  color: var(--tx2);
  line-height: 1.6;
  margin-bottom: 16px;
  display: none;
}

.liu-migrate-preview.visible {
  display: block;
}

.liu-migrate-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  border-radius: var(--r2);
  border: 1px solid var(--b2);
  background: var(--s3);
  color: var(--tx1);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}

.liu-migrate-btn:hover {
  background: var(--s4);
  border-color: var(--amberline);
  color: var(--amber);
}

/* Changelog Panel */
.liu-changelog-panel {
  background: var(--s2);
  border: 1px solid var(--b2);
  border-radius: var(--r3);
  padding: 24px;
  margin-bottom: 24px;
}

.liu-changelog-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--tx1);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.liu-changelog-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.liu-change-item {
  padding: 12px;
  background: var(--s3);
  border: 1px solid var(--b2);
  border-radius: var(--r2);
  cursor: pointer;
  transition: all 0.15s;
}

.liu-change-item:hover {
  border-color: var(--b3);
  background: var(--s4);
}

.liu-change-item.expanded {
  border-color: var(--amberline);
}

.liu-change-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.liu-change-label {
  font-size: 12px;
  font-weight: 700;
  color: var(--tx1);
}

.liu-change-arrow {
  color: var(--tx3);
  transition: transform 0.2s;
  font-size: 14px;
}

.liu-change-item.expanded .liu-change-arrow {
  transform: rotate(180deg);
}

.liu-change-details {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--b2);
  display: none;
}

.liu-change-item.expanded .liu-change-details {
  display: block;
}

.liu-diff-line {
  margin-bottom: 6px;
  font-size: 11px;
  font-family: var(--mono);
  line-height: 1.4;
}

.liu-diff-removed {
  color: var(--liu-red);
  background: rgba(248, 113, 113, 0.06);
  padding: 2px 4px;
  border-radius: 2px;
  text-decoration: line-through;
}

.liu-diff-added {
  color: var(--liu-green);
  background: rgba(74, 222, 128, 0.06);
  padding: 2px 4px;
  border-radius: 2px;
}

.liu-change-reason {
  margin-top: 8px;
  padding: 8px;
  background: var(--liu-gray-soft);
  border-radius: var(--r1);
  font-size: 11px;
  color: var(--tx3);
  line-height: 1.5;
}

.liu-change-reason strong {
  color: var(--tx2);
}

/* Action Bar */
.liu-action-bar {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.liu-action-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  border-radius: var(--r2);
  border: 1px solid var(--b2);
  background: var(--s3);
  color: var(--tx1);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}

.liu-action-btn:hover:not(:disabled) {
  background: var(--s4);
  border-color: var(--b3);
  transform: translateY(-1px);
}

.liu-action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.liu-action-btn-primary {
  border-color: var(--amberline);
  background: var(--amber);
  color: #08080a;
  font-weight: 700;
}

.liu-action-btn-primary:hover {
  background: #ffc820;
  border-color: transparent;
}

/* Animations */
@keyframes scoreImprove {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes issueFixed {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  70% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes barGrow {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

/* Responsive */
@media (max-width: 900px) {
  .liu-comparison {
    grid-template-columns: 1fr;
  }

  .liu-metrics-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .liu-action-bar {
    flex-direction: column;
  }

  .liu-action-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 640px) {
  .liu-score-dashboard {
    padding: 16px;
  }

  .liu-score-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .liu-metrics-grid {
    grid-template-columns: 1fr;
  }

  .liu-score-number {
    font-size: 36px;
  }

  .liu-issue-card {
    flex-direction: column;
  }

  .liu-issue-icon {
    width: 24px;
    height: 24px;
    font-size: 16px;
  }

  .liu-available-genres {
    grid-template-columns: repeat(2, 1fr);
  }
}
`;

// ============================================================================
// HTML TEMPLATES
// ============================================================================

function getScoreDashboardHTML(scoreData) {
  const metrics = scoreData.metrics || {};
  const metricItems = Object.entries(metrics)
    .map(([key, value]) => {
      const score = value.score || 0;
      const percentage = Math.min(100, Math.max(0, score));
      let colorClass = 'red';
      if (score >= 70) colorClass = 'green';
      else if (score >= 40) colorClass = 'amber';

      return `
        <div class="liu-metric-item">
          <div class="liu-metric-label">${key}</div>
          <div class="liu-metric-bar-wrap">
            <div class="liu-metric-bar ${colorClass}" style="width: ${percentage}%"></div>
          </div>
          <div class="liu-metric-value">${score}/100</div>
        </div>
      `;
    })
    .join('');

  return `
    <div class="liu-score-dashboard">
      <div class="liu-score-header">
        <span class="liu-score-title">📊 Song Score</span>
        <div class="liu-score-toggle">
          <button class="liu-toggle-btn active" data-toggle="before">Before</button>
          <button class="liu-toggle-btn" data-toggle="after">After</button>
        </div>
      </div>

      <div class="liu-overall-score">
        <div>
          <div class="liu-score-number" id="liu-overall-score">${scoreData.overall || 0}</div>
        </div>
        <div class="liu-score-label">
          <div class="liu-score-label-text">Overall Score</div>
          <div class="liu-score-impact" id="liu-score-impact">+${scoreData.improvement || 0} pts</div>
        </div>
      </div>

      <div style="margin-top: 24px;">
        <div class="liu-metrics-grid" id="liu-metrics-grid">
          ${metricItems}
        </div>
      </div>
    </div>
  `;
}

function getIssueCardsHTML(issues) {
  const cards = (issues || [])
    .map((issue, idx) => `
      <div class="liu-issue-card" id="liu-issue-${idx}">
        <div class="liu-issue-icon">${issue.icon || '⚠️'}</div>
        <div class="liu-issue-content" style="flex: 1;">
          <div class="liu-issue-header">
            <span class="liu-issue-type">${issue.type || 'Issue'}</span>
            <span class="liu-severity-badge liu-severity-${issue.severity || 'info'}">
              ${issue.severity || 'info'}
            </span>
          </div>
          <div class="liu-affected-line">Line <strong>${issue.line || '?'}</strong>: ${issue.description || ''}</div>

          <div class="liu-comparison">
            <div>
              <div style="font-size: 10px; color: var(--tx3); margin-bottom: 4px;">Current</div>
              <div class="liu-text-block removed">${issue.current || ''}</div>
            </div>
            <div>
              <div style="font-size: 10px; color: var(--tx3); margin-bottom: 4px;">Suggested</div>
              <div class="liu-text-block added">${issue.suggested || ''}</div>
            </div>
          </div>

          <div style="display: flex; gap: 8px; align-items: center; margin-top: 10px; flex-wrap: wrap;">
            <span class="liu-impact-badge">+${issue.impact || 5} pts</span>
          </div>
        </div>

        <div class="liu-issue-actions">
          <button class="liu-fix-btn" onclick="liuApplyFix(${idx})">⚡ Fix</button>
        </div>
      </div>
    `)
    .join('');

  return `
    <div style="margin-bottom: 24px;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; flex-wrap: wrap; gap: 12px;">
        <h3 class="liu-score-title" style="margin: 0;">Issues Found</h3>
        <button class="liu-fix-all-btn" onclick="liuFixAll()" id="liu-fix-all-btn">✓ Fix All Issues</button>
      </div>
      <div class="liu-issues-container">
        ${cards}
      </div>
    </div>
  `;
}

function getGenrePanelHTML(currentGenre, genres, currentMatch) {
  const genreOptions = (genres || [])
    .map(genre => `
      <div class="liu-genre-option" onclick="liuSelectGenre('${genre.id}', this)">
        <div class="liu-genre-name">${genre.name}</div>
        <div class="liu-score-prediction">${genre.score || 75}/100</div>
      </div>
    `)
    .join('');

  return `
    <div class="liu-genre-panel">
      <div class="liu-genre-header">
        <div>
          <div class="liu-score-title">🎵 Genre Migration</div>
          <div style="margin-top: 8px;">
            <span class="liu-genre-badge">
              ${currentGenre || 'Pop'}
              <span class="liu-genre-match">${currentMatch || 87}% match</span>
            </span>
          </div>
        </div>
      </div>

      <div style="margin-bottom: 16px;">
        <div style="font-size: 12px; font-weight: 600; color: var(--tx2); margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.02em;">Available Genres</div>
        <div class="liu-available-genres">
          ${genreOptions}
        </div>
      </div>

      <div class="liu-migrate-preview" id="liu-migrate-preview">
        <strong>What Changes:</strong> Will adjust chord voicings, tempo feel, and lyrical emphasis to match genre conventions.
      </div>

      <button class="liu-migrate-btn" onclick="liuMigrateGenre()" id="liu-migrate-btn" style="display: none;">→ Migrate Genre</button>
    </div>
  `;
}

function getChangelogHTML(changes) {
  const items = (changes || [])
    .map((change, idx) => `
      <div class="liu-change-item" id="liu-change-${idx}" onclick="liuToggleChange(${idx})">
        <div class="liu-change-header">
          <span class="liu-change-label">${change.label || 'Change ' + (idx + 1)}</span>
          <span class="liu-change-arrow">▼</span>
        </div>
        <div class="liu-change-details">
          <div class="liu-diff-line">
            <span class="liu-diff-removed">${change.removed || 'old text'}</span>
          </div>
          <div class="liu-diff-line">
            <span class="liu-diff-added">${change.added || 'new text'}</span>
          </div>
          <div class="liu-change-reason">
            <strong>Why:</strong> ${change.reason || 'Improves overall score and flow'}
          </div>
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="liu-changelog-panel">
      <div class="liu-changelog-title">📝 Change Log</div>
      <div class="liu-changelog-list">
        ${items}
      </div>
    </div>
  `;
}

function getActionBarHTML() {
  return `
    <div class="liu-action-bar">
      <button class="liu-action-btn liu-action-btn-primary" onclick="liuCopyLyrics()">
        📋 Copy Upgraded Lyrics
      </button>
      <button class="liu-action-btn" onclick="liuSaveUpgrade()">
        💾 Save
      </button>
      <button class="liu-action-btn" onclick="liuPasteNewLyrics()">
        📥 Paste New Lyrics
      </button>
      <button class="liu-action-btn" onclick="liuUndoAll()">
        ↩️ Undo All
      </button>
    </div>
  `;
}

// ============================================================================
// RENDERING FUNCTIONS
// ============================================================================

function renderScoreDashboard(container, scoreData) {
  if (!container) return;
  const html = getScoreDashboardHTML(scoreData);
  container.innerHTML = html;

  // Attach toggle listeners
  container.querySelectorAll('.liu-toggle-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      container.querySelectorAll('.liu-toggle-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const state = this.dataset.toggle;
      liuToggleScoreState(state);
    });
  });
}

function renderIssueCards(container, issues) {
  if (!container) return;
  const html = getIssueCardsHTML(issues);
  container.innerHTML = html;

  // Add animations on render
  container.querySelectorAll('.liu-issue-card').forEach((card, i) => {
    setTimeout(() => {
      card.style.animation = `fadeIn 0.3s ease forwards`;
    }, i * 50);
  });
}

function renderGenrePanel(container, currentGenre, genres, currentMatch) {
  if (!container) return;
  const html = getGenrePanelHTML(currentGenre, genres, currentMatch);
  container.innerHTML = html;
}

function renderChangelog(container, changes) {
  if (!container) return;
  const html = getChangelogHTML(changes);
  container.innerHTML = html;
}

function renderActionBar(container) {
  if (!container) return;
  container.innerHTML = getActionBarHTML();
}

// ============================================================================
// EVENT HANDLERS
// ============================================================================

function liuApplyFix(issueIndex) {
  const card = document.getElementById(`liu-issue-${issueIndex}`);
  if (!card) return;

  card.classList.add('fixed');

  // Animate score increase
  const scoreNum = document.getElementById('liu-overall-score');
  if (scoreNum) {
    scoreNum.classList.add('improving');
    const current = parseInt(scoreNum.textContent);
    const target = Math.min(100, current + 5);
    scoreNum.textContent = target;

    setTimeout(() => scoreNum.classList.remove('improving'), 600);
  }

  // Disable button
  const btn = card.querySelector('.liu-fix-btn');
  if (btn) btn.disabled = true;
}

function liuFixAll() {
  const cards = document.querySelectorAll('.liu-issue-card:not(.fixed)');
  cards.forEach((card, idx) => {
    setTimeout(() => {
      const btn = card.querySelector('.liu-fix-btn');
      if (btn) btn.click();
    }, idx * 100);
  });
}

function liuToggleScoreState(state) {
  console.log('Toggle score state:', state);
  // Update metrics based on before/after
}

function liuSelectGenre(genreId, element) {
  document.querySelectorAll('.liu-genre-option').forEach(opt => {
    opt.classList.remove('selected');
  });
  element.classList.add('selected');

  const preview = document.getElementById('liu-migrate-preview');
  const btn = document.getElementById('liu-migrate-btn');
  if (preview) preview.classList.add('visible');
  if (btn) btn.style.display = 'inline-flex';
}

function liuMigrateGenre() {
  const selected = document.querySelector('.liu-genre-option.selected');
  if (!selected) return;

  const genreName = selected.querySelector('.liu-genre-name').textContent;
  console.log('Migrating to genre:', genreName);
  alert(`Genre migrated to: ${genreName}`);
}

function liuToggleChange(changeIndex) {
  const item = document.getElementById(`liu-change-${changeIndex}`);
  if (item) {
    item.classList.toggle('expanded');
  }
}

function liuCopyLyrics() {
  console.log('Copy upgraded lyrics');
  alert('Lyrics copied to clipboard');
}

function liuSaveUpgrade() {
  console.log('Save upgrade');
  alert('Upgrade saved');
}

function liuPasteNewLyrics() {
  console.log('Paste new lyrics');
  alert('Ready to paste new lyrics');
}

function liuUndoAll() {
  if (confirm('Undo all changes?')) {
    location.reload();
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function liuAnimateScore(oldScore, newScore, element) {
  if (!element) return;

  const duration = 600;
  const startTime = Date.now();
  const difference = newScore - oldScore;

  function update() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const current = Math.round(oldScore + difference * progress);
    element.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  update();
}

function liuAnimateMetricBar(barElement, fromWidth, toWidth) {
  if (!barElement) return;

  barElement.style.transition = 'none';
  barElement.style.width = fromWidth + '%';

  requestAnimationFrame(() => {
    barElement.style.transition = 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    barElement.style.width = toWidth + '%';
  });
}

// Export for use in main app
window.LIU = {
  STYLES: LIU_STYLES,
  renderScoreDashboard,
  renderIssueCards,
  renderGenrePanel,
  renderChangelog,
  renderActionBar,
  getScoreDashboardHTML,
  getIssueCardsHTML,
  getGenrePanelHTML,
  getChangelogHTML,
  getActionBarHTML,
  liuApplyFix,
  liuFixAll,
  liuToggleScoreState,
  liuSelectGenre,
  liuMigrateGenre,
  liuToggleChange,
  liuCopyLyrics,
  liuSaveUpgrade,
  liuPasteNewLyrics,
  liuUndoAll,
  liuAnimateScore,
  liuAnimateMetricBar,
};
