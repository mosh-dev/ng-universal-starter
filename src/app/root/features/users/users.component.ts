import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {

  users = this.userService.users;

  constructor(
    private userService: UserService
  ) {
  }

}
