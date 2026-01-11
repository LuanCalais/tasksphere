import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable, of, switchMap } from 'rxjs';
import { User } from '@core/models/user';
import { GET_USERS } from '@features/users/queries';
import { CreateUserInput } from '@core/types/user';
import { CREATE_USER } from '@features/users/services/mutations';
import { UploadService } from '@features/upload/services';
import { UploadResponse } from '@app/core/types/upload';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private apollo: Apollo, private uploadService: UploadService) {}

  getUsers(): Observable<User[] | any[]> {
    return this.apollo
      .watchQuery<{ users: User[] }>({
        query: GET_USERS,
        fetchPolicy: 'network-only',
      })
      .valueChanges.pipe(map((result) => result.data?.users || []));
  }
  createUser(input: CreateUserInput, file?: File): Observable<User> {
    if (!file) {
      return this.apollo
        .mutate<{ createUser: User }>({
          mutation: CREATE_USER,
          variables: {
            name: input.name,
            email: input.email,
            profilePictureUrl: null,
          },
          refetchQueries: [{ query: GET_USERS }],
        })
        .pipe(map((result) => result.data!.createUser));
    }

    return this.uploadService.uploadFile(file).pipe(
      switchMap((uploadResponse) => {
        return this.apollo
          .mutate<{ createUser: User }>({
            mutation: CREATE_USER,
            variables: {
              name: input.name,
              email: input.email,
              profilePictureUrl: uploadResponse.fileUrl,
            },
            refetchQueries: [{ query: GET_USERS }],
          })
          .pipe(map((result) => result.data!.createUser));
      })
    );
  }
}
