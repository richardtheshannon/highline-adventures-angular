import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityDetailDrawer } from './activity-detail-drawer';

describe('ActivityDetailDrawer', () => {
  let component: ActivityDetailDrawer;
  let fixture: ComponentFixture<ActivityDetailDrawer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityDetailDrawer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityDetailDrawer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
