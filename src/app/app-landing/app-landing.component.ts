import { ChangeDetectionStrategy, Component, Inject, Optional, PLATFORM_ID } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';
import { isPlatformServer } from '@angular/common';
import { TransferState } from '@angular/platform-browser';
import { IncomingHttpHeaders } from 'http';
import { HEADERS_KEY } from '../root/state.keys';

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
    this.storeHeadersInformation();
  }

  private storeHeadersInformation(): void {
    if (isPlatformServer(this.platformId)) {
      this.headers = this.request.headers || {};
      this.transferState.set(HEADERS_KEY, this.headers);
    } else {
      this.headers = this.transferState.get(HEADERS_KEY, {});
    }
  }
}
