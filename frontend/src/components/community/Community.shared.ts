export interface CommunityArgs {
  // Empty interface since we're not using arguments
}

export const Template = () => {
  return `<community-component></community-component>`;
};

export const defaultArgs: CommunityArgs = {
  // No default args needed
};

export const argTypes = {
  // No argTypes needed for argument-less stories
};