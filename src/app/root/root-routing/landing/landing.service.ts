import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { TransferState } from '@angular/platform-browser';
import { startWith, tap } from 'rxjs/operators';
import { BROWSER_PLATFORM, NODE_PLATFORM } from '../../../utilities/platform';
import { usersStateKey } from '../../../state-keys/state-keys';

@Injectable()
export class LandingService {
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
    private readonly state: TransferState
  ) {
  }
}
