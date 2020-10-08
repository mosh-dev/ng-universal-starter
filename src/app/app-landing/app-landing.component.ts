import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './app-landing.component.html',
  styleUrls: ['./app-landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppLandingComponent {
  title = 'ng-universal-starter';
}
