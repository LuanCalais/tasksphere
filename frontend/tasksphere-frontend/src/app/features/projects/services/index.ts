import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { Project } from '@core/models/project';
import { GET_PROJECTS } from '../queries';
import { CreateProjectInput } from '@core/types/project';
import { CREATE_PROJECT, DELETE_PROJECT } from '../mutations';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private apollo: Apollo) {}

  getProjects(): Observable<Project[] | any[]> {
    return this.apollo
      .watchQuery<{ projects: Project[] }>({
        query: GET_PROJECTS,
        fetchPolicy: 'network-only',
      })
      .valueChanges.pipe(map((result) => result.data?.projects || []));
  }

  createProject(input: CreateProjectInput): Observable<Project> {
    return this.apollo
      .mutate<{ createProject: Project }>({
        mutation: CREATE_PROJECT,
        variables: {
          name: input.name,
          description: input.description ?? null,
          ownerId: String(input.ownerId),
        },
        refetchQueries: [{ query: GET_PROJECTS }],
      })
      .pipe(map((r) => r.data!.createProject));
  }

  deleteProject(id: number): Observable<boolean> {
    return this.apollo
      .mutate<{ deleteProject: Project }>({
        mutation: DELETE_PROJECT,
        variables: {
          id: Number(id),
        },
        refetchQueries: [{ query: GET_PROJECTS }],
      })
      .pipe(map((r) => !!r.data?.deleteProject));
  }
}
