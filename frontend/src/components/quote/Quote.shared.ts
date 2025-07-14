export interface QuoteArgs {
  // Empty interface since we're not using arguments
}

export const Template = () => {
  return `<quote-component></quote-component>`;
};

export const defaultArgs: QuoteArgs = {
  // No default args needed
};

export const argTypes = {
  // No argTypes needed for argument-less stories
};