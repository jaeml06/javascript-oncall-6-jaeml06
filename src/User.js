import { Random } from '@woowacourse/mission-utils';
import { HOLIDAY, MONTHCOUNT, TOTALDAY } from './Day.js';

export default class User {
  #monthDay = [];
  #weekdayWorker = [];
  #weekendWorker = [];
  
  constructor(monthday = [], weekdayWorker = [], weekendWorker = []) {
    this.#monthDay = monthday;
    this.#weekdayWorker = weekdayWorker;
    this.#weekendWorker = weekendWorker;
  }

  write() {
    const schedule = [];
    const monthCount = MONTHCOUNT[this.#monthDay[0] - 1];
    const holidays = HOLIDAY[this.#monthDay[0] - 1];
    let weekdayIndex = 0;
    let weekendIndex = 0;
    for (let day = 1; day <= monthCount; day += 1) {
      const dayOfWeek = (TOTALDAY.indexOf(this.#monthDay[1]) + day - 1) % 7;
      const isHoliday = holidays.includes(day) || dayOfWeek >= 5; // 토요일(5)과 일요일(6)은 휴일로 간주
      let currentWorker, nextWorker;

      if (isHoliday) {
        currentWorker = this.#weekendWorker[weekendIndex % this.#weekendWorker.length];
        nextWorker = this.#weekendWorker[(weekendIndex + 1) % this.#weekendWorker.length];
      } else {
        currentWorker = this.#weekdayWorker[weekdayIndex % this.#weekdayWorker.length];
        nextWorker = this.#weekdayWorker[(weekdayIndex + 1) % this.#weekdayWorker.length];
      }

      if (schedule.length > 0 && schedule[schedule.length - 1].includes(currentWorker)) {
        // 현재 근무자와 다음 근무자 교체
        [currentWorker, nextWorker] = [nextWorker, currentWorker];
        if (isHoliday) {
          this.#weekendWorker[weekendIndex % this.#weekendWorker.length] = currentWorker;
          this.#weekendWorker[(weekendIndex + 1) % this.#weekendWorker.length] = nextWorker;
        } else {
          this.#weekdayWorker[weekdayIndex % this.#weekdayWorker.length] = currentWorker;
          this.#weekdayWorker[(weekdayIndex + 1) % this.#weekdayWorker.length] = nextWorker;
        }
      }
      // 휴일 표시 추가
      const holidayMark = isHoliday && dayOfWeek < 5 ? '(휴일)' : '';
      schedule.push(`${this.#monthDay[0]}월 ${day}일 ${TOTALDAY[dayOfWeek]}${holidayMark} ${currentWorker}`);

      // 인덱스 증가
      if (isHoliday) {
        weekendIndex++;
      } else {
        weekdayIndex++;
      }
    }
    return [...schedule];
  }
}
