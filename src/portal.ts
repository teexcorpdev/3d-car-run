/**
 * Web-portal hooks (Playgama, …). A portal build's page defines `window.__PORTAL__` before main.js runs;
 * the adapters live in the xwave-port workspace (D:\Workspace\git\xwave-port\platforms\<portal>).
 * Without it — the normal H5 build — PORTAL is null and the game behaves exactly as before.
 *
 * In portal mode the game drops what portals don't allow: real-money shop, share / invite / launch /
 * entry / rate perks, account sign-in + cloud API, the IP country lookup (an external host).
 */
export interface Portal {
  readonly name: string;
  /** player language from the portal ('en', 'pt-BR', …) or '' */
  readonly lang: string;
  /** loading done, the menu is on screen */
  gameReady(): void;
  /** the player is (not) actively playing — portals use it to time their own ads */
  gameplay(on: boolean): void;
  /** resolves true only when the reward was earned */
  rewarded(placement: string): Promise<boolean>;
  /** a rewarded ad can be offered now (false → every "watch an ad" button is hidden) */
  adReady(): boolean;
  /** resolves when the break is over (shown or not) */
  interstitial(placement: string): Promise<void>;
  /** the portal pauses the game (its own overlays, tab hidden) */
  onPause(cb: (paused: boolean) => void): void;
  /** the portal turns the game's sound on / off */
  onAudio(cb: (enabled: boolean) => void): void;
}

export const PORTAL: Portal | null = (typeof window !== 'undefined' && (window as unknown as { __PORTAL__?: Portal }).__PORTAL__) || null;
