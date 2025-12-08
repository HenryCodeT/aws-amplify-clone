import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import {
  PasswordField,
  PasswordInput,
} from "@/components/ui/inputs/password-field";
import { Label } from "@/components/ui/atoms/label";
import { FieldDescription } from "@/components/ui/atoms/field-description";
import { FieldError } from "@/components/ui/atoms/field-error";

const meta = {
  title: "Components/PasswordField",
  component: PasswordField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "default", "large"],
      description: "The size of the input",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    hasError: {
      control: "boolean",
      description: "Error state",
    },
    label: {
      control: "text",
      description: "Label text",
    },
    description: {
      control: "text",
      description: "Description/helper text",
    },
    errorMessage: {
      control: "text",
      description: "Error message text",
    },
  },
} satisfies Meta<typeof PasswordField>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// PasswordField Stories - Complete field composition
// ============================================================================

export const Default: Story = {
  args: {
    label: "Password",
    placeholder: "Enter password",
  },
};

export const WithDescription: Story = {
  args: {
    label: "Password",
    description: "Must be at least 8 characters",
    placeholder: "Enter password",
  },
};

export const WithError: Story = {
  args: {
    label: "Password",
    hasError: true,
    errorMessage: "Password must be at least 8 characters",
    defaultValue: "weak",
    placeholder: "Enter password",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="w-96 space-y-large">
      <PasswordField
        label="Small"
        size="small"
        placeholder="Enter password"
      />
      <PasswordField
        label="Default"
        size="default"
        placeholder="Enter password"
      />
      <PasswordField
        label="Large"
        size="large"
        placeholder="Enter password"
      />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    label: "Password",
    disabled: true,
    defaultValue: "mypassword123",
  },
};

export const HiddenLabel: Story = {
  args: {
    label: "Password",
    labelHidden: true,
    placeholder: "Enter password",
  },
};

export const Controlled: Story = {
  render: () => {
    const [password, setPassword] = useState("");

    const validatePassword = (pwd: string) => {
      if (pwd.length === 0) return { isValid: true, message: "" };
      if (pwd.length < 8) {
        return {
          isValid: false,
          message: "Password must be at least 8 characters",
        };
      }
      if (!/[A-Z]/.test(pwd)) {
        return {
          isValid: false,
          message: "Password must contain an uppercase letter",
        };
      }
      if (!/\d/.test(pwd)) {
        return { isValid: false, message: "Password must contain a number" };
      }
      return { isValid: true, message: "Password meets requirements" };
    };

    const validation = validatePassword(password);

    return (
      <div className="w-96 space-y-medium">
        <PasswordField
          label="Password"
          description="Must be at least 8 characters with uppercase and number"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          hasError={!validation.isValid && password.length > 0}
          errorMessage={!validation.isValid ? validation.message : undefined}
          placeholder="Enter password"
        />

        <div className="pt-medium border-t border-border-secondary space-y-xs">
          <p className="text-small text-font-secondary">
            <strong>Length:</strong> {password.length} characters
          </p>
          <p className="text-small text-font-secondary">
            <strong>Uppercase:</strong> {/[A-Z]/.test(password) ? "✓" : "✗"}
          </p>
          <p className="text-small text-font-secondary">
            <strong>Number:</strong> {/\d/.test(password) ? "✓" : "✗"}
          </p>
          <p className="text-small text-font-secondary">
            <strong>Special:</strong> {/[!@#$%^&*]/.test(password) ? "✓" : "✗"}
          </p>
        </div>
      </div>
    );
  },
};

export const SignUpForm: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      email: "",
      password: "",
      confirmPassword: "",
    });
    const [errors, setErrors] = useState<{
      password?: string;
      confirmPassword?: string;
    }>({});

    const validatePassword = (password: string) => {
      if (password.length < 8) {
        return "Password must be at least 8 characters";
      }
      if (!/[A-Z]/.test(password)) {
        return "Password must contain an uppercase letter";
      }
      if (!/\d/.test(password)) {
        return "Password must contain a number";
      }
      return null;
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newPassword = e.target.value;
      setFormData({ ...formData, password: newPassword });

      const error = validatePassword(newPassword);
      setErrors({ ...errors, password: error || undefined });
    };

    const handleConfirmPasswordChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const newConfirmPassword = e.target.value;
      setFormData({ ...formData, confirmPassword: newConfirmPassword });

      if (newConfirmPassword !== formData.password) {
        setErrors({ ...errors, confirmPassword: "Passwords do not match" });
      } else {
        setErrors({ ...errors, confirmPassword: undefined });
      }
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(JSON.stringify(formData, null, 2));
    };

    return (
      <form onSubmit={handleSubmit} className="w-96 space-y-large">
        <h3 className="text-xl font-semibold">Create Account</h3>

        <div className="space-y-xs">
          <Label htmlFor="signup-email">Email</Label>
          <input
            id="signup-email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="you@example.com"
            className="flex w-full rounded-medium border-medium border-border-primary bg-bg-primary px-medium py-small text-medium"
          />
        </div>

        <PasswordField
          label="Password"
          description="Must be at least 8 characters with uppercase and number"
          value={formData.password}
          onChange={handlePasswordChange}
          hasError={!!errors.password}
          errorMessage={errors.password}
          placeholder="Create a strong password"
        />

        <PasswordField
          label="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleConfirmPasswordChange}
          hasError={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword}
          placeholder="Re-enter your password"
        />

        <button
          type="submit"
          disabled={
            !!errors.password ||
            !!errors.confirmPassword ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword
          }
          className="w-full py-small bg-primary-80 text-white rounded-medium font-medium hover:bg-primary-90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Create Account
        </button>
      </form>
    );
  },
};

export const LoginForm: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      username: "",
      password: "",
      rememberMe: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(JSON.stringify(formData, null, 2));
    };

    return (
      <form onSubmit={handleSubmit} className="w-96 space-y-large">
        <h3 className="text-xl font-semibold">Sign In</h3>

        <div className="space-y-xs">
          <Label htmlFor="login-username">Username or Email</Label>
          <input
            id="login-username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            placeholder="Enter your username"
            className="flex w-full rounded-medium border-medium border-border-primary bg-bg-primary px-medium py-small text-medium"
          />
        </div>

        <PasswordField
          label="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          placeholder="Enter your password"
        />

        <a
          href="#"
          className="text-small text-primary-80 hover:underline inline-block -mt-medium"
        >
          Forgot password?
        </a>

        <div className="flex items-center space-x-xs">
          <input
            id="remember-me"
            type="checkbox"
            checked={formData.rememberMe}
            onChange={(e) =>
              setFormData({ ...formData, rememberMe: e.target.checked })
            }
            className="h-4 w-4 rounded border-border-primary"
          />
          <label htmlFor="remember-me" className="text-medium">
            Remember me
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-small bg-primary-80 text-white rounded-medium font-medium hover:bg-primary-90 transition-colors"
        >
          Sign In
        </button>
      </form>
    );
  },
};

// ============================================================================
// PasswordInput Stories - Base component without field wrapper
// ============================================================================

export const PasswordInputBasic: Story = {
  render: () => (
    <div className="w-96">
      <p className="text-small text-font-secondary mb-medium">
        This is the <code>PasswordInput</code> component - just the input with
        toggle, no label/error wrapper
      </p>
      <PasswordInput placeholder="Enter password" />
    </div>
  ),
};

export const PasswordInputCustomComposition: Story = {
  render: () => {
    const [password, setPassword] = useState("");
    const hasError = password.length > 0 && password.length < 8;

    return (
      <div className="w-96 space-y-xs">
        <p className="text-small text-font-secondary mb-medium">
          Custom composition using <code>PasswordInput</code> with separate
          Label, FieldDescription, and FieldError components
        </p>

        <Label htmlFor="custom-password" hasError={hasError}>
          Password
        </Label>

        <FieldDescription>
          Use PasswordInput for custom field layouts
        </FieldDescription>

        <PasswordInput
          id="custom-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          hasError={hasError}
          placeholder="Enter password"
        />

        {hasError && (
          <FieldError>Password must be at least 8 characters</FieldError>
        )}
      </div>
    );
  },
};

export const PasswordInputSizes: Story = {
  render: () => (
    <div className="w-96 space-y-large">
      <div>
        <Label size="small" className="mb-xs block">
          Small
        </Label>
        <PasswordInput size="small" placeholder="Enter password" />
      </div>
      <div>
        <Label size="default" className="mb-xs block">
          Default
        </Label>
        <PasswordInput size="default" placeholder="Enter password" />
      </div>
      <div>
        <Label size="large" className="mb-xs block">
          Large
        </Label>
        <PasswordInput size="large" placeholder="Enter password" />
      </div>
    </div>
  ),
};
