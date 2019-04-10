const fs = require('fs');

function calculateBytes() {
    fs.readdir('.', function (err, filenames) {
        var count = filenames.length;
        var totalBytes = 0;
        var i;

        for (i = 0; i < filenames.length; i++) {
            fs.stat('./' + filenames[i], function (err, stats) {
                totalBytes += stats.size;
                count--;
                if (count == 0) {
                    console.log(totalBytes);
                }
            });
        }
    });
}

calculateBytes();