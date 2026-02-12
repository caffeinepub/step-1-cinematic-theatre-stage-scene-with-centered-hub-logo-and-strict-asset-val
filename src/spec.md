# Specification

## Summary
**Goal:** Force an asset rebinding for the centered hub logo image by explicitly removing and reinserting its `<img>` element, while continuing to load only `"/logo2-1.png"` and preserving all existing visuals.

**Planned changes:**
- Add a deterministic code path that unmounts/remounts (remove + reinsert) the centered hub logo `<img>` element to rebind the asset.
- Ensure the hub logo continues to reference only `src="/logo2-1.png"` with no references to `/logo2.png` or any other filenames.
- Keep all existing layout and styling unchanged for the hub logo and halo ring (size, centering, z-index, filters/shadows, pointer-events, etc.), and preserve existing asset validation/gating behavior.

**User-visible outcome:** The centered hub logo looks and behaves exactly the same as before, but the image element is explicitly reinserted to rebind the `"/logo2-1.png"` asset.
