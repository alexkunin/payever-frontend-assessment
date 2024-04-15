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

  constructor() {
    this.appointments.set([
      {
        id: 1,
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
      },
      {
        id: 2,
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
      },
    ]);
  }

  getAppointmentsStream(): Observable<ReadonlyArray<Readonly<Appointment>>> {
    return toObservable(this.appointments);
  }
}
