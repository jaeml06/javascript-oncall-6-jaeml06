const MESSAGE = Object.freeze({
  monthDayQuery: '비상 근무를 배정할 월과 시작 요일을 입력하세요>',
  weekdayQuery: '평일 비상 근무 순번대로 사원 닉네임을 입력하세요>',
  weekendQuery: '휴일 비상 근무 순번대로 사원 닉네임을 입력하세요>',

  nonValidatedMonth : '[ERROR] 유효하지 않은 월 값입니다. 다시 입력해 주세요.',
  nonValidatedDay: '[ERROR] 유효하지 않은 요일 값입니다. 다시 입력해 주세요.',
  nonValidatedArray: '[ERROR] 유효하지 않은 배열 값입니다. 다시 입력해 주세요.',
  nonValidatedName: '[ERROR] 유효하지 않은 이름 값입니다. 다시 입력해 주세요.',

});
export default MESSAGE;
