"use client";

import { useSyncExternalStore } from "react";
import styles from "./NavratriDemo.module.css";
import type { CursorState } from "./runtime/pointer";
import type { NavratriRuntime } from "./runtime/runtime";

const serverState = (): CursorState => "IDLE";

/**
 * Shows which cursor state is active. It re-renders only when the state
 * actually changes — a handful of times a second at most.
 */
export default function StateReadout({ runtime }: { runtime: NavratriRuntime }) {
  const state = useSyncExternalStore(
    runtime.pointer.subscribe,
    runtime.pointer.getState,
    serverState,
  );

  return (
    <p className={styles.state} data-state={state}>
      <span className={styles.stateDot} aria-hidden="true" />
      <span>State</span>
      <strong>{state.replace("_", " ")}</strong>
    </p>
  );
}
