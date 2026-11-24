// Frontend side of the AUTH module. Shapes: docs/API.md -> AUTH.
// One service file per backend module, so a bug in login/OTP is in auth.service.js
// (frontend) or server/src/modules/auth/ (backend). Nowhere else.
import { API } from "@realestate/shared";
import { request, tokenStore } from "./api.js";

export const signup = (form) => request("POST", API.AUTH.SIGNUP, { body: form });

export const verifyOtp = async (userId, otp) => {
  const data = await request("POST", API.AUTH.VERIFY_OTP, { body: { userId, otp } });
  tokenStore.set(data.token);
  return data.user;
};

export const resendOtp = (userId) => request("POST", API.AUTH.RESEND_OTP, { body: { userId } });

export const login = async (email, password) => {
  const data = await request("POST", API.AUTH.LOGIN, { body: { email, password } });
  tokenStore.set(data.token);
  return data.user;
};

export const getMe = () => request("GET", API.AUTH.ME).then((d) => d.user);

export const logout = () => tokenStore.clear();
