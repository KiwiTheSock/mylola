import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timePipeDetail'
})
export class TimePipeDetail implements PipeTransform {

  transform(d: any): string {

    let currentDate = new Date(new Date().toUTCString());
    let date = new Date(d);

    let year = currentDate.getFullYear() - date.getFullYear();
    let month = currentDate.getMonth() - date.getMonth();
    let day = currentDate.getDate() - date.getDate();
    let hour = currentDate.getHours() - date.getHours();
    let minute = currentDate.getMinutes() - date.getMinutes();
    let second = currentDate.getSeconds() - date.getSeconds();

    let createdSecond = (year * 31556926) + (month * 2629746) + (day * 86400) + (hour * 3600) + (minute * 60) + second;

    if (createdSecond >= 31556926) {
      let yearAgo = Math.floor(createdSecond / 31556926);
      return yearAgo > 1 ? "Vor " +  yearAgo + " Jahren" : "Vor " +  yearAgo + " Jahr";
    } else if (createdSecond >= 2629746) {
      let monthAgo = Math.floor(createdSecond / 2629746);
      return monthAgo > 1 ? "Vor " +  monthAgo + " Monaten" : "Vor " +  monthAgo + " Monat";
    } else if (createdSecond >= 86400) {
      let dayAgo = Math.floor(createdSecond / 86400);
      return dayAgo > 1 ? "Vor " +  dayAgo + " Tagen" : "Vor " + dayAgo + " Tag";
    } else if (createdSecond >= 3600) {
      let hourAgo = Math.floor(createdSecond / 3600);
      return hourAgo > 1 ? "Vor " +  hourAgo + " Stunden" : "Vor " +  hourAgo + " Stunde";
    } else if (createdSecond >= 60) {
      let minuteAgo = Math.floor(createdSecond / 60);
      return minuteAgo > 1 ? "Vor " +  minuteAgo + " Minuten" : "Vor " +  minuteAgo + " Minute";
    } else if (createdSecond < 60) {
      return createdSecond > 1 ? "Vor " + createdSecond + " Sekunden" : "Vor " + createdSecond + " Sekunde";
    } else if (createdSecond < 0) {
      return "Vor 0 Sekunden";
    }
  }

}
