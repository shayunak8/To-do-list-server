import { Request, Response } from "express";
import { Router } from "express";
import { Task, TaskModel } from "../models/task";

export const router = Router();

router.get("/tasks", async (req: Request, res: Response): Promise<Response> => {
  const alltasks: Task[] = await TaskModel.find();
  return res.status(200).json(alltasks);
});

router.get(
  "/tasks/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const task: Task | null = await TaskModel.findById({ _id: id });
    return res.status(200).json(task);
  }
);

router.post(
  "/tasks",
  async (req: Request, res: Response): Promise<Response> => {
    const task: Task = await TaskModel.create({ ...req.body });
    return res.status(201).json(task);
  }
);

router.put(
  "/tasks/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    await TaskModel.updateOne({ _id: id }, req.body);
    const updatedTask: Task | null = await TaskModel.findById({ _id: id });
    return res.status(200).json(updatedTask);
  }
);

router.delete(
  "/tasks/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const deletedTask: Task | null = await TaskModel.findOneAndDelete({
      _id: id,
    });
    return res.status(200).json(deletedTask);
  }
);
