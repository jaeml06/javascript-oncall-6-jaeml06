import { TOTALDAY } from './Day.js';
import InputView from './InputView.js';
import OutputView from './OutputView.js';
import { Console, Random } from '@woowacourse/mission-utils';
import User from './User.js';

export default class Control {
  #weekdayWorker = [];
  #weekendWorker = [];
  async start() {
    const monthDay = await Control.getValidateMonthDay();
    await this.getValidateWeekdayWorker();
    const user = new User(monthDay, [...this.#weekdayWorker], [...this.#weekendWorker]);
    console.log(user.write());
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
  static monthDayStringToArray(monthDayString = ''){
    return monthDayString.split(',');
  }

  static validateMonthDay(monthDayArray = []){
    if(!Number.isInteger(Number(monthDayArray[0]))|| Number(monthDayArray[0]) < 1 || Number(monthDayArray[0])>12){
      throw new Error('[ERROR] 유효하지 않은 월 값입니다. 다시 입력해 주세요.')
    }
    if(!TOTALDAY.includes(monthDayArray[1])){
      throw new Error('[ERROR] 유효하지 않은 요일 값입니다. 다시 입력해 주세요.');
    }
  }

  async getValidateWeekdayWorker() {
    while (true) {
      try {
        const weekdayWorkerString = await InputView.readWeekDayWorker();
        const weekdayWorkerArray = this.weekdayWorkerStringToArray(weekdayWorkerString);
        this.validateWeekdayWorker(weekdayWorkerArray);
        this.#weekdayWorker = weekdayWorkerArray;
        const weekendWorkerString = await InputView.readWeekendWorker();
        const weekendWorkerArray = this.weekdayWorkerStringToArray(weekendWorkerString);
        this.validateWeekdayWorker(weekendWorkerArray);
        this.#weekendWorker = weekendWorkerArray;
        return;
      } catch (error) {
        OutputView.printError(error);
      }
    }
  }

  weekdayWorkerStringToArray(weekdayWorkerString = ''){
    return weekdayWorkerString.split(',');
  }

  validateWeekdayWorker(weekdayWorkerArray = []){
    const nameSet = new Set(); 
    if(weekdayWorkerArray.length < 5 || weekdayWorkerArray.length > 35){
      throw new Error('[ERROR] 유효하지 않은 배열 값입니다. 다시 입력해 주세요.');
    }
    weekdayWorkerArray.forEach((name) => {
      if(name.length >5 || nameSet.has(name)){
        throw new Error('[ERROR] 유효하지 않은 이름 값입니다. 다시 입력해 주세요.');
      }
      nameSet.add(name);
    })
  }
}
