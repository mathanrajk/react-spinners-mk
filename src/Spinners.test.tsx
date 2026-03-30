import { render, screen } from '@testing-library/react';
import Spinners, {
  CircularSpinner,
  CupertinoSpinner,
  SingleCircleSpinner,
  DoubleCircleSpinner,
} from './Spinners';

describe('Spinners Component', () => {
  test('renders nothing when visible is false', () => {
    const { container } = render(<Spinners visible={false} />);
    expect(container.firstChild).toBeNull();
  });

  test('renders CircularSpinner by default', () => {
    const { container } = render(<Spinners />);
    expect(container.querySelector('svg')).toHaveClass('circular-spinner');
  });

  test('renders CupertinoSpinner when type is "Cupertino"', () => {
    const { container } = render(<Spinners type="Cupertino" />);
    expect(container.querySelector('svg')).toHaveClass('cupertino-spinner');
  });

  test('renders SingleCircleSpinner when type is "SingleCircle"', () => {
    const { container } = render(<Spinners type="SingleCircle" />);
    expect(container.querySelector('svg')).toHaveClass('single-circle-spinner');
  });

  test('renders DoubleCircleSpinner when type is "DoubleCircle"', () => {
    const { container } = render(<Spinners type="DoubleCircle" />);
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

describe('Individual Spinner Components', () => {
  test('CircularSpinner renders with correct props', () => {
    const { container } = render(<CircularSpinner color="red" size={50} animationDuration="2s" thickness={5} />);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveStyle('width: 50px');
    expect(svg).toHaveStyle('height: 50px');
    expect(svg).toHaveStyle('animation-duration: 2s');
    const circle = svg.firstChild;
    expect(circle).toHaveAttribute('stroke', 'red');
    expect(circle).toHaveAttribute('stroke-width', '5');
  });

  test('CircularSpinner renders with default thickness', () => {
    const { container } = render(<CircularSpinner />);
    const svg = container.querySelector('svg')!;
    const circle = svg.firstChild;
    expect(circle).toHaveAttribute('stroke-width', '4');
  });

  test('CupertinoSpinner renders with correct props', () => {
    const { container } = render(<CupertinoSpinner color="green" size={60} animationDuration="3s" />);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveStyle('width: 60px');
    expect(svg).toHaveStyle('height: 60px');
    expect(svg).toHaveStyle('animation-duration: 3s');
    const petals = svg.childNodes;
    expect(petals.length).toBe(12);
    expect(petals[0]).toHaveAttribute('fill', 'green');
  });

  test('SingleCircleSpinner renders with correct props', () => {
    const { container } = render(<SingleCircleSpinner color="blue" size={70} animationDuration="4s" />);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveStyle('width: 70px');
    expect(svg).toHaveStyle('height: 70px');
    expect(svg).toHaveStyle('animation-duration: 4s');
    const circle = svg.firstChild;
    expect(circle).toHaveAttribute('fill', 'blue');
  });

  test('DoubleCircleSpinner renders with correct props', () => {
    const { container } = render(<DoubleCircleSpinner color="purple" size={80} animationDuration="5s" thickness={8} />);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveStyle('width: 80px');
    expect(svg).toHaveStyle('height: 80px');
    expect(svg).toHaveStyle('animation-duration: 5s');
    const outerCircle = svg.querySelector('.outer-circle');
    const innerCircle = svg.querySelector('.inner-circle');
    expect(outerCircle).toHaveAttribute('stroke', 'purple');
    expect(outerCircle).toHaveAttribute('stroke-width', '8');
    expect(innerCircle).toHaveAttribute('stroke', 'purple');
    expect(innerCircle).toHaveAttribute('stroke-width', '8');
  });

  test('DoubleCircleSpinner renders with default thickness', () => {
    const { container } = render(<DoubleCircleSpinner />);
    const svg = container.querySelector('svg')!;
    const outerCircle = svg.querySelector('.outer-circle');
    const innerCircle = svg.querySelector('.inner-circle');
    expect(outerCircle).toHaveAttribute('stroke-width', '4');
    expect(innerCircle).toHaveAttribute('stroke-width', '4');
  });
});
