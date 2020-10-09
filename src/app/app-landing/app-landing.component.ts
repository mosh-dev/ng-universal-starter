import { ChangeDetectionStrategy, Component, Inject, Optional, PLATFORM_ID } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';
import { isPlatformServer } from '@angular/common';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { IncomingHttpHeaders } from 'http';

const headers = makeStateKey('headers');

@Component({
  selector: 'app-landing',
  templateUrl: './app-landing.component.html',
  styleUrls: ['./app-landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppLandingComponent {
  title = 'ng-universal-starter';
  headers: IncomingHttpHeaders;

  constructor(
    @Optional() @Inject(REQUEST) private request: Request,
    @Inject(PLATFORM_ID) private platformId: string,
    private transferState: TransferState
  ) {
    if (isPlatformServer(this.platformId)) {
      this.transferState.set(headers, this.request.headers);
    }
    this.headers = this.transferState.get(headers, {});
  }
}
