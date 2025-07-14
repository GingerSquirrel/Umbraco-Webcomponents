export interface ButtonArgs {
  label: string;
  class: 'primary' | 'secondary' | 'tertiary' | 'label';
  size: 'small' | 'medium' | 'normal';
  icon: string;
  'icon-position': 'left' | 'right';
  href: string;
  target: string;
  disabled: boolean;
}

export const Template = (args: ButtonArgs) => {
  const attrs = Object.entries(args)
    .filter(([_, v]) => v !== undefined && v !== false && v !== '')
    .map(([k, v]) => {
      if (v === true) {
        if (k === 'disabled') {
          return `${k}="true"`;
        }
        return k;
      }
      return `${k}="${v}"`;
    })
    .join(' ');
  return `<button-component ${attrs}></button-component>`;
};

export const defaultArgs: ButtonArgs = {
  label: 'Button',
  class: 'primary',
  size: 'normal',
  icon: '',
  'icon-position': 'right',
  href: '',
  target: '',
  disabled: false
};

export const argTypes = {
  // ... your argTypes configuration ...
};