import Control from '../src/Control';

describe('월, 요일 유효성 검사', () => {
  test.each([[0,'월'], [-5,'월'], [13,'월'], [4.5,'월']])('월이 1~12 정수 이외일 경우 에러', (input) => {
    expect(() => Control.validateMonthDay(input)).toThrow('[ERROR]');
  });

  test.each([[1,'ㅇㄴㄹ'], [2,'rma'], [3,'그'], [4,'해']])('요일이 월~금 이외일 경우 에러', (input) => {
    expect(() => Control.validateMonthDay(input)).toThrow('[ERROR]');
  });
});

describe('근무자 배열 검사', () => {
  test.each([['a', 'b', 'c', 'd'], ['zvG', 'Pd', 'nHRpO', 'bIs', 'Edu', 'h', 'lCo', 'PO', 'YvGta', 'oMHfL', 'i', 'tMg', 'F', 'tofS', 'kOZX', 'LNY', 'Yu', 'ppR', 'CZ', 'GT', 'zunvU', 'lXaaV', 'sYFh', 'M', 'Eht', 'oeJb', 'Fbe', 'E', 'SVy', 'c', 'qS', 'qEVaJ', 'QFDr', 'eEWB', 'd', 'bDJU', 'Efz']])('근무자가 5명 미만이거나 35초과인 경우', (input) => {
    expect(() => Control.validateWeekWorker(input)).toThrow('[ERROR]');
  });

  test.each([['a', 'b', 'c', 'd', 'a']])('근무자가 중복인 경우', (input) => {
    expect(() => Control.validateMonthDay(input)).toThrow('[ERROR]');
  });
  test.each([['a', 'b', 'c', 'd', 'abcdfg']])('근무자 이름이 5글자 초과인 경우', (input) => {
    expect(() => Control.validateMonthDay(input)).toThrow('[ERROR]');
  });
});