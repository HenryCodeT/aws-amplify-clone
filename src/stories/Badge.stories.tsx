import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Badge } from "@/components/ui/atoms/badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "info", "success", "warning", "error"],
      description: "Color variant",
    },
    style: {
      control: "select",
      options: ["solid", "outlined", "subtle"],
      description: "Visual style",
    },
    size: {
      control: "select",
      options: ["small", "default", "large"],
      description: "Size variant",
    },
    dot: {
      control: "boolean",
      description: "Show indicator dot",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Badge",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-medium">
      <Badge variant="default">Default</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
    </div>
  ),
};

export const Styles: Story = {
  render: () => (
    <div className="space-y-medium">
      <div className="flex flex-wrap gap-medium">
        <Badge variant="info" style="solid">
          Solid
        </Badge>
        <Badge variant="success" style="solid">
          Solid
        </Badge>
        <Badge variant="warning" style="solid">
          Solid
        </Badge>
        <Badge variant="error" style="solid">
          Solid
        </Badge>
      </div>
      <div className="flex flex-wrap gap-medium">
        <Badge variant="info" style="outlined">
          Outlined
        </Badge>
        <Badge variant="success" style="outlined">
          Outlined
        </Badge>
        <Badge variant="warning" style="outlined">
          Outlined
        </Badge>
        <Badge variant="error" style="outlined">
          Outlined
        </Badge>
      </div>
      <div className="flex flex-wrap gap-medium">
        <Badge variant="info" style="subtle">
          Subtle
        </Badge>
        <Badge variant="success" style="subtle">
          Subtle
        </Badge>
        <Badge variant="warning" style="subtle">
          Subtle
        </Badge>
        <Badge variant="error" style="subtle">
          Subtle
        </Badge>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-medium">
      <Badge size="small">Small</Badge>
      <Badge size="default">Default</Badge>
      <Badge size="large">Large</Badge>
    </div>
  ),
};

export const WithDot: Story = {
  render: () => (
    <div className="flex flex-wrap gap-medium">
      <Badge variant="default" dot>
        Default
      </Badge>
      <Badge variant="info" dot>
        Info
      </Badge>
      <Badge variant="success" dot>
        Active
      </Badge>
      <Badge variant="warning" dot>
        Warning
      </Badge>
      <Badge variant="error" dot>
        Error
      </Badge>
    </div>
  ),
};

export const Removable: Story = {
  render: () => {
    const [badges, setBadges] = useState([
      { id: 1, label: "React", variant: "info" as const },
      { id: 2, label: "TypeScript", variant: "success" as const },
      { id: 3, label: "Tailwind", variant: "default" as const },
    ]);

    const removeBadge = (id: number) => {
      setBadges((prev) => prev.filter((badge) => badge.id !== id));
    };

    return (
      <div className="space-y-medium w-96">
        <p className="text-small text-font-secondary">
          Click the X to remove badges
        </p>
        <div className="flex flex-wrap gap-xs">
          {badges.map((badge) => (
            <Badge
              key={badge.id}
              variant={badge.variant}
              onRemove={() => removeBadge(badge.id)}
            >
              {badge.label}
            </Badge>
          ))}
        </div>
        {badges.length === 0 && (
          <p className="text-small text-font-secondary italic">
            All badges removed
          </p>
        )}
      </div>
    );
  },
};

export const StatusBadges: Story = {
  render: () => (
    <div className="space-y-medium">
      <div className="flex items-center gap-medium">
        <span className="text-small w-20">Active:</span>
        <Badge variant="success" dot size="small">
          Online
        </Badge>
      </div>
      <div className="flex items-center gap-medium">
        <span className="text-small w-20">Away:</span>
        <Badge variant="warning" dot size="small">
          Away
        </Badge>
      </div>
      <div className="flex items-center gap-medium">
        <span className="text-small w-20">Offline:</span>
        <Badge variant="default" dot size="small">
          Offline
        </Badge>
      </div>
      <div className="flex items-center gap-medium">
        <span className="text-small w-20">Error:</span>
        <Badge variant="error" dot size="small">
          Disconnected
        </Badge>
      </div>
    </div>
  ),
};

export const NotificationBadge: Story = {
  render: () => (
    <div className="flex gap-large">
      <div className="relative">
        <button className="p-medium bg-neutral-20 rounded-medium hover:bg-neutral-30">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
        </button>
        <Badge
          variant="error"
          size="small"
          className="absolute -top-1 -right-1"
        >
          5
        </Badge>
      </div>

      <div className="relative">
        <button className="p-medium bg-neutral-20 rounded-medium hover:bg-neutral-30">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
        <Badge
          variant="info"
          size="small"
          className="absolute -top-1 -right-1"
        >
          12
        </Badge>
      </div>
    </div>
  ),
};

export const TagList: Story = {
  render: () => {
    const [tags, setTags] = useState([
      "JavaScript",
      "React",
      "TypeScript",
      "Node.js",
      "Next.js",
      "Tailwind CSS",
    ]);

    const removeTag = (tag: string) => {
      setTags((prev) => prev.filter((t) => t !== tag));
    };

    return (
      <div className="w-96 space-y-medium">
        <p className="text-medium font-medium">Skills</p>
        <div className="flex flex-wrap gap-xs">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="default"
              style="subtle"
              size="small"
              onRemove={() => removeTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    );
  },
};

export const ProductLabels: Story = {
  render: () => (
    <div className="w-80 space-y-large">
      <div className="border-medium border-border-primary rounded-medium p-medium">
        <div className="flex items-start justify-between mb-medium">
          <h4 className="font-semibold">MacBook Pro 14&quot;</h4>
          <Badge variant="success" style="subtle" size="small">
            In Stock
          </Badge>
        </div>
        <p className="text-small text-font-secondary mb-medium">
          Apple M3 Pro chip, 18GB RAM
        </p>
        <div className="flex gap-xs">
          <Badge variant="info" style="outlined" size="small">
            New
          </Badge>
          <Badge variant="warning" style="outlined" size="small">
            Sale -15%
          </Badge>
        </div>
      </div>

      <div className="border-medium border-border-primary rounded-medium p-medium">
        <div className="flex items-start justify-between mb-medium">
          <h4 className="font-semibold">iPad Air</h4>
          <Badge variant="error" style="subtle" size="small">
            Out of Stock
          </Badge>
        </div>
        <p className="text-small text-font-secondary mb-medium">
          M2 chip, 128GB storage
        </p>
        <div className="flex gap-xs">
          <Badge variant="default" style="outlined" size="small">
            Refurbished
          </Badge>
        </div>
      </div>
    </div>
  ),
};

export const UserRoles: Story = {
  render: () => (
    <div className="space-y-medium">
      <div className="flex items-center gap-medium">
        <div className="w-32">
          <p className="font-medium">John Doe</p>
          <p className="text-small text-font-secondary">john@example.com</p>
        </div>
        <Badge variant="info" style="subtle" size="small">
          Admin
        </Badge>
      </div>

      <div className="flex items-center gap-medium">
        <div className="w-32">
          <p className="font-medium">Jane Smith</p>
          <p className="text-small text-font-secondary">jane@example.com</p>
        </div>
        <Badge variant="success" style="subtle" size="small">
          Editor
        </Badge>
      </div>

      <div className="flex items-center gap-medium">
        <div className="w-32">
          <p className="font-medium">Bob Johnson</p>
          <p className="text-small text-font-secondary">bob@example.com</p>
        </div>
        <Badge variant="default" style="subtle" size="small">
          Viewer
        </Badge>
      </div>
    </div>
  ),
};

export const PriorityLevels: Story = {
  render: () => (
    <div className="space-y-small">
      <div className="flex items-center gap-medium">
        <Badge variant="error" size="small">
          Critical
        </Badge>
        <span className="text-small">Database server down</span>
      </div>
      <div className="flex items-center gap-medium">
        <Badge variant="warning" size="small">
          High
        </Badge>
        <span className="text-small">API response time increased</span>
      </div>
      <div className="flex items-center gap-medium">
        <Badge variant="info" size="small">
          Medium
        </Badge>
        <span className="text-small">Update documentation</span>
      </div>
      <div className="flex items-center gap-medium">
        <Badge variant="default" size="small">
          Low
        </Badge>
        <span className="text-small">Code cleanup</span>
      </div>
    </div>
  ),
};

export const AllCombinations: Story = {
  render: () => (
    <div className="space-y-large">
      <div>
        <p className="text-small font-medium mb-small">Solid</p>
        <div className="flex flex-wrap gap-xs">
          <Badge variant="default" style="solid" size="small">
            Default
          </Badge>
          <Badge variant="info" style="solid" size="small">
            Info
          </Badge>
          <Badge variant="success" style="solid" size="small">
            Success
          </Badge>
          <Badge variant="warning" style="solid" size="small">
            Warning
          </Badge>
          <Badge variant="error" style="solid" size="small">
            Error
          </Badge>
        </div>
      </div>

      <div>
        <p className="text-small font-medium mb-small">Outlined</p>
        <div className="flex flex-wrap gap-xs">
          <Badge variant="default" style="outlined" size="small">
            Default
          </Badge>
          <Badge variant="info" style="outlined" size="small">
            Info
          </Badge>
          <Badge variant="success" style="outlined" size="small">
            Success
          </Badge>
          <Badge variant="warning" style="outlined" size="small">
            Warning
          </Badge>
          <Badge variant="error" style="outlined" size="small">
            Error
          </Badge>
        </div>
      </div>

      <div>
        <p className="text-small font-medium mb-small">Subtle</p>
        <div className="flex flex-wrap gap-xs">
          <Badge variant="default" style="subtle" size="small">
            Default
          </Badge>
          <Badge variant="info" style="subtle" size="small">
            Info
          </Badge>
          <Badge variant="success" style="subtle" size="small">
            Success
          </Badge>
          <Badge variant="warning" style="subtle" size="small">
            Warning
          </Badge>
          <Badge variant="error" style="subtle" size="small">
            Error
          </Badge>
        </div>
      </div>
    </div>
  ),
};
