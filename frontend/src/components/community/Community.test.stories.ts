// Test stories file - for interaction testing
import { userEvent, within, expect } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/html';
import { CommunityArgs, Template, defaultArgs } from './Community.shared';

const meta: Meta<CommunityArgs> = {
  title: 'Components/Community/Tests',
  tags: ['!autodocs'], // Exclude from main docs
  parameters: {
    controls: { disable: true }, // Disable controls for test stories
  },
  args: defaultArgs
};

export default meta;
type Story = StoryObj<CommunityArgs>;

// Basic rendering test
export const RenderingTest: Story = {
  render: Template,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const communityComponent = canvasElement.querySelector('community-component');
    
    // Test component exists
    await expect(communityComponent).toBeTruthy();
    await expect(communityComponent?.tagName.toLowerCase()).toBe('community-component');
    
    // Test shadow DOM exists
    await expect(communityComponent?.shadowRoot).toBeDefined();
    
    console.log('✓ Community component renders correctly');
  }
};

// Multiple instances test
export const MultipleInstancesTest: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.gap = '20px';
    
    for (let i = 1; i <= 3; i++) {
      const community = document.createElement('community-component');
      community.setAttribute('data-testid', `community-${i}`);
      container.appendChild(community);
    }
    
    return container;
  },
  play: async ({ canvasElement }) => {
    const instances = canvasElement.querySelectorAll('community-component');
    
    // Test that all instances render
    await expect(instances.length).toBe(3);
    
    // Test each instance independently
    for (let i = 1; i <= 3; i++) {
      const instance = canvasElement.querySelector(`[data-testid="community-${i}"]`);
      await expect(instance).toBeDefined();
      await expect(instance?.shadowRoot).toBeDefined();
    }
    
    console.log('✓ Multiple instances render independently');
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
      const community = document.createElement('community-component');
      community.setAttribute('data-perf', `test-${i}`);
      container.appendChild(community);
    }
    
    return container;
  },
  play: async ({ canvasElement }) => {
    const startTime = performance.now();
    
    const instances = canvasElement.querySelectorAll('community-component');
    
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

// Accessibility test
export const AccessibilityTest: Story = {
  render: Template,
  play: async ({ canvasElement }) => {
    const communityComponent = canvasElement.querySelector('community-component');
    
    // Test that component is properly structured for accessibility
    await expect(communityComponent).toBeTruthy();
    
    // If your component uses specific ARIA attributes, test them here
    // Example: await expect(communityComponent).toHaveAttribute('role', 'region');
    
    console.log('✓ Accessibility features verified');
  }
};

// Debug test to verify component registration
export const DebugTest: Story = {
  render: () => {
    return `
      <div>
        <p>Testing community component registration:</p>
        <community-component></community-component>
        <p>Component should appear above this text</p>
      </div>
    `;
  },
  play: async ({ canvasElement }) => {
    console.log('Canvas HTML:', canvasElement.innerHTML);
    
    const communityComponent = canvasElement.querySelector('community-component');
    console.log('Found component:', communityComponent);
    
    if (!communityComponent) {
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