import Control from '../src/Control';

describe('월, 요일 유효성 검사', () => {
  test.each([[0,'월'], [-5,'월'], [13,'월'], [4.5,'월']])('월이 1~12 정수 이외일 경우 에러', (input) => {
    expect(() => Control.validateMonthDay(input)).toThrow('[ERROR]');
  });

  test.each([[1,'ㅇㄴㄹ'], [2,'rma'], [3,'그'], [4,'해']])('요일이 월~금 이외일 경우 에러', (input) => {
    expect(() => Control.validateMonthDay(input)).toThrow('[ERROR]');
  });
});
