import { TOTALDAY } from './Day.js';
import InputView from './InputView.js';
import OutputView from './OutputView.js';
import { Console, Random } from '@woowacourse/mission-utils';

export default class Control {
  async start() {
    OutputView.printIntroduce();
    const monthDay = await Control.getValidateMonthDay();
    
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

  static async () {
    while (true) {
      try {
        
        return ;
      } catch (error) {
        OutputView.printError(error);
      }
    }
  }
}
