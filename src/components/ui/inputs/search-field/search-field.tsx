import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { inputVariants, type InputProps } from "../input";
import { Label } from "../../atoms/label";
import { FieldDescription } from "../../atoms/field-description";
import { FieldError } from "../../atoms/field-error";

const searchInputVariants = cva("relative flex w-full", {
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

const searchIconVariants = cva(
  "absolute left-0 top-0 h-full flex items-center justify-center text-font-secondary pointer-events-none",
  {
    variants: {
      size: {
        small: "w-8 pl-small",
        default: "w-10 pl-medium",
        large: "w-12 pl-large",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const clearButtonVariants = cva(
  "absolute right-0 top-0 h-full px-medium text-font-secondary transition-colors duration-short hover:text-font-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-80 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:text-font-disabled disabled:opacity-60",
  {
    variants: {
      size: {
        small: "px-small",
        default: "px-medium",
        large: "px-large",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const searchButtonVariants = cva(
  "h-full px-large font-medium text-font-inverse bg-primary-80 hover:bg-primary-90 transition-colors duration-short focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-80 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 rounded-r-medium",
  {
    variants: {
      size: {
        small: "px-small text-small",
        default: "px-medium text-medium",
        large: "px-large text-large",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

// Search icon SVG
const SearchIcon = () => (
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
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

// X icon SVG (for clear button)
const XIcon = () => (
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
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

// ============================================================================
// useSearchField Hook - Manages search field state and keyboard interactions
// ============================================================================

interface UseSearchFieldProps {
  defaultValue?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onClear?: () => void;
  onSubmit?: (value: string) => void;
}

const useSearchField = ({
  defaultValue = "",
  value,
  onChange,
  onClear,
  onSubmit,
}: UseSearchFieldProps) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const composedValue = isControlled ? value : internalValue;

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    },
    [isControlled, onChange]
  );

  const handleClear = React.useCallback(() => {
    if (!isControlled) {
      setInternalValue("");
    }
    onClear?.();
  }, [isControlled, onClear]);

  const handleSubmit = React.useCallback(() => {
    onSubmit?.(composedValue);
  }, [composedValue, onSubmit]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSubmit();
      } else if (e.key === "Escape") {
        e.preventDefault();
        handleClear();
      }
    },
    [handleSubmit, handleClear]
  );

  return {
    value: composedValue,
    onChange: handleChange,
    onClear: handleClear,
    onSubmit: handleSubmit,
    onKeyDown: handleKeyDown,
  };
};

// ============================================================================
// SearchInput - Base search input with icon and clear button
// ============================================================================

export interface SearchInputProps
  extends Omit<
      InputProps,
      "type" | "size" | "onSubmit" | "value" | "defaultValue"
    >,
    VariantProps<typeof searchInputVariants> {
  hasSearchIcon?: boolean;
  hasSearchButton?: boolean;
  onClear?: () => void;
  onSubmit?: (value: string) => void;
  clearButtonLabel?: string;
  searchButtonLabel?: string;
  size?: "small" | "default" | "large";
  value?: string;
  defaultValue?: string;
}

/**
 * SearchInput - Base search input with icon and clear button
 * Use this component when you need just the search control without label/error wrapper
 */
const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      className,
      size = "default",
      hasError = false,
      disabled = false,
      hasSearchIcon = true,
      hasSearchButton = false,
      onClear,
      onSubmit,
      clearButtonLabel = "Clear search",
      searchButtonLabel = "Search",
      value: controlledValue,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const {
      value,
      onChange: handleChange,
      onClear: handleClear,
      onSubmit: handleSubmit,
      onKeyDown,
    } = useSearchField({
      value: controlledValue,
      defaultValue,
      onChange,
      onClear,
      onSubmit,
    });

    const inputPaddingLeft = hasSearchIcon ? "pl-10" : "";
    const inputPaddingRight = hasSearchButton ? "pr-3" : value ? "pr-10" : "";
    const inputRounded = hasSearchButton ? "rounded-r-none" : "";

    return (
      <div className={cn(searchInputVariants({ size }), className)}>
        {hasSearchIcon && (
          <div className={cn(searchIconVariants({ size }))}>
            <SearchIcon />
          </div>
        )}

        <input
          ref={ref}
          type="search"
          className={cn(
            inputVariants({ size, hasError }),
            inputPaddingLeft,
            inputPaddingRight,
            inputRounded,
            hasSearchButton && "flex-1"
          )}
          disabled={disabled}
          value={value}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          {...props}
        />

        {!hasSearchButton && value && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className={cn(clearButtonVariants({ size }))}
            aria-label={clearButtonLabel}
            tabIndex={-1}
          >
            <XIcon />
          </button>
        )}

        {hasSearchButton && (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={disabled}
            className={cn(searchButtonVariants({ size }))}
            aria-label={searchButtonLabel}
          >
            <SearchIcon />
          </button>
        )}
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

// ============================================================================
// SearchField - Complete field composition with label, description, and error
// ============================================================================

export interface SearchFieldProps extends Omit<SearchInputProps, "hasError"> {
  label?: string;
  labelHidden?: boolean;
  description?: string;
  errorMessage?: string;
  hasError?: boolean;
  containerClassName?: string;
}

/**
 * SearchField - Complete search field with label, description, and error message
 * Use this component for complete form fields with proper accessibility
 */
const SearchField = React.forwardRef<HTMLInputElement, SearchFieldProps>(
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
    const descriptionId = description
      ? `${generatedId}-description`
      : undefined;
    const errorId =
      hasError && errorMessage ? `${generatedId}-error` : undefined;

    const ariaDescribedBy =
      [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

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

        <SearchInput
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

SearchField.displayName = "SearchField";

export { SearchInput, SearchField, searchInputVariants };
