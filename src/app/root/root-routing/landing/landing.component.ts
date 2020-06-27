import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { startWith, tap } from 'rxjs/operators';
import { BROWSER_PLATFORM, NODE_PLATFORM } from '../../../utilities/platform';

const usersStateKey = makeStateKey('Users');

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingComponent {
  title = 'ng-universal-starter';

  users = this.firestore
    .collection('Users').valueChanges()
    .pipe(
      tap(users => {
        if (NODE_PLATFORM) {
          this.state.set(usersStateKey, (users || []));
        }
      }),
      BROWSER_PLATFORM ? startWith(this.state.get(usersStateKey, [])) : tap()
    );


  constructor(
    private readonly firestore: AngularFirestore,
    private state: TransferState
  ) {
  }
}
