import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppLandingComponent } from './app-landing.component';

describe('LandingComponent', () => {
  let component: AppLandingComponent;
  let fixture: ComponentFixture<AppLandingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppLandingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('ng-universal-starter app is running!');
  });

});
