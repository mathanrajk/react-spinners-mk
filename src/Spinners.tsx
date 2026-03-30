import React, { useMemo } from "react";
import "./Spinners.css";

interface BaseSpinnerProps {
  color?: string;
  size?: number | string;
  animationDuration?: string;
  thickness?: number | string;
}

const CircularSpinner = React.memo(({ color, size, animationDuration, thickness, ...rest }: BaseSpinnerProps & { title?: string }) => (
  <svg {...rest} className="circular-spinner" style={{ width: size, height: size, animationDuration }} viewBox="0 0 50 50">
    {rest.title && <title>{rest.title}</title>}
    <circle cx="25" cy="25" r="20" fill="none" stroke={color} strokeWidth={thickness || 4} strokeDasharray="90, 150" strokeLinecap="round" />
  </svg>
));

const CUPERTINO_PETALS = [...Array(12)];

const CupertinoSpinner = React.memo(({ color, size, animationDuration, ...rest }: BaseSpinnerProps & { title?: string }) => (
  <svg {...rest} className="cupertino-spinner" style={{ width: size, height: size, animationDuration }} viewBox="0 0 100 100">
    {rest.title && <title>{rest.title}</title>}
    {CUPERTINO_PETALS.map((_, i) => (
      <rect key={i} x="46" y="4" width="8" height="24" rx="4" ry="4" fill={color} transform={`rotate(${i * 30} 50 50)`} opacity={(i + 1) / 12} />
    ))}
  </svg>
));

const SingleCircleSpinner = React.memo(({ color, size, animationDuration, ...rest }: BaseSpinnerProps & { title?: string }) => (
  <svg {...rest} className="single-circle-spinner" style={{ width: size, height: size, animationDuration }} viewBox="0 0 50 50">
    {rest.title && <title>{rest.title}</title>}
    <circle cx="25" cy="25" r="20" fill={color} />
  </svg>
));

const DoubleCircleSpinner = React.memo(({ color, size, animationDuration, thickness, ...rest }: BaseSpinnerProps & { title?: string }) => (
  <svg {...rest} className="double-circle-spinner" style={{ width: size, height: size, animationDuration }} viewBox="0 0 100 100">
    {rest.title && <title>{rest.title}</title>}
    <circle className="outer-circle" cx="50" cy="50" r="40" fill="none" stroke={color} strokeWidth={thickness || 4} strokeDasharray="180" strokeLinecap="round" style={{ animationDuration }} />
    <circle className="inner-circle" cx="50" cy="50" r="20" fill="none" stroke={color} strokeWidth={thickness || 4} strokeDasharray="50" strokeLinecap="round" style={{ animationDuration }} />
  </svg>
));

export const SpinnerType = {
  Circular: "Circular",
  Cupertino: "Cupertino",
  SingleCircle: "SingleCircle",
  DoubleCircle: "DoubleCircle",
} as const;

export type SpinnerType = (typeof SpinnerType)[keyof typeof SpinnerType];

export interface SpinnerProps {
  /**
   * The visual style/type of the spinner to render.
   * @default SpinnerType.Circular
   */
  type?: SpinnerType;

  /**
   * The primary color of the spinner. Accepts any valid CSS color value (hex, rgb, rgba, named color).
   * @default "#763ce0"
   */
  color?: string;

  /**
   * Optional text label to display alongside the spinner for added context (e.g., "Loading...").
   * @default ""
   */
  label?: string;

  /**
   * The position of the text label relative to the spinner.
   * @default "bottom"
   */
  labelPosition?: "top" | "bottom" | "left" | "right";

  /**
   * The color of the text label. Accepts any valid CSS color value.
   * @default "#000000"
   */
  labelColor?: string;

  /**
   * The width and height of the spinner. Accepts a number (interpreted as pixels) or a string with CSS units (e.g., "3rem", "50%").
   * @default 40
   */
  size?: number | string;

  /**
   * Determines whether the spinner and its label are rendered. If false, the component returns `null`.
   * @default true
   */
  visible?: boolean;

  /**
   * Custom CSS animation duration to speed up or slow down the spinning effect. Accepts valid CSS time values (e.g., "1.5s", "500ms").
   */
  animationDuration?: string;

  /**
   * The thickness (stroke width) of the spinner. Primarily applicable to `Circular` and `DoubleCircle` spinner types. Accepts a number or string.
   */
  thickness?: number | string;

  /**
   * If true, wraps the spinner in a container with the `spinner-overlay` CSS class, typically used to center it over other content or block UI interaction.
   * @default false
   */
  overlay?: boolean;

  /**
   * An optional custom CSS class name to apply to the root container wrapper of the spinner (and label).
   */
  template?: string;
}

function Spinners({
  type = SpinnerType.Circular,
  color = "#763ce0",
  label = "",
  labelPosition = "bottom",
  labelColor = "#000000",
  size = 40,
  visible = true,
  animationDuration,
  thickness,
  overlay = false,
  template,
}: SpinnerProps) {
  const spinnerElement = useMemo(() => {
    const commonProps = {
      color,
      size,
      animationDuration,
      thickness,
    };

    const accessibilityProps = label
      ? { 'aria-hidden': true }
      : { role: 'img', title: 'Loading' };

    const props = { ...commonProps, ...accessibilityProps };

    switch (type) {
      case SpinnerType.Cupertino: return <CupertinoSpinner {...props} />;
      case SpinnerType.SingleCircle: return <SingleCircleSpinner {...props} />;
      case SpinnerType.DoubleCircle: return <DoubleCircleSpinner {...props} />;
      case SpinnerType.Circular:
      default: return <CircularSpinner {...props} />;
    }
  }, [type, color, size, animationDuration, thickness, label]);

  const flexDirection: React.CSSProperties["flexDirection"] = useMemo(() =>
    labelPosition === "top" ? "column-reverse" :
    labelPosition === "left" ? "row-reverse" :
    labelPosition === "right" ? "row" : "column"
  , [labelPosition]);

  const containerStyle: React.CSSProperties = useMemo(() => ({
    display: 'flex',
    flexDirection,
    gap: '0.5rem',
    alignItems: 'center',
    justifyContent: 'center'
  }), [flexDirection]);

  const labelStyle = useMemo(() => ({ color: labelColor }), [labelColor]);

  const content = (
    <div role="status" className={template} style={containerStyle}>
      {spinnerElement}
      {label && <span style={labelStyle}>{label}</span>}
    </div>
  );

  if (!visible) return null;

  return overlay ? (
    <div className="spinner-overlay">{content}</div>
  ) : content;
}

export default Spinners;
