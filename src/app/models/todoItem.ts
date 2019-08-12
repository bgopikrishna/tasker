export class TodoItem {
  id: number | string;
  todo: string;
  assignedTo?: string;
  completed: boolean;
}

export class TaskItem {
  id?: number;
  title?: string;
  created_by?: number;
  remind_to?: number;
  remainder_date?: string;
  created_date?: string;
}
