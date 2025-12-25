/**
 * Microsoft Clarity Analytics Utilities
 *
 * Centralized wrapper functions for Clarity API calls.
 * Provides safe access to Clarity events, tags, and session upgrades.
 */

import Clarity from "@microsoft/clarity";

/**
 * Check if Clarity is ready (client-side and initialized)
 */
const isClarityReady = (): boolean => {
  return (
    typeof window !== "undefined" &&
    typeof (window as any).clarity === "function"
  );
};

/**
 * Track a custom event
 * @param eventName - Name of the event to track
 */
export const trackEvent = (eventName: string): void => {
  if (isClarityReady()) {
    Clarity.event(eventName);
    console.log(`[Clarity Event] ${eventName}`);
  }
};

/**
 * Set a custom tag for session segmentation
 * @param key - Tag key
 * @param value - Tag value(s)
 */
export const setTag = (key: string, value: string | string[]): void => {
  if (isClarityReady()) {
    Clarity.setTag(key, value);
    console.log(`[Clarity Tag] ${key}: ${value}`);
  }
};

/**
 * Upgrade session priority for important interactions
 * @param reason - Reason for upgrading the session
 */
export const upgradeSession = (reason: string): void => {
  if (isClarityReady()) {
    Clarity.upgrade(reason);
    console.log(`[Clarity Upgrade] ${reason}`);
  }
};

/**
 * Identify a user with custom identifiers
 * @param customId - Unique identifier (will be hashed by Clarity)
 * @param sessionId - Optional custom session ID
 * @param pageId - Optional custom page ID
 * @param friendlyName - Optional friendly name
 */
export const identifyUser = (
  customId: string,
  sessionId?: string,
  pageId?: string,
  friendlyName?: string
): void => {
  if (isClarityReady()) {
    Clarity.identify(customId, sessionId, pageId, friendlyName);
    console.log(`[Clarity Identify] ${friendlyName || customId}`);
  }
};

// ============================================
// CONVENIENCE FUNCTIONS FOR COMMON TRACKING
// ============================================

/**
 * Track navigation clicks
 */
export const trackNavigation = (destination: string): void => {
  trackEvent(`nav_click_${destination.toLowerCase()}`);
};

/**
 * Track social media clicks
 */
export const trackSocialClick = (platform: string): void => {
  trackEvent(`social_click_${platform.toLowerCase()}`);
};

/**
 * Track blog post clicks
 */
export const trackBlogClick = (slug: string): void => {
  const sanitizedSlug = slug.replace(/-/g, "_");
  trackEvent(`blog_click_${sanitizedSlug}`);
  setTag("last_blog_clicked", slug);
};

/**
 * Track CTA button clicks
 */
export const trackCTAClick = (ctaName: string): void => {
  trackEvent(`cta_${ctaName.toLowerCase().replace(/\s+/g, "_")}`);
};

/**
 * Track CTA with session upgrade (for high-value actions)
 */
export const trackCTAWithUpgrade = (ctaName: string): void => {
  const sanitizedName = ctaName.toLowerCase().replace(/\s+/g, "_");
  trackEvent(`cta_${sanitizedName}`);
  upgradeSession(`cta_engagement_${sanitizedName}`);
};

/**
 * Track theme changes
 */
export const trackThemeChange = (newTheme: string): void => {
  trackEvent(`theme_change_to_${newTheme}`);
  setTag("theme_preference", newTheme);
};

/**
 * Track mobile menu interactions
 */
export const trackMobileMenu = (action: "open" | "close"): void => {
  trackEvent(`mobile_menu_${action}`);
};

/**
 * Track 404 page visits and recovery
 */
export const track404Recovery = (): void => {
  trackEvent("404_return_home");
};

/**
 * Set page context tags
 */
export const setPageContext = (
  pageType: string,
  additionalTags?: Record<string, string>
): void => {
  setTag("page_type", pageType);

  if (additionalTags) {
    Object.entries(additionalTags).forEach(([key, value]) => {
      setTag(key, value);
    });
  }
};

/**
 * Track engaged reading behavior
 */
export const trackEngagedReader = (duration: number): void => {
  if (duration >= 30000) {
    // 30 seconds
    upgradeSession("engaged_blog_reader");
    trackEvent("engaged_reading_30s");
  }
};

/**
 * Track scroll depth
 */
export const trackScrollDepth = (percentage: number): void => {
  if (percentage >= 90) {
    upgradeSession("full_article_read");
    trackEvent("scroll_depth_90_percent");
  } else if (percentage >= 50) {
    trackEvent("scroll_depth_50_percent");
  }
};
