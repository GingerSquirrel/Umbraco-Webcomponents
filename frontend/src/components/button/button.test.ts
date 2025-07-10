import { describe, it, expect } from 'vitest';
import './button.ts'; // Ensure your component is registered

describe('button-component', () => {
  it('renders with the correct label', () => {
    const el = document.createElement('button-component');
    el.setAttribute('label', 'Test Button');
    document.body.appendChild(el);

    // Wait for the component to render (if async)
    const anchor = el.shadowRoot?.querySelector('a');
    expect(anchor?.textContent).toContain('Test Button');

    document.body.removeChild(el);
  });

  it('applies the primary class', () => {
    const el = document.createElement('button-component');
    el.setAttribute('class', 'primary');
    document.body.appendChild(el);

    const anchor = el.shadowRoot?.querySelector('a');
    expect(anchor?.classList.contains('primary')).toBe(true);

    document.body.removeChild(el);
  });
});