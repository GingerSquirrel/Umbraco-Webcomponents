// Test stories file - for interaction testing
import { userEvent, within, expect } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/html';
import { ButtonArgs, Template, defaultArgs, argTypes } from './Button.shared';

const meta: Meta<ButtonArgs> = {
  title: 'Components/Button/Tests',
  tags: ['!autodocs'], // Exclude from main docs
  parameters: {
    controls: { disable: true }, // Disable controls for test stories
  },
  args: defaultArgs, // Use shared default args
  argTypes // Use shared argTypes
};

export default meta;
type Story = StoryObj<ButtonArgs>;



// Basic interaction test - Fixed focus handling
export const InteractionTest: Story = {
  render: Template, // Using shared template
  args: {
    label: 'Click Me',
    class: 'primary',
    size: 'normal',
    icon: '',
    'icon-position': 'right',
    href: '',
    target: '',
    disabled: false
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    
    // Find the button component by its text content
    const buttonComponent = canvasElement.querySelector('button-component') as HTMLElement;
    
    // Test initial state
    await expect(buttonComponent).toBeTruthy();
    
    // Get the shadow root anchor element
    const anchor = (buttonComponent as any)?.shadowRoot?.querySelector('a') as HTMLAnchorElement;
    await expect(anchor).toBeTruthy();
    await expect(anchor).toHaveTextContent('Click Me');
    
    // Test click interaction
    let clickCount = 0;
    buttonComponent?.addEventListener('click', () => {
      clickCount++;
    });
    
    // Simulate user click on the anchor element
    await userEvent.click(anchor);
    
    // Verify click was handled
    await expect(clickCount).toBe(1);
    
    // Test focus - Focus the component instead of the anchor
    // This matches the current behavior with delegatesFocus: true
    buttonComponent.focus();
    await new Promise(resolve => setTimeout(resolve, 50));
    
    // Check that the component has focus (not the anchor)
    await expect(buttonComponent).toHaveFocus();
  }
};

// Dynamic attribute changes test
export const DynamicInteractionTest: Story = {
  render: Template, // Using shared template
  args: {
    label: 'Dynamic Button',
    class: 'secondary',
    size: 'normal',
    icon: '',
    'icon-position': 'right',
    href: '',
    target: '',
    disabled: false
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const buttonComponent = canvasElement.querySelector('button-component') as HTMLElement;
    const anchor = (buttonComponent as any)?.shadowRoot?.querySelector('a') as HTMLAnchorElement;
    
    // Test initial label
    await expect(anchor).toHaveTextContent('Dynamic Button');
    
    // Change label attribute
    buttonComponent?.setAttribute('label', 'Updated Label');
    
    // Wait for component to update
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Verify label changed
    await expect(anchor).toHaveTextContent('Updated Label');
    
    // Add href attribute
    buttonComponent?.setAttribute('href', '/test-link');
    await new Promise(resolve => setTimeout(resolve, 50));
    
    // Verify href was added
    await expect(anchor).toHaveAttribute('href', '/test-link');
    
    // Test class change
    buttonComponent?.setAttribute('class', 'primary');
    await new Promise(resolve => setTimeout(resolve, 50));
    
    // Verify class was applied
    await expect(anchor).toHaveClass('primary');
  }
};

// Keyboard accessibility test - Fixed focus handling
export const KeyboardAccessibilityTest: Story = {
  render: Template, // Using shared template
  args: {
    label: 'Keyboard Test',
    class: 'primary'
  },
  play: async ({ canvasElement }) => {
    const log = (message: string) => {
      console.log(`[STORYBOOK TEST] ${message}`);
    };
    
    const buttonComponent = canvasElement.querySelector('button-component');
    const anchor = buttonComponent?.shadowRoot?.querySelector('a');

    log('Keyboard Accessibility Test Started');
    
    // Instead of focusing the anchor, focus the component
    // The delegatesFocus will handle focusing the correct inner element
    (buttonComponent as HTMLElement)?.focus();
    await new Promise(resolve => setTimeout(resolve, 50));
    
    // Check if the component has focus (which it should with delegatesFocus)
    await expect(buttonComponent).toHaveFocus();
    log('Focus test passed - component focused');
    
    // Test Enter key activation
    let enterPressed = false;
    buttonComponent?.addEventListener('click', () => {
      enterPressed = true;
      log('Enter key click event fired');
    });
    
    await userEvent.keyboard('{Enter}');
    await expect(enterPressed).toBe(true);
    log('Enter key test passed');
    
    // Reset for space test
    enterPressed = false;
    
    // Test Space key activation
    await userEvent.keyboard(' ');
    await expect(enterPressed).toBe(true);
    log('Space key test passed');
  }
};

// Disabled state test - Fixed to handle pointer-events: none
export const DisabledStateTest: Story = {
  render: Template, // Using shared template
  args: {
    label: 'Disabled Test',
    class: 'primary',
    disabled: true
  },
  play: async ({ canvasElement }) => {
    const buttonComponent = canvasElement.querySelector('button-component');
    const anchor = buttonComponent?.shadowRoot?.querySelector('a');
    
    // Test disabled appearance
    await expect(buttonComponent).toHaveAttribute('disabled');
    
    // Test ARIA disabled state
    await expect(anchor).toHaveAttribute('aria-disabled', 'true');
    
    // Test that disabled button has pointer-events: none (this is expected)
    const computedStyle = window.getComputedStyle(anchor!);
    await expect(computedStyle.pointerEvents).toBe('none');
    
    // Don't try to click a disabled element - this is the correct behavior
    // Instead, test that the element is properly disabled
    
    // Test that the element has the disabled styling
    await expect(anchor).toHaveStyle('pointer-events: none');
    
    console.log('Disabled button correctly prevents interactions');
  }
};

// Size variations test
export const SizeVariationsTest: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '10px';
    
    ['small', 'medium', 'normal'].forEach((size) => {
      const button = document.createElement('button-component');
      button.setAttribute('label', `${size} Button`);
      button.setAttribute('size', size);
      button.setAttribute('class', 'primary');
      button.setAttribute('data-testid', `button-${size}`);
      container.appendChild(button);
    });
    
    return container;
  },
  play: async ({ canvasElement }) => {
    const sizes = ['small', 'medium', 'normal'];
    
    for (const size of sizes) {
      const button = canvasElement.querySelector(`[data-testid="button-${size}"]`);
      const anchor = button?.shadowRoot?.querySelector('a');
      
      // Test that each size button renders correctly
      await expect(button).toHaveAttribute('size', size);
      await expect(anchor).toHaveTextContent(`${size} Button`);
      
      // Test that each button is clickable
      let clicked = false;
      button?.addEventListener('click', () => {
        clicked = true;
      });
      
      await userEvent.click(anchor!);
      await expect(clicked).toBe(true);
    }
  }
};

// Icon position test
export const IconPositionTest: Story = {
  render: Template, // Using shared template
  args: {
    label: 'Icon Button',
    class: 'primary',
    icon: 'arrow',
    'icon-position': 'right'
  },
  play: async ({ canvasElement }) => {
    const buttonComponent = canvasElement.querySelector('button-component');
    const anchor = buttonComponent?.shadowRoot?.querySelector('a');
    
    // Test initial icon position
    await expect(buttonComponent).toHaveAttribute('icon-position', 'right');
    await expect(buttonComponent).toHaveAttribute('icon', 'arrow');
    
    // Change icon position
    buttonComponent?.setAttribute('icon-position', 'left');
    await new Promise(resolve => setTimeout(resolve, 50));
    
    // Verify position changed
    await expect(buttonComponent).toHaveAttribute('icon-position', 'left');
    
    // Test that button still functions with icon
    let clicked = false;
    buttonComponent?.addEventListener('click', () => {
      clicked = true;
    });
    
    await userEvent.click(anchor!);
    await expect(clicked).toBe(true);
  }
};

// Link behavior test
export const LinkBehaviorTest: Story = {
  render: Template, // Using shared template
  args: {
    label: 'Link Button',
    class: 'primary',
    href: 'https://example.com',
    target: '_blank'
  },
  play: async ({ canvasElement }) => {
    const buttonComponent = canvasElement.querySelector('button-component');
    const anchor = buttonComponent?.shadowRoot?.querySelector('a');
    
    // Test link attributes
    await expect(anchor).toHaveAttribute('href', 'https://example.com');
    await expect(anchor).toHaveAttribute('target', '_blank');
    
    // Test link functionality (prevent actual navigation in test)
    let linkClicked = false;
    anchor?.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent actual navigation
      linkClicked = true;
    });
    
    await userEvent.click(anchor!);
    await expect(linkClicked).toBe(true);
  }
};

// Performance test
export const PerformanceTest: Story = {
  render: Template, // Using shared template
  args: {
    label: 'Performance Button',
    class: 'primary'
  },
  play: async ({ canvasElement }) => {
    const buttonComponent = canvasElement.querySelector('button-component');
    const anchor = buttonComponent?.shadowRoot?.querySelector('a');
    
    // Test rapid attribute updates
    const startTime = performance.now();
    
    for (let i = 0; i < 50; i++) {
      buttonComponent?.setAttribute('label', `Update ${i}`);
    }
    
    const endTime = performance.now();
    const updateTime = endTime - startTime;
    
    // Wait for final update
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Verify final state
    await expect(anchor).toHaveTextContent('Update 49');
    
    // Log performance for manual review
    console.log(`50 attribute updates took: ${updateTime}ms`);
    
    // Basic performance assertion (adjust threshold as needed)
    await expect(updateTime).toBeLessThan(100);
  }
};
