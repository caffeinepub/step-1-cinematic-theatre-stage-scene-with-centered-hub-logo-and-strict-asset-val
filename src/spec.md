# Specification

## Summary
**Goal:** Add a blocking “Asset Scan Results” screen after successful startup asset validation, listing required asset filenames and gating access to the theatre scene until the user explicitly continues.

**Planned changes:**
- Keep the existing strict startup validation for required assets (logo2.png, jacques-johnson.png, kream-kuntree.png, rl-stafford.png) using the current fetch + image-load checks.
- If any required asset is missing/unloadable, continue showing the existing full-screen MissingAssetOverlay with the exact current message format (and do not show scan results).
- If all required assets load successfully, show a full-screen blocking “Asset Scan Results” overlay that lists all four filenames with a success/detected status and a clearly labeled Continue button.
- Prevent rendering of the theatre scene (BackgroundSilhouetteLogo, TheatreStageScene, CenteredHubLogo) until the user clicks Continue on the scan results overlay.
- Ensure all newly introduced user-facing text for this feature is in English.

**User-visible outcome:** On app load, users see either the existing missing-asset error (if any required file is missing) or an “Asset Scan Results” screen listing all required files as successfully detected, and must click Continue before the theatre scene appears.
