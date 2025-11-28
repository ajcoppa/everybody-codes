async function main() {
    const partOneText = await Bun.file("03-input.txt").text();
    const partOneInput = parseInput(partOneText);
    console.log(partOne(partOneInput));
}

function partOne(xs: number[]): number {
    const unique = new Set(xs.sort((a, b) => b - a));
    let sum = 0;
    for (const n of unique) {
        sum += n;
    }
    return sum;
}

function parseInput(text: string): number[] {
    return text.split(",").map(s => parseInt(s, 10));
}

main();
