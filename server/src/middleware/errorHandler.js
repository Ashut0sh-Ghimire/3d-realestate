// Catches any error thrown in a route and sends it in the standard shape: { error: "message" }.
// Throw with a status like this:  throw httpError(404, "Listing not found")
export function httpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  const status = err.status ?? 500;
  if (status >= 500) console.error(err);
  res.status(status).json({ error: status >= 500 ? "Something went wrong" : err.message });
}
