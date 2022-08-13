export function add(...args : number[]) : number {
  return args.reduce((accumulator, current) => accumulator + current, 0);
}

export const temp = 3;
