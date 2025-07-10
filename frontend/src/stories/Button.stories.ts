export default {
  title: 'Components/Button',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    class: { control: 'text' },
    size: { control: { type: 'select', options: ['small', 'medium', 'normal'] } },
    icon: { control: 'text' },
    'icon-position': { control: { type: 'select', options: ['left', 'right'] } },
    href: { control: 'text' },
    target: { control: 'text' },
    disabled: { control: 'boolean' }
  }
};

const Template = (args: { [s: string]: unknown; } | ArrayLike<unknown>) => {
  const attrs = Object.entries(args)
    .filter(([_, v]) => v !== undefined && v !== false && v !== '')
    .map(([k, v]) => (v === true ? k : `${k}="${v}"`))
    .join(' ');
  return `<button-component ${attrs}></button-component>`;
};

export const Primary = {
  render: Template,
  args: {
    label: 'Primary Button',
    class: 'primary',
    size: 'normal',
    icon: '',
    'icon-position': 'right',
    href: 'https://example.com',
    target: '_blank',
    disabled: false
  }
};

export const PrimaryWithIcon = {
  render: Template,
  args: {
    label: 'Primary Button',
    class: 'primary',
    size: 'normal',
    icon: 'right',
    'icon-position': 'right',
    href: 'https://example.com',
    target: '_blank',
    disabled: false
  }
};

export const Secondary = {
  render: Template,
  args: {
    label: 'Secondary Button',
    class: 'secondary',
    size: 'normal',
    icon: '',
    'icon-position': 'right',
    href: 'https://example.com',
    target: '_blank',
    disabled: false
  }
};

export const Tertiary = {
  render: Template,
  args: {
    label: 'Tertiary Button',
    class: 'tertiary',
    size: 'normal',
    icon: '',
    'icon-position': 'right',
    href: 'https://example.com',
    target: '_blank',
    disabled: false
  }
};

export const Label = {
  render: Template,
  args: {
    label: 'Label Button',
    class: 'label',
    size: 'normal',
    icon: '',
    'icon-position': 'right',
    href: 'https://example.com',
    target: '_blank',
    disabled: false
  }
};

export const Disabled = {
  render: Template,
  args: {
    label: 'Disabled Button',
    class: 'primary',
    size: 'normal',
    icon: '',
    'icon-position': 'right',
    disabled: true
  }
};
