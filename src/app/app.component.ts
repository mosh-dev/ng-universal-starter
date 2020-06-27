import { ChangeDetectionStrategy, Component } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { NODE_PLATFORM } from './utilities/platform';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(private state: TransferState) {
    if (NODE_PLATFORM) {
      this.state.set(makeStateKey('TestData'), {name: 'Tushar'});
    }
  }
}
