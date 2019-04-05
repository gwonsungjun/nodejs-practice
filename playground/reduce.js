const data = [1, 2, 3, 4, 5 ,6];

var initialValue = [];
var reducer = function (accumulator, value) {
    if(value % 2 != 0){
        accumulator.push(value * 2);
    }
    return accumulator;
};

var result1 = data.reduce(reducer, initialValue);
console.log(result1);

var result2 = data.filter(x => x % 2 != 0).map(x => x * 2);
console.log(result2);