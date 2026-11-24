// requireAuth: rejects requests without a valid token and sets req.user = { id, role }.
// requireRole(ROLES.ADMIN): use after requireAuth to limit a route to one role.
// TODO (M4): verify a real JWT here once auth is built.

export function requireAuth(req, res, _next) {
  const header = req.headers.authorization ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Not logged in" });

  // Placeholder until JWT is implemented: treat the request as unauthenticated.
  return res.status(501).json({ error: "Auth not implemented yet (middleware/auth.js)" });
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: "You don't have access to this" });
    }
    next();
  };
}
