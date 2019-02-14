import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';
import { map } from 'rxjs/operators';
import { from, Observable } from 'rxjs';

import { Message, File, Schedule } from '../declare';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private http: HttpClient) {}

  public getMessages() {
    // return this.http.get('/api/user/message');
    return from(axios.get('/api/user/message'));
  }
}
