import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';

import { users } from '@mock/data.mock';
import { User } from '@declare';

export class UsersData implements InMemoryDbService {
  constructor() {}

  createDb(): Object {
    return { users };
  }
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url = '/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  addUser(user: User): Observable<any> {
    return this.http.post(this.url, user);
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(this.url, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
