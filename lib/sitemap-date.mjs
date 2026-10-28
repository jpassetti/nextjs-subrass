export function toIsoLastModified(value) {
 if (!value) return undefined;

 const input = String(value).trim();
 const hasTimeZone = /(?:Z|[+-]\d{2}:?\d{2})$/i.test(input);
 const normalized = hasTimeZone ? input : `${input}Z`;
 const date = new Date(normalized);

 return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}
