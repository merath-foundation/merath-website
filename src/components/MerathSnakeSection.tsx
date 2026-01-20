// Merath Snake Section: interactive metaphor for tracing memory and translation across a grid of regions.
// The snake collects "memory fragments" instead of dots; special archive items briefly slow time and reveal the trail of past paths.
import React, { useEffect, useMemo, useState } from 'react';
import { sanityClient } from '../lib/sanityClient';
import { PortableTextRenderer } from './PortableTextRenderer';
import SnakeGame from './SnakeGame';
import './MerathSnakeSection.css';

interface MerathSnakeSectionProps {
  direction: 'rtl' | 'ltr';
  language: 'ar' | 'en';
}

interface ThemeConfig {
  backgroundColor?: string;
  snakeColor?: string;
  fragmentColor?: string;
  specialItemColor?: string;
  trailColor?: string;
  borderColor?: string;
  textColor?: string;
}

interface MemoryFragment {
  key?: string;
  textEn?: string;
  textAr?: string;
}

interface SnakeGameDoc {
  titleEn?: string;
  titleAr?: string;
  descriptionEn?: any[];
  descriptionAr?: any[];
  captionEn?: string;
  captionAr?: string;
  gameOverTitleEn?: string;
  gameOverTitleAr?: string;
  gameOverSubtitleEn?: string;
  gameOverSubtitleAr?: string;
  playAgainLabelEn?: string;
  playAgainLabelAr?: string;
  scoreLabelEn?: string;
  scoreLabelAr?: string;
  controlsHintEn?: string;
  controlsHintAr?: string;
  specialItemDescriptionEn?: string;
  specialItemDescriptionAr?: string;
  memoryFragments?: MemoryFragment[];
  gridSize?: number;
  initialSpeedMs?: number;
  maxSpeedMs?: number;
  enableSpecialItems?: boolean;
  showTouchControls?: boolean;
  theme?: ThemeConfig;
}

const MerathSnakeSection: React.FC<MerathSnakeSectionProps> = ({ direction, language }) => {
  const [data, setData] = useState<SnakeGameDoc | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doc: SnakeGameDoc = await sanityClient.fetch(`*[_type == "merathSnakeGame"][0]{
          titleEn, titleAr, descriptionEn, descriptionAr, captionEn, captionAr,
          gameOverTitleEn, gameOverTitleAr, gameOverSubtitleEn, gameOverSubtitleAr,
          playAgainLabelEn, playAgainLabelAr, scoreLabelEn, scoreLabelAr,
          controlsHintEn, controlsHintAr, specialItemDescriptionEn, specialItemDescriptionAr,
          memoryFragments[]{key, textEn, textAr},
          gridSize, initialSpeedMs, maxSpeedMs, enableSpecialItems, showTouchControls,
          theme{backgroundColor, snakeColor, fragmentColor, specialItemColor, trailColor, borderColor, textColor}
        }`);
        setData(doc || null);
        setLoading(false);
      } catch (err: any) {
        console.error('Snake game fetch failed', err);
        setError(language === 'ar' ? 'تعذر تحميل المحتوى التفاعلي' : 'Unable to load game content');
        setLoading(false);
      }
    };
    fetchData();
  }, [language]);

  const localized = (en?: string, ar?: string) => (language === 'ar' ? (ar || en || '') : (en || ar || ''));
  const localizedBlocks = (en?: any[], ar?: any[]) => (language === 'ar' ? (ar && Array.isArray(ar) ? ar : en) : (en && Array.isArray(en) ? en : ar)) || [];

  const fragments = useMemo(
    () => (data?.memoryFragments || []).map((f) => localized(f.textEn, f.textAr)).filter(Boolean),
    [data?.memoryFragments, language],
  );

  const heading = localized(data?.titleEn, data?.titleAr);
  const caption = localized(data?.captionEn, data?.captionAr);
  const descriptionBlocks = localizedBlocks(data?.descriptionEn, data?.descriptionAr);

  const labels = {
    gameOverTitle: localized(data?.gameOverTitleEn, data?.gameOverTitleAr) || 'Game over',
    gameOverSubtitle: localized(data?.gameOverSubtitleEn, data?.gameOverSubtitleAr) || '',
    playAgainLabel: localized(data?.playAgainLabelEn, data?.playAgainLabelAr) || 'Play again',
    scoreLabel: localized(data?.scoreLabelEn, data?.scoreLabelAr) || 'Score',
    controlsHint: localized(data?.controlsHintEn, data?.controlsHintAr) || 'Use arrow keys or WASD to move',
    specialItemDescription: localized(data?.specialItemDescriptionEn, data?.specialItemDescriptionAr) || '',
    caption,
  };

  const gridSize = data?.gridSize || 20;
  const initialSpeedMs = data?.initialSpeedMs || 220;
  const maxSpeedMs = data?.maxSpeedMs || 120;
  const enableSpecialItems = data?.enableSpecialItems !== false;
  const showTouchControls = data?.showTouchControls !== false;

  return (
    <section className="snake-section" dir={direction}>
      <div className="snake-section-inner">
        <div className="snake-copy">
          {heading && <h2 className="snake-heading">{heading}</h2>}
          {descriptionBlocks.length > 0 && (
            <div className="snake-description">
              <PortableTextRenderer value={descriptionBlocks} />
            </div>
          )}
          {labels.controlsHint && <p className="snake-controls-hint">{labels.controlsHint}</p>}
          {labels.specialItemDescription && (
            <p className="snake-controls-hint subtle">{labels.specialItemDescription}</p>
          )}
          {loading && <p className="snake-status">Loading interactive section…</p>}
          {error && <p className="snake-status error">{error}</p>}
        </div>

        <div className="snake-game-panel">
          {data && (
            <SnakeGame
              language={language}
              gridSize={gridSize}
              initialSpeedMs={initialSpeedMs}
              maxSpeedMs={maxSpeedMs}
              enableSpecialItems={enableSpecialItems}
              showTouchControls={showTouchControls}
              theme={data.theme}
              labels={labels}
              memoryFragments={fragments}
            />
          )}
          {!data && !loading && !error && <div className="snake-placeholder">Game content not configured.</div>}
        </div>
      </div>
    </section>
  );
};

export default MerathSnakeSection;
