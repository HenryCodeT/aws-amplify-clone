import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { RadioGroup, RadioGroupItem } from "@/components/ui/inputs/radio-group";

const meta = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["vertical", "horizontal"],
      description: "The orientation of the radio group",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option-1">
      <div className="flex items-center gap-xs">
        <RadioGroupItem value="option-1" id="option-1" />
        <label htmlFor="option-1" className="text-medium cursor-pointer">
          Option 1
        </label>
      </div>
      <div className="flex items-center gap-xs">
        <RadioGroupItem value="option-2" id="option-2" />
        <label htmlFor="option-2" className="text-medium cursor-pointer">
          Option 2
        </label>
      </div>
      <div className="flex items-center gap-xs">
        <RadioGroupItem value="option-3" id="option-3" />
        <label htmlFor="option-3" className="text-medium cursor-pointer">
          Option 3
        </label>
      </div>
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="option-1" orientation="horizontal">
      <div className="flex items-center gap-xs">
        <RadioGroupItem value="option-1" id="h-option-1" />
        <label htmlFor="h-option-1" className="text-medium cursor-pointer">
          Option 1
        </label>
      </div>
      <div className="flex items-center gap-xs">
        <RadioGroupItem value="option-2" id="h-option-2" />
        <label htmlFor="h-option-2" className="text-medium cursor-pointer">
          Option 2
        </label>
      </div>
      <div className="flex items-center gap-xs">
        <RadioGroupItem value="option-3" id="h-option-3" />
        <label htmlFor="h-option-3" className="text-medium cursor-pointer">
          Option 3
        </label>
      </div>
    </RadioGroup>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-xl">
      <div>
        <p className="text-small text-font-secondary mb-small">Small</p>
        <RadioGroup defaultValue="small-1">
          <div className="flex items-center gap-xs">
            <RadioGroupItem value="small-1" id="small-1" size="small" />
            <label htmlFor="small-1" className="text-small cursor-pointer">
              Small option
            </label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <p className="text-small text-font-secondary mb-small">Default</p>
        <RadioGroup defaultValue="default-1">
          <div className="flex items-center gap-xs">
            <RadioGroupItem value="default-1" id="default-1" />
            <label htmlFor="default-1" className="text-medium cursor-pointer">
              Default option
            </label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <p className="text-small text-font-secondary mb-small">Large</p>
        <RadioGroup defaultValue="large-1">
          <div className="flex items-center gap-xs">
            <RadioGroupItem value="large-1" id="large-1" size="large" />
            <label htmlFor="large-1" className="text-large cursor-pointer">
              Large option
            </label>
          </div>
        </RadioGroup>
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option-1" disabled>
      <div className="flex items-center gap-xs">
        <RadioGroupItem value="option-1" id="disabled-1" />
        <label htmlFor="disabled-1" className="text-medium cursor-not-allowed text-font-disabled">
          Disabled selected
        </label>
      </div>
      <div className="flex items-center gap-xs">
        <RadioGroupItem value="option-2" id="disabled-2" />
        <label htmlFor="disabled-2" className="text-medium cursor-not-allowed text-font-disabled">
          Disabled unselected
        </label>
      </div>
    </RadioGroup>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="space-y-small">
      <RadioGroup defaultValue="option-1">
        <div className="flex items-center gap-xs">
          <RadioGroupItem value="option-1" id="error-1" hasError />
          <label htmlFor="error-1" className="text-medium cursor-pointer">
            Option 1
          </label>
        </div>
        <div className="flex items-center gap-xs">
          <RadioGroupItem value="option-2" id="error-2" hasError />
          <label htmlFor="error-2" className="text-medium cursor-pointer">
            Option 2
          </label>
        </div>
      </RadioGroup>
      <p className="text-small text-font-error">Please select an option</p>
    </div>
  ),
};

export const WithDescriptions: Story = {
  render: () => (
    <RadioGroup defaultValue="plan-1" className="gap-medium">
      <div className="flex gap-xs">
        <RadioGroupItem value="plan-1" id="plan-1" className="mt-xs" />
        <div className="flex flex-col gap-xxs">
          <label htmlFor="plan-1" className="text-medium font-medium cursor-pointer">
            Free Plan
          </label>
          <p className="text-small text-font-secondary">
            Perfect for individuals just getting started.
          </p>
        </div>
      </div>

      <div className="flex gap-xs">
        <RadioGroupItem value="plan-2" id="plan-2" className="mt-xs" />
        <div className="flex flex-col gap-xxs">
          <label htmlFor="plan-2" className="text-medium font-medium cursor-pointer">
            Pro Plan
          </label>
          <p className="text-small text-font-secondary">
            Best for professionals and small teams.
          </p>
        </div>
      </div>

      <div className="flex gap-xs">
        <RadioGroupItem value="plan-3" id="plan-3" className="mt-xs" />
        <div className="flex flex-col gap-xxs">
          <label htmlFor="plan-3" className="text-medium font-medium cursor-pointer">
            Enterprise Plan
          </label>
          <p className="text-small text-font-secondary">
            For large organizations with advanced needs.
          </p>
        </div>
      </div>
    </RadioGroup>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState("option-1");

    return (
      <div className="space-y-medium">
        <RadioGroup value={value} onValueChange={setValue}>
          <div className="flex items-center gap-xs">
            <RadioGroupItem value="option-1" id="controlled-1" />
            <label htmlFor="controlled-1" className="text-medium cursor-pointer">
              Option 1
            </label>
          </div>
          <div className="flex items-center gap-xs">
            <RadioGroupItem value="option-2" id="controlled-2" />
            <label htmlFor="controlled-2" className="text-medium cursor-pointer">
              Option 2
            </label>
          </div>
          <div className="flex items-center gap-xs">
            <RadioGroupItem value="option-3" id="controlled-3" />
            <label htmlFor="controlled-3" className="text-medium cursor-pointer">
              Option 3
            </label>
          </div>
        </RadioGroup>

        <div className="pt-medium border-t border-border-secondary">
          <p className="text-small text-font-secondary">
            Selected: <span className="font-medium text-font-primary">{value}</span>
          </p>
        </div>
      </div>
    );
  },
};

export const PaymentMethod: Story = {
  render: () => {
    const [method, setMethod] = useState("card");

    return (
      <div className="w-96 space-y-medium">
        <h3 className="text-large font-semibold">Payment Method</h3>

        <RadioGroup value={method} onValueChange={setMethod} className="gap-medium">
          <div className="flex gap-small p-medium border-medium border-border-secondary rounded-medium hover:border-primary-60 transition-colors">
            <RadioGroupItem value="card" id="payment-card" className="mt-xs" />
            <div className="flex-1">
              <label htmlFor="payment-card" className="text-medium font-medium cursor-pointer block">
                Credit Card
              </label>
              <p className="text-small text-font-secondary">
                Pay with Visa, Mastercard, or American Express
              </p>
            </div>
          </div>

          <div className="flex gap-small p-medium border-medium border-border-secondary rounded-medium hover:border-primary-60 transition-colors">
            <RadioGroupItem value="paypal" id="payment-paypal" className="mt-xs" />
            <div className="flex-1">
              <label htmlFor="payment-paypal" className="text-medium font-medium cursor-pointer block">
                PayPal
              </label>
              <p className="text-small text-font-secondary">
                Secure payment through your PayPal account
              </p>
            </div>
          </div>

          <div className="flex gap-small p-medium border-medium border-border-secondary rounded-medium hover:border-primary-60 transition-colors">
            <RadioGroupItem value="bank" id="payment-bank" className="mt-xs" />
            <div className="flex-1">
              <label htmlFor="payment-bank" className="text-medium font-medium cursor-pointer block">
                Bank Transfer
              </label>
              <p className="text-small text-font-secondary">
                Direct transfer from your bank account
              </p>
            </div>
          </div>
        </RadioGroup>
      </div>
    );
  },
};

export const NotificationPreference: Story = {
  render: () => {
    const [frequency, setFrequency] = useState("daily");

    return (
      <div className="w-96 space-y-medium">
        <div>
          <h3 className="text-large font-semibold">Email Notifications</h3>
          <p className="text-small text-font-secondary mt-xs">
            How often would you like to receive email updates?
          </p>
        </div>

        <RadioGroup value={frequency} onValueChange={setFrequency}>
          <div className="flex items-center gap-xs">
            <RadioGroupItem value="realtime" id="freq-realtime" />
            <label htmlFor="freq-realtime" className="text-medium cursor-pointer">
              Real-time (as they happen)
            </label>
          </div>
          <div className="flex items-center gap-xs">
            <RadioGroupItem value="daily" id="freq-daily" />
            <label htmlFor="freq-daily" className="text-medium cursor-pointer">
              Daily digest
            </label>
          </div>
          <div className="flex items-center gap-xs">
            <RadioGroupItem value="weekly" id="freq-weekly" />
            <label htmlFor="freq-weekly" className="text-medium cursor-pointer">
              Weekly summary
            </label>
          </div>
          <div className="flex items-center gap-xs">
            <RadioGroupItem value="never" id="freq-never" />
            <label htmlFor="freq-never" className="text-medium cursor-pointer">
              Never
            </label>
          </div>
        </RadioGroup>
      </div>
    );
  },
};

export const Survey: Story = {
  render: () => {
    const [rating, setRating] = useState("");

    return (
      <div className="w-96 space-y-medium">
        <div>
          <h3 className="text-large font-semibold">How satisfied are you?</h3>
          <p className="text-small text-font-secondary mt-xs">
            Please rate your experience with our service
          </p>
        </div>

        <RadioGroup value={rating} onValueChange={setRating} orientation="horizontal">
          {["😞", "😐", "🙂", "😃", "🤩"].map((emoji, index) => (
            <div key={index} className="flex flex-col items-center gap-xs">
              <RadioGroupItem
                value={String(index + 1)}
                id={`rating-${index + 1}`}
                size="large"
              />
              <label
                htmlFor={`rating-${index + 1}`}
                className="text-xl cursor-pointer"
              >
                {emoji}
              </label>
            </div>
          ))}
        </RadioGroup>

        {rating && (
          <p className="text-small text-font-secondary text-center">
            You rated: {rating}/5
          </p>
        )}
      </div>
    );
  },
};
