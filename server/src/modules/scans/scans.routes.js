// SCANS routes. Owner: M5. URLs come from shared/api-endpoints.js,
// request/response shapes are in docs/API.md -> "SCANS".
import { Router } from "express";
import { API, ROLES } from "@realestate/shared";
import { requireAuth, requireRole } from "../../middleware/auth.js";
import * as controller from "./scans.controller.js";

const router = Router();

router.post(API.SCANS.CREATE, requireAuth, requireRole(ROLES.SELLER), controller.create);
router.get(API.SCANS.MINE, requireAuth, requireRole(ROLES.SELLER), controller.mine);
router.patch(
  API.SCANS.UPDATE_STATUS,
  requireAuth,
  requireRole(ROLES.ADMIN),
  controller.updateStatus,
);
router.post(API.SCANS.UPLOAD_TOUR, requireAuth, requireRole(ROLES.ADMIN), controller.uploadTour);

export default router;
