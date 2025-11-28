
async function main() {
    const partOneText = await Bun.file("02-input.txt").text();
    const partOneInput = parseInput(partOneText);
    console.log(partOne(partOneInput));
    const partTwoText = await Bun.file("02-input-2.txt").text();
    const partTwoInput = parseInput(partTwoText);
    console.log(partTwo(partTwoInput));
    const partThreeText = await Bun.file("02-input-3.txt").text();
    console.log(partThree(parseInput(partThreeText)));
}

function partOne(a: ComplexNumber): string {
    let num = {x: 0n, y: 0n};
    for (let i = 0; i < 3; i++) {
        num = cycle(num, a);
    }
    return toString(num);
}

function partTwo(start: ComplexNumber): number {
    return validPointsInGrid(start, 10n);
}

function partThree(start: ComplexNumber): number {
    return validPointsInGrid(start, 1n);
}

function validPointsInGrid(start: ComplexNumber, gridIncrement = 10n): number {
    const validPoints: ComplexNumber[] = [];
    for (let y = 0n; y <= 1000n; y += gridIncrement) {
        for (let x = 0n; x <= 1000n; x += gridIncrement) {
            const point = add(start, {x, y});
            if (check(point)) {
                validPoints.push(point);
            }
        }
    }
    return validPoints.length;
}

function check(point: ComplexNumber): boolean {
    let num = {x: 0n, y: 0n};
    for (let i = 0; i < 100; i++) {
        num = add(point, divide(multiply(num, num), {x: 100_000n, y: 100_000n}));
        if (num.x < -1_000_000n || num.x > 1_000_000n || num.y < -1_000_000n || num.y > 1_000_000n) {
            return false;
        }
    }
    return true;
}

function pointsListIncludes(list: ComplexNumber[], point: ComplexNumber): boolean {
    for (const q of list) {
        if (q.x === point.x && q.y === point.y) {
            return true;
        }
    }
    return false;
}

function cycle(num: ComplexNumber, a: ComplexNumber): ComplexNumber {
    return add(a, divide(multiply(num, num), {x: 10n, y: 10n}));
}

function add(a: ComplexNumber, b: ComplexNumber): ComplexNumber {
    return {
        x: a.x + b.x,
        y: a.y + b.y,
    };
}

function multiply(a: ComplexNumber, b: ComplexNumber): ComplexNumber {
    return {
        x: a.x * b.x - a.y * b.y,
        y: a.x * b.y + a.y * b.x,
    };
}

function divide(a: ComplexNumber, b: ComplexNumber): ComplexNumber {
    return {
        x: a.x / b.x,
        y: a.y / b.y,
    };
}

function toString(num: ComplexNumber): string {
    return `[${num.x},${num.y}]`;
}

function parseInput(text: string): ComplexNumber {
    const [_, xStr, yStr] = text.match(/A=\[([-,\d]+),([-,\d]+)\]/) ?? [];
    if (!xStr || !yStr) {
        throw new Error("Invalid input");
    }
    return {
        x: BigInt(xStr),
        y: BigInt(yStr)
    };
}

type ComplexNumber = {
    x: bigint;
    y: bigint;
}

main();
