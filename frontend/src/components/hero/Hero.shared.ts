export interface HeroArgs {
  // Empty interface since we're not using arguments
}

export const Template = () => {
  return `<hero-component></hero-component>`;
};

export const defaultArgs: HeroArgs = {
  // No default args needed
};

export const argTypes = {
  // No argTypes needed for argument-less stories
};