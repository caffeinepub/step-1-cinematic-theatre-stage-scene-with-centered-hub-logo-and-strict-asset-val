/**
 * Publish slug validation and sanitization utility.
 * Ensures slugs meet the constraint: 5-50 characters, only letters, numbers, and hyphens.
 */

export interface SlugValidationResult {
  valid: boolean;
  slug?: string;
  error?: string;
}

const SLUG_REGEX = /^[a-zA-Z0-9-]+$/;
const MIN_LENGTH = 5;
const MAX_LENGTH = 50;

const CONSTRAINT_MESSAGE = 
  'Slug must be 5-50 characters and contain only letters, numbers, and hyphens.';

/**
 * Sanitizes a raw string into a valid slug by:
 * 1. Removing prefixes like "step-1:" and path-like segments
 * 2. Converting disallowed characters to hyphens
 * 3. Collapsing repeated hyphens
 * 4. Trimming leading/trailing hyphens
 * 5. Truncating to MAX_LENGTH
 */
function sanitizeSlug(raw: string): string {
  // Remove common prefixes like "step-1:", "step-2:", etc.
  let cleaned = raw.replace(/^step-\d+:/i, '');
  
  // Remove path-like segments (everything before the last /)
  const lastSlashIndex = cleaned.lastIndexOf('/');
  if (lastSlashIndex !== -1) {
    cleaned = cleaned.substring(lastSlashIndex + 1);
  }
  
  // Convert disallowed characters to hyphens
  cleaned = cleaned.replace(/[^a-zA-Z0-9-]/g, '-');
  
  // Collapse repeated hyphens
  cleaned = cleaned.replace(/-+/g, '-');
  
  // Trim leading/trailing hyphens
  cleaned = cleaned.replace(/^-+|-+$/g, '');
  
  // Truncate to MAX_LENGTH
  if (cleaned.length > MAX_LENGTH) {
    cleaned = cleaned.substring(0, MAX_LENGTH);
    // Trim trailing hyphen if truncation created one
    cleaned = cleaned.replace(/-+$/, '');
  }
  
  return cleaned;
}

/**
 * Validates a slug string against the constraints.
 */
function isValidSlug(slug: string): boolean {
  return (
    slug.length >= MIN_LENGTH &&
    slug.length <= MAX_LENGTH &&
    SLUG_REGEX.test(slug)
  );
}

/**
 * Validates and sanitizes a raw string into a valid publish slug.
 * 
 * @param raw - The raw string to convert to a slug
 * @param autoSanitize - If true, attempts to sanitize; if false, validates strictly
 * @returns SlugValidationResult with valid flag, slug (if valid), and error message (if invalid)
 */
export function validatePublishSlug(
  raw: string,
  autoSanitize: boolean = true
): SlugValidationResult {
  if (!raw || raw.trim().length === 0) {
    return {
      valid: false,
      error: 'Slug cannot be empty. ' + CONSTRAINT_MESSAGE
    };
  }
  
  if (autoSanitize) {
    const sanitized = sanitizeSlug(raw);
    
    if (!sanitized || sanitized.length === 0) {
      return {
        valid: false,
        error: 'Could not create a valid slug from the input. ' + CONSTRAINT_MESSAGE
      };
    }
    
    if (!isValidSlug(sanitized)) {
      return {
        valid: false,
        error: CONSTRAINT_MESSAGE
      };
    }
    
    return {
      valid: true,
      slug: sanitized
    };
  } else {
    // Strict validation mode
    if (!isValidSlug(raw)) {
      return {
        valid: false,
        error: CONSTRAINT_MESSAGE
      };
    }
    
    return {
      valid: true,
      slug: raw
    };
  }
}

/**
 * Generates a safe default slug from app metadata.
 * Falls back to a timestamp-based slug if no valid slug can be generated.
 */
export function generateDefaultSlug(appName?: string): string {
  if (appName) {
    const result = validatePublishSlug(appName, true);
    if (result.valid && result.slug) {
      return result.slug;
    }
  }
  
  // Fallback: generate a timestamp-based slug
  const timestamp = Date.now().toString(36);
  return `app-${timestamp}`;
}

/**
 * Gets a default publish slug based on the current hostname or generates one.
 */
export function getDefaultPublishSlug(): string {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname && hostname !== 'localhost') {
      return generateDefaultSlug(hostname);
    }
  }
  
  return generateDefaultSlug('cinematic-theatre');
}
