import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardAppointmentComponent } from '../admin/appointments/appointment.component';


describe('DashboardAppointmentComponent', () => {
  let component: DashboardAppointmentComponent;
  let fixture: ComponentFixture<DashboardAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAppointmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
