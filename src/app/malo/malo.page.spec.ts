import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaloPage } from './malo.page';

describe('MaloPage', () => {
  let component: MaloPage;
  let fixture: ComponentFixture<MaloPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MaloPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
