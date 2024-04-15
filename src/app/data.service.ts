import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

export interface Appointment {
  id: number;
  start: Date;
  length: number;
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly appointments = signal<Appointment[]>([]);
  private nextId = 1;

  constructor() {
    this.addAppointment({
      id: -1,
      start: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        8,
        0,
        0,
      ),
      length: 240,
      title: 'Payever Assessment',
      description: 'This is the first appointment'
    });
    this.addAppointment({
      id: -1,
      start: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        13,
        0,
        0,
      ),
      length: 30,
      title: 'Lunch',
      description: 'This is the second appointment'
    });
  }

  getAppointmentsStream(): Observable<ReadonlyArray<Readonly<Appointment>>> {
    return toObservable(this.appointments);
  }

  addAppointment(appointment: Readonly<Appointment>): void {
    if (appointment.id === -1) {
      appointment = {
        ...appointment,
        id: this.nextId++,
      };
    }
    this.appointments.update(appointments => [...appointments, appointment]);
  }

  updateAppointment(appointment: Readonly<Appointment>): void {
    this.appointments.update(appointments => appointments.map(a => a.id === appointment.id ? appointment : a));
  }

  deleteAppointment(appointmentId: Appointment['id']): void {
    this.appointments.update(appointments => appointments.filter(a => a.id !== appointmentId));
  }
}
