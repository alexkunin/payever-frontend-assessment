import { AsyncPipe } from '@angular/common';
import { Component, HostBinding, inject } from '@angular/core';
import { filter } from 'rxjs';
import { DataService } from '../data.service';
import { AppointmentComponent } from './appointment.component';
import { HourComponent } from './hour.component';

function isSameDate(date1: Date) {
  return (date2: Date) => {
    return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();
  }
}

@Component({
  selector: 'app-day',
  standalone: true,
  imports: [
    AsyncPipe,
    HourComponent,
    AppointmentComponent,
  ],
  templateUrl: './day.component.html',
  styleUrl: './day.component.scss'
})
export class DayComponent {
  readonly #data = inject(DataService);

  readonly #isToday = isSameDate(new Date());

  readonly hours = Array.from({ length: 24 }, (_, i) => i);
  readonly pixelsPerMinute = 1;

  @HostBinding('style.height.px')
  readonly height = this.hours.length * 60 * this.pixelsPerMinute;

  readonly appointments$ = this.#data.getAppointmentsStream().pipe(
    filter(appointments => this.#isToday(appointments[0].start)),
  );
}
