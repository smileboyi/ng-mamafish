import {
  Component,
  OnInit,
  ViewChild,
  ComponentRef,
  ViewContainerRef,
  ComponentFactoryResolver,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { UtilsService } from '@services/utils.service';
import { UsersService } from './users.service';
import { User } from '@declare';

@UntilDestroy()
@Component({
  selector: 'cat-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less'],
})
export class UsersComponent implements OnInit {
  search = false;
  searchText = '';
  oldSearchText = '';
  showWay: 'grid' | 'module' = 'grid';
  users: User[];
  pageIndex = 1;
  fetchState = false;

  @ViewChild('userDialogContainer', { read: ViewContainerRef, static: true })
  userDialogContainer: ViewContainerRef;

  userDialog: ComponentRef<UserDialogComponent>;

  constructor(
    private usersService: UsersService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    this.getUsers();
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(
        UserDialogComponent
      );
    this.userDialog =
      this.userDialogContainer.createComponent(componentFactory);
    this.userDialog.instance.subscriptionForm((user: User) => {
      user.id ? this.updateUser(user) : this.addUser(user);
    });
  }

  getUsers(): void {
    this.users = [];
    this.fetchState = true;
    this.usersService.getUsers().subscribe((users) => {
      const searchText = this.searchText.trim().toLowerCase();
      this.oldSearchText = searchText;
      this.users = users.filter((u: User) => {
        const fullName = u.profile.name + ' ' + u.profile.surname;
        return fullName.toLowerCase().indexOf(searchText) > -1;
      });
      this.fetchState = false;
    });
  }

  addUser(user: User): void {
    this.usersService.addUser(user).subscribe(() => this.getUsers());
  }

  updateUser(user: User): void {
    this.usersService.updateUser(user).subscribe(() => this.getUsers());
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

  // 本地变量中搜索200，请求搜索300
  @UtilsService.throttle(300)
  searchUser(): void {
    const searchText = this.searchText.trim().toLowerCase();
    if (this.oldSearchText !== searchText) {
      this.getUsers();
    }
  }

  toggleSearch(): void {
    this.search = !this.search;
    if (!this.search) {
      if (this.searchText.trim()) {
        this.getUsers();
      }
      this.searchText = '';
    }
  }

  handlePageIndexChange(index: number): void {
    this.pageIndex = index;
    this.getUsers();
  }

  openUserDialog(user?: User): void {
    this.userDialog.instance.initForm(user);
  }
}
