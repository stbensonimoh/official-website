function isClarityReady(): boolean {
  return typeof window !== "undefined" && typeof (window as any).clarity === "function";
}

export function trackEvent(eventName: string): void {
  if (isClarityReady()) (window as any).clarity("event", eventName);
}

export function setTag(key: string, value: string | string[]): void {
  if (isClarityReady()) (window as any).clarity("set", key, value);
}

export function upgradeSession(reason: string): void {
  if (isClarityReady()) (window as any).clarity("upgrade", reason);
}

export function trackNavigation(destination: string): void {
  trackEvent(`nav_click_${destination.toLowerCase()}`);
}

export function trackSocialClick(platform: string): void {
  trackEvent(`social_click_${platform.toLowerCase()}`);
}

export function trackThemeChange(newTheme: string): void {
  trackEvent(`theme_change_to_${newTheme}`);
  setTag("theme_preference", newTheme);
}

export function trackMobileMenu(action: "open" | "close"): void {
  trackEvent(`mobile_menu_${action}`);
}
