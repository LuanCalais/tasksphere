import { gql } from 'apollo-angular';

export const GET_PROJECTS_KANBAN = gql`
  query GetProjectsForKanban {
    projects {
      id
      name
      description
      isActive
      createdAt
      tasks {
        id
        title
        status
        color
        assignee {
          id
          name
          email
        }
        dueDate
      }
      owner {
        id
        name
        email
      }
    }
  }
`;
