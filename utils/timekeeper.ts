export interface ParsedDate {
  date: Date;
  year: number;
  month: string;
  day: number;
  hour: number;
  minute: number;
}

export interface DateLength {
  lengthInSec: number;
  hour: number;
  minute: number;
}

class TimeKeeper {
  private static monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  static parseDate(dateString: string): ParsedDate {
    const date = new Date(dateString);
    return {
      date,
      year: date.getFullYear(),
      month: this.monthNames[date.getMonth()],
      day: date.getDate(),
      hour: date.getHours(),
      minute: date.getMinutes(),
    };
  }

  static findLength(from: Date, to: Date): DateLength {
    const lengthInSec = Math.floor((to.getTime() - from.getTime()) / 1000);
    const hour = Math.floor(lengthInSec / 3600);
    const minute = Math.floor((lengthInSec % 3600) / 60);
    return {
      lengthInSec,
      hour,
      minute,
    };
  }

  static findAvgLength(lengthsInSec: number[]): DateLength {
    const sum = lengthsInSec.reduce((a, b) => a + b, 0);
    const avg = sum / lengthsInSec.length;
    const hour = Math.floor(avg / 3600);
    const minute = Math.floor((avg % 3600) / 60);
    return {
      lengthInSec: avg,
      hour,
      minute,
    };
  }

  static parseLength(lengthInSec: number): ParsedDate {
    const hour = Math.floor(lengthInSec / 3600);
    const minute = Math.floor((lengthInSec % 3600) / 60);
    return {
      date: new Date(lengthInSec * 1000),
      year: 0,
      month: '',
      day: 0,
      hour,
      minute,
    };
  }
}

export default TimeKeeper;
