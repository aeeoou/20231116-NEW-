// 현재 날짜 표시
const displayDate = document.querySelector ("#Today");

const Today = new Date();                              // 'Today' 라는 변수에 Date객체의 인스턴스를 만들어 할당
const year  = Today.getFullYear();
const month = Today.getMonth() + 1;                    // getMonth()는 '0~11' 까지의 숫자를 반환하기 때문에 +1을 붙인다.
const date  = Today.getDate();
const day1  = Today.getDay();                          // getDay()는 '0~6' 까지의 숫자를 반환

let day2 = "";                                         // 'day2' 라는 변수를 선언 후 초기값으로 빈 문자열을 할당
switch(day1) {                                         // 요일을 숫자로 표시할 것이 아니기 때문에 "switch문"을 이용해 각 숫자에 요일을 구분지어 표시를 해준다.
    case 0:
        day2 = "일요일"; break;
    case 1:
        day2 = "월요일"; break;
    case 2:
        day2 = "화요일"; break;
    case 3:
        day2 = "수요일"; break;
    case 4:
        day2 = "목요일"; break;
    case 5:
        day2 = "금요일"; break;
    case 6:
        day2 = "토요일"; break; 
}
displayDate.innerHTML = `                                                           
${year}년 ${month}월 ${date}일 <span style = "font-weight : bold"> ${day2} </span>`; // <span style = "font-weight : bold"> ${day2} </span> 요일에만 볼드체를 설정하여 표시한다.


// 현재 시간 표시
const displayTime = document.querySelector ("#Clock");

let Clock = () => {

    const current = new Date();                            // 시간이 1초마다 계속 바뀌기 때문에 바뀌는 값을 새로운 객체로 만들어 가져온다.
    let hrs  = current.getHours();                         // const 대신에 let을 사용하는 이유 : 가져온 시간 값을 다시 값을 변화시킬 것이기 때문에 const가 아닌 let으로 지정한다.
    let mins = current.getMinutes();
    let secs = current.getSeconds();

    let period = "AM";                                     // 가져온 시간 값을 오전(AM), 오후(PM)으로 나누는 기준은 '정오(낮)'으로 설정 
    if ( hrs == 0 ) {                                      // 낮 12시보다 작으면 오전(AM)으로, 크면 오후(PM)으로 표시
        hrs = 12;
    } else if ( hrs > 12 ) {
        hrs = hrs - 12;
        period = "PM";
    }

    //hrs  = hrs.toString().padStart(2,'0');              
    //mins = mins.toString().padStart(2, '0');             // 내장 메서드 냐 사용자 정의 메서드냐의 차이
    //secs = secs.toString().padStart(2, '0');
    hrs  = ( hrs < 10 ) ? "0" + hrs : hrs;                 // 조건(삼항)연산자
    mins = ( mins < 10 ) ? "0" + mins : mins;              // 'hrs, mins, secs' 값이 10보다 작다면(true) 원래 있던 값 앞에 '0' 을 붙인다. 
    secs = ( secs < 10 ) ? "0" + secs : secs;

    displayTime.innerText = `
    ${period} ${hrs} : ${mins} : ${secs}`;
}

setInterval (Clock, 1000);                                 // 'Clock' 이라는 함수를 1000(1초) 마다 실행 

/*
// 버튼
let handleId = 0;
const goButton   = document.getElementById ("Go");
const stopButton = document.getElementById ("Stop");

goButton.onclick = function() {
    if (handleId == 0) {
        handleId = setInterval(Clock, 1000)
    }
};

stopButton.onclick = function() {
    if (handleId !== 0) {
        clearInterval (handleId);
        handleId = 0;
    }   
};
*/


// 스톱워치
let timerId;
let time = 0;
let hour, min, sec;
const Stopwatch   = document.getElementById ("Stopwatch");

function printTime() {
    time++;
    Stopwatch.innerText = getTimeFormatString();
}

function startClock() {
    // 스톱워치 시작
    printTime();
    stopClock();
    timerId = setTimeout(startClock, 1000);
}

function stopClock() {
    // 스톱워치 정지
    if (timerId != null) {
        clearTimeout(timerId);
    }
}

function resetClock() {
    // 스톱워치 초기화
    stopClock();
    Stopwatch.innerText = "00:00:00";
    time = 0;
}

function getTimeFormatString() {
    // 시간 '시-분-초'를 문자열로 변환
    hour = parseInt (String (time / (60 * 60)));
    min  = parseInt (String ((time - (hour * 60 * 60)) / 60));
    sec  = time % 60;

    return (
        String(hour).padStart(2, '0') +
        ":" +
        String(min).padStart(2, '0') +
        ":" +
        String(sec).padStart(2, '0')
    );
}