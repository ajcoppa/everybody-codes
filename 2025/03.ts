async function main() {
    const partOneText = await Bun.file("03-input.txt").text();
    const partOneInput = parseInput(partOneText);
    console.log(partOne(partOneInput));
    const partTwoText = await Bun.file("03-input-2.txt").text();
    const partTwoInput = parseInput(partTwoText);
    console.log(partTwo(partTwoInput));
}

function partOne(xs: number[]): number {
    const unique = new Set(xs.sort((a, b) => b - a));
    let sum = 0;
    for (const n of unique) {
        sum += n;
    }
    return sum;
}

function partTwo(xs: number[]): number {
    const unique = new Set(xs.sort((a, b) => a - b));
    let sum = 0, crates = 0;
    for (const n of unique) {
        sum += n;
        crates++;
        if (crates === 20) return sum;
    }
    throw new Error("Didn't have enough crates");
}

function parseInput(text: string): number[] {
    return text.split(",").map(s => parseInt(s, 10));
}

main();
