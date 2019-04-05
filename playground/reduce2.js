const oneTwoThree = [1, 2, 3];

let result = oneTwoThree.reduce((acc, cur, i) => {
    console.log(acc, cur, i);
    return acc + cur;
}, 0);
