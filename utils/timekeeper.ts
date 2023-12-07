export interface ParsedDate {
  date: Date;
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
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

  private static padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  static parseDate(dateString: string): ParsedDate {
    const date = new Date(dateString);
    return {
      date,
      year: `${date.getFullYear()}`,
      month: this.monthNames[date.getMonth()],
      day: this.padZero(date.getDate()),
      hour: this.padZero(date.getHours()),
      minute: this.padZero(date.getMinutes()),
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
      year: '',
      month: '',
      day: '',
      hour: this.padZero(hour),
      minute: this.padZero(minute),
    };
  }
}

export default TimeKeeper;
