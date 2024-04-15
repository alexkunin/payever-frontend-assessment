import { Component, HostBinding, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, map, switchMap, timer } from 'rxjs';

@Component({
  selector: 'app-current-time-indicator',
  standalone: true,
  imports: [],
  template: ``,
  styles: `
    :host {
      display: block;
      border-top: 1px solid red;
      position: absolute;
      left: -5px;
      right: -5px;

      &::before {
        content: '';
        display: block;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 4.5px 0 4.5px 5px;
        border-color: transparent transparent transparent red;
        position: relative;
        top: -5px;
      }
    }
  `,
})
export class CurrentTimeIndicatorComponent {
  readonly pixelsPerMinute = input.required<number>();

  readonly #top$ = toObservable(this.pixelsPerMinute).pipe(
    switchMap(pixelsPerMinute => timer(0, 1000).pipe(
      map(() => {
        const now = new Date();
        return (now.getHours() * 60 + now.getMinutes()) * pixelsPerMinute;
      }),
    )),
    distinctUntilChanged(),
  );

  readonly #topSignal = toSignal(this.#top$);

  @HostBinding('visibility')
  get visibility(): string {
    return this.pixelsPerMinute() ? 'visible' : 'hidden';
  }

  @HostBinding('style.top.px')
  get top(): number | undefined {
    return this.#topSignal();
  }
}
