// events 모듈 사용
let events = require('events');

// EventEmitter 객체 생성
let eventEmitter = new events.EventEmitter();

// EventHandler 함수 사용
let connectHandler = function connected() {
    console.log("Connection Successful");

    // data_received 이벤트 발생시키기
    eventEmitter.emit("data_received");
}

// connection 이벤트와 connectHandler 이벤트 핸들러를 연동
eventEmitter.on('connection', connectHandler);

// data_received 이벤트와 익명 함수와 연동
// 함수를 변수안에 담는 대신에, on() 메서드의 인자로 직접 함수를 전달
eventEmitter.on('data_received', function() {
    console.log("Data Received");
});

// connection 이벤트 발생시키기
eventEmitter.emit('connection');

console.log("Program has ended");