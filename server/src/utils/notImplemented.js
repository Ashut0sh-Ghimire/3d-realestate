// Placeholder controller. Responds 501 so the frontend gets a clear message
// ("Not implemented: POST /api/auth/login") instead of a confusing 404.
// Replace each one with a real async handler as you build it.
export const notImplemented = (label) => (req, res) =>
  res.status(501).json({ error: `Not implemented: ${label}` });
