import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any = [];

  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(this.apiUrl)
    .subscribe(response => {
      this.posts = response;
    });
  }

  createPost(input: HTMLInputElement) {
    let post = { title: input.value, id: 0 };
    input.value = '';

    this.http.post(this.apiUrl, JSON.stringify(post))
    .subscribe(response => {
      const postWithId = response as { id: number }; // Assert response has id

      post.id = postWithId.id;
      // this.posts.splice(0, 0, post);

      console.log(post);
      console.log(response);
    });
  }

  updatePost(post: any) {
    // this.http.put(this.apiUrl, JSON.stringify(post))
    this.http.patch(this.apiUrl + '/' + post.id, JSON.stringify({ isRead: true }))
    .subscribe(response => {
      console.log(response);

    })
  }

  deletePost(post: any) {
    this.http.delete(this.apiUrl + '/' + post.id)
    .subscribe(response => {
      let index = this.posts.indexOf(post);
      this.posts.splice(index, 1);
    });
  }

}
