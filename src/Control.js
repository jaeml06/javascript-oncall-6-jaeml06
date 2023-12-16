import { TOTALDAY } from './Day';
import InputView from './InputView';
import MESSAGE from './Message';
import OutputView from './OutputView';
import User from './User';

export default class Control {
  async start() {
    const monthDay = await Control.getValidateMonthDay();
    const [weekdayWorker, weekendWorker] = await Control.getValidateWeekWorker();
    const user = new User(monthDay, [...weekdayWorker], [...weekendWorker]);
    const schedule = user.calculateSchedule();
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
      throw new Error(MESSAGE.nonValidatedMonth);
    }
    if (!TOTALDAY.includes(monthDayArray[1])) {
      throw new Error(MESSAGE.nonValidatedDay);
    }
  }

  static async getValidateWeekWorker() {
    while (true) {
      try {
        const weekdayWorkerString = await InputView.readWeekDayWorker();
        const weekdayWorkerArray = Control.weekWorkerStringToArray(weekdayWorkerString);
        const weekdayWorker = Control.validateWeekWorker(weekdayWorkerArray);
        const weekendWorkerString = await InputView.readWeekendWorker();
        const weekendWorkerArray = Control.weekWorkerStringToArray(weekendWorkerString);
        const weekendWorker = Control.validateWeekWorker(weekendWorkerArray);
        return [weekdayWorker, weekendWorker];
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
      throw new Error(MESSAGE.nonValidatedArray);
    }
    weekdayWorkerArray.forEach((name) => {
      if (name.length > 5 || nameSet.has(name)) {
        throw new Error(MESSAGE.nonValidatedName);
      }
      nameSet.add(name);
    });
    return weekdayWorkerArray;
  }
}
