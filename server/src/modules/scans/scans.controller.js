// SCANS controllers: read the request, call the service, send the response.
// No SQL in here. Database work belongs in scans.service.js.
import { notImplemented } from "../../utils/notImplemented.js";

// POST /api/scan-requests   (seller)
// in:  { listingId, preferredDate, notes }
// out: 201 { scanRequest: ScanRequest }
export const create = notImplemented("POST /api/scan-requests");

// GET /api/scan-requests/mine   (seller)
// in:  -
// out: 200 { items: ScanRequest[] }
export const mine = notImplemented("GET /api/scan-requests/mine");

// PATCH /api/scan-requests/:id/status   (admin)
// in:  { status, scheduledFor? }
// out: 200 { scanRequest: ScanRequest }
export const updateStatus = notImplemented("PATCH /api/scan-requests/:id/status");

// POST /api/scan-requests/:id/tour   (admin)
// in:  multipart/form-data: file (.glb)
// out: 200 { tourUrl }
export const uploadTour = notImplemented("POST /api/scan-requests/:id/tour");
