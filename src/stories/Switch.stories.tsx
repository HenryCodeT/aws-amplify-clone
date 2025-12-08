import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Switch } from "@/components/ui/inputs/switch";

const meta = {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "default", "large"],
      description: "The size of the switch",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    hasError: {
      control: "boolean",
      description: "Error state (shows error background color)",
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultChecked: false,
  },
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultChecked: false,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
};

export const WithError: Story = {
  args: {
    hasError: true,
    defaultChecked: false,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-large">
      <div className="flex flex-col items-center gap-xs">
        <Switch size="small" defaultChecked />
        <span className="text-xs text-font-secondary">Small</span>
      </div>
      <div className="flex flex-col items-center gap-xs">
        <Switch size="default" defaultChecked />
        <span className="text-xs text-font-secondary">Default</span>
      </div>
      <div className="flex flex-col items-center gap-xs">
        <Switch size="large" defaultChecked />
        <span className="text-xs text-font-secondary">Large</span>
      </div>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="space-y-large">
      <div className="flex gap-large items-center">
        <div className="w-32 text-font-secondary">Unchecked</div>
        <Switch defaultChecked={false} />
      </div>
      <div className="flex gap-large items-center">
        <div className="w-32 text-font-secondary">Checked</div>
        <Switch defaultChecked={true} />
      </div>
      <div className="flex gap-large items-center">
        <div className="w-32 text-font-secondary">Disabled</div>
        <Switch disabled defaultChecked={false} />
      </div>
      <div className="flex gap-large items-center">
        <div className="w-32 text-font-secondary">Disabled Checked</div>
        <Switch disabled defaultChecked={true} />
      </div>
      <div className="flex gap-large items-center">
        <div className="w-32 text-font-secondary">Error</div>
        <Switch hasError defaultChecked={false} />
      </div>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div className="flex items-center gap-xs">
        <Switch
          id="airplane-mode"
          checked={checked}
          onCheckedChange={setChecked}
        />
        <label
          htmlFor="airplane-mode"
          className="text-medium font-medium cursor-pointer"
        >
          Airplane Mode
        </label>
      </div>
    );
  },
};

export const SettingsList: Story = {
  render: () => {
    const [notifications, setNotifications] = useState(true);
    const [marketing, setMarketing] = useState(false);
    const [analytics, setAnalytics] = useState(true);

    return (
      <div className="w-96 space-y-medium">
        <div className="flex items-center justify-between py-small">
          <div>
            <label
              htmlFor="notifications"
              className="text-medium font-medium cursor-pointer block"
            >
              Push Notifications
            </label>
            <p className="text-small text-font-secondary">
              Receive push notifications
            </p>
          </div>
          <Switch
            id="notifications"
            checked={notifications}
            onCheckedChange={setNotifications}
          />
        </div>

        <div className="flex items-center justify-between py-small">
          <div>
            <label
              htmlFor="marketing"
              className="text-medium font-medium cursor-pointer block"
            >
              Marketing Emails
            </label>
            <p className="text-small text-font-secondary">
              Receive emails about new products
            </p>
          </div>
          <Switch
            id="marketing"
            checked={marketing}
            onCheckedChange={setMarketing}
          />
        </div>

        <div className="flex items-center justify-between py-small">
          <div>
            <label
              htmlFor="analytics"
              className="text-medium font-medium cursor-pointer block"
            >
              Analytics
            </label>
            <p className="text-small text-font-secondary">
              Help us improve by sharing usage data
            </p>
          </div>
          <Switch
            id="analytics"
            checked={analytics}
            onCheckedChange={setAnalytics}
          />
        </div>
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <div className="space-y-medium">
        <div className="flex items-center gap-xs">
          <Switch
            id="controlled-switch"
            checked={checked}
            onCheckedChange={setChecked}
          />
          <label htmlFor="controlled-switch" className="text-medium">
            {checked ? "On" : "Off"}
          </label>
        </div>
        <div className="flex gap-xs">
          <button
            onClick={() => setChecked(true)}
            className="px-small py-xs bg-primary-80 text-white rounded-small text-small"
          >
            Turn On
          </button>
          <button
            onClick={() => setChecked(false)}
            className="px-small py-xs bg-neutral-60 text-white rounded-small text-small"
          >
            Turn Off
          </button>
        </div>
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      weeklyDigest: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(JSON.stringify(settings, null, 2));
    };

    return (
      <form onSubmit={handleSubmit} className="w-96 space-y-large">
        <div className="space-y-medium">
          <h3 className="text-large font-semibold">Notification Settings</h3>

          <div className="flex items-center justify-between">
            <label htmlFor="email" className="text-medium cursor-pointer">
              Email Notifications
            </label>
            <Switch
              id="email"
              checked={settings.emailNotifications}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, emailNotifications: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="sms" className="text-medium cursor-pointer">
              SMS Notifications
            </label>
            <Switch
              id="sms"
              checked={settings.smsNotifications}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, smsNotifications: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="push" className="text-medium cursor-pointer">
              Push Notifications
            </label>
            <Switch
              id="push"
              checked={settings.pushNotifications}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, pushNotifications: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="digest" className="text-medium cursor-pointer">
              Weekly Digest
            </label>
            <Switch
              id="digest"
              checked={settings.weeklyDigest}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, weeklyDigest: checked })
              }
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-small bg-primary-80 text-white rounded-medium font-medium"
        >
          Save Settings
        </button>
      </form>
    );
  },
};

export const DifferentSizesWithLabels: Story = {
  render: () => (
    <div className="space-y-large">
      <div className="flex items-center gap-xs">
        <Switch size="small" id="small-switch" defaultChecked />
        <label htmlFor="small-switch" className="text-small">
          Small Switch
        </label>
      </div>

      <div className="flex items-center gap-xs">
        <Switch size="default" id="default-switch" defaultChecked />
        <label htmlFor="default-switch" className="text-medium">
          Default Switch
        </label>
      </div>

      <div className="flex items-center gap-xs">
        <Switch size="large" id="large-switch" defaultChecked />
        <label htmlFor="large-switch" className="text-large">
          Large Switch
        </label>
      </div>
    </div>
  ),
};
