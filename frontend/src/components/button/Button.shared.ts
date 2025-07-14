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
  label: { 
    control: { type: 'text' },
    description: 'Button text content',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: 'Button' },
      category: 'Content'
    }
  },
  class: { 
    control: { 
      type: 'select', 
      options: ['primary', 'secondary', 'tertiary', 'label'] 
    },
    description: 'Button style variant',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: 'primary' },
      category: 'Appearance'
    }
  },
  size: { 
    control: { 
      type: 'select', 
      options: ['small', 'medium', 'normal'] 
    },
    description: 'Button size',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: 'normal' },
      category: 'Appearance'
    }
  },
  icon: { 
    control: { type: 'text' },
    description: 'Icon name to display',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: '""' },
      category: 'Content'
    }
  },
  'icon-position': { 
    control: { 
      type: 'select', 
      options: ['left', 'right'] 
    },
    description: 'Icon position relative to text',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: 'right' },
      category: 'Content'
    }
  },
  href: { 
    control: { type: 'text' },
    description: 'URL for link behavior. When provided, the button acts as a link.',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: '""' },
      category: 'Link Behavior'
    }
  },
  target: { 
    control: { type: 'text' },
    description: 'Link target attribute (_self, _blank, etc.)',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: '""' },
      category: 'Link Behavior'
    }
  },
  disabled: { 
    control: { type: 'boolean' },
    description: 'Whether the button is disabled',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
      category: 'State'
    }
  }
};