import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import {
  SearchField,
  SearchInput,
} from "@/components/ui/inputs/search-field";
import { Label } from "@/components/ui/atoms/label";

const meta = {
  title: "Components/SearchField",
  component: SearchField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "default", "large"],
      description: "The size of the search field",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    hasError: {
      control: "boolean",
      description: "Error state",
    },
    hasSearchIcon: {
      control: "boolean",
      description: "Show search icon",
    },
    hasSearchButton: {
      control: "boolean",
      description: "Show search button",
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
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// SearchField Stories - Complete field composition
// ============================================================================

export const Default: Story = {
  args: {
    label: "Search",
    placeholder: "Search...",
  },
};

export const WithDescription: Story = {
  args: {
    label: "Search Products",
    description: "Search by name, category, or SKU",
    placeholder: "Search products...",
  },
};

export const WithError: Story = {
  args: {
    label: "Search",
    hasError: true,
    errorMessage: "Please enter at least 3 characters",
    defaultValue: "ab",
    placeholder: "Search...",
  },
};

export const WithSearchButton: Story = {
  args: {
    label: "Search",
    placeholder: "Search...",
    hasSearchButton: true,
  },
};

export const WithoutSearchIcon: Story = {
  args: {
    label: "Search",
    placeholder: "Search...",
    hasSearchIcon: false,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="w-96 space-y-large">
      <SearchField
        label="Small"
        size="small"
        placeholder="Search..."
      />
      <SearchField
        label="Default"
        size="default"
        placeholder="Search..."
      />
      <SearchField
        label="Large"
        size="large"
        placeholder="Search..."
      />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    label: "Search",
    disabled: true,
    defaultValue: "disabled search",
  },
};

export const HiddenLabel: Story = {
  args: {
    label: "Search",
    labelHidden: true,
    placeholder: "Search...",
  },
};

export const Controlled: Story = {
  render: () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<string[]>([]);

    const products = [
      "MacBook Pro",
      "MacBook Air",
      "iPhone 15 Pro",
      "iPhone 15",
      "iPad Pro",
      "iPad Air",
      "Apple Watch",
      "AirPods Pro",
      "AirPods Max",
    ];

    const handleSearch = (query: string) => {
      if (query.length === 0) {
        setSearchResults([]);
        return;
      }

      const results = products.filter((product) =>
        product.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    };

    return (
      <div className="w-96 space-y-medium">
        <SearchField
          label="Product Search"
          description="Search for Apple products"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            handleSearch(e.target.value);
          }}
          onSubmit={handleSearch}
          onClear={() => {
            setSearchQuery("");
            setSearchResults([]);
          }}
          placeholder="Search products..."
        />

        {searchQuery && (
          <div className="pt-medium border-t border-border-secondary">
            <p className="text-small text-font-secondary mb-xs">
              <strong>Search query:</strong> &quot;{searchQuery}&quot;
            </p>
            <p className="text-small text-font-secondary mb-medium">
              <strong>Results found:</strong> {searchResults.length}
            </p>

            {searchResults.length > 0 && (
              <ul className="space-y-xs">
                {searchResults.map((product, index) => (
                  <li
                    key={index}
                    className="text-small px-small py-xs rounded-sm hover:bg-bg-secondary cursor-pointer"
                  >
                    {product}
                  </li>
                ))}
              </ul>
            )}

            {searchResults.length === 0 && (
              <p className="text-small text-font-secondary italic">
                No products found
              </p>
            )}
          </div>
        )}
      </div>
    );
  },
};

export const WithValidation: Story = {
  render: () => {
    const [query, setQuery] = useState("");
    const minLength = 3;
    const hasError = query.length > 0 && query.length < minLength;

    return (
      <div className="w-96">
        <SearchField
          label="Search"
          description={`Minimum ${minLength} characters required`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          hasError={hasError}
          errorMessage={
            hasError
              ? `Please enter at least ${minLength} characters (${minLength - query.length} more)`
              : undefined
          }
          placeholder="Search..."
        />
      </div>
    );
  },
};

export const SearchWithButton: Story = {
  render: () => {
    const [query, setQuery] = useState("");
    const [lastSearch, setLastSearch] = useState("");

    const handleSubmit = (searchValue: string) => {
      setLastSearch(searchValue);
      alert(`Searching for: "${searchValue}"`);
    };

    return (
      <div className="w-96 space-y-medium">
        <SearchField
          label="Search"
          description="Click the search button or press Enter"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onSubmit={handleSubmit}
          hasSearchButton={true}
          placeholder="Enter search term..."
        />

        {lastSearch && (
          <div className="pt-medium border-t border-border-secondary">
            <p className="text-small text-font-secondary">
              <strong>Last search:</strong> &quot;{lastSearch}&quot;
            </p>
          </div>
        )}
      </div>
    );
  },
};

export const KeyboardShortcuts: Story = {
  render: () => {
    const [query, setQuery] = useState("");
    const [events, setEvents] = useState<string[]>([]);

    const addEvent = (event: string) => {
      setEvents((prev) => [event, ...prev].slice(0, 5));
    };

    return (
      <div className="w-96 space-y-medium">
        <SearchField
          label="Search with Keyboard Shortcuts"
          description="Press Enter to submit, Escape to clear"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            addEvent(`Changed: "${e.target.value}"`);
          }}
          onSubmit={(value) => addEvent(`Submitted: "${value}"`)}
          onClear={() => addEvent("Cleared")}
          placeholder="Try typing and pressing Enter or Escape..."
        />

        <div className="pt-medium border-t border-border-secondary">
          <p className="text-small font-medium mb-xs">Event Log:</p>
          <ul className="space-y-xs">
            {events.length === 0 && (
              <li className="text-small text-font-secondary italic">
                No events yet
              </li>
            )}
            {events.map((event, index) => (
              <li key={index} className="text-small text-font-secondary">
                {event}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  },
};

// ============================================================================
// SearchInput Stories - Base component without field wrapper
// ============================================================================

export const SearchInputBasic: Story = {
  render: () => (
    <div className="w-96">
      <p className="text-small text-font-secondary mb-medium">
        This is the <code>SearchInput</code> component - just the search input
        with icon and clear button, no label/error wrapper
      </p>
      <SearchInput placeholder="Search..." />
    </div>
  ),
};

export const SearchInputWithButton: Story = {
  render: () => (
    <div className="w-96">
      <p className="text-small text-font-secondary mb-medium">
        <code>SearchInput</code> with search button
      </p>
      <SearchInput
        placeholder="Search..."
        hasSearchButton={true}
        onSubmit={(value) => alert(`Searching: ${value}`)}
      />
    </div>
  ),
};

export const SearchInputCustomComposition: Story = {
  render: () => {
    const [query, setQuery] = useState("");

    return (
      <div className="w-96 space-y-xs">
        <p className="text-small text-font-secondary mb-medium">
          Custom composition using <code>SearchInput</code> with separate Label
        </p>

        <Label htmlFor="custom-search">Search Products</Label>

        <SearchInput
          id="custom-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onSubmit={(value) => console.log("Search:", value)}
          placeholder="Search..."
        />

        {query && (
          <p className="text-small text-font-secondary">
            Searching for: <strong>{query}</strong>
          </p>
        )}
      </div>
    );
  },
};

export const SearchInputVariations: Story = {
  render: () => (
    <div className="w-96 space-y-large">
      <div>
        <Label size="small" className="mb-xs block">
          With Icon (Default)
        </Label>
        <SearchInput size="small" placeholder="Search..." />
      </div>
      <div>
        <Label className="mb-xs block">Without Icon</Label>
        <SearchInput hasSearchIcon={false} placeholder="Search..." />
      </div>
      <div>
        <Label className="mb-xs block">With Search Button</Label>
        <SearchInput
          hasSearchButton={true}
          placeholder="Search..."
          onSubmit={(v) => console.log(v)}
        />
      </div>
      <div>
        <Label className="mb-xs block">Icon + Button</Label>
        <SearchInput
          hasSearchIcon={true}
          hasSearchButton={true}
          placeholder="Search..."
          onSubmit={(v) => console.log(v)}
        />
      </div>
    </div>
  ),
};
