// Frontend side of the SCANS module. Shapes: docs/API.md -> SCANS.
import { API } from "@realestate/shared";
import { request } from "./api.js";

export const requestScan = (form) =>
  request("POST", API.SCANS.CREATE, { body: form }).then((d) => d.scanRequest);
export const getMyScanRequests = () => request("GET", API.SCANS.MINE).then((d) => d.items);
