import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingComponent {
  title = 'ng-universal-starter';

  users = this.firestore.collection('Users').valueChanges();


  constructor(private readonly firestore: AngularFirestore) {
  }
}
