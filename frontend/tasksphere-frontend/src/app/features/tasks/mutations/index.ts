import { gql } from 'apollo-angular';

export const UPDATE_TASK_STATUS = gql`
  mutation UpdateTaskStatus($taskId: ID!, $status: TaskStatus!) {
    updateTaskStatus(taskId: $taskId, status: $status) {
      id
      title
      status
      project {
        id
        name
        status
      }
      assignee {
        id
        name
      }
    }
  }
`;
