import { Task } from "../task/types";
import { User } from "../user/types";

export interface Project {
    id?: number | null;
    name: string;
    description: string;
    owner?: User | null;
    ownerId?: number | null;
    tasks?: Task[] | null;
    createdAt: Date | string;
}