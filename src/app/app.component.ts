import { CurrentTimeComponent } from '@/shared/current-time';
import { GlobalToolbarWidgetDirective, GlobalToolbarWidgetsComponent } from '@/shared/global-toolbar';
import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, MatToolbar, MatSidenavModule, GlobalToolbarWidgetsComponent, GlobalToolbarWidgetDirective, CurrentTimeComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'calendar';
}
