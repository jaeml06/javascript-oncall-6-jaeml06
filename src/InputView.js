import { Console } from '@woowacourse/mission-utils';
import MESSAGE from './Message';

const InputView = {
  async readMonthDay() {
    const input = await Console.readLineAsync(MESSAGE.monthDayQuery);
    return input;
  },
  async readWeekDayWorker() {
    const input = await Console.readLineAsync(MESSAGE.weekdayQuery);
    return input;
  },

  async readWeekendWorker() {
    const input = await Console.readLineAsync(MESSAGE.weekendQuery);
    return input;
  },
};
export default InputView;
