import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LandingService } from './landing.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingComponent {
  title = 'ng-universal-starter';
  users = this.landingService.users;

  constructor(
    private landingService: LandingService
  ) {
  }
}
