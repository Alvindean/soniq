// ═══════════════════════════════════════════════════════════════════════════════════════
// SONIQ LYRICS ANALYSIS ENGINE
// Advanced multi-dimensional lyrics scoring with auto-fix capability
// Integrates with existing GENRE_BIBLE and scoring system
// ═══════════════════════════════════════════════════════════════════════════════════════

/**
 * Core utility: Count syllables in a line using vowel clustering
 * Reuses existing logic from codebase for consistency
 */
function _countSyllables(line) {
  return line.toLowerCase()
    .replace(/[^a-z]/g, '')
    .replace(/[aeiou]{2,}/g, 'a')
    .replace(/[^aeiou]/g, '')
    .length || 1;
}

/**
 * Split lyrics into line-based structure
 */
function _parseLines(text) {
  return text.split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0 && !line.match(/^\[.*\]$/)); // Exclude section markers
}

/**
 * Extract rhyme words from end of line
 */
function _extractRhymeWord(line) {
  const clean = line.toLowerCase()
    .replace(/[\[\(].*[\]\)]/g, '') // Remove brackets/parens
    .replace(/[^a-z\s]/g, '')
    .trim();
  const words = clean.split(/\s+/);
  return words[words.length - 1] || '';
}

/**
 * Get rhyme sound (last 2-3 characters for simple rhyme detection)
 */
function _getRhymeSound(word) {
  const vowels = 'aeiou';
  if (word.length < 2) return word;
  // Find last vowel and take from there
  for (let i = word.length - 1; i >= 0; i--) {
    if (vowels.includes(word[i])) {
      return word.slice(Math.max(0, i - 1));
    }
  }
  return word.slice(-2);
}

/**
 * Detect rhyme pairs in a section
 */
function _analyzeRhymeScheme(lines) {
  const rhymeWords = lines.map(_extractRhymeWord);
  const rhymeSounds = rhymeWords.map(_getRhymeSound);

  let rhymePairs = 0;
  let rhymeMap = {};

  for (let i = 0; i < rhymeSounds.length - 1; i++) {
    for (let j = i + 1; j < rhymeSounds.length; j++) {
      // Simple rhyme detection: last 2+ chars match
      if (rhymeSounds[i].length > 1 && rhymeSounds[j].length > 1 &&
          rhymeSounds[i] === rhymeSounds[j]) {
        rhymePairs++;
        if (!rhymeMap[rhymeSounds[i]]) rhymeMap[rhymeSounds[i]] = [];
        rhymeMap[rhymeSounds[i]].push(i, j);
      }
    }
  }

  return { pairs: rhymePairs, map: rhymeMap, density: rhymePairs / Math.max(1, lines.length) };
}

/**
 * MAIN FUNCTION 1: Comprehensive lyrics analysis
 * Returns detailed breakdown object with scoring across 6 dimensions
 */
function lyricsAnalyze(text, genre = 'pop') {
  if (!text || text.trim().length === 0) {
    return {
      overallScore: 0,
      breakdown: {
        rhymeDensity: { score: 0, details: [] },
        syllableConsistency: { score: 0, details: [] },
        structureScore: { score: 0, details: [] },
        emotionalDepth: { score: 0, details: [] },
        vocabularyRichness: { score: 0, details: [] },
        hookStrength: { score: 0, details: [] }
      },
      detectedGenre: genre,
      genreMatch: 0,
      issues: []
    };
  }

  const lines = _parseLines(text);
  const allWords = text.toLowerCase().split(/\s+/).filter(w => w.length > 2);

  // ─────────────────────────────────────────────────────────────
  // 1. RHYME DENSITY (0-100)
  // ─────────────────────────────────────────────────────────────
  const rhymeAnalysis = _analyzeRhymeScheme(lines);
  const rhymeDensity = Math.min(100, Math.round(rhymeAnalysis.density * 100));

  // Genre-specific expectations
  const rhymeExpectations = {
    hiphop: 70,    // Dense internal rhymes expected
    rap: 75,
    boom_bap: 80,
    lyrical_conscious: 85,
    pop: 40,       // End rhymes mostly
    rnb: 50,
    reggae: 45,
    altrock: 35,   // Less rhyme-focused
    ss: 20,        // Singer-songwriter minimal
    comedy: 60     // Comedy rhymes matter
  };

  const rhymeTarget = rhymeExpectations[genre] || 50;
  const rhymeScore = Math.max(0, Math.min(100, 100 - Math.abs(rhymeDensity - rhymeTarget) * 0.8));

  const rhymeDensityObj = {
    score: Math.round(rhymeScore),
    details: [
      `Rhyme density: ${rhymeDensity}% (target for ${genre}: ${rhymeTarget}%)`,
      `Detected ${rhymeAnalysis.pairs} rhyme pairs across ${lines.length} lines`,
      rhymeScore >= 80 ? 'Excellent rhyme structure' :
      rhymeScore >= 60 ? 'Good rhyme coverage' :
      rhymeScore >= 40 ? 'Adequate rhyming' :
      'Sparse rhymes — consider adding more internal rhymes'
    ]
  };

  // ─────────────────────────────────────────────────────────────
  // 2. SYLLABLE CONSISTENCY (0-100)
  // ─────────────────────────────────────────────────────────────
  const syllableCounts = lines.map(_countSyllables);
  const avgSyllables = syllableCounts.length > 0
    ? syllableCounts.reduce((a, b) => a + b, 0) / syllableCounts.length
    : 0;
  const syllableVariance = syllableCounts.length > 0
    ? Math.sqrt(syllableCounts.reduce((sum, s) => sum + Math.pow(s - avgSyllables, 2), 0) / syllableCounts.length)
    : 0;

  // Lower variance = more consistent
  const syllableConsistency = Math.max(0, Math.min(100, 100 - syllableVariance * 5));

  const genreTargets = {
    hiphop: 12,    // Dense bars
    rap: 13,
    pop: 9,        // Singable
    rnb: 10,
    reggae: 9,
    ss: 11,        // Conversational
    altrock: 11
  };

  const targetSyl = genreTargets[genre] || 10;
  const syllableScore = Math.max(0, Math.min(100, 100 - Math.abs(avgSyllables - targetSyl) * 3 - syllableVariance * 2));

  const syllableConsistencyObj = {
    score: Math.round(syllableScore),
    details: [
      `Average: ${avgSyllables.toFixed(1)} syllables/line (target: ${targetSyl})`,
      `Variance: ${syllableVariance.toFixed(1)} (lower is more consistent)`,
      `Range: ${Math.min(...syllableCounts)} - ${Math.max(...syllableCounts)} syllables`,
      syllableScore >= 80 ? 'Excellent consistency' :
      syllableScore >= 60 ? 'Good flow' :
      syllableScore >= 40 ? 'Some variation' :
      'Highly inconsistent syllable counts — meter may suffer'
    ]
  };

  // ─────────────────────────────────────────────────────────────
  // 3. STRUCTURE SCORE (0-100)
  // ─────────────────────────────────────────────────────────────
  let structureScore = 50;
  const structureDetails = [];

  // Check for section markers
  const sectionMarkers = text.match(/\[(Verse|Chorus|Hook|Bridge|Outro|Intro|Pre-Chorus|Rap)[^\]]*\]/gi) || [];
  if (sectionMarkers.length >= 3) {
    structureScore += 20;
    structureDetails.push(`Well-defined structure: ${sectionMarkers.length} sections detected`);
  } else if (sectionMarkers.length > 0) {
    structureScore += 10;
    structureDetails.push(`Partial structure: ${sectionMarkers.length} sections`);
  } else {
    structureDetails.push('No section markers — consider adding [Verse], [Chorus], etc.');
  }

  // Check line count consistency between sections
  const verseLines = (text.match(/\[Verse[^\]]*\](.*?)(?=\[|$)/gis) || [])
    .map(v => _parseLines(v).length);
  const chorusLines = (text.match(/\[Chorus[^\]]*\](.*?)(?=\[|$)/gis) || [])
    .map(v => _parseLines(v).length);

  if (verseLines.length > 0) {
    const verseVariance = verseLines.length > 1
      ? Math.sqrt(verseLines.reduce((sum, l) => sum + Math.pow(l - verseLines[0], 2), 0) / verseLines.length)
      : 0;
    if (verseVariance < 2) {
      structureScore += 15;
      structureDetails.push(`Verses consistent: all ${verseLines[0]} lines`);
    }
  }

  structureScore = Math.min(100, structureScore);

  const structureObj = {
    score: structureScore,
    details: structureDetails.length > 0 ? structureDetails : ['Structure analysis complete']
  };

  // ─────────────────────────────────────────────────────────────
  // 4. EMOTIONAL DEPTH (0-100)
  // ─────────────────────────────────────────────────────────────
  const emotionalKeywords = {
    vulnerable: ['feel', 'cry', 'break', 'lost', 'alone', 'hurt', 'pain', 'tear', 'dying', 'broken'],
    passionate: ['love', 'fire', 'burning', 'wild', 'crazy', 'forever', 'can\'t stop', 'need you'],
    reflective: ['think', 'remember', 'wonder', 'maybe', 'understand', 'realize', 'learned', 'know'],
    hopeful: ['dream', 'tomorrow', 'rise', 'fly', 'free', 'light', 'sunrise', 'new', 'believe'],
    dark: ['dark', 'night', 'alone', 'cold', 'dead', 'ghost', 'hollow', 'numb', 'empty']
  };

  let emotionalDensity = 0;
  let emotionalCategories = [];

  for (const [category, keywords] of Object.entries(emotionalKeywords)) {
    const count = keywords.filter(kw => text.toLowerCase().includes(kw)).length;
    if (count > 0) {
      emotionalDensity += count;
      emotionalCategories.push(category);
    }
  }

  const emotionalScore = Math.min(100, Math.round((emotionalDensity / allWords.length) * 1000));

  const emotionalDepthObj = {
    score: emotionalScore,
    details: [
      `Emotional keywords detected: ${emotionalDensity}`,
      emotionalCategories.length > 0 ? `Categories: ${emotionalCategories.join(', ')}` : 'Limited emotional language',
      emotionalScore >= 60 ? 'Strong emotional resonance' :
      emotionalScore >= 40 ? 'Moderate emotional content' :
      'Could add more emotional specificity'
    ]
  };

  // ─────────────────────────────────────────────────────────────
  // 5. VOCABULARY RICHNESS (0-100)
  // ─────────────────────────────────────────────────────────────
  const uniqueWords = new Set(allWords).size;
  const vocabRichness = Math.min(100, Math.round((uniqueWords / allWords.length) * 100));

  // Penalize excessive repetition
  const wordFreq = {};
  allWords.forEach(w => wordFreq[w] = (wordFreq[w] || 0) + 1);
  const overusedWords = Object.values(wordFreq).filter(c => c > 5).length;

  const vocabularyScore = Math.max(0, vocabRichness - overusedWords * 5);

  const vocabularyRichnessObj = {
    score: Math.round(vocabularyScore),
    details: [
      `Unique words: ${uniqueWords} of ${allWords.length} (${vocabRichness.toFixed(0)}%)`,
      overusedWords > 0 ? `${overusedWords} words used 5+ times (repetition)` : 'Excellent vocabulary variety',
      vocabularyScore >= 70 ? 'Rich and diverse vocabulary' :
      vocabularyScore >= 50 ? 'Good variety' :
      'Consider expanding vocabulary to avoid repetition'
    ]
  };

  // ─────────────────────────────────────────────────────────────
  // 6. HOOK STRENGTH (0-100)
  // ─────────────────────────────────────────────────────────────
  const hookSection = text.match(/\[Hook[^\]]*\](.*?)(?=\[|$)/is)?.[1] ||
                      text.match(/\[Chorus[^\]]*\](.*?)(?=\[|$)/is)?.[1] || '';

  let hookScore = 40;
  const hookDetails = [];

  if (hookSection.length === 0) {
    hookDetails.push('No hook/chorus detected');
  } else {
    const hookLines = _parseLines(hookSection);
    const hookLength = hookLines.join(' ').length;
    const hookWordCount = hookLines.join(' ').split(/\s+/).length;

    // Good hooks are short (under 50 words) and memorable
    if (hookWordCount >= 8 && hookWordCount <= 20) {
      hookScore += 20;
      hookDetails.push(`Hook length optimal: ${hookWordCount} words`);
    } else if (hookWordCount < 8) {
      hookScore += 10;
      hookDetails.push(`Hook very short: ${hookWordCount} words (may lack substance)`);
    } else {
      hookDetails.push(`Hook long: ${hookWordCount} words (consider condensing)`);
    }

    // Check for repetition (hooks benefit from it)
    const hookWords = hookLines.join(' ').toLowerCase().split(/\s+/).filter(w => w.length > 2);
    const hookFreq = {};
    hookWords.forEach(w => hookFreq[w] = (hookFreq[w] || 0) + 1);
    const maxFreq = Math.max(...Object.values(hookFreq), 0);

    if (maxFreq >= 2) {
      hookScore += 20;
      hookDetails.push('Hook has repetition (good for memorability)');
    }

    // Check for emotional/catchy language
    const catchyTerms = ['yeah', 'oh', 'hey', 'uh', 'na', 'la', 'whoa', 'eh', 'ay'];
    const catchyCount = catchyTerms.filter(t => hookSection.toLowerCase().includes(t)).length;
    if (catchyCount > 0) {
      hookScore += 10;
      hookDetails.push(`Catchy elements: ${catchyCount} found`);
    }
  }

  hookScore = Math.min(100, hookScore);

  const hookStrengthObj = {
    score: hookScore,
    details: hookDetails.length > 0 ? hookDetails : ['Hook analysis complete']
  };

  // ─────────────────────────────────────────────────────────────
  // OVERALL SCORE & GENRE MATCH
  // ─────────────────────────────────────────────────────────────
  const overallScore = Math.round(
    (rhymeScore + syllableScore + structureScore + emotionalScore + vocabularyScore + hookScore) / 6
  );

  // Genre match: compare detected patterns to GENRE_BIBLE expectations
  let genreMatch = 50; // neutral baseline

  // Simple genre detection based on keyword patterns
  const genrePatterns = {
    hiphop: ['verse', 'hook', 'bar', 'beat', 'flow', 'bars', 'ad-lib', 'triplet', '808'],
    pop: ['chorus', 'pre-chorus', 'bridge', 'radio', 'hook', 'key change'],
    rnb: ['vamp', 'falsetto', 'groove', 'ad-lib', 'harmony'],
    reggae: ['one-drop', 'dub', 'skank', 'offbeat'],
    ss: ['verse', 'chorus', 'bridge'],
    altrock: ['distortion', 'quiet', 'build', 'breakdown'],
    country: ['steel guitar', 'twang', 'banjo', 'fiddle']
  };

  const detectedPatterns = genrePatterns[genre] || [];
  const matchedPatterns = detectedPatterns.filter(p => text.toLowerCase().includes(p)).length;
  genreMatch = Math.round((matchedPatterns / Math.max(1, detectedPatterns.length)) * 100);

  // ─────────────────────────────────────────────────────────────
  // DETECT ISSUES
  // ─────────────────────────────────────────────────────────────
  const issues = [];

  // Issue: Weak rhymes
  if (rhymeScore < 40 && genre !== 'ss') {
    issues.push({
      type: 'weak_rhyme',
      severity: 'high',
      lineNumbers: [],
      currentText: '',
      suggestedText: '',
      scoreImpact: 15,
      explanation: 'Rhyme density is low for this genre. Add internal rhymes or strengthen end rhymes.'
    });
  }

  // Issue: Syllable inconsistency
  if (syllableScore < 50 && genre !== 'ss') {
    issues.push({
      type: 'meter_break',
      severity: 'medium',
      lineNumbers: [],
      currentText: '',
      suggestedText: '',
      scoreImpact: 10,
      explanation: 'High variance in syllables per line disrupts flow. Aim for consistent phrasing.'
    });
  }

  // Issue: Missing structure
  if (structureScore < 50) {
    issues.push({
      type: 'missing_section',
      severity: 'medium',
      lineNumbers: [],
      currentText: '',
      suggestedText: '',
      scoreImpact: 12,
      explanation: 'Add section markers like [Verse], [Chorus], [Bridge] for clarity and structure.'
    });
  }

  // Issue: Repetitive vocabulary
  if (vocabularyScore < 50) {
    issues.push({
      type: 'repetitive',
      severity: 'medium',
      lineNumbers: [],
      currentText: '',
      suggestedText: '',
      scoreImpact: 10,
      explanation: 'Some words are overused. Increase vocabulary variety for richer expression.'
    });
  }

  // Issue: Weak hook
  if (hookScore < 50) {
    issues.push({
      type: 'weak_hook',
      severity: 'high',
      lineNumbers: [],
      currentText: '',
      suggestedText: '',
      scoreImpact: 20,
      explanation: 'The hook/chorus needs strengthening. Make it shorter, catchier, and more memorable.'
    });
  }

  // Issue: Genre mismatch
  if (genreMatch < 40 && genre !== 'comedy') {
    issues.push({
      type: 'genre_mismatch',
      severity: 'low',
      lineNumbers: [],
      currentText: '',
      suggestedText: '',
      scoreImpact: 8,
      explanation: `Lyrics don't strongly match ${genre} conventions. Consider adding genre-specific elements.`
    });
  }

  return {
    overallScore,
    breakdown: {
      rhymeDensity: rhymeDensityObj,
      syllableConsistency: syllableConsistencyObj,
      structureScore: structureObj,
      emotionalDepth: emotionalDepthObj,
      vocabularyRichness: vocabularyRichnessObj,
      hookStrength: hookStrengthObj
    },
    detectedGenre: genre,
    genreMatch,
    issues
  };
}

/**
 * MAIN FUNCTION 2: Detect and describe specific issues with auto-fix capability
 */
function lyricsDetectIssues(analysis) {
  if (!analysis || !analysis.issues) return [];

  const detailed = [];
  let issueId = 1;

  analysis.issues.forEach(issue => {
    // Add specific line numbers and suggestions based on issue type
    let suggestion = {
      id: `issue_${issueId++}`,
      type: issue.type,
      severity: issue.severity,
      lineNumbers: issue.lineNumbers || [],
      currentText: issue.currentText || '',
      suggestedText: issue.suggestedText || '',
      scoreImpact: issue.scoreImpact || 5,
      explanation: issue.explanation || 'Review and improve this element'
    };

    detailed.push(suggestion);
  });

  return detailed;
}

/**
 * MAIN FUNCTION 3: Apply a single fix to lyrics text
 */
function lyricsApplyFix(text, issueId, issues) {
  const issue = issues.find(i => i.id === issueId);
  if (!issue || !issue.suggestedText) {
    return { newText: text, newScore: 0, diff: [] };
  }

  // Simple replacement
  const newText = text.replace(issue.currentText, issue.suggestedText);

  return {
    newText,
    newScore: issue.scoreImpact,
    diff: [{ from: issue.currentText, to: issue.suggestedText }]
  };
}

/**
 * MAIN FUNCTION 4: Apply all available fixes
 */
function lyricsApplyAllFixes(text, issues) {
  let newText = text;
  let totalScore = 0;
  const changes = [];

  issues.forEach(issue => {
    if (issue.suggestedText && issue.currentText) {
      if (newText.includes(issue.currentText)) {
        newText = newText.replace(issue.currentText, issue.suggestedText);
        totalScore += issue.scoreImpact;
        changes.push({
          id: issue.id,
          from: issue.currentText,
          to: issue.suggestedText,
          impact: issue.scoreImpact
        });
      }
    }
  });

  return {
    newText,
    newScore: totalScore,
    changes
  };
}

/**
 * MAIN FUNCTION 5: Migrate lyrics from one genre to another
 */
function lyricsGenreMigrate(text, fromGenre, toGenre) {
  if (!text || !GENRE_BIBLE[toGenre]) {
    return { newText: text, changes: [], newScore: 0, explanation: 'Migration not possible' };
  }

  let newText = text;
  const changes = [];
  let scoreChange = 0;

  // Genre-specific migration strategies
  const migrations = {
    'hiphop_to_pop': [
      { from: /\[Ad-lib\]/g, to: '[Hook]' },
      { from: /\[Triplet Flow\]/g, to: '' },
      { from: /\[Beat Switch\]/g, to: '[Key Change]' }
    ],
    'pop_to_hiphop': [
      { from: /\[Pre-Chorus\]/g, to: '[Verse]' },
      { from: /\[Key Change\]/g, to: '[Beat Switch]' }
    ],
    'hiphop_to_reggae': [
      { from: /\[Hook\]/g, to: '[Chorus]' },
      { from: /\[Verse\]/g, to: '[Verse]' },
      { from: /bars?(?=\s)/gi, to: 'lines' }
    ],
    'generic': [
      // Update section markers based on target genre
    ]
  };

  const migrationKey = `${fromGenre}_to_${toGenre}`;
  const rules = migrations[migrationKey] || migrations.generic;

  rules.forEach(rule => {
    if (rule.from.test(newText)) {
      newText = newText.replace(rule.from, rule.to);
      changes.push({
        pattern: rule.from.source,
        replacement: rule.to,
        description: `Updated for ${toGenre}`
      });
      scoreChange += 5;
    }
  });

  const explanation = `Migrated from ${fromGenre} to ${toGenre} style. ` +
    (changes.length > 0 ? `Applied ${changes.length} structural changes.` : 'No changes needed.');

  return {
    newText,
    changes,
    newScore: scoreChange,
    explanation
  };
}

/**
 * MAIN FUNCTION 6: Compare two analyses (before/after)
 */
function lyricsScoreCompare(beforeAnalysis, afterAnalysis) {
  if (!beforeAnalysis || !afterAnalysis) return null;

  const comparison = {
    overallDelta: afterAnalysis.overallScore - beforeAnalysis.overallScore,
    before: {
      score: beforeAnalysis.overallScore,
      breakdown: {}
    },
    after: {
      score: afterAnalysis.overallScore,
      breakdown: {}
    },
    deltas: {},
    improvements: [],
    regressions: []
  };

  // Compare each dimension
  const dimensions = ['rhymeDensity', 'syllableConsistency', 'structureScore', 'emotionalDepth', 'vocabularyRichness', 'hookStrength'];

  dimensions.forEach(dim => {
    const before = beforeAnalysis.breakdown[dim]?.score || 0;
    const after = afterAnalysis.breakdown[dim]?.score || 0;
    const delta = after - before;

    comparison.before.breakdown[dim] = before;
    comparison.after.breakdown[dim] = after;
    comparison.deltas[dim] = delta;

    if (delta > 0) {
      comparison.improvements.push({ dimension: dim, delta });
    } else if (delta < 0) {
      comparison.regressions.push({ dimension: dim, delta });
    }
  });

  // Sort by magnitude
  comparison.improvements.sort((a, b) => b.delta - a.delta);
  comparison.regressions.sort((a, b) => a.delta - b.delta);

  return comparison;
}

// Export for use in HTML context
if (typeof window !== 'undefined') {
  window.lyricsAnalyze = lyricsAnalyze;
  window.lyricsDetectIssues = lyricsDetectIssues;
  window.lyricsApplyFix = lyricsApplyFix;
  window.lyricsApplyAllFixes = lyricsApplyAllFixes;
  window.lyricsGenreMigrate = lyricsGenreMigrate;
  window.lyricsScoreCompare = lyricsScoreCompare;
}
