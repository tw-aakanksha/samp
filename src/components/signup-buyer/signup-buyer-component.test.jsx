import SignupBuyer from './signup-buyer-component';
import { render, screen } from '@testing-library/react';

describe('Signup as Buyer Component', () => {
  it('should render email input element', () => {
    <SignupBuyer />;
    render(<input data-testid="email-input" />);
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
  });

  it('should render display name input element', () => {
    <SignupBuyer />;
    render(<input data-testid="name-input" />);
    expect(screen.getByTestId('name-input')).toBeInTheDocument();
  });

  it('should render display password input element', () => {
    <SignupBuyer />;
    render(<input data-testid="password-input" />);
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
  });

  it('should render display confirm password input element', () => {
    <SignupBuyer />;
    render(<input data-testid="confirmpassword-input" />);
    expect(screen.getByTestId('confirmpassword-input')).toBeInTheDocument();
  });

  it('should render display confirm password input element', () => {
    <SignupBuyer />;
    render(<button data-testid="signup-button" />);
    expect(screen.getByTestId('signup-button')).toBeInTheDocument();
  });
});
