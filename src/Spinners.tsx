import React, { useMemo } from "react";
import "./Spinners.css";

export interface BaseSpinnerProps {
  color?: string;
  size?: number | string;
  animationDuration?: string;
  thickness?: number | string;
}

export const CircularSpinner = React.memo(({ color, size, animationDuration, thickness, ...rest }: BaseSpinnerProps & { title?: string }) => (
  <svg {...rest} className="circular-spinner" style={{ width: size, height: size, animationDuration }} viewBox="0 0 50 50">
    {rest.title && <title>{rest.title}</title>}
    <circle cx="25" cy="25" r="20" fill="none" stroke={color} strokeWidth={thickness || 4} strokeDasharray="90, 150" strokeLinecap="round" />
  </svg>
));

const CUPERTINO_PETALS = [...Array(12)];

export const CupertinoSpinner = React.memo(({ color, size, animationDuration, ...rest }: BaseSpinnerProps & { title?: string }) => (
  <svg {...rest} className="cupertino-spinner" style={{ width: size, height: size, animationDuration }} viewBox="0 0 100 100">
    {rest.title && <title>{rest.title}</title>}
    {CUPERTINO_PETALS.map((_, i) => (
      <rect key={i} x="46" y="4" width="8" height="24" rx="4" ry="4" fill={color} transform={`rotate(${i * 30} 50 50)`} opacity={(i + 1) / 12} />
    ))}
  </svg>
));

export const SingleCircleSpinner = React.memo(({ color, size, animationDuration, ...rest }: BaseSpinnerProps & { title?: string }) => (
  <svg {...rest} className="single-circle-spinner" style={{ width: size, height: size, animationDuration }} viewBox="0 0 50 50">
    {rest.title && <title>{rest.title}</title>}
    <circle cx="25" cy="25" r="20" fill={color} />
  </svg>
));

export const DoubleCircleSpinner = React.memo(({ color, size, animationDuration, thickness, ...rest }: BaseSpinnerProps & { title?: string }) => (
  <svg {...rest} className="double-circle-spinner" style={{ width: size, height: size, animationDuration }} viewBox="0 0 100 100">
    {rest.title && <title>{rest.title}</title>}
    <circle className="outer-circle" cx="50" cy="50" r="40" fill="none" stroke={color} strokeWidth={thickness || 4} strokeDasharray="180" strokeLinecap="round" style={{ animationDuration }} />
    <circle className="inner-circle" cx="50" cy="50" r="20" fill="none" stroke={color} strokeWidth={thickness || 4} strokeDasharray="50" strokeLinecap="round" style={{ animationDuration }} />
  </svg>
));

export interface SpinnerProps {
  type?: "Circular" | "Cupertino" | "SingleCircle" | "DoubleCircle";
  color?: string;
  label?: string;
  labelPosition?: "top" | "bottom" | "left" | "right";
  labelColor?: string;
  size?: number | string;
  visible?: boolean;
  animationDuration?: string;
  thickness?: number | string;
  overlay?: boolean;
  template?: string;
}

function Spinners({
  type = "Circular",
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
      case "Cupertino": return <CupertinoSpinner {...props} />;
      case "SingleCircle": return <SingleCircleSpinner {...props} />;
      case "DoubleCircle": return <DoubleCircleSpinner {...props} />;
      case "Circular":
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
