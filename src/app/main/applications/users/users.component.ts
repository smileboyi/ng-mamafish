import { Component, OnInit } from '@angular/core';

import { UsersService } from './users.service';
import { User } from '@declare';

@Component({
  selector: 'cat-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})
export class UsersComponent implements OnInit {
  search = false;
  searchText = '';
  showWay: 'grid' | 'module' = 'grid';
  users: User[];
  pageIndex = 1;
  fetchState = false;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.users = [];
    this.fetchState = true;
    this.usersService.getUsers().subscribe(users => {
      this.users = users;
      this.fetchState = false;
    });
  }

  deleteUser(user: User): void {
    this.usersService.deleteUser(user.id).subscribe(() => {
      const arr = this.users.slice((this.pageIndex - 1) * 8);
      // 如果最后一页的数据删完，位置改为前一页
      if (arr.length === 1) {
        this.pageIndex = this.pageIndex - 1;
      }
      this.getUsers();
    });
  }

  searchUser(): void {}

  handlePageIndexChange(index: number): void {
    this.pageIndex = index;
    this.getUsers();
  }
}
