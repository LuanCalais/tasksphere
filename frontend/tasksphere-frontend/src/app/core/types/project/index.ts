import { CreateTaskInput } from "../task";

export type CreateProjectInput = {
  name: string;
  description?: string;
  ownerId: number;
  tasks?: CreateTaskInput[];
};
