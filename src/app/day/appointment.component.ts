import { FormatTimePipe } from '@/shared/format-time.pipe';
import { Component, input, output } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Appointment } from '../data.service';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [
    MatIconButton,
    MatIcon,
    FormatTimePipe,
  ],
  template: `
    <p>
      {{ data().start | formatTime }}
      {{ data().title }}
      <button mat-icon-button (click)="delete.emit()">
        <mat-icon>delete</mat-icon>
      </button>
    </p>
  `,
  styles: `
    :host {
      display: block;
      box-sizing: border-box;
      border: 1px solid skyblue;
      border-radius: 5px;
      background-color: lightblue;
      position: relative;
      min-height: 30px;
    }

    p {
      margin: 0;
      padding: 5px;
    }

    button {
      scale: 0.6;
      position: absolute;
      top: -10px;
      right: -10px;
    }
  `
})
export class AppointmentComponent {
  readonly data = input.required<Appointment>();
  readonly delete = output();
}
