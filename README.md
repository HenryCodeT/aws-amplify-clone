# ⚡ AWS Amplify Clone

A modern web application inspired by AWS Amplify, built with Next.js 14, React, and Tailwind CSS. Features a complete design system with form controls, tested components, and streamlined development workflow.

## 🎯 Project Goals

- Build a production-ready form system with validation
- Create reusable, accessible UI components
- Implement comprehensive testing coverage
- Maintain clean, documented code

## ✨ Key Features

- ✅ **Form Controls**: Complete set of accessible form components (Input, Checkbox, Radio, Switch, Slider)
- ✅ **React Hook Form Integration**: Seamless form validation with Zod schemas
- ✅ **Testing**: 45+ tests with Vitest & React Testing Library
- ✅ **Storybook**: Interactive component documentation
- ✅ **Git Workflow**: Streamlined commits with conventional commits
- ✅ **Type Safety**: Full TypeScript support
- ✅ **Accessibility**: ARIA attributes, keyboard navigation

---

## 🚀 Technologies

### **Next.js**

Main framework used for routing, rendering, API routes, and project structure.

**Example:**

```tsx
export default function Page() {
  return <h1>Hello Next.js</h1>;
}
```

---

### **React**

UI library used to build components and manage state.

**Example:**

```tsx
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

---

### **Storybook**

Component development environment for previewing UI, documenting patterns, and testing components in isolation.

**Example story:**

```tsx
export default { title: "UI/Button" };

export const Primary = () => <Button variant="primary">Primary</Button>;
```

---

### **Tailwind CSS**

Utility-first CSS framework used for styling and design tokens.

**Example:**

```tsx
<div className="p-4 bg-gray-100 rounded-md">Hello</div>
```

---

### **CVA (class-variance-authority)**

Manages component variants (size, color, state) using a clean and type-safe API.

**Example:**

```tsx
const buttonStyles = cva("font-medium px-4 py-2", {
  variants: {
    variant: {
      primary: "bg-blue-600 text-white",
      outline: "border border-gray-400",
    },
  },
});
```

---

### **clsx**

Utility for conditionally joining class names.

**Example:**

```tsx
clsx("btn", isActive && "btn-active");
```

---

### **tailwind-merge**

Prevents conflicting Tailwind classes (e.g. `px-4` + `px-2`).

**Example:**

```tsx
twMerge("px-4 px-2");
// → "px-2"
```

---

# 📁 Project Structure

```
aws-amplify/
├─ .storybook/              # Storybook configuration
├─ src/
│  ├─ app/                  # Next.js app directory
│  ├─ components/
│  │   └─ ui/
│  │       └─ form-controls/
│  │           ├─ field-components/    # FormField wrapper
│  │           └─ primitive-inputs/    # Input, Checkbox, etc.
│  ├─ lib/                  # Utilities (cn, validators)
│  └─ styles/               # Global styles
├─ .bashrc                  # Git workflow configuration
├─ vitest.config.ts         # Test configuration
├─ TESTING.md               # Testing guide
├─ GIT-WORKFLOW.md          # Git workflow guide
└─ package.json
```

---

# 📦 Quick Start

```bash
# Install dependencies
pnpm install

# Activate Git workflow (optional but recommended)
source .bashrc

# Start development
pnpm dev              # Next.js → http://localhost:3000
pnpm storybook        # Storybook → http://localhost:6006
pnpm test             # Run tests in watch mode
```

---

# 🧩 Button Example

```tsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>

<Button size="small">Small</Button>
<Button size="large">Large</Button>

<Button disabled>Disabled</Button>
```

---

# 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Next.js dev server (port 3000) |
| `pnpm build` | Build production app |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm storybook` | Start Storybook (port 6006) |
| `pnpm test` | Run tests in watch mode |
| `pnpm test:ui` | Run tests with UI interface |
| `pnpm test:coverage` | Generate coverage report |

---

# 🔧 Git Workflow

## Setup (One-Time)

Activate the streamlined Git workflow in your terminal:

```bash
source .bashrc
```

**For permanent activation**, add to your `~/.bashrc`:
```bash
cat .bashrc >> ~/.bashrc
source ~/.bashrc
```

## Quick Commands

| Command | What it does | Example |
|---------|--------------|---------|
| `gst` | Quick status with branch info | `gst` |
| `gl` | Pretty commit history | `gl` or `gl -5` |
| `gad` | Stage all changes | `gad` |
| `gp` | Push to remote | `gp` |
| `gpl` | Pull from remote | `gpl` |

## Conventional Commits (Recommended)

Use semantic commit messages for clarity:

```bash
feat "scope" "description"       # New feature
fix "scope" "description"        # Bug fix
refactor "scope" "description"   # Code improvement
docs "scope" "description"       # Documentation
```

**Examples:**
```bash
feat "forms" "add email validation"
fix "ui" "correct button spacing"
refactor "api" "simplify error handling"
docs "readme" "add testing guide"
```

**What NOT to do:**
```bash
feat                  # ❌ Missing arguments
feat "test"           # ❌ Missing description
```

**💡 Tip:** If you run a command without arguments by mistake, fix it with:
```bash
git commit --amend -m "feat(scope): proper message here"
```

**Full workflow guide:** [GIT-WORKFLOW.md](GIT-WORKFLOW.md)

---

# ✅ Testing

Tests are written with **Vitest** and **React Testing Library**.

```bash
pnpm test              # Run tests in watch mode
pnpm test:ui           # Visual test interface
pnpm test:coverage     # Coverage report
```

**Current status:** 45 tests passing across 2 test suites

**Testing guide:** [TESTING.md](TESTING.md)

Example test files:
- [form-field.test.tsx](src/components/ui/form-controls/field-components/form-field/form-field.test.tsx) - 20 tests
- [input.test.tsx](src/components/ui/form-controls/primitive-inputs/input/input.test.tsx) - 25 tests

---

# 📚 Documentation

- **[TESTING.md](TESTING.md)** - Complete testing guide with examples
- **[GIT-WORKFLOW.md](GIT-WORKFLOW.md)** - Git workflow and conventional commits
- **[TEST-SETUP-SUMMARY.md](TEST-SETUP-SUMMARY.md)** - Testing setup details

---

# 🚧 Roadmap

- [ ] Add more form components (Textarea, Select, DatePicker)
- [ ] Implement form validation examples
- [ ] Create demo pages with real forms
- [ ] Add integration tests
- [ ] Set up CI/CD pipeline
- [ ] Add E2E tests with Playwright

---

**Built with ❤️ using Next.js, React, and Tailwind CSS**
