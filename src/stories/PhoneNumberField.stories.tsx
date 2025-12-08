import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { PhoneNumberField } from "@/components/ui/inputs/phone-number-field";

const meta = {
  title: "Components/PhoneNumberField",
  component: PhoneNumberField,
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
  },
} satisfies Meta<typeof PhoneNumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "555-1234",
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-96">
      <label htmlFor="phone" className="text-medium font-medium block mb-xs">
        Phone Number
      </label>
      <PhoneNumberField id="phone" placeholder="555-1234" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="w-96 space-y-large">
      <div>
        <label className="text-small text-font-secondary block mb-xs">
          Small
        </label>
        <PhoneNumberField size="small" placeholder="555-1234" />
      </div>
      <div>
        <label className="text-medium text-font-secondary block mb-xs">
          Default
        </label>
        <PhoneNumberField size="default" placeholder="555-1234" />
      </div>
      <div>
        <label className="text-large text-font-secondary block mb-xs">
          Large
        </label>
        <PhoneNumberField size="large" placeholder="555-1234" />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "555-1234",
  },
};

export const WithError: Story = {
  render: () => (
    <div className="w-96 space-y-xs">
      <label htmlFor="phone-error" className="text-medium font-medium block">
        Phone Number
      </label>
      <PhoneNumberField
        id="phone-error"
        hasError
        defaultValue="12345"
        placeholder="555-1234"
      />
      <p className="text-small text-font-error">
        Please enter a valid phone number
      </p>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [dialCode, setDialCode] = useState("+1");
    const [phoneNumber, setPhoneNumber] = useState("");

    return (
      <div className="w-96 space-y-medium">
        <div>
          <label htmlFor="phone-controlled" className="text-medium font-medium block mb-xs">
            Phone Number
          </label>
          <PhoneNumberField
            id="phone-controlled"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            defaultDialCode={dialCode}
            onDialCodeChange={setDialCode}
            placeholder="555-1234"
          />
        </div>

        <div className="pt-medium border-t border-border-secondary space-y-xs">
          <p className="text-small text-font-secondary">
            <strong>Dial Code:</strong> {dialCode}
          </p>
          <p className="text-small text-font-secondary">
            <strong>Phone Number:</strong> {phoneNumber || "(empty)"}
          </p>
          <p className="text-small text-font-secondary">
            <strong>Full Number:</strong> {dialCode} {phoneNumber || "(empty)"}
          </p>
        </div>
      </div>
    );
  },
};

export const CustomDialCodes: Story = {
  render: () => {
    const latinAmericaCodes = [
      { code: "MX", country: "Mexico", dialCode: "+52" },
      { code: "AR", country: "Argentina", dialCode: "+54" },
      { code: "BR", country: "Brazil", dialCode: "+55" },
      { code: "CL", country: "Chile", dialCode: "+56" },
      { code: "CO", country: "Colombia", dialCode: "+57" },
      { code: "PE", country: "Peru", dialCode: "+51" },
    ];

    return (
      <div className="w-96">
        <label htmlFor="phone-latam" className="text-medium font-medium block mb-xs">
          Phone Number (Latin America)
        </label>
        <PhoneNumberField
          id="phone-latam"
          dialCodeList={latinAmericaCodes}
          defaultDialCode="+52"
          placeholder="555-1234"
        />
      </div>
    );
  },
};

export const ContactForm: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      dialCode: "+1",
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(JSON.stringify(formData, null, 2));
    };

    return (
      <form onSubmit={handleSubmit} className="w-96 space-y-large">
        <h3 className="text-xl font-semibold">Contact Information</h3>

        <div className="space-y-xs">
          <label htmlFor="contact-name" className="text-medium font-medium block">
            Full Name
          </label>
          <input
            id="contact-name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            placeholder="John Doe"
            className="flex w-full rounded-medium border-medium border-border-primary bg-bg-primary px-medium py-small text-medium"
          />
        </div>

        <div className="space-y-xs">
          <label htmlFor="contact-email" className="text-medium font-medium block">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="john@example.com"
            className="flex w-full rounded-medium border-medium border-border-primary bg-bg-primary px-medium py-small text-medium"
          />
        </div>

        <div className="space-y-xs">
          <label htmlFor="contact-phone" className="text-medium font-medium block">
            Phone Number
          </label>
          <PhoneNumberField
            id="contact-phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            defaultDialCode={formData.dialCode}
            onDialCodeChange={(dialCode) =>
              setFormData({ ...formData, dialCode })
            }
            placeholder="555-1234"
          />
          <p className="text-small text-font-secondary">
            We&apos;ll never share your phone number
          </p>
        </div>

        <button
          type="submit"
          className="w-full py-small bg-primary-80 text-white rounded-medium font-medium hover:bg-primary-90 transition-colors"
        >
          Submit
        </button>
      </form>
    );
  },
};
