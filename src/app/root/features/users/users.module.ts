import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { UserService } from './user.service';
import { RootSharedModule } from '../../root-shared/root-shared.module';


@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    RootSharedModule,
    UsersRoutingModule,
    MatListModule,
    MatCardModule,
    MatRippleModule,
    AngularFirestoreModule
  ],
  providers: [UserService]
})
export class UsersModule {
}
