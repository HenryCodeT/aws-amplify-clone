import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { inputVariants } from "../input";
import { Label } from "../../atoms/label";
import { FieldDescription } from "../../atoms/field-description";
import { FieldError } from "../../atoms/field-error";

const numberInputVariants = cva("relative flex items-stretch", {
  variants: {
    size: {
      small: "",
      default: "",
      large: "",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const buttonVariants = cva(
  "flex items-center justify-center text-font-secondary hover:text-font-primary hover:bg-bg-secondary transition-colors duration-short focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-80 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-font-secondary disabled:hover:bg-transparent border-border-primary",
  {
    variants: {
      size: {
        small: "w-8 h-8",
        default: "w-10 h-10",
        large: "w-12 h-12",
      },
      position: {
        start: "border-r-medium rounded-l-medium",
        end: "border-l-medium rounded-r-medium",
      },
    },
    defaultVariants: {
      size: "default",
      position: "start",
    },
  }
);

// Plus icon SVG
const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);

// Minus icon SVG
const MinusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
  </svg>
);

// ============================================================================
// useNumberField Hook - Manages number field state and validation
// ============================================================================

const getCorrectSteppingValue = ({
  max,
  min,
  step,
  value,
}: {
  max: number;
  min: number;
  step: number;
  value: number;
}) => {
  // Round to closest step value based on min
  const remainder = (value - min) % step;
  value = value - remainder + Math.round(remainder / step) * step;

  // Ensure within bounds
  value = Math.max(min, value);
  if (value > max) {
    value = max - ((max - min) % step);
  }

  return value;
};

interface UseNumberFieldProps {
  defaultValue?: number;
  value?: number;
  step?: number;
  min?: number;
  max?: number;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onStepChange?: (value: number) => void;
  onIncrease?: () => void;
  onDecrease?: () => void;
}

const useNumberField = ({
  defaultValue = 0,
  value: controlledValue,
  step = 1,
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
  isDisabled,
  isReadOnly,
  onChange,
  onStepChange,
  onIncrease,
  onDecrease,
}: UseNumberFieldProps) => {
  const isControlled = controlledValue !== undefined;

  // Ensure max >= min
  max = Math.max(min, max);

  // Internal state for uncontrolled
  const [uncontrolledValue, setUncontrolledValue] = React.useState(() =>
    getCorrectSteppingValue({ min, max, step, value: defaultValue })
  );

  // Current value (corrected for stepping)
  const value = isControlled
    ? getCorrectSteppingValue({ min, max, step, value: controlledValue })
    : uncontrolledValue;

  // Display value (can be string during editing)
  const [inputValue, setInputValue] = React.useState<number | string>(value);

  const shouldDisableIncrease =
    isDisabled || isReadOnly || value + step > max;
  const shouldDisableDecrease =
    isDisabled || isReadOnly || value - step < min;

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      onChange?.(e);
    },
    [onChange]
  );

  const handleBlur = React.useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const parsedValue = parseFloat(e.target.value);

      // Handle empty or invalid input
      if (isNaN(parsedValue)) {
        setInputValue(value);
        return;
      }

      const newValue = getCorrectSteppingValue({
        min,
        max,
        step,
        value: parsedValue,
      });

      if (!isControlled) {
        setUncontrolledValue(newValue);
      }

      onStepChange?.(newValue);
      setInputValue(newValue);
    },
    [min, max, step, value, isControlled, onStepChange]
  );

  const handleIncrease = React.useCallback(() => {
    const newValue = value + step;

    if (!isControlled) {
      setUncontrolledValue(newValue);
    }

    onStepChange?.(newValue);
    onIncrease?.();
    setInputValue(newValue);
  }, [step, value, isControlled, onIncrease, onStepChange]);

  const handleDecrease = React.useCallback(() => {
    const newValue = value - step;

    if (!isControlled) {
      setUncontrolledValue(newValue);
    }

    onStepChange?.(newValue);
    onDecrease?.();
    setInputValue(newValue);
  }, [step, value, isControlled, onDecrease, onStepChange]);

  // Disable scroll wheel changes
  const handleWheel = React.useCallback(
    (e: React.WheelEvent<HTMLInputElement>) => {
      e.currentTarget.blur();
    },
    []
  );

  // Sync controlled value changes
  React.useEffect(() => {
    if (isControlled && controlledValue !== undefined) {
      setInputValue(controlledValue);
    }
  }, [controlledValue, isControlled]);

  return {
    step,
    value,
    inputValue,
    handleChange,
    handleBlur,
    handleIncrease,
    handleDecrease,
    handleWheel,
    shouldDisableIncrease,
    shouldDisableDecrease,
  };
};

// ============================================================================
// NumberInput - Base number input with increment/decrement buttons
// ============================================================================

export interface NumberInputProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "type" | "size" | "onChange"
    >,
    VariantProps<typeof numberInputVariants> {
  hasError?: boolean;
  step?: number;
  min?: number;
  max?: number;
  isReadOnly?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onStepChange?: (value: number) => void;
  onIncrease?: () => void;
  onDecrease?: () => void;
  increaseButtonLabel?: string;
  decreaseButtonLabel?: string;
  size?: "small" | "default" | "large";
}

/**
 * NumberInput - Base number input with increment/decrement buttons
 * Use this component when you need just the number control without label/error wrapper
 */
const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      className,
      size = "default",
      hasError = false,
      disabled = false,
      step = 1,
      min,
      max,
      isReadOnly = false,
      value: controlledValue,
      defaultValue,
      onChange,
      onStepChange,
      onIncrease,
      onDecrease,
      increaseButtonLabel = "Increase",
      decreaseButtonLabel = "Decrease",
      ...props
    },
    ref
  ) => {
    const {
      value,
      inputValue,
      handleChange,
      handleBlur,
      handleIncrease,
      handleDecrease,
      handleWheel,
      shouldDisableIncrease,
      shouldDisableDecrease,
    } = useNumberField({
      defaultValue: defaultValue ? Number(defaultValue) : undefined,
      value: controlledValue ? Number(controlledValue) : undefined,
      step,
      min,
      max,
      isDisabled: disabled,
      isReadOnly,
      onChange,
      onStepChange,
      onIncrease,
      onDecrease,
    });

    return (
      <div className={cn(numberInputVariants({ size }), className)}>
        <button
          type="button"
          onClick={handleDecrease}
          disabled={shouldDisableDecrease}
          className={cn(buttonVariants({ size, position: "start" }))}
          aria-label={`${decreaseButtonLabel} ${value - step}`}
          tabIndex={-1}
        >
          <MinusIcon />
        </button>

        <input
          ref={ref}
          type="number"
          className={cn(
            inputVariants({ size, hasError }),
            "text-center rounded-none border-x-0 flex-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          )}
          disabled={disabled}
          readOnly={isReadOnly}
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onWheel={handleWheel}
          step={step}
          min={min}
          max={max}
          {...props}
        />

        <button
          type="button"
          onClick={handleIncrease}
          disabled={shouldDisableIncrease}
          className={cn(buttonVariants({ size, position: "end" }))}
          aria-label={`${increaseButtonLabel} ${value + step}`}
          tabIndex={-1}
        >
          <PlusIcon />
        </button>
      </div>
    );
  }
);

NumberInput.displayName = "NumberInput";

// ============================================================================
// NumberField - Complete field composition with label, description, and error
// ============================================================================

export interface NumberFieldProps extends Omit<NumberInputProps, "hasError"> {
  label?: string;
  labelHidden?: boolean;
  description?: string;
  errorMessage?: string;
  hasError?: boolean;
  containerClassName?: string;
}

/**
 * NumberField - Complete number field with label, description, and error message
 * Use this component for complete form fields with proper accessibility
 */
const NumberField = React.forwardRef<HTMLInputElement, NumberFieldProps>(
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
      ...props
    },
    ref
  ) => {
    const fieldId = React.useId();
    const generatedId = id || fieldId;
    const descriptionId = description ? `${generatedId}-description` : undefined;
    const errorId = hasError && errorMessage ? `${generatedId}-error` : undefined;

    const ariaDescribedBy = [descriptionId, errorId]
      .filter(Boolean)
      .join(" ") || undefined;

    return (
      <div className={cn("space-y-xs", containerClassName)}>
        {label && (
          <Label
            htmlFor={generatedId}
            visuallyHidden={labelHidden}
            hasError={hasError}
            size={size}
          >
            {label}
          </Label>
        )}

        {description && !labelHidden && (
          <FieldDescription id={descriptionId} size={size}>
            {description}
          </FieldDescription>
        )}

        <NumberInput
          ref={ref}
          id={generatedId}
          hasError={hasError}
          size={size}
          aria-describedby={ariaDescribedBy}
          aria-invalid={hasError}
          className={className}
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

NumberField.displayName = "NumberField";

export { NumberInput, NumberField, numberInputVariants };
