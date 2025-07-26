# SCSS Tidiness and Best Practices Specification

## Overview
This document outlines the SCSS/SASS coding standards and best practices for the web components project to ensure future-proof, maintainable, and warning-free stylesheets.

## Critical SASS Compatibility Rules

### 1. Mixed Declarations Rule (Deprecation Warning Fix)
**Problem**: SASS will stop supporting declarations that come after nested rules in future versions.

**Bad Example** (Causes deprecation warnings):
```scss
.component {
  .nested-element {
    color: blue;
  }
  display: flex; // ❌ Declaration after nested rule
  margin: 1rem;  // ❌ Declaration after nested rule
}
```

**Good Examples**:

**Option A: Move declarations above nested rules**
```scss
.component {
  display: flex;  // ✅ Declarations first
  margin: 1rem;   // ✅ Declarations first
  
  .nested-element {
    color: blue;
  }
}
```

**Option B: Wrap declarations in & {} block**
```scss
.component {
  .nested-element {
    color: blue;
  }
  
  & {
    display: flex;  // ✅ Wrapped in & {} block
    margin: 1rem;   // ✅ Wrapped in & {} block
  }
}
```

### 2. SCSS Block Structure Best Practices

**Recommended Order**:
1. Direct properties (color, margin, padding, etc.)
2. Pseudo-selectors (&:hover, &:focus, etc.)
3. Nested elements and classes
4. Media queries (@media)
5. At-rules (@include, @extend)

**Example**:
```scss
.component {
  // 1. Direct properties
  display: flex;
  padding: 1rem;
  background: white;
  
  // 2. Pseudo-selectors
  &:hover {
    background: #f5f5f5;
  }
  
  &:focus {
    outline: 2px solid blue;
  }
  
  // 3. Nested elements
  .component__title {
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .component__content {
    margin-top: 1rem;
  }
  
  // 4. Media queries
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
  
  // 5. At-rules
  @include responsive-text;
}
```

## Component-Specific SCSS Guidelines

### 1. Host Selector Structure
```scss
:host {
  // Host-level properties first
  display: block;
  position: relative;
  
  // Nested elements within host
  .component-wrapper {
    padding: 1rem;
  }
}
```

### 2. Responsive Mixins Usage
```scss
.component {
  padding: 2rem;
  
  // Use established responsive mixins
  @include mobile {
    padding: 1rem;
  }
  
  @include tablet {
    padding: 1.5rem;
  }
}
```

### 3. Variable and Color Usage
```scss
.component {
  // Use CSS custom properties for component-specific values
  --component-bg: var(--color-primary, #007bff);
  --component-text: var(--color-text, #333);
  
  background: var(--component-bg);
  color: var(--component-text);
}
```

## SCSS Tidiness Checklist

### Before Committing Code:
- [ ] All declarations come before nested rules
- [ ] No mixed-decls deprecation warnings in build output
- [ ] Consistent indentation (2 spaces)
- [ ] Proper nesting hierarchy (max 3 levels deep)
- [ ] Meaningful class names following BEM methodology
- [ ] No unused CSS rules or properties
- [ ] Responsive breakpoints use established mixins
- [ ] Colors use CSS custom properties where appropriate

### Build Validation:
- [ ] Run `npm run build` to check for SASS warnings
- [ ] No deprecation warnings in terminal output
- [ ] Critical CSS builds successfully
- [ ] All component styles compile without errors

## Common Patterns and Solutions

### 1. Complex Responsive Components
```scss
.component {
  // Base styles first
  display: grid;
  gap: 1rem;
  
  // Responsive variations
  @include mobile {
    grid-template-columns: 1fr;
  }
  
  @include tablet {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @include desktop {
    grid-template-columns: repeat(3, 1fr);
  }
  
  // Nested elements after responsive rules
  .component__item {
    padding: 1rem;
    border: 1px solid #ddd;
    
    &:hover {
      border-color: #007bff;
    }
  }
}
```

### 2. Component State Management
```scss
.component {
  // Default state
  opacity: 1;
  transition: opacity 0.3s ease;
  
  // State modifiers
  &.is-loading {
    opacity: 0.5;
    pointer-events: none;
  }
  
  &.is-error {
    border: 2px solid red;
  }
  
  // Nested elements
  .component__spinner {
    display: none;
    
    .is-loading & {
      display: block;
    }
  }
}
```

### 3. Utility Classes Integration
```scss
.component {
  // Component-specific styles
  background: white;
  border-radius: 8px;
  
  // Utility class compatibility
  &.shadow-sm {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  &.shadow-lg {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
}
```

## Automated Fixes and Tools

### 1. Build Script Integration
The project's `npm run build` command automatically checks for SASS deprecation warnings. Always run this before committing SCSS changes.

### 2. VS Code Extensions (Recommended)
- **SCSS IntelliSense**: Auto-completion for SCSS
- **Sass**: Syntax highlighting and formatting
- **Prettier**: Consistent code formatting

### 3. Linting Rules
Consider adding these SCSS-lint rules to your project:
```json
{
  "scss/declaration-nested-properties": "never",
  "scss/dollar-variable-pattern": "^[a-z][a-zA-Z0-9]*(-[a-z][a-zA-Z0-9]*)*$",
  "scss/at-rule-no-unknown": true
}
```

## Migration Strategy for Existing Code

### 1. Identify Problem Areas
```bash
# Search for potential mixed-decls issues
grep -r "^\s*[a-zA-Z-]*:" --include="*.scss" frontend/src/
```

### 2. Systematic Refactoring
1. Start with most critical components (hero, menu, cards)
2. Run build after each component fix
3. Test in Storybook to ensure visual consistency
4. Commit changes incrementally

### 3. Future Prevention
- Include SCSS tidiness check in pull request template
- Add automated linting to CI/CD pipeline
- Regular code reviews focusing on SCSS structure

## Integration with AI Component Creation

When creating new components, the AI should:
1. **Always structure SCSS with declarations before nested rules**
2. **Use the component SCSS template that follows best practices**
3. **Include responsive mixins in the correct order**
4. **Validate the build output for warnings**
5. **Follow the established naming conventions**

This ensures all new components are future-proof and maintain consistency with the existing codebase.

## Summary

Following these SCSS tidiness guidelines ensures:
- **Future Compatibility**: No deprecation warnings in current or future SASS versions
- **Maintainability**: Consistent, readable code structure
- **Performance**: Optimized CSS output with no redundant rules
- **Team Consistency**: Clear standards for all developers and AI-generated code

Remember: **Always run `npm run build` after SCSS changes to validate compliance with these standards.**
