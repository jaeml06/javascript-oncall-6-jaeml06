import { HOLIDAY, MONTHCOUNT, TOTALDAY } from './Day';

export default class User {
  #monthDay;
  #weekdayWorker;
  #weekendWorker;

  constructor(monthday = [], weekdayWorker = [], weekendWorker = []) {
    this.#monthDay = monthday;
    this.#weekdayWorker = weekdayWorker;
    this.#weekendWorker = weekendWorker;
  }

  calculateSchedule() {
    const schedule = [];
    const monthCount = MONTHCOUNT[this.#monthDay[0] - 1];
    let weekdayIndex = 0;
    let weekendIndex = 0;
    for (let day = 1; day <= monthCount; day += 1) {
      const dayOfWeek = this.getDayOfWeek(day);
      const isHoliday = this.isHoliday(day, dayOfWeek);
      const [currentWorker, nextWorker] = this.selectWorkers(isHoliday, weekdayIndex, weekendIndex);
      [weekdayIndex, weekendIndex] = this.swapWorkersIfNeeded(schedule, currentWorker, nextWorker, isHoliday, weekdayIndex, weekendIndex);
      this.addToSchedule(schedule, day, dayOfWeek, isHoliday, currentWorker);
    }
    return [...schedule];
  }

  getDayOfWeek(day = 0) {
    return (TOTALDAY.indexOf(this.#monthDay[1]) + day - 1) % 7;
  }

  isHoliday(day = 0, dayOfWeek = 0) {
    const holidays = HOLIDAY[this.#monthDay[0] - 1];
    return holidays.includes(day) || dayOfWeek >= 5;
  }

  selectWorkers(isHoliday = false, weekdayIndex = 0, weekendIndex = 0) {
    const index = isHoliday ? weekendIndex : weekdayIndex;
    const workers = isHoliday ? this.#weekendWorker : this.#weekdayWorker;

    const currentWorker = workers[index % workers.length];
    const nextWorker = workers[(index + 1) % workers.length];

    return [currentWorker, nextWorker];
  }

  swapWorkersIfNeeded(
    schedule = [],
    currentWorker = '',
    nextWorker = '',
    isHoliday = false,
    weekdayIndex = 0,
    weekendIndex = 0,
  ) {
    const [swappedCurrent, swappedNext] = User.checkWorkerSwap(schedule, currentWorker, nextWorker);
    this.updateWorkerArray(swappedCurrent, swappedNext, isHoliday, weekdayIndex, weekendIndex);
    return User.incrementIndexes(isHoliday, weekdayIndex, weekendIndex);
  }

  static checkWorkerSwap(schedule = [], currentWorker = '', nextWorker = '') {
    if (schedule.length > 0 && schedule[schedule.length - 1].includes(currentWorker)) {
      return [nextWorker, currentWorker];
    }
    return [currentWorker, nextWorker];
  }

  updateWorkerArray(currentWorker = '', nextWorker = '', isHoliday = false, weekdayIndex = 0, weekendIndex = 0) {
    if (isHoliday) {
      this.#weekendWorker[weekendIndex % this.#weekendWorker.length] = currentWorker;
      this.#weekendWorker[(weekendIndex + 1) % this.#weekendWorker.length] = nextWorker;
    } else {
      this.#weekdayWorker[weekdayIndex % this.#weekdayWorker.length] = currentWorker;
      this.#weekdayWorker[(weekdayIndex + 1) % this.#weekdayWorker.length] = nextWorker;
    }
  }

  static incrementIndexes(isHoliday = false, weekdayIndex = 0, weekendIndex = 0) {
    let weekendIndx = weekendIndex;
    let weekdayIndx = weekdayIndex;
    if (isHoliday) {
      weekendIndx += 1;
    } else {
      weekdayIndx += 1;
    }
    return [weekdayIndx, weekendIndx];
  }

  addToSchedule(schedule = [], day = 0, dayOfWeek = 0, isHoliday = false, currentWorker = '') {
    const holidayMark = isHoliday && dayOfWeek < 5 ? '(휴일)' : '';
    schedule.push(`${this.#monthDay[0]}월 ${day}일 ${TOTALDAY[dayOfWeek]}${holidayMark} ${currentWorker}`);
  }
}
