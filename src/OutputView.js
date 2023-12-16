import { Console } from '@woowacourse/mission-utils';
import MESSAGE from './Message.js';


const OutputView = {
  printSchedule(schedule = []){
    schedule.forEach((string) => {
      Console.print(string);
    })
  },

  printError(error){
    Console.print(error.message);
  }

};

export default OutputView;
