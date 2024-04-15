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
      position: relative;
      min-height: 30px;
    }

    p {
      position: absolute;
      margin: 0;
      height: 100%;
      padding: 5px;
      left: 2px;
      right: 2px;
      min-height: 30px;
      box-sizing: border-box;
      border: 1px solid skyblue;
      border-radius: 5px;
      background-color: lightblue;
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
