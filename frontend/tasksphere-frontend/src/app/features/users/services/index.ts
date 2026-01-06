import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { User } from '@app/core/models/user';
import { GET_USERS } from '@features/users/queries';
import { CreateUserInput } from '@app/core/types/user';
import { CREATE_USER } from '@app/features/users/services/mutations';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private apollo: Apollo) {}

  getUsers(): Observable<User[] | any[]> {
    return this.apollo
      .watchQuery<{ users: User[] }>({
        query: GET_USERS,
        fetchPolicy: 'network-only',
      })
      .valueChanges.pipe(map((result) => result.data?.users || []));
  }

  createUser(input: CreateUserInput): Observable<User> {
    return this.apollo
      .mutate<{ createUser: User }>({
        mutation: CREATE_USER,
        variables: {
          name: input.name,
          email: input.email,
          profilePictureUrl: input.profilePictureUrl ?? null,
        },
        refetchQueries: [{ query: GET_USERS}]
      })
      .pipe(map((r) => r.data!.createUser));
  }

}
