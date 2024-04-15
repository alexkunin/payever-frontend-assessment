import { Component, input } from '@angular/core';

@Component({
  selector: 'app-hour',
  standalone: true,
  imports: [],
  template: `
    {{ hour () }}:00
  `,
  styles: `
    :host {
      display: block;
      box-sizing: border-box;
      border: 1px dotted silver;
      border-bottom: none;
      font-size: 0.6em;
      color: silver;
      padding: 0 3px;
    }
  `
})
export class HourComponent {
  readonly hour = input.required<number>();
}
