import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable, switchMap } from 'rxjs';
import { User } from '@core/models/user';
import { CreateUserInput } from '@core/types/user';
import { CREATE_USER, DELETE_USER } from '@features/users/services/mutations';
import { UploadService } from '@features/upload/services';
import { GET_USERS } from './queries';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private apollo: Apollo, private uploadService: UploadService) {}

  getUsers(isActive: boolean = true): Observable<User[] | any[]> {
    return this.apollo
      .watchQuery<{ users: User[] }>({
        query: GET_USERS,
        variables: { isActive },
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
            cloudinaryPublicId: null,
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
              cloudinaryPublicId: uploadResponse.publicId,
            },
            refetchQueries: [{ query: GET_USERS }],
          })
          .pipe(map((result) => result.data!.createUser));
      })
    );
  }

  deleteUser(id: string, hardDelete: boolean = false): Observable<User> {
    return this.apollo
      .mutate<{ deleteUser: User }>({
        mutation: DELETE_USER,
        variables: {
          id,
          hardDelete,
        },
        refetchQueries: [{ query: GET_USERS }],
      })
      .pipe(map((result) => result.data!.deleteUser));
  }
}
