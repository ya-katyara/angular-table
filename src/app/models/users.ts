import { Injectable } from '@angular/core';
import { Adapter } from './adapter';

export class User {
    constructor(
        public id: number,
        public username: string,
        public city: string,
        public email: string
    ) {}
}

@Injectable({
    providedIn: 'root'
})
export class UserAdapter implements Adapter<User> {
    adapt(item: any): User {
      return new User(
        item.id,
        item.username,
        item.address.city,
        item.email
      );
    }
}