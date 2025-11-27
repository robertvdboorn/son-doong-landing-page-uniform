type ReplacementCharacter = '-' | '_';

/**
 * Sanitizes a field name to be URL-safe and suitable for HTML IDs
 * 
 * @param name - The field name to sanitize
 * @param replacement - The character to use as replacement (default: '-')
 * @returns A sanitized, lowercase string with special characters replaced
 */
export function sanitizeName(name: string, replacement: ReplacementCharacter = '-'): string {
  if (!name || name.length === 0) {
    return '';
  }

  let sanitized = name.toLowerCase();

  // Replace spaces and non-alphanumeric characters with the specified replacement character
  sanitized = sanitized.replace(/[^a-z0-9]+/g, replacement);

  // Remove leading and trailing replacement characters
  sanitized = sanitized.replace(new RegExp(`^[${replacement}]+|[${replacement}]+$`, 'g'), '');

  return sanitized;
}

