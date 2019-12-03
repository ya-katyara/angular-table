import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserAdapter } from './models/users';
import { Post } from './models/posts';
import { Comment } from './models/comments';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
  
const apiUrl = "https://jsonplaceholder.typicode.com/";

@Injectable()
export class HttpService{
    constructor(
        private http: HttpClient,
        private userAdapter: UserAdapter){ }
      
    getUsers(): Observable<User[]> {
        return this.http.get(apiUrl+'users').pipe(
            map((data: any[]) => data.map(item => this.userAdapter.adapt(item)))
        );
    }

    getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(apiUrl+'posts');
    }

    getComments(): Observable<Comment[]> {
        return this.http.get<Comment[]>(apiUrl+'comments');
    }
}