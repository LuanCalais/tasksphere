import { Injectable } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { Project } from '@core/models/project';

const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      name
      description
      createdAt
      owner {
        id
        name
        email
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private apollo: Apollo) {}

  getProjects(): Observable<Project[] | any[]> {
    return this.apollo.watchQuery<{ projects: Project[] }>({
        query: GET_PROJECTS,
    })
    .valueChanges.pipe(map((result) => result.data?.projects || []));
  }
}
