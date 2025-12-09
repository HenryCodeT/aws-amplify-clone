# Testing Guide

This project uses **Vitest** and **React Testing Library** for testing.

## Running Tests

```bash
# Run tests in watch mode (recommended for development)
pnpm test

# Run tests with UI interface
pnpm test:ui

# Run tests with coverage report
pnpm test:coverage
```

## Test File Structure

Place test files next to the component they're testing with the `.test.tsx` extension:

```
src/
  components/
    ui/
      form-field/
        form-field.tsx
        form-field.test.tsx  ← Test file here
```

## Writing Tests

### Example Test Structure

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { YourComponent } from "./your-component";

describe("YourComponent", () => {
  it("renders correctly", () => {
    render(<YourComponent label="Test" />);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
```

### Testing Best Practices

1. **Test user behavior, not implementation**
   - Use `screen.getByRole`, `screen.getByLabelText`, `screen.getByText`
   - Avoid testing internal state or implementation details

2. **Test accessibility**
   - Check ARIA attributes (`aria-invalid`, `aria-describedby`)
   - Verify label associations
   - Test keyboard navigation

3. **Test edge cases**
   - Empty states
   - Error states
   - Loading states
   - Different prop combinations

### Common Testing Patterns

#### Testing user interactions

```tsx
import userEvent from "@testing-library/user-event";

it("handles user input", async () => {
  const user = userEvent.setup();
  render(<Input />);

  const input = screen.getByRole("textbox");
  await user.type(input, "Hello");

  expect(input).toHaveValue("Hello");
});
```

#### Testing with React Hook Form

```tsx
import { useForm } from "react-hook-form";

function TestWrapper() {
  const { register } = useForm();
  return <Input {...register("email")} />;
}

it("works with React Hook Form", () => {
  render(<TestWrapper />);
  // Test form behavior
});
```

#### Testing error states

```tsx
it("displays error message", () => {
  render(
    <FormField
      label="Email"
      errorMessage="Invalid email"
      hasError={true}
    >
      <Input />
    </FormField>
  );

  expect(screen.getByText("Invalid email")).toBeInTheDocument();
});
```

## Available Matchers

Thanks to `@testing-library/jest-dom`, you have access to helpful matchers:

- `toBeInTheDocument()`
- `toHaveAttribute(attr, value)`
- `toHaveClass(className)`
- `toHaveValue(value)`
- `toBeDisabled()`
- `toBeVisible()`
- And many more!

## Coverage

View coverage report after running:

```bash
pnpm test:coverage
```

Open `coverage/index.html` in your browser to see detailed coverage report.

## Example: FormField Component

See [form-field.test.tsx](src/components/ui/form-controls/field-components/form-field/form-field.test.tsx) for a comprehensive example covering:

- Label rendering
- Description rendering
- Error handling
- Accessibility attributes
- Custom styling
- Input size variants

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [Common Testing Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
