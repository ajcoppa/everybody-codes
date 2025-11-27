
async function main() {
    const partOneText = await Bun.file("02-input.txt").text();
    const partOneInput = parseInput(partOneText);
    console.log(partOne(partOneInput));
}

function partOne(a: ComplexNumber): string {
    let num = {x: 0, y: 0};
    for (let i = 0; i < 3; i++) {
        num = cycle(num, a);
    }
    return toString(num);
}

function cycle(num: ComplexNumber, a: ComplexNumber): ComplexNumber {
    return add(a, divide(multiply(num, num), {x: 10, y: 10}));
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
        x: Math.floor(a.x / b.x),
        y: Math.floor(a.y / b.y),
    };
}

function toString(num: ComplexNumber): string {
    return `[${num.x},${num.y}]`;
}

function parseInput(text: string): ComplexNumber {
    const [_, xStr, yStr] = text.match(/A=\[(\d+),(\d+)\]/) ?? [];
    if (!xStr || !yStr) {
        throw new Error("Invalid input");
    }
    return {
        x: parseInt(xStr, 10),
        y: parseInt(yStr, 10)
    };
}

type ComplexNumber = {
    x: number;
    y: number;
}

main();
