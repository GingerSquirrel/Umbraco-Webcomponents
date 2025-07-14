import { describe, it, expect, beforeEach, vi } from 'vitest';
import './button.js'; // Import your component

describe('ButtonComponent', () => {
  let container: HTMLElement;
  let button: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    
    button = document.createElement('button-component') as HTMLElement;
    container.appendChild(button);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('Basic Functionality', () => {
    it('should render with default properties', () => {
      expect(button).toBeDefined();
      expect(button.tagName.toLowerCase()).toBe('button-component');
    });

    it('should display label text', () => {
      button.setAttribute('label', 'Test Button');
      const anchor = button.shadowRoot?.querySelector('a');
      expect(anchor?.textContent).toBe('Test Button');
    });

    it('should apply CSS classes', () => {
      button.setAttribute('class', 'primary');
      const anchor = button.shadowRoot?.querySelector('a');
      expect(anchor?.className).toBe('primary');
    });

    it('should handle size attribute', () => {
      ['small', 'medium', 'normal'].forEach(size => {
        button.setAttribute('size', size);
        expect(button.getAttribute('size')).toBe(size);
      });
    });
  });

  describe('Link Behavior', () => {
    it('should set href attribute', () => {
      button.setAttribute('href', 'https://example.com');
      const anchor = button.shadowRoot?.querySelector('a');
      expect(anchor?.getAttribute('href')).toBe('https://example.com');
    });

    it('should set target attribute', () => {
      button.setAttribute('target', '_blank');
      const anchor = button.shadowRoot?.querySelector('a');
      expect(anchor?.getAttribute('target')).toBe('_blank');
    });
  });

  describe('Disabled State', () => {
    it('should handle disabled attribute', () => {
      button.setAttribute('disabled', 'true');
      const anchor = button.shadowRoot?.querySelector('a');
      expect(anchor?.getAttribute('aria-disabled')).toBe('true');
    });

    it('should prevent clicks when disabled', () => {
      button.setAttribute('disabled', 'true');
      const anchor = button.shadowRoot?.querySelector('a');
      const clickHandler = vi.fn();
      
      button.addEventListener('click', clickHandler);
      anchor?.click();
      
      expect(clickHandler).not.toHaveBeenCalled();
    });
  });

  describe('Icon Support', () => {
    it('should handle icon attribute', () => {
      button.setAttribute('icon', 'arrow');
      expect(button.getAttribute('icon')).toBe('arrow');
    });

    it('should handle icon position', () => {
      ['left', 'right'].forEach(position => {
        button.setAttribute('icon-position', position);
        expect(button.getAttribute('icon-position')).toBe(position);
      });
    });
  });

  describe('Event Handling', () => {
    it('should handle click events', () => {
      const clickHandler = vi.fn();
      button.addEventListener('click', clickHandler);
      
      const anchor = button.shadowRoot?.querySelector('a');
      anchor?.click();
      
      expect(clickHandler).toHaveBeenCalled();
    });

    it('should handle keyboard events', () => {
      const keydownHandler = vi.fn();
      button.addEventListener('keydown', keydownHandler);
      
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      button.dispatchEvent(event);
      
      expect(keydownHandler).toHaveBeenCalled();
    });
  });

  describe('Attribute Changes', () => {
    it('should respond to attribute changes', () => {
      button.setAttribute('label', 'Initial');
      let anchor = button.shadowRoot?.querySelector('a');
      expect(anchor?.textContent).toBe('Initial');
      
      button.setAttribute('label', 'Updated');
      anchor = button.shadowRoot?.querySelector('a');
      expect(anchor?.textContent).toBe('Updated');
    });
  });

  describe('Shadow DOM', () => {
    it('should have shadow root', () => {
      expect(button.shadowRoot).toBeDefined();
    });

    it('should contain anchor element', () => {
      const anchor = button.shadowRoot?.querySelector('a');
      expect(anchor).toBeDefined();
      expect(anchor?.tagName.toLowerCase()).toBe('a');
    });

    it('should have proper ARIA attributes', () => {
      const anchor = button.shadowRoot?.querySelector('a');
      expect(anchor?.getAttribute('role')).toBe('button');
      expect(anchor?.getAttribute('tabindex')).toBe('0');
    });
  });
});