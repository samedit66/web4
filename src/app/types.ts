export type Subtask = {
  subtaskTitle: string;
  subtaskDescription: string;
  subtaskDifficulty: string;
  subtaskTags: string;
};
  
export type Task = {
  title: string;
  text: string;
  difficulty: string;
  tags: string;
  subtasks: Subtask[];
};
