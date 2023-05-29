export interface Task {
    id: number;
    title: string;
    description?: string;
    isDone: boolean;
    order: number;
}