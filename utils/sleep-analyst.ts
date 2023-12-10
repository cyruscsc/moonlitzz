import { Sleep } from '@prisma/client';
import TK from './timekeeper';

interface AverageDuration {
  duration: number;
  hour: string;
  minute: string;
}

interface DurationDataObject {
  name: string;
  duration: number; // in seconds
}

/**
 * A utility class for analyzing sleeps
 */
class SleepAnalyst {
  private days: 7 | 30;
  private outData: DurationDataObject[];
  private allDurations: number[];
  private totalNightmares: number;
  private totalWakeups: number;
  private totalSweats: number;

  /**
   * Creates a new SleepAnalyst
   * @param {Sleep[]} sleeps - sleeps to analyze
   * @param {7 | 30} days - number of days to analyze
   */
  constructor(sleeps: Sleep[], days: 7 | 30) {
    this.days = days;
    this.outData = [];
    this.allDurations = [];
    this.totalNightmares = 0;
    this.totalWakeups = 0;
    this.totalSweats = 0;
    this.analyze(sleeps);
  }

  /**
   * Analyzes the sleeps and create the data for the chart
   * @param {Sleep[]} sleeps
   */
  private analyze(sleeps: Sleep[]): void {
    const limit = this.days < sleeps.length ? this.days : sleeps.length;
    for (let i = 0; i < limit; i++) {
      const start = TK.parseDate(sleeps[i].start);
      const startDate = `${start.month} ${start.day}`;
      const length = TK.parseLength(sleeps[i].duration);
      const lengthString = `${length.hour}.${length.minute}`;
      this.data.push({
        name: startDate,
        duration: parseFloat(lengthString),
      });
      this.allDurations.push(sleeps[i].duration);
      if (sleeps[i].nightmare) this.totalNightmares++;
      if (sleeps[i].wakeup) this.totalWakeups++;
      if (sleeps[i].sweat) this.totalSweats++;
    }
  }

  /**
   * Returns the data for the chart
   */
  get data(): DurationDataObject[] {
    return this.outData;
  }

  /**
   * Returns the average duration of the sleeps
   */
  get average(): AverageDuration {
    const duration =
      this.allDurations.reduce((a, b) => a + b, 0) / this.allDurations.length;
    const { hour, minute } = TK.parseLength(duration);
    return {
      duration,
      hour,
      minute,
    };
  }

  /**
   * Returns the total number of nightmares
   */
  get nightmares(): number {
    return this.totalNightmares;
  }

  /**
   * Returns the total number of wakeups
   */
  get wakeups(): number {
    return this.totalWakeups;
  }

  /**
   * Returns the total number of sweats
   */
  get sweats(): number {
    return this.totalSweats;
  }
}

export default SleepAnalyst;
