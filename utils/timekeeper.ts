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

/**
 * A utility class for parsing and manipulating dates
 */
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

  /**
   * Pads a number with zero if it is less than 10
   * @param {number} num - Number to pad with zero
   * @returns {string} Padded number
   */
  private static padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  /**
   * Parses a date string into a ParsedDate object
   * @param {string} dateString - Date string (ISO 8601 format)
   * @returns {ParsedDate} Parsed date object with date object, and its year, month, day, hour and minute parts
   */
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

  /**
   * Finds the length between two dates
   * @param {Date} from - Start date
   * @param {Date} to - End date
   * @returns {DateLength} Object containing length in seconds, the hour part and the minute part of the length
   */
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

  /**
   * Finds the average length of an array of lengths
   * @param {number[]} lengthsInSec - Array of lengths in seconds
   * @returns {DateLength} Object containing average length in seconds, the hour part and the minute part of the length
   */
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

  /**
   * Parses a length in seconds into a ParsedDate object
   * @param {number} lengthInSec - Length in seconds
   * @returns {ParsedDate} Parsed date object with date object, and only its hour and minute parts
   */
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
