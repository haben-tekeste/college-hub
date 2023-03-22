import express from "express";
import { body } from "express-validator";
import { validateRequest } from "../../../Common/src";

const router = express.Router();

router.get("/api/applications/:applicationId");

export { router as getApplicationRouter };
