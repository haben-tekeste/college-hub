import express, { Request, Response, NextFunction } from "express";
import { validateRequest } from "@hthub/common";
import { body } from "express-validator";
import { Project } from "../model/project";

const router = express.Router();

router.post(
  "/api/projectFeed/search",
  body("term").not().isEmpty().escape(),
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { term } = req.body;

      const projects = await Project.find(
        { $text: { $search: term } },
        {
          score: { $meta: "textScore" },
        }
      ).sort({ score: { $meta: "textScore" } });

      res.status(200).json(projects);
    } catch (error) {}
  }
);

export { router as searchTermRouter };
