import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { User } from '@app/core/models/user';
import { GET_USERS } from '@features/users/queries';

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
}
