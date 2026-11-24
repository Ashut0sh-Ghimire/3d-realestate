// ADMIN controllers: read the request, call the service, send the response.
// No SQL in here. Database work belongs in admin.service.js.
import { notImplemented } from "../../utils/notImplemented.js";

// GET /api/admin/stats   (admin)
// in:  -
// out: 200 { listings, users, pendingScans, bookingsThisWeek }
export const stats = notImplemented("GET /api/admin/stats");

// GET /api/admin/scan-requests   (admin)
// in:  query: ?status
// out: 200 { items: ScanRequest[] }
export const scanQueue = notImplemented("GET /api/admin/scan-requests");

// GET /api/admin/users   (admin)
// in:  query: ?role
// out: 200 { items: User[] }
export const users = notImplemented("GET /api/admin/users");
