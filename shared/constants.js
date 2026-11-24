// Values that BOTH frontend and backend (and the database) must agree on.
// The strings on the right are what gets stored in the database and sent over the API.
// Changing one here? Also update the CHECK constraint in server/db/migrations and tell the team.

export const ROLES = {
  BUYER: "buyer",
  SELLER: "seller",
  ADMIN: "admin",
};

export const LISTING_TYPE = {
  SALE: "sale",
  RENT: "rent",
  SHORT_STAY: "short_stay",
};

export const LISTING_STATUS = {
  DRAFT: "draft", // created, no 3D tour yet
  AWAITING_SCAN: "awaiting_scan",
  LIVE: "live", // visible to buyers
  ARCHIVED: "archived",
};

export const SCAN_STATUS = {
  PENDING: "pending", // seller asked
  SCHEDULED: "scheduled", // admin picked a date
  SCANNED: "scanned", // captured on site, processing
  PUBLISHED: "published", // 3D tour uploaded and attached to the listing
  CANCELLED: "cancelled",
};

export const BOOKING_KIND = {
  VIEWING: "viewing",
  STAY: "stay",
};

export const BOOKING_STATUS = {
  REQUESTED: "requested",
  CONFIRMED: "confirmed",
  DECLINED: "declined",
  CANCELLED: "cancelled",
};

export const DISTRICTS = ["Kathmandu", "Lalitpur", "Bhaktapur", "Kaski", "Chitwan"];

export const LIMITS = {
  OTP_LENGTH: 6,
  OTP_EXPIRY_MINUTES: 10,
  OTP_RESEND_SECONDS: 60,
  MAX_COMPARE: 3,
  PAGE_SIZE: 20,
};
