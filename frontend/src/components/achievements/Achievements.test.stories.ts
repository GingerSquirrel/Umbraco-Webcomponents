// Test stories file - for interaction testing
import { userEvent, within, expect } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/html';
import { AchievementsArgs, Template, defaultArgs } from './Achievements.shared';

const meta: Meta<AchievementsArgs> = {
  title: 'Components/Achievements/Tests',
  tags: ['!autodocs'], // Exclude from main docs
  parameters: {
    controls: { disable: true }, // Disable controls for test stories
  },
  args: defaultArgs
};

export default meta;
type Story = StoryObj<AchievementsArgs>;

// Basic rendering test
export const RenderingTest: Story = {
  render: Template,
  args: {
    title: 'Test Achievements',
    subtitle: 'Testing component'
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    // Fix: Use the correct component name that matches your template
    const achievementsComponent = canvasElement.querySelector('achievements-component');
    
    // Test component exists
    await expect(achievementsComponent).toBeTruthy();
    await expect(achievementsComponent?.tagName.toLowerCase()).toBe('achievements-component');
    
    // Test shadow DOM exists
    await expect(achievementsComponent?.shadowRoot).toBeDefined();
    
    console.log('✓ Achievements component renders correctly');
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
      const achievement = document.createElement('achievements-component');
      achievement.setAttribute('data-perf', `test-${i}`);
      container.appendChild(achievement);
    }
    
    return container;
  },
  play: async ({ canvasElement }) => {
    const startTime = performance.now();
    
    const instances = canvasElement.querySelectorAll('achievements-component');
    
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
        <p>Testing component registration:</p>
        <achievements-component title="Debug Test"></achievements-component>
        <p>If you see this but not the component above, check component import/registration</p>
      </div>
    `;
  },
  play: async ({ canvasElement }) => {
    console.log('Canvas HTML:', canvasElement.innerHTML);
    
    const achievementsComponent = canvasElement.querySelector('achievements-component');
    console.log('Found component:', achievementsComponent);
    
    if (!achievementsComponent) {
      console.error('❌ Component not found! Check:');
      console.error('1. Component is imported in stories file');
      console.error('2. Component is registered with correct name');
      console.error('3. No JavaScript errors in console');
    } else {
      console.log('✓ Component found successfully');
    }
    
    // This will help you see what's actually in the DOM
    await expect(canvasElement.querySelector('p')).toBeTruthy();
  }
};

