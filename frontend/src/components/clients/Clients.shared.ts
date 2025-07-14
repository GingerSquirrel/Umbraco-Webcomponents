export interface ClientsArgs {
  // Empty interface since we're not using arguments
}

export const Template = () => {
  return `<clients-component></clients-component>`;
};

export const defaultArgs: ClientsArgs = {
  // No default args needed
};

export const argTypes = {
  // No argTypes needed for argument-less stories
};