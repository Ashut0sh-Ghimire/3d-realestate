// AUTH controllers: read the request, call the service, send the response.
// No SQL in here. Database work belongs in auth.service.js.
import { notImplemented } from "../../utils/notImplemented.js";

// POST /api/auth/signup   (public)
// in:  { fullName, email, phone, password, role: "buyer" | "seller" }
// out: 201 { userId, otpSentTo }
export const signup = notImplemented("POST /api/auth/signup");

// POST /api/auth/verify-otp   (public)
// in:  { userId, otp }
// out: 200 { token, user: User }
export const verifyOtp = notImplemented("POST /api/auth/verify-otp");

// POST /api/auth/resend-otp   (public)
// in:  { userId }
// out: 200 { otpSentTo }
export const resendOtp = notImplemented("POST /api/auth/resend-otp");

// POST /api/auth/login   (public)
// in:  { email, password }
// out: 200 { token, user: User } · 401 wrong email or password · 403 { error, userId } if email not verified
export const login = notImplemented("POST /api/auth/login");

// GET /api/auth/me   (logged in)
// in:  -
// out: 200 { user: User }
export const me = notImplemented("GET /api/auth/me");
