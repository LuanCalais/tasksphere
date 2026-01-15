import { Project } from '../project';
import { User } from '../user';
import { TaskStatus } from './enums';

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  color: string;
  projectId: number;
  project?: Project;
  assigneeId?: number | null;
  assignee?: User | null;
  dueDate?: Date | string | null;
  createdAt: Date | string;
}
