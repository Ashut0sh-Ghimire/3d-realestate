// Converts a database row (snake_case) to API style (camelCase).
// toCamel({ created_at: "..", seller_id: 4 })  ->  { createdAt: "..", sellerId: 4 }
// Use it in every service before returning rows, so the frontend never sees snake_case.
const camelKey = (key) => key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());

export const toCamel = (row) =>
  row ? Object.fromEntries(Object.entries(row).map(([key, value]) => [camelKey(key), value])) : row;

export const rowsToCamel = (rows) => rows.map(toCamel);
