export interface ImageAndTextArgs {
  // Empty interface since we're not using arguments
}

export const Template = () => {
  return `<image-and-text-component></image-and-text-component>`;
};

export const defaultArgs: ImageAndTextArgs = {
  // No default args needed
};

export const argTypes = {
  // No argTypes needed for argument-less stories
};
