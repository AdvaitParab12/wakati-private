declare module 'text-readability' {
    export const fleschKincaid: (input: {
      sentence: number;
      word: number;
      syllable: number;
    }) => number;
    export const automatedReadabilityIndex: (text: string) => number;
    export const colemanLiauIndex: (text: string) => number;
    export const smogIndex: (text: string) => number;
    export const daleChallReadabilityScore: (text: string) => number;
    export const gunningFogScore: (text: string) => number;
    export const spacheReadabilityScore: (text: string) => number;
  }
  