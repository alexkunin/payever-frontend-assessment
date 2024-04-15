import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

export interface Button {
  id: PropertyKey;
  icon: string;
  label: string;
  action: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class GlobalToolbarService {
  readonly #buttons = signal<Button[]>([]);

  addButton(button: Button): () => void {
    this.#buttons.update(buttons => [...buttons, button]);
    return () => {
      this.#buttons.update(buttons => buttons.filter(b => b !== button));
    };
  }

  getButtonsStream(): Observable<ReadonlyArray<Readonly<Button>>> {
    return toObservable(this.#buttons);
  }
}
