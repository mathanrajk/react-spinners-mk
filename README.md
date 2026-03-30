# react-spinners-mk

A collection of simple, customizable, and lightweight loading spinners for React applications.

## Installation

You can install the package using npm or yarn:

```bash
npm install react-spinners-mk
# or
yarn add react-spinners-mk
```

## Usage

Here is a basic example of how to use the default `Spinners` component:

```tsx
import React from 'react';
import Spinners, { SpinnerType } from 'react-spinners-mk';

const App = () => {
  return (
    <div>
      <h2>Loading Data...</h2>
      <Spinners type={SpinnerType.Circular} color="#007bff" size={50} label="Loading..." />
    </div>
  );
};

export default App;
```

### Advanced Usage

You can highly customize the spinner, including turning it into a full overlay or changing its animation speed:

```tsx
import React, { useState } from 'react';
import Spinners, { SpinnerType } from 'react-spinners-mk';

const OverlayExample = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Spinners 
      type={SpinnerType.DoubleCircle} 
      size={80} 
      color="#1976d2" 
      thickness={6}
      animationDuration="1.5s"
      label="Fetching your data..."
      labelPosition="right"
      labelColor="#333"
      overlay={true}
      visible={isLoading}
    />
  );
};
```

## Props Configuration

The `Spinners` component accepts the following props to easily customize its appearance and behavior:

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| **`type`** | `SpinnerType` enum | `SpinnerType.Circular` | The visual style of the spinner. Accepts `SpinnerType.Circular`, `SpinnerType.Cupertino`, `SpinnerType.SingleCircle`, or `SpinnerType.DoubleCircle`. |
| **`color`** | `string` | `"#763ce0"` | The primary color of the spinner's strokes or fills. Accepts any valid CSS color string (e.g., `"#ff0000"`, `"blue"`, `"rgba(0,0,0,0.5)"`). |
| **`size`** | `number \| string` | `40` | The width and height of the spinner in pixels (if provided as a number) or any valid CSS unit (if provided as a string). |
| **`label`** | `string` | `""` | Optional text to display alongside the spinner. Useful for providing context like "Loading data...". |
| **`labelPosition`** | `"top" \| "bottom" \| "left" \| "right"` | `"bottom"` | Where the label should be positioned relative to the spinner icon. |
| **`labelColor`** | `string` | `"#000000"` | The text color of the label. |
| **`visible`** | `boolean` | `true` | Controls whether the spinner is rendered in the DOM. Useful for conditionally showing the spinner without needing to wrap it in a ternary operator. |
| **`animationDuration`** | `string` | `undefined` | Custom CSS animation duration (e.g., `"0.5s"`, `"2000ms"`). Allows you to speed up or slow down the default spinning animation. |
| **`thickness`** | `number \| string` | `4` | Controls the thickness of the SVG strokes. Applies primarily to the `Circular` and `DoubleCircle` spinner types. |
| **`overlay`** | `boolean` | `false` | When set to `true`, wraps the spinner in a `spinner-overlay` container class, which is typically used to create a full-screen or container-covering loading overlay. |
| **`template`** | `string` | `undefined` | Allows you to pass a custom CSS class name directly to the inner wrapper container of the spinner and label for further styling. |
