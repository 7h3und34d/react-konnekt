import * as React from 'react';
import Konnekt from '../src';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

interface WrappedComponentProps {
  name: string;
  role: string;
}

describe('Konnekt', () => {
  it('smoke test', () => {
    function WrappedComponent({
      name,
      role,
    }: WrappedComponentProps): JSX.Element {
      return (
        <h1>
          {name} ({role})
        </h1>
      );
    }

    const KonnectedComponent = Konnekt(() => {
      return {
        name: 'Kevin Rodeway',
        role: 'Developer',
      };
    })(WrappedComponent);
    render(<KonnectedComponent />);
    expect(screen.getByRole('heading')).toHaveTextContent(
      'Kevin Rodeway (Developer)'
    );
  });
});
