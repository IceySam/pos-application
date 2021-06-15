/**
 * Format and return date in Humanize format
 * Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 * Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function formatDate(
  value: string,
  formatting: Record<string, unknown> = {
    month: "short",
    day: "numeric",
    year: "numeric",
  }
){
  if (!value) return value;
  return new Intl.DateTimeFormat("en-NG", formatting).format(new Date(value));
}
