import { Console } from '@woowacourse/mission-utils';
import MESSAGE from './Message.js';


const OutputView = {
  printIntroduce() {
    Console.print(MESSAGE.introduce);
  },

  printComplete(){
    Console.print(MESSAGE.complete);
  },

  printError(error){
    Console.print(error.message);
  }

};

export default OutputView;
