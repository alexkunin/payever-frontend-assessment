import { Component, input } from '@angular/core';
import { Appointment } from '../data.service';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [],
  template: `
    <p>
      {{ data().start.getHours() }}:{{ data().start.getMinutes().toString().padStart(2, '0') }}
      {{ data().title }}
    </p>
  `,
  styles: `
    :host {
      display: block;
      box-sizing: border-box;
      border: 1px solid skyblue;
      border-radius: 5px;
      background-color: lightblue;
    }

    p {
      margin: 0;
      padding: 5px;
    }
  `
})
export class AppointmentComponent {
  readonly data = input.required<Appointment>();
}
