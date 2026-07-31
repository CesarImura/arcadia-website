declare module "split-type" {
  export default class SplitType {
    constructor(
      target: string | Element | Element[],
      options?: {
        types?: string;
        tagName?: string;
        lineClass?: string;
        wordClass?: string;
        charClass?: string;
        splitClass?: string;
        split?: string;
        absolute?: boolean;
      },
    );

    lines: HTMLElement[];
    words: HTMLElement[];
    chars: HTMLElement[];

    revert(): void;
  }
}
