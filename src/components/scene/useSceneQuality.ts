import { useEffect, useState } from 'react';

export interface SceneQuality {
  /** Coarse pointer (touch) or no hover — lighten the scene. */
  coarse: boolean;
  /** Particle count target for the field. */
  particleCount: number;
  /** Whether the expensive transmission (glass) material is allowed. */
  allowGlass: boolean;
  /** Device pixel ratio ceiling. */
  dprMax: number;
}

/**
 * Probe the device for a coarse pointer / low-power hint and derive a
 * quality tier. Mobile + touch get fewer particles, cheaper materials and a
 * lower DPR ceiling so the scene stays smooth.
 */
export function useSceneQuality(): SceneQuality {
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const query = window.matchMedia('(pointer: coarse), (hover: none)');
    const update = () => setCoarse(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return {
    coarse,
    particleCount: coarse ? 900 : 2600,
    allowGlass: !coarse,
    dprMax: coarse ? 1 : 1.5,
  };
}
