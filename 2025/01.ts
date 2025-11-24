async function main() {
    const text = await Bun.file("01-input.txt").text();
    const [namesLine, instructionsLine] = text.split("\n\n");
    const names = namesLine.split(",");
    const instructionStrings = instructionsLine.split(",");
    const instructions = instructionStrings.map(parseInstruction);
    console.log(partOne(names, instructions));
}

function partOne(names: string[], instructions: Instruction[]): string {
    let index = 0;
    for (const instruction of instructions) {
        index = applyModifier(index, instructionToModifier(instruction), names.length);
    }
    return names[index];
}

function applyModifier(index: number, modifier: number, max: number): number {
    index += modifier;
    if (index < 0) {
        index = 0;
    } else if (index >= max) {
        index = max - 1;
    }
    return index;
}

function instructionToModifier(instruction: Instruction): number {
    const mod = instruction.direction === Direction.Left ? -1 : 1;
    return mod * instruction.number;
}

function parseInstruction(instructionString: string): Instruction {
    const [letter, numberString] = instructionString.split("");
    const direction = letter === "L" ? Direction.Left :
        letter === "R" ? Direction.Right : null;
    const number = parseInt(numberString, 10);
    if (direction === null || isNaN(number)) {
        throw new Error(`Invalid instruction: ${instructionString}`);
    }
    return { direction, number };
}

enum Direction {
    Left,
    Right
}

type Instruction = {
    direction: Direction;
    number: number;
}

main();
