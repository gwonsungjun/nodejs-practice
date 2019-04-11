var i;
for (i=0; i< 10; i++) {
    (function(j) {
        setTimeout(function () {
            console.log(j);
        }, 100);
    })(i);
}