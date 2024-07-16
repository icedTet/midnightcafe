function binarySearch(arr, target) {
    let middle = arr[~~(arr.length/2)];
   
    if (target === middle) {
        return ~~(arr.length/2)
    }else {
         if (arr.length <=1) return -1;
    }
    if (target < middle) {
        return binarySearch(arr.slice(0,~~(arr.length/2)),target);
    } else {
        let sol = binarySearch(arr.slice(arr.length/2));
        if (sol === -1) return -1;
        return ~~(arr.length/2) + sol
    }
    // WRITE YOUR BRILLIANT CODE HERE
    return 0;
}

function splitWords(s) {
    return s == "" ? [] : s.split(' ');
}

function* main() {
    const arr = splitWords(yield).map((v) => parseInt(v));
    const target = parseInt(yield);
    const res = binarySearch(arr, target);
    console.log(res);
}

class EOFError extends Error {}
{
    const gen = main();
    const next = (line) => gen.next(line).done && process.exit();
    let buf = '';
    next();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (data) => {
        const lines = (buf + data).split('\n');
        buf = lines.pop();
        lines.forEach(next);
    });
    process.stdin.on('end', () => {
        buf && next(buf);
        gen.throw(new EOFError());
    });
}
