export interface AchievementsArgs {


}

export const Template = (args: AchievementsArgs) => {
  const attrs = Object.entries(args)
    .filter(([_, v]) => v !== undefined && v !== false && v !== '')
    .map(([k, v]) => {
      if (v === true) {
        return k;
      }
      return `${k}="${v}"`;
    })
    .join(' ');
  return `<achievements-component ${attrs}></achievements-component>`;
};

export const defaultArgs: AchievementsArgs = {

};

export const argTypes = {

};