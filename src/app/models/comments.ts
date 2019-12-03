import {Post} from './posts';

export class Comment {
    id: number;
    name: string;
    email: string;
    body: string;
    postId: number;
    post: Post;
}