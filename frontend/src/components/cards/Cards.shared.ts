export interface CardsArgs {
  // Empty interface since we're not using arguments
}

export const Template = () => {
  return `<cards-component></cards-component>`;
};

export const defaultArgs: CardsArgs = {
  // No default args needed
};

export const argTypes = {
  // No argTypes needed for argument-less stories
};