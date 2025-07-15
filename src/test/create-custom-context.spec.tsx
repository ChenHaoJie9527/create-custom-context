import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
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

  it('should work with useState hook', () => {
    const [Provider, useContext] = createCustomContext(() => {
      const [count, setCount] = useState(0);
      return { count, setCount };
    });

    function Counter() {
      const { count, setCount } = useContext();
      return (
        <div>
          <span data-testid="count">{count}</span>
          <button onClick={() => setCount(count + 1)} type="button">
            Increment
          </button>
        </div>
      );
    }
    render(
      <Provider>
        <Counter />
      </Provider>
    );

    expect(screen.getByTestId('count')).toHaveTextContent('0');
    fireEvent.click(screen.getByText('Increment'));
    expect(screen.getByTestId('count')).toHaveTextContent('1');
  });
});
