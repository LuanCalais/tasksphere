import { Task } from "../task/types";
import { User } from "../user/types";
import { ProjectStatus } from "./enums";

export interface Project {
  id?: number | null;
  name: string;
  description: string;
  status: ProjectStatus;
  owner?: User | null;
  ownerId?: number | null;
  tasks?: Task[] | null;
  createdAt: Date | string;
}
