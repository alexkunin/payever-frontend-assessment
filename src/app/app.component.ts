import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterOutlet } from '@angular/router';
import { GlobalToolbarService } from './global-toolbar.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, MatToolbar, MatSidenavModule, MatIcon, MatIconButton, AsyncPipe, MatTooltip ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly #globalToolbarService = inject(GlobalToolbarService);

  readonly buttons$ = this.#globalToolbarService.getButtonsStream();

  title = 'calendar';
}
