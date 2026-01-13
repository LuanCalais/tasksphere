import { Project } from "../project/types";
import { User } from "../user/types";
import { TaskStatus } from "./enums";

export interface Task {
  id: number;
  title: string;
  color: string;
  status: TaskStatus;
  projectId: number;
  project?: Project;
  assigneeId?: number | null;
  assignee?: User | null;
  dueDate?: Date | string | null;
  createdAt: Date | string;
}

export interface TaskInput {
  title: string;
  color?: string;
  assigneeId?: number;
  dueDate?: string;
}
