# Specification

## Summary
**Goal:** Fix incorrect image src paths for the hub and background silhouette logos by removing the leading slash.

**Planned changes:**
- In `frontend/src/components/CenteredHubLogo.tsx`, change the hub logo `<img>` src from `"/logo2-1.png"` to `"logo2-1.png"` only, preserving existing layout/styling and the key-based unmount/remount behavior.
- In `frontend/src/components/BackgroundSilhouetteLogo.tsx`, change the silhouette logo `<img>` src from `"/logo2-1.png"` to `"logo2-1.png"` only, preserving existing opacity, size, positioning, and styling.

**User-visible outcome:** Both the centered hub logo and the background silhouette logo continue to appear exactly as before, but now load correctly using the corrected (no-leading-slash) asset path.
