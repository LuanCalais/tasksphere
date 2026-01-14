export interface TaskFormValue {
  title: string;
  color: string;
  assigneeId: number | null;
  dueDate: string | null;
}

export interface CreateTaskInput {
  title: string;
  color?: string;
  assigneeId?: string | null;
  dueDate?: string | null;
}
