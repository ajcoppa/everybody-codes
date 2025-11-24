export function sum(xs: number[]): number {
  return xs.reduce((acc, x) => acc + x, 0);
}
