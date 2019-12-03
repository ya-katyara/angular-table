import {User} from './users';
import {Comment} from './comments';

export class Post {
    constructor(
        public id: number,
        public title: string,
        public body: string
    ) {}

    userId: number;
    user: User;
    comments: Comment[] = [];
}
