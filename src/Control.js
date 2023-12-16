import { TOTALDAY } from './Day';
import InputView from './InputView';
import OutputView from './OutputView';
import User from './User';

export default class Control {
  #weekdayWorker = [];
  #weekendWorker = [];

  async start() {
    const monthDay = await Control.getValidateMonthDay();
    await this.getValidateWeekWorker();
    const user = new User(monthDay, [...this.#weekdayWorker], [...this.#weekendWorker]);
    const schedule = user.write();
    OutputView.printSchedule(schedule);
  }

  static async getValidateMonthDay() {
    while (true) {
      try {
        const monthDayString = await InputView.readMonthDay();
        const monthDayArray = Control.monthDayStringToArray(monthDayString);
        Control.validateMonthDay(monthDayArray);
        return monthDayArray;
      } catch (error) {
        OutputView.printError(error);
      }
    }
  }
  static monthDayStringToArray(monthDayString = '') {
    return monthDayString.split(',');
  }

  static validateMonthDay(monthDayArray = []) {
    if (!Number.isInteger(Number(monthDayArray[0])) || Number(monthDayArray[0]) < 1 || Number(monthDayArray[0]) > 12) {
      throw new Error('[ERROR] 유효하지 않은 월 값입니다. 다시 입력해 주세요.');
    }
    if (!TOTALDAY.includes(monthDayArray[1])) {
      throw new Error('[ERROR] 유효하지 않은 요일 값입니다. 다시 입력해 주세요.');
    }
  }

  async getValidateWeekWorker() {
    while (true) {
      try {
        const weekdayWorkerString = await InputView.readWeekDayWorker();
        const weekdayWorkerArray = Control.weekWorkerStringToArray(weekdayWorkerString);
        this.#weekdayWorker = Control.validateWeekWorker(weekdayWorkerArray);
        const weekendWorkerString = await InputView.readWeekendWorker();
        const weekendWorkerArray = Control.weekWorkerStringToArray(weekendWorkerString);
        this.#weekendWorker =  Control.validateWeekWorker(weekendWorkerArray);
        return;
      } catch (error) {
        OutputView.printError(error);
      }
    }
  }

  static weekWorkerStringToArray(weekdayWorkerString = '') {
    return weekdayWorkerString.split(',');
  }

  static validateWeekWorker(weekdayWorkerArray = []) {
    const nameSet = new Set();
    if (weekdayWorkerArray.length < 5 || weekdayWorkerArray.length > 35) {
      throw new Error('[ERROR] 유효하지 않은 배열 값입니다. 다시 입력해 주세요.');
    }
    weekdayWorkerArray.forEach((name) => {
      if (name.length > 5 || nameSet.has(name)) {
        throw new Error('[ERROR] 유효하지 않은 이름 값입니다. 다시 입력해 주세요.');
      }
      nameSet.add(name);
    });
    return weekdayWorkerArray;
  }
}
