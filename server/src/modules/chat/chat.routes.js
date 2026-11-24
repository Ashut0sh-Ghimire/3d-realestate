// CHAT routes. Owner: M5. URLs come from shared/api-endpoints.js,
// request/response shapes are in docs/API.md -> "CHAT".
import { Router } from "express";
import { API } from "@realestate/shared";
import { requireAuth } from "../../middleware/auth.js";
import * as controller from "./chat.controller.js";

const router = Router();

router.get(API.CHAT.CONVERSATIONS, requireAuth, controller.conversations);
router.post(API.CHAT.START, requireAuth, controller.start);
router.get(API.CHAT.MESSAGES, requireAuth, controller.messages);

export default router;
