// AUTH routes. Owner: M4. URLs come from shared/api-endpoints.js,
// request/response shapes are in docs/API.md -> "AUTH".
import { Router } from "express";
import { API } from "@realestate/shared";
import { requireAuth } from "../../middleware/auth.js";
import * as controller from "./auth.controller.js";

const router = Router();

router.post(API.AUTH.SIGNUP, controller.signup);
router.post(API.AUTH.VERIFY_OTP, controller.verifyOtp);
router.post(API.AUTH.RESEND_OTP, controller.resendOtp);
router.post(API.AUTH.LOGIN, controller.login);
router.get(API.AUTH.ME, requireAuth, controller.me);

export default router;
