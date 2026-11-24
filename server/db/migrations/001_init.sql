-- Initial schema. Owner: M5 (database). Column names are snake_case;
-- the API converts them to camelCase. Enum values must match shared/constants.js.

CREATE TABLE users (
  id            SERIAL PRIMARY KEY,
  full_name     TEXT NOT NULL,
  email         TEXT NOT NULL UNIQUE,
  phone         TEXT,
  password_hash TEXT NOT NULL,
  role          TEXT NOT NULL CHECK (role IN ('buyer', 'seller', 'admin')),
  is_verified   BOOLEAN NOT NULL DEFAULT false,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE otp_codes (
  id          SERIAL PRIMARY KEY,
  user_id     INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  code_hash   TEXT NOT NULL,
  expires_at  TIMESTAMPTZ NOT NULL,
  used_at     TIMESTAMPTZ
);

CREATE TABLE listings (
  id           SERIAL PRIMARY KEY,
  seller_id    INT NOT NULL REFERENCES users(id),
  title        TEXT NOT NULL,
  description  TEXT,
  type         TEXT NOT NULL CHECK (type IN ('sale', 'rent', 'short_stay')),
  status       TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'awaiting_scan', 'live', 'archived')),
  price        NUMERIC(14, 2) NOT NULL,
  district     TEXT NOT NULL,
  address      TEXT,
  lat          DOUBLE PRECISION,
  lng          DOUBLE PRECISION,
  bedrooms     INT,
  bathrooms    INT,
  area_sqft    INT,
  tour_url     TEXT,            -- set when a 3D tour is published
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE scan_requests (
  id              SERIAL PRIMARY KEY,
  listing_id      INT NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  seller_id       INT NOT NULL REFERENCES users(id),
  preferred_date  DATE,
  scheduled_for   TIMESTAMPTZ,
  notes           TEXT,
  status          TEXT NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending', 'scheduled', 'scanned', 'published', 'cancelled')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE bookings (
  id          SERIAL PRIMARY KEY,
  listing_id  INT NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  user_id     INT NOT NULL REFERENCES users(id),
  kind        TEXT NOT NULL CHECK (kind IN ('viewing', 'stay')),
  date        DATE NOT NULL,
  check_out   DATE,
  message     TEXT,
  status      TEXT NOT NULL DEFAULT 'requested'
              CHECK (status IN ('requested', 'confirmed', 'declined', 'cancelled')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE conversations (
  id          SERIAL PRIMARY KEY,
  listing_id  INT NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  buyer_id    INT NOT NULL REFERENCES users(id),
  seller_id   INT NOT NULL REFERENCES users(id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (listing_id, buyer_id)
);

CREATE TABLE messages (
  id               SERIAL PRIMARY KEY,
  conversation_id  INT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id        INT NOT NULL REFERENCES users(id),
  body             TEXT NOT NULL,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_listings_search ON listings (status, type, district, price);
CREATE INDEX idx_messages_conversation ON messages (conversation_id, created_at);

CREATE TABLE listing_images (
  id          SERIAL PRIMARY KEY,
  listing_id  INT NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  url         TEXT NOT NULL,
  position    INT NOT NULL DEFAULT 0   -- 0 = cover image
);
