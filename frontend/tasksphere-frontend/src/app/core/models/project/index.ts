import { Task } from '../task';
import { User } from '../user';

export interface Project {
  id?: number | null;
  name: string;
  description: string;
  owner?: User | null;
  ownerId?: number | null;
  tasks?: Task[] | null;
  createdAt: Date | string;
}