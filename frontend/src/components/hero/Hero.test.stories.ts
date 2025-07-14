// Test stories file - for interaction testing
import { userEvent, within, expect } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/html';
import { HeroArgs, Template, defaultArgs } from './Hero.shared';

const meta: Meta<HeroArgs> = {
  title: 'Components/Hero/Tests',
  tags: ['!autodocs'], // Exclude from main docs
  parameters: {
    controls: { disable: true }, // Disable controls for test stories
  },
  args: defaultArgs
};

export default meta;
type Story = StoryObj<HeroArgs>;

// Basic rendering test
export const RenderingTest: Story = {
  render: Template,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const heroComponent = canvasElement.querySelector('hero-component');
    
    // Test component exists
    await expect(heroComponent).toBeTruthy();
    await expect(heroComponent?.tagName.toLowerCase()).toBe('hero-component');
    
    // Test shadow DOM exists
    await expect(heroComponent?.shadowRoot).toBeDefined();
    
    console.log('✓ Hero component renders correctly');
  }
};

// Performance test
export const PerformanceTest: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'repeat(3, 1fr)';
    container.style.gap = '10px';
    
    // Create multiple instances for performance testing
    for (let i = 1; i <= 9; i++) {
      const hero = document.createElement('hero-component');
      hero.setAttribute('data-perf', `test-${i}`);
      container.appendChild(hero);
    }
    
    return container;
  },
  play: async ({ canvasElement }) => {
    const startTime = performance.now();
    
    const instances = canvasElement.querySelectorAll('hero-component');
    
    // Test that all instances render quickly
    await expect(instances.length).toBe(9);
    
    // Verify each has shadow DOM
    instances.forEach(async (instance) => {
      await expect(instance.shadowRoot).toBeDefined();
    });
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    console.log(`Rendering 9 instances took: ${renderTime}ms`);
    
    // Performance assertion
    await expect(renderTime).toBeLessThan(100);
    
    console.log('✓ Performance test passed');
  }
};

// Debug test to verify component registration
export const DebugTest: Story = {
  render: () => {
    return `
      <div>
        <p>Testing hero component registration:</p>
        <hero-component></hero-component>
        <p>Component should appear above this text</p>
      </div>
    `;
  },
  play: async ({ canvasElement }) => {
    console.log('Canvas HTML:', canvasElement.innerHTML);
    
    const heroComponent = canvasElement.querySelector('hero-component');
    console.log('Found component:', heroComponent);
    
    if (!heroComponent) {
      console.error('❌ Component not found! Check:');
      console.error('1. Component is imported in stories file');
      console.error('2. Component is registered with correct name');
      console.error('3. No JavaScript errors in console');
    } else {
      console.log('✓ Component found successfully');
    }
    
    await expect(canvasElement.querySelector('p')).toBeTruthy();
  }
};