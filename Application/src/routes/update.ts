import express from "express";
import { body } from "express-validator";
import { validateRequest } from "../../../Common/src";

const router = express.Router();

router.put("/api/applications");

export { router as updateApplicationRouter };
