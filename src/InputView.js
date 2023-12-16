import { Console } from "@woowacourse/mission-utils";
import MESSAGE from './Message.js';


const InputView = {
  async readMonthDay() {
    const input = await Console.readLineAsync(`비상 근무를 배정할 월과 시작 요일을 입력하세요> `);
    return input;
  },
  async readMenu(name = ''){
    const input = await Console.readLineAsync(`${name}${MESSAGE.DoNotEatMenu}\n`);
    return input;
  }
};
export default InputView;
