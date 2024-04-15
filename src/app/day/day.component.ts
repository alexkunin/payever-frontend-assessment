import { CdkDrag } from '@angular/cdk/drag-drop';
import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, HostBinding, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { Appointment, DataService } from '../data.service';
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
    CdkDrag,
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
    map(appointments => appointments.filter(appointment => this.#isToday(appointment.start))),
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

  setAppointmentStart(appointment: Readonly<Appointment>, minutes: number): void {
    minutes = Math.floor(minutes / 15) * 15;
    this.#data.updateAppointment({
      ...appointment,
      start: new Date(
        appointment.start.getFullYear(),
        appointment.start.getMonth(),
        appointment.start.getDate(),
        Math.floor(minutes / 60),
        minutes % 60,
      ),
    });
  }

  editAppointment(appointment: Readonly<Appointment>): void {
    AppointmentFormComponent.open(
      this.#matDialog,
      appointment,
    ).subscribe(appointment => {
      if (appointment) {
        this.#data.updateAppointment(appointment);
      }
    });
  }

  deleteAppointment(appointment: Readonly<Appointment>): void {
    this.#data.deleteAppointment(appointment.id);
  }
}
