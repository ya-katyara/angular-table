import { Component, OnInit } from '@angular/core';
import { HttpService} from './http.service';
import {User} from './models/users';
import {Post} from './models/posts';
import {Comment} from './models/comments';
import { forkJoin } from 'rxjs';
import { getDescendantProp } from './tools/functions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [HttpService]
})
export class AppComponent implements OnInit {
  users: User[]=[];
  posts: Post[]=[];
  comments: Comment[]=[];
  currentSortParam:string;
  tableHeaders = [
    {
      property: 'user.username',
      text: 'Имя пользователя',
      selected: false,
      direction: 'asc'
    },
    {
      property: 'user.city',
      text: 'Название города',
      selected: false,
      direction: 'asc'
    },
    {
      property: 'title',
      text: 'Название публикации',
      selected: false,
      direction: 'asc'
    },
    {
      property: 'comments.length',
      text: 'Количество комментариев',
      selected: false,
      direction: 'asc'
    }
  ];

  title = "Посты пользователей";
 
  constructor(private httpService: HttpService){}
    
  ngOnInit(){
    forkJoin([
      this.httpService.getPosts(),
      this.httpService.getUsers(),
      this.httpService.getComments()
    ]).subscribe(
        (data) => {
          this.posts = data[0];
          this.users = data[1];
          this.comments = data[2];

          for (let post of this.posts) {
            let user = this.users.find(item => {
              return item.id === post.userId;
            });
            post.user = user;
            
            let comments = this.comments.filter(item => {
              return item.postId === post.id;
            });

            if (comments) post.comments = comments;
          }
        }
    )
  }

  sortData(header:any) {
    let type = header.property;
    this.tableHeaders.forEach(item => item.selected = false);
    header.selected = true;

    if (type == this.currentSortParam) {
      type = "-"+type;
      header.direction = 'desc';
    } else {
      header.direction = 'asc';
    }
    this.currentSortParam = type;
    this.posts.sort(this.dynamicSort(type));
  }

  dynamicSort(property:string) {
    let sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a:Post,b:Post) {
        let a_nested = getDescendantProp(a, property);
        let b_nested = getDescendantProp(b, property);
        let result = (a_nested < b_nested) ? -1 : 
            (a_nested > b_nested) ? 1 : 0;
        return result * sortOrder;
    }
  }
}
