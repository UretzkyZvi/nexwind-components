# Form Component Documentation

This documentation covers the integrated use of a `Button` component with a `ContextTooltip` component in React. The `Button` component provides various stylized buttons with customizable sizes, variants, and optional icons. The `ContextTooltip` component adds a tooltip to any React component, showing additional information on hover and allowing for expanded content after a delay. Combining these components enhances UI interactivity and user experience by providing immediate visual feedback and additional contextual information.

## Button Component

### Features

- **Variants**: Supports multiple style variants including `primary`, `secondary`, `primaryDark`, `secondaryDark`, `soft`, `leadingIcon`, `trailingIcon`, `roundedPrimary`, `secondaryRounded`, and `circle`.
- **Sizes**: Available in multiple sizes from `xs` to `4xl`, allowing for flexible design options.
- **Customization**: Accepts a `className` prop for further style customizations.
- **Icons**: Can include leading or trailing icons for enhanced visual communication.

### Props

- `children`: The content of the button.
- `onClick`: Callback function triggered on button click.
- `variant`: Style variant of the button.
- `size`: Size of the button.
- `className`: Additional CSS classes for customization.
- `icon`: Icon component to be displayed alongside the button text.

### Usage

```jsx
<Button
  variant="primary"
  size="sm"
  onClick={() => console.log('Button clicked')}
  icon={<YourIconComponent />}
>
  Click Me
</Button>
```

## ContextTooltip Component

### Features

- **Dynamic Positioning**: Automatically positions the tooltip based on the preferred direction and available viewport space.
- **Delayed Expanded Content**: Shows additional content in the tooltip after a specified delay when hovered.
- **Customizable**: Allows setting a preferred tooltip direction and custom expanded content.

### Props

- `children`: The target element that the tooltip is attached to.
- `message`: The message displayed in the tooltip.
- `expandedContent`: Additional content displayed after a delay upon hover.
- `preferredDirection`: Preferred direction of the tooltip (`top`, `bottom`, `left`, `right`).

### Usage

```jsx
<ContextTooltip
  message="Tooltip message"
  expandedContent={<AdditionalContent />}
  preferredDirection="top"
>
  <Button>Hover Over Me</Button>
</ContextTooltip>
```

## Integration Example

To use the `Button` component with a `ContextTooltip`, wrap the `Button` with the `ContextTooltip` component and provide the necessary props to both components.

```jsx
<ContextTooltip
  message="Click for action"
  expandedContent={<p>More detailed information here.</p>}
  preferredDirection="right"
>
  <Button
    variant="primary"
    size="md"
    icon={<SomeIcon />}
    onClick={() => console.log('Action performed')}
  >
    Hover & Click
  </Button>
</ContextTooltip>
```

## Conclusion

Integrating the `Button` with the `ContextTooltip` component allows developers to create interactive and informative UI elements. The `Button` component offers flexible styling options through variants and sizes, while the `ContextTooltip` enhances user interaction by providing additional context or information on hover. This combination is particularly useful in applications where guiding the user or providing immediate feedback enhances the overall user experience.