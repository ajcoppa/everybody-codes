import { sum } from "../lib.ts";

async function main() {
    const partOneText = await Bun.file("01-input.txt").text();
    const partOneInput = parseInput(partOneText);
    console.log(partOne(partOneInput.names, partOneInput.instructions));
    const partTwoText = await Bun.file("01-input-2.txt").text();
    const partTwoInput = parseInput(partTwoText);
    console.log(partTwo(partTwoInput.names, partTwoInput.instructions));
    const partThreeText = await Bun.file("01-input-3.txt").text();
    const partThreeInput = parseInput(partThreeText);
    console.log(partThree(partThreeInput.names, partThreeInput.instructions));
}

function partOne(names: string[], instructions: Instruction[]): string {
    let index = 0;
    for (const instruction of instructions) {
        index = applyModifier(index, instructionToModifier(instruction), names.length);
    }
    return names[index];
}

function partTwo(names: string[], instructions: Instruction[]): string {
    let index = sum(instructions.map(instructionToModifier));
    index %= names.length;
    if (index < 0) {
        index += names.length;
    }
    return names[index];
}

function partThree(names: string[], instructions: Instruction[]): string {
    for (const instruction of instructions) {
        const firstName = names[0];
        const index = applyModifierThree(0, instructionToModifier(instruction), names.length);
        const newName = names[index];
        names[0] = newName;
        names[index] = firstName;
    }
    return names[0];
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

function applyModifierThree(index: number, modifier: number, max: number): number {
    index += modifier;
    index %= max;
    if (index < 0) {
        index += max;
    }
    return index;
}

function instructionToModifier(instruction: Instruction): number {
    const mod = instruction.direction === Direction.Left ? -1 : 1;
    return mod * instruction.number;
}

function parseInput(text: string): { names: string[], instructions: Instruction[] } {
    const [namesLine, instructionsLine] = text.split("\n\n");
    const names = namesLine.split(",");
    const instructionStrings = instructionsLine.split(",");
    const instructions = instructionStrings.map(parseInstruction);
    return { names, instructions };
}

function parseInstruction(instructionString: string): Instruction {
    const letter = instructionString[0];
    const numberString = instructionString.slice(1);
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
