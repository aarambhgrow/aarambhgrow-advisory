"use client";

import { useId } from "react";
import {
  DEFAULT_SETTINGS,
  IS_PRODUCTION,
  type NavratriSettings,
  type QualityTier,
} from "./config";
import styles from "./DevPanel.module.css";

type ToggleKey = {
  [K in keyof NavratriSettings]: NavratriSettings[K] extends boolean ? K : never;
}[keyof NavratriSettings];

type SliderKey = {
  [K in keyof NavratriSettings]: NavratriSettings[K] extends number ? K : never;
}[keyof NavratriSettings];

const TOGGLES: ReadonlyArray<{ key: ToggleKey; label: string }> = [
  { key: "webgl", label: "WebGL" },
  { key: "particles", label: "Particles" },
  { key: "trail", label: "Light trail" },
  { key: "mandala", label: "Mandala" },
  { key: "glow", label: "Glow" },
  { key: "clickBurst", label: "Click burst" },
  { key: "diya", label: "Diya" },
];

const SLIDERS: ReadonlyArray<{ key: SliderKey; label: string; min: number; max: number }> = [
  { key: "density", label: "Particle density", min: 0, max: 2 },
  { key: "trailLength", label: "Trail length", min: 0.25, max: 2.5 },
  { key: "glowAmount", label: "Glow", min: 0, max: 2 },
  { key: "cursorSize", label: "Cursor size", min: 0.6, max: 2 },
  { key: "motion", label: "Motion", min: 0, max: 2 },
];

const QUALITIES: ReadonlyArray<{ value: "auto" | QualityTier; label: string }> = [
  { value: "auto", label: "Auto" },
  { value: "high", label: "High" },
  { value: "medium", label: "Med" },
  { value: "low", label: "Low" },
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  settings: NavratriSettings;
  onChange: (patch: Partial<NavratriSettings>) => void;
  debug: boolean;
  onDebugChange: (debug: boolean) => void;
  /** False when the browser could not give us WebGL. */
  webglAvailable: boolean;
}

function Switch({
  label,
  checked,
  onChange,
  note,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  note?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className={styles.switch}
      onClick={() => onChange(!checked)}
    >
      <span className={styles.switchLabel}>
        {label}
        {note && <em>{note}</em>}
      </span>
      <span className={styles.switchState} aria-hidden="true">
        {checked ? "On" : "Off"}
      </span>
    </button>
  );
}

/**
 * Developer controls for experimenting with the effect. Collapsed to a small
 * chip by default; press D or click the chip to open it.
 */
export default function DevPanel({
  open,
  onOpenChange,
  settings,
  onChange,
  debug,
  onDebugChange,
  webglAvailable,
}: Props) {
  const panelId = useId();

  return (
    <aside className={styles.dock} aria-label="Developer controls">
      {open && (
        <div id={panelId} className={styles.panel}>
          <header className={styles.header}>
            <span>Developer panel</span>
            <button type="button" className={styles.reset} onClick={() => onChange(DEFAULT_SETTINGS)}>
              Reset
            </button>
          </header>

          <div className={styles.group}>
            {TOGGLES.map(({ key, label }) => (
              <Switch
                key={key}
                label={label}
                checked={settings[key]}
                onChange={(checked) => onChange({ [key]: checked })}
                note={key === "webgl" && !webglAvailable ? "unavailable" : undefined}
              />
            ))}
          </div>

          <div className={styles.group}>
            {SLIDERS.map(({ key, label, min, max }) => (
              <label key={key} className={styles.slider}>
                <span className={styles.sliderHead}>
                  <span>{label}</span>
                  <output>{settings[key].toFixed(2)}</output>
                </span>
                <input
                  type="range"
                  min={min}
                  max={max}
                  step={0.05}
                  value={settings[key]}
                  onChange={(event) => onChange({ [key]: Number(event.target.value) })}
                />
              </label>
            ))}
          </div>

          <div className={styles.group}>
            <div className={styles.segmentHead}>Quality</div>
            <div className={styles.segment} role="radiogroup" aria-label="Quality">
              {QUALITIES.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={settings.quality === value}
                  onClick={() => onChange({ quality: value })}
                >
                  {label}
                </button>
              ))}
            </div>
            {!IS_PRODUCTION && (
              <Switch label="Debug stats" checked={debug} onChange={onDebugChange} />
            )}
          </div>
        </div>
      )}

      <button
        type="button"
        className={styles.chip}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => onOpenChange(!open)}
      >
        <span className={styles.chipDot} aria-hidden="true" />
        Controls
        <kbd>D</kbd>
      </button>
    </aside>
  );
}
