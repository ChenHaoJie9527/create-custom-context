import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { createCustomContext } from '../create-custom-context';

describe('createCustomContext', () => {
  it('should create context with simple value', () => {
    const [Provider, useContext] = createCustomContext(() => 'Hello, world!');

    function TestComponent() {
      const value = useContext();
      return <div data-testid="value">{value}</div>;
    }

    render(
      <Provider>
        <TestComponent />
      </Provider>
    );

    expect(screen.getByTestId('value')).toHaveTextContent('Hello, world!');
  });
});
