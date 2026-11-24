// LISTINGS controllers: read the request, call the service, send the response.
// No SQL in here. Database work belongs in listings.service.js.
import { notImplemented } from "../../utils/notImplemented.js";

// GET /api/listings   (public)
// in:  query: ?q, type, minPrice, maxPrice, district, page
// out: 200 { items: ListingSummary[], page, total }
export const list = notImplemented("GET /api/listings");

// GET /api/listings/compare   (public)
// in:  query: ?ids=1,2,3 (max 3)
// out: 200 { items: Listing[] }
export const compare = notImplemented("GET /api/listings/compare");

// GET /api/listings/:id   (public)
// in:  -
// out: 200 { listing: Listing }
export const one = notImplemented("GET /api/listings/:id");

// POST /api/listings   (seller)
// in:  { title, description, type, price, district, address, lat, lng, bedrooms, bathrooms, areaSqft }
// out: 201 { listing: Listing }
export const create = notImplemented("POST /api/listings");

// PATCH /api/listings/:id   (owner seller)
// in:  any CREATE fields
// out: 200 { listing: Listing }
export const update = notImplemented("PATCH /api/listings/:id");

// POST /api/listings/:id/images   (owner seller)
// in:  multipart/form-data: images (1 to 10 .jpg/.png files, max 5 MB each)
// out: 200 { images: string[] }   (all image URLs for the listing, first one is the cover)
export const uploadImages = notImplemented("POST /api/listings/:id/images");
