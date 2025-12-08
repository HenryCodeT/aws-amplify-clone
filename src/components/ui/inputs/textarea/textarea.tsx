import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Label } from "../../atoms/label";
import { FieldDescription } from "../../atoms/field-description";
import { FieldError } from "../../atoms/field-error";

const textareaVariants = cva(
  "flex min-h-[80px] w-full rounded-medium border-medium border-border-primary bg-bg-primary px-medium py-small text-medium text-font-primary transition-colors duration-medium placeholder:text-font-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-80 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:border-border-disabled disabled:bg-bg-disabled disabled:text-font-disabled disabled:opacity-60",
  {
    variants: {
      size: {
        small: "min-h-[60px] px-small py-xs text-small",
        default: "min-h-[80px] px-medium py-small text-medium",
        large: "min-h-[100px] px-large py-medium text-large",
      },
      hasError: {
        true: "border-border-error focus-visible:ring-red-60",
        false: "",
      },
      resize: {
        none: "resize-none",
        vertical: "resize-y",
        horizontal: "resize-x",
        both: "resize",
      },
    },
    defaultVariants: {
      size: "default",
      hasError: false,
      resize: "vertical",
    },
  }
);

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    VariantProps<typeof textareaVariants> {
  hasError?: boolean;
  resize?: "none" | "vertical" | "horizontal" | "both";
}

/**
 * Textarea - Base textarea component
 * Use this component when you need just the textarea control without label/error wrapper
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, size, hasError = false, resize = "vertical", ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ size, hasError, resize, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

// ============================================================================
// AutoResizeTextarea - Textarea that grows with content
// ============================================================================

export interface AutoResizeTextareaProps extends TextareaProps {
  maxRows?: number;
}

/**
 * AutoResizeTextarea - Textarea that automatically grows with content
 */
const AutoResizeTextarea = React.forwardRef<
  HTMLTextAreaElement,
  AutoResizeTextareaProps
>(({ className, size, hasError = false, maxRows, ...props }, ref) => {
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

  const adjustHeight = React.useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = "auto";

    // Calculate new height
    let newHeight = textarea.scrollHeight;

    // Apply max rows limit if specified
    if (maxRows) {
      const lineHeight = parseInt(
        window.getComputedStyle(textarea).lineHeight || "0"
      );
      const maxHeight = lineHeight * maxRows;
      newHeight = Math.min(newHeight, maxHeight);
    }

    textarea.style.height = `${newHeight}px`;
  }, [maxRows]);

  React.useEffect(() => {
    adjustHeight();
  }, [props.value, adjustHeight]);

  React.useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Adjust on mount
    adjustHeight();

    // Listen for input events
    textarea.addEventListener("input", adjustHeight);

    return () => {
      textarea.removeEventListener("input", adjustHeight);
    };
  }, [adjustHeight]);

  const handleRef = React.useCallback(
    (node: HTMLTextAreaElement | null) => {
      textareaRef.current = node;

      // Handle forwarded ref
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref]
  );

  return (
    <textarea
      className={cn(
        textareaVariants({ size, hasError, resize: "none", className })
      )}
      ref={handleRef}
      {...props}
    />
  );
});
AutoResizeTextarea.displayName = "AutoResizeTextarea";

// ============================================================================
// TextareaField - Complete field composition with label, description, and error
// ============================================================================

export interface TextareaFieldProps extends Omit<TextareaProps, "hasError"> {
  label?: string;
  labelHidden?: boolean;
  description?: string;
  errorMessage?: string;
  hasError?: boolean;
  containerClassName?: string;
  autoResize?: boolean;
  maxRows?: number;
}

/**
 * TextareaField - Complete textarea field with label, description, and error message
 * Use this component for complete form fields with proper accessibility
 */
const TextareaField = React.forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
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
      autoResize = false,
      maxRows,
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

    const TextareaComponent = autoResize ? AutoResizeTextarea : Textarea;

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

        <TextareaComponent
          ref={ref}
          id={generatedId}
          hasError={hasError}
          size={size}
          maxRows={maxRows}
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

TextareaField.displayName = "TextareaField";

export { Textarea, AutoResizeTextarea, TextareaField, textareaVariants };
