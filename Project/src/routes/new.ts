import express, { Request, Response, NextFunction } from "express";
import { validateRequest } from "@hthub/common";
import { body } from "express-validator";
import { Project } from "../model/project";
import { ProjectCreatedPublisher } from "../events/publisher/project-created-publisher";
import { natswrapper } from "../nats-wrapper";
import { ProjectACreatedPublisher } from "../events/publisher/project-acreated-publisher";

const router = express.Router();

router.post(
  "/api/projects/new",
  [
    body("tags").not().isEmpty(),
    body("topic").not().isEmpty(),
    body("description")
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage("Provide description of idea/project"),
    body("deadline").trim().isDate().withMessage("Please application deadline"),
    body("skillSet")
      .not()
      .isEmpty()
      .withMessage("Provide skills required for the project"),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { tags, topic, description, deadline, skillSet } = req.body;
      const project = await Project.findOne({ description });

      if (project) {
        if (req.currentUser?.id !== project.postedBy)
          throw new Error("Project already exists, copyright is reserved");
        else throw new Error("Project duplication not allowed");
      }

      const newProject = Project.build({
        tags,
        topic,
        description,
        deadline,
        skillSet,
        createdAt: new Date(),
        postedBy: req.currentUser?.id || "",
      });

      await newProject.save();
      new ProjectCreatedPublisher(natswrapper.Client).publish({
        id: newProject.id,
        tags: newProject.tags,
        description: newProject.description,
        postedBy: newProject.postedBy,
        deadline: newProject.deadline.toISOString(),
        skillSet: newProject.skillSet,
        topic: newProject.topic,
        createdAt: newProject.createdAt.toISOString(),
      });
      new ProjectACreatedPublisher(natswrapper.Client).publish({
        id: newProject.id,
        tags: newProject.tags,
        description: newProject.description,
        postedBy: newProject.postedBy,
        deadline: newProject.deadline.toISOString(),
        skillSet: newProject.skillSet,
        topic: newProject.topic,
        createdAt: newProject.createdAt.toISOString(),
      });
      res.status(201).json(newProject);
    } catch (error) {
      next(error);
    }
  }
);

export { router as createProjectRouter };
