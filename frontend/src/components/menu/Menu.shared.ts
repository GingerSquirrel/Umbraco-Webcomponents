export interface MenuArgs {
  // Empty interface since we're not using arguments
}

export const Template = () => {
  return `<menu-component></menu-component>`;
};

export const defaultArgs: MenuArgs = {
  // No default args needed
};

export const argTypes = {
  // No argTypes needed for argument-less stories
};