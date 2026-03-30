import { render, screen } from '@testing-library/react';
import Spinners, { SpinnerType } from './Spinners';

describe('Spinners Component', () => {
  test('renders nothing when visible is false', () => {
    const { container } = render(<Spinners visible={false} />);
    expect(container.firstChild).toBeNull();
  });

  test('renders CircularSpinner by default', () => {
    const { container } = render(<Spinners />);
    expect(container.querySelector('svg')).toHaveClass('circular-spinner');
  });

  test('renders CupertinoSpinner when type is Cupertino', () => {
    const { container } = render(<Spinners type={SpinnerType.Cupertino} />);
    expect(container.querySelector('svg')).toHaveClass('cupertino-spinner');
  });

  test('renders SingleCircleSpinner when type is SingleCircle', () => {
    const { container } = render(<Spinners type={SpinnerType.SingleCircle} />);
    expect(container.querySelector('svg')).toHaveClass('single-circle-spinner');
  });

  test('renders DoubleCircleSpinner when type is DoubleCircle', () => {
    const { container } = render(<Spinners type={SpinnerType.DoubleCircle} />);
    expect(container.querySelector('svg')).toHaveClass('double-circle-spinner');
  });

  test('displays a label below by default', () => {
    render(<Spinners label="Loading..." />);
    const label = screen.getByText('Loading...');
    expect(label).toBeInTheDocument();
    expect(label.parentElement).toHaveStyle('flex-direction: column');
  });

  test('displays a label on top', () => {
    render(<Spinners label="Loading..." labelPosition="top" />);
    const label = screen.getByText('Loading...');
    expect(label).toBeInTheDocument();
    expect(label.parentElement).toHaveStyle('flex-direction: column-reverse');
  });

  test('displays a label on the left', () => {
    render(<Spinners label="Loading..." labelPosition="left" />);
    const label = screen.getByText('Loading...');
    expect(label).toBeInTheDocument();
    expect(label.parentElement).toHaveStyle('flex-direction: row-reverse');
  });

  test('displays a label on the right', () => {
    render(<Spinners label="Loading..." labelPosition="right" />);
    const label = screen.getByText('Loading...');
    expect(label).toBeInTheDocument();
    expect(label.parentElement).toHaveStyle('flex-direction: row');
  });

  test('applies labelColor to the label', () => {
    render(<Spinners label="Loading..." labelColor="red" />);
    expect(screen.getByText('Loading...')).toHaveStyle('color: rgb(255, 0, 0)');
  });

  test('renders as an overlay', () => {
    const { container } = render(<Spinners overlay />);
    expect(container.firstChild).toHaveClass('spinner-overlay');
  });

  test('applies template class', () => {
    const { container } = render(<Spinners template="my-template" />);
    expect(container.firstChild).toHaveClass('my-template');
  });
});
