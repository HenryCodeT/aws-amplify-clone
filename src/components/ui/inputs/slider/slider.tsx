import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Label } from "../../atoms/label";
import { FieldDescription } from "../../atoms/field-description";
import { FieldError } from "../../atoms/field-error";

const sliderVariants = cva(
  "relative flex touch-none select-none items-center",
  {
    variants: {
      orientation: {
        horizontal: "w-full",
        vertical: "h-full flex-col",
      },
      size: {
        small: "",
        default: "",
        large: "",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      size: "default",
    },
  }
);

const sliderTrackVariants = cva(
  "relative grow overflow-hidden rounded-full bg-neutral-40",
  {
    variants: {
      orientation: {
        horizontal: "h-2 w-full",
        vertical: "w-2 h-full",
      },
      size: {
        small: "",
        default: "",
        large: "",
      },
    },
    compoundVariants: [
      { orientation: "horizontal", size: "small", class: "h-1" },
      { orientation: "horizontal", size: "default", class: "h-2" },
      { orientation: "horizontal", size: "large", class: "h-3" },
      { orientation: "vertical", size: "small", class: "w-1" },
      { orientation: "vertical", size: "default", class: "w-2" },
      { orientation: "vertical", size: "large", class: "w-3" },
    ],
    defaultVariants: {
      orientation: "horizontal",
      size: "default",
    },
  }
);

const sliderRangeVariants = cva("absolute bg-primary-80 rounded-full", {
  variants: {
    orientation: {
      horizontal: "h-full",
      vertical: "w-full",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

const sliderThumbVariants = cva(
  "block h-5 w-5 rounded-full border-2 border-primary-80 bg-bg-primary ring-offset-bg-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-80 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      size: {
        small: "h-4 w-4",
        default: "h-5 w-5",
        large: "h-6 w-6",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

// ============================================================================
// Slider - Base slider component
// ============================================================================

export interface SliderProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
      "size"
    >,
    VariantProps<typeof sliderVariants> {
  trackClassName?: string;
  rangeClassName?: string;
  thumbClassName?: string;
  size?: "small" | "default" | "large";
}

/**
 * Slider - Base slider component using Radix UI
 * Use this component when you need just the slider control without label/error wrapper
 */
const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(
  (
    {
      className,
      orientation = "horizontal",
      size = "default",
      trackClassName,
      rangeClassName,
      thumbClassName,
      ...props
    },
    ref
  ) => (
    <SliderPrimitive.Root
      ref={ref}
      orientation={orientation}
      className={cn(sliderVariants({ orientation, size, className }))}
      {...props}
    >
      <SliderPrimitive.Track
        className={cn(
          sliderTrackVariants({ orientation, size }),
          trackClassName
        )}
      >
        <SliderPrimitive.Range
          className={cn(sliderRangeVariants({ orientation }), rangeClassName)}
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className={cn(sliderThumbVariants({ size }), thumbClassName)}
      />
    </SliderPrimitive.Root>
  )
);

Slider.displayName = SliderPrimitive.Root.displayName;

// ============================================================================
// SliderField - Complete field composition with label, description, and error
// ============================================================================

export interface SliderFieldProps
  extends Omit<SliderProps, "onValueChange" | "defaultValue" | "value"> {
  label?: string;
  labelHidden?: boolean;
  description?: string;
  errorMessage?: string;
  hasError?: boolean;
  containerClassName?: string;
  isValueHidden?: boolean;
  formatValue?: ((value: number) => string) | string;
  defaultValue?: number;
  value?: number;
  onChange?: (value: number) => void;
}

/**
 * SliderField - Complete slider field with label, description, and error message
 * Use this component for complete form fields with proper accessibility
 */
const SliderField = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderFieldProps
>(
  (
    {
      id,
      label,
      labelHidden = false,
      description,
      errorMessage,
      hasError = false,
      size = "default",
      containerClassName,
      className,
      isValueHidden = false,
      formatValue,
      defaultValue,
      value: controlledValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const fieldId = React.useId();
    const generatedId = id || fieldId;
    const descriptionId = description
      ? `${generatedId}-description`
      : undefined;
    const errorId =
      hasError && errorMessage ? `${generatedId}-error` : undefined;

    const ariaDescribedBy = [descriptionId, errorId]
      .filter(Boolean)
      .join(" ") || undefined;

    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState(
      defaultValue ?? 0
    );

    const currentValue = isControlled ? controlledValue : internalValue;

    const handleValueChange = React.useCallback(
      (values: number[]) => {
        const newValue = values[0];
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);
      },
      [isControlled, onChange]
    );

    const displayValue = React.useMemo(() => {
      if (isValueHidden) return null;

      if (typeof formatValue === "function") {
        return formatValue(currentValue);
      } else if (typeof formatValue === "string") {
        return formatValue.replace("{value}", String(currentValue));
      } else {
        return currentValue;
      }
    }, [currentValue, formatValue, isValueHidden]);

    return (
      <div className={cn("space-y-xs", containerClassName)}>
        {label && (
          <div className="flex items-center justify-between">
            <Label
              htmlFor={generatedId}
              visuallyHidden={labelHidden}
              hasError={hasError}
              size={size}
            >
              {label}
            </Label>
            {!isValueHidden && displayValue !== null && (
              <span className="text-small text-font-secondary font-medium">
                {displayValue}
              </span>
            )}
          </div>
        )}

        {description && !labelHidden && (
          <FieldDescription id={descriptionId} size={size}>
            {description}
          </FieldDescription>
        )}

        <Slider
          ref={ref}
          id={generatedId}
          size={size}
          aria-describedby={ariaDescribedBy}
          className={className}
          defaultValue={defaultValue ? [defaultValue] : undefined}
          value={controlledValue !== undefined ? [controlledValue] : undefined}
          onValueChange={handleValueChange}
          {...props}
        />

        {hasError && errorMessage && (
          <FieldError id={errorId} size={size}>
            {errorMessage}
          </FieldError>
        )}
      </div>
    );
  }
);

SliderField.displayName = "SliderField";

export { Slider, SliderField, sliderVariants };
