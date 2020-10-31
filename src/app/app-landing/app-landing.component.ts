import { ChangeDetectionStrategy, Component, Inject, OnInit, Optional, PLATFORM_ID } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';
import { isPlatformServer } from '@angular/common';
import { TransferState } from '@angular/platform-browser';
import { IncomingHttpHeaders } from 'http';
import { REQUEST_HEADERS_KEY } from '../root/state.keys';

@Component({
  selector: 'app-landing',
  templateUrl: './app-landing.component.html',
  styleUrls: ['./app-landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppLandingComponent implements OnInit {
  title = 'ng-universal-starter';
  requestHeaders: IncomingHttpHeaders;

  constructor(
    @Optional() @Inject(REQUEST) private request: Request,
    @Inject(PLATFORM_ID) private platformId: string,
    private transferState: TransferState
  ) {
  }

  ngOnInit(): void {
    this.setRequestHeaders();
  }

  private setRequestHeaders(): void {
    if (isPlatformServer(this.platformId)) {
      this.transferState.set(REQUEST_HEADERS_KEY, this.request.headers || {});
    }
    this.requestHeaders = this.transferState.get(REQUEST_HEADERS_KEY, {});
  }
}
