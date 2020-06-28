import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LandingService } from './landing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingComponent implements OnInit {
  title = 'ng-universal-starter';
  users = this.landingService.users;

  constructor(
    private landingService: LandingService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }
}
