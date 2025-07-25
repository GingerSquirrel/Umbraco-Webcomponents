# Web Components Project - AI Development Specification

## Project Overview
This is a web components project built with Vite, TypeScript, SCSS, and Storybook. It includes both a standalone frontend and Umbraco CMS integration with PWA capabilities.

## Project Structure
```
webcomponents-vite-project/
├── frontend/                           # Main Vite project
│   ├── src/
│   │   ├── components/                 # Web components directory
│   │   │   ├── BaseComponent.ts        # Base class for all components
│   │   │   ├── CreateComponent.ts      # Component factory/registration
│   │   │   └── [component-name]/       # Individual component directories
│   │   │       ├── [component-name].ts # TypeScript component class
│   │   │       ├── [component-name].html # Component HTML template
│   │   │       ├── [component-name].scss # Component styles
│   │   │       └── [component-name].stories.ts # Storybook stories
│   │   ├── global/
│   │   │   ├── styles/                 # Global SCSS files
│   │   │   └── images/                 # Global image assets
│   │   ├── stories/                    # Storybook configuration
│   │   ├── utils/                      # Utility functions
│   │   ├── main.ts                     # Main entry point
│   │   ├── main.scss                   # Main stylesheet
│   │   ├── critical.scss               # Critical CSS for FOUC prevention
│   │   ├── manifest.json               # PWA manifest
│   │   └── sw.js                       # Service worker
│   ├── public/                         # Static assets
│   │   └── icons/                      # PWA icons
│   ├── package.json                    # Dependencies and scripts
│   └── vite.config.js                  # Vite configuration
└── UmbracoWebcomponents/               # Umbraco CMS project
    ├── Views/
    │   └── Partials/
    │       └── blocklist/
    │           ├── Components/         # Umbraco component views
    │           └── Elements/           # Umbraco element views
    └── wwwroot/                        # Built assets for Umbraco
```

## Component Creation Guidelines

### 1. TypeScript Component Class
**Location**: `frontend/src/components/[component-name]/[component-name].ts`

**Template Structure**:
```typescript
import styles from './[component-name].scss?inline';
import template from './[component-name].html?raw';
import { createComponent } from '../CreateComponent';


createComponent('[component-name]', html, styles);
```

**Required Actions**:
1. Create the component file in the correct directory
2. Create the HTML template file
3. Import and register in `CreateComponent.ts`
4. Add to critical.scss if needed for FOUC prevention

### 2. Component HTML Template
**Location**: `frontend/src/components/[component-name]/[component-name].html`

**Template Structure**:
```html
<!-- [ComponentName] Component Template -->
<!-- Leave empty - content will be added as needed -->
```

**Required Actions**:
1. Create HTML file in component directory with only a comment
2. Leave content empty for future development
3. Structure and content will be added when implementing specific functionality

### 3. Component Styles
**Location**: `frontend/src/components/[component-name]/[component-name].scss`

**Template Structure**:
```scss
:host {
  
}
```

**Required Actions**:
1. Create SCSS file in component directory with only `:host` selector
2. Leave `:host` block empty for future styling
3. Additional styles will be added when implementing specific functionality

### 4. Storybook Stories
**Location**: `frontend/src/components/[component-name]/[component-name].stories.ts`

**Template Structure**:
```typescript
import type { Meta, StoryObj } from '@storybook/html';
import { [ComponentName]Args, Template, defaultArgs, argTypes } from './[ComponentName].shared';
// Import the component so it's registered
import './[component-name]';

const meta: Meta<[ComponentName]Args> = {
  title: 'Components/[ComponentName]',
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true }, // Disable controls since we're not using args
    docs: {
      description: {
        component: 'A [component-name] component that displays [description of functionality].'
      }
    }
  },
  args: defaultArgs,
  argTypes
};

export default meta;
type Story = StoryObj<[ComponentName]Args>;

/**
 * The default [component-name] display
 */
export const Default: Story = {
  render: Template,
  parameters: {
    docs: {
      description: {
        story: 'The default [component-name] component displays [description].'
      }
    }
  }
};
```

### 5. Shared Storybook Configuration
**Location**: `frontend/src/components/[component-name]/[ComponentName].shared.ts`

**Template Structure**:
```typescript
export interface [ComponentName]Args {
  // Empty interface since we're not using arguments
}

export const Template = () => {
  return \`<[component-name]-component></[component-name]-component>\`;
};

export const defaultArgs: [ComponentName]Args = {
  // No default args needed
};

export const argTypes = {
  // No argTypes needed for argument-less stories
};
```

### 6. Test Stories
**Location**: `frontend/src/components/[component-name]/[ComponentName].test.stories.ts`

**Template Structure**:
```typescript
import type { Meta, StoryObj } from '@storybook/html';
import { Template, defaultArgs, argTypes, [ComponentName]Args } from './[ComponentName].shared';
import '../[component-name]';

const meta: Meta<[ComponentName]Args> = {
  title: 'Components/[ComponentName]/Test',
  render: Template,
  argTypes,
  args: defaultArgs,
};

export default meta;
type Story = StoryObj<[ComponentName]Args>;

export const Test: Story = {};
```
```

### 7. Component Registration
**Location**: `frontend/src/components/CreateComponent.ts`

**Required Action**: Add new component to the registration system:
```typescript
// Add import
import { [ComponentName]Component } from './[component-name]/[component-name]';

// Add to component map or registration function
```

### 8. Critical CSS (if needed)
**Location**: `frontend/src/critical.scss`

**When to Add**: If component should load immediately to prevent FOUC
```scss
// Import component styles that should load immediately
@use "components/[component-name]/[component-name]";
```

### 9. Index.html Updates
**Location**: `frontend/src/index.html`

**Required Actions**:
1. **Add FOUC Prevention Style**: Add the component to the critical CSS style block:
```html
<style>
    achievements-component:not(:defined),
    button-component:not(:defined),
    cards-component:not(:defined),
    [component-name]-component:not(:defined), <!-- ADD THIS LINE -->
    clients-component:not(:defined),
    community-component:not(:defined),
    hero-component:not(:defined),
    imageAndText-component:not(:defined),
    menu-component:not(:defined),
    mycomponent-component:not(:defined),
    quote-component:not(:defined) {
        display: none;
    }
</style>
```

2. **Add Component to Page**: Add the component element in the body where you want it to appear:
```html
<div id="app">
    <!-- Existing components -->
    <menu-component></menu-component>
    <hero-component></hero-component>
    <!-- Add your new component -->
    <[component-name]-component></[component-name]-component>
    <!-- Other components -->
</div>
```

### 10. Umbraco Integration (if needed)
**Location**: `UmbracoWebcomponents/Views/Partials/blocklist/Components/[component-name]Module.cshtml`

**Template Structure**:
```aspnetcorerazor
@inherits Umbraco.Cms.Web.Common.Views.UmbracoViewPage<Umbraco.Cms.Core.Models.Blocks.BlockListItem>;
@using Umbraco.Cms.Web.Common.PublishedModels
@{
    [ComponentName]Module content = Model.Content as [ComponentName]Module;
    [ComponentName]ModuleSettings settings = Model.Settings as [ComponentName]ModuleSettings;
}

<!-- [ComponentName] Module -->
<[component-name]-component></[component-name]-component>
```

**Required Actions**:
1. Create Razor view file in the correct Umbraco directory
2. Leave component tags empty - no content between opening and closing tags
3. Umbraco content mapping will be added when implementing specific functionality

## Build System Integration

### Scripts to Run After Component Creation:
1. **Build Critical CSS**: `npm run build:critical:dev`
2. **Build for Umbraco**: `npm run umbbuild`
3. **Run Storybook**: `npm run storybook`
4. **Run Tests**: `npm test`

### File Naming Conventions:
- **Component Files**: kebab-case (e.g., `hero-banner.ts`)
- **Class Names**: PascalCase (e.g., `HeroBannerComponent`)
- **Element Names**: kebab-case with `-component` suffix (e.g., `hero-banner-component`)
- **Umbraco Views**: camelCase with Module suffix (e.g., `heroBannerModule.cshtml`)

## Testing Requirements:
- Unit tests for component logic
- Storybook stories for visual testing
- Accessibility testing with @storybook/addon-a11y
- Cross-browser compatibility

## Code Quality Standards:
- TypeScript strict mode compliance
- SCSS follows BEM methodology
- ESLint and Prettier formatting
- Semantic HTML structure
- ARIA attributes for accessibility

## PWA Considerations:
- Service worker caching for component assets
- Manifest icon path corrections for Umbraco builds
- Critical CSS for fast loading
- Responsive design for mobile PWA experience

## Common Issues and Solutions:
1. **Umbraco View Imports**: Always include `@using Umbraco.Cms.Web.Common.PublishedModels`
2. **PWA Icon Paths**: Use `../icons/` in manifest when building for Umbraco
3. **FOUC Prevention**: Add component styles to critical.scss if needed immediately
4. **Service Worker**: Update SW cache list when adding new assets

## AI Instructions for Component Creation:
1. **Always follow the exact file structure and naming conventions**
2. **Create all required files (TS, HTML, SCSS, Stories, Shared config, Test stories, Umbraco view if needed)**
3. **Update registration files (CreateComponent.ts, critical.scss if needed)**
4. **Update index.html with FOUC prevention style and add component to page**
5. **Follow the template structures exactly**
6. **Test the component by running the build scripts**
7. **Verify Storybook story works correctly**
8. **Check Umbraco integration if applicable**

This specification ensures consistent, maintainable component development across the entire project.
