import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime',
  standalone: true
})
export class FormatTimePipe implements PipeTransform {
  transform(timeInMinutes: number | null | undefined): string {
    if (typeof timeInMinutes !== 'number') {
      return '';
    }

    const hours = Math.floor(timeInMinutes / 60);
    const minutes = timeInMinutes % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
  }
}
