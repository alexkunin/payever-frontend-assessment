import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, HostBinding, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { DataService } from '../data.service';
import { GlobalToolbarService } from '../global-toolbar.service';
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
  readonly #globalToolbarService = inject(GlobalToolbarService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #matDialog = inject(MatDialog);

  readonly #isToday = isSameDate(new Date());

  readonly hours = Array.from({ length: 24 }, (_, i) => i);
  readonly pixelsPerMinute = 1;

  @HostBinding('style.height.px')
  readonly height = this.hours.length * 60 * this.pixelsPerMinute;

  readonly appointments$ = this.#data.getAppointmentsStream().pipe(
    filter(appointments => this.#isToday(appointments[0].start)),
  );

  constructor() {
    this.#destroyRef.onDestroy(this.#globalToolbarService.addButton({
      id: 'add',
      icon: 'add',
      label: 'Add new appointment',
      action: () => {
        AppointmentFormComponent.open(
          this.#matDialog,
          {
            id: -1,
            start: new Date(),
            length: 30,
            title: '',
            description: '',
          }
        ).subscribe(appointment => {
          if (appointment) {
            this.#data.addAppointment(appointment);
          }
        });
      },
    }));
  }
}
