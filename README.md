# 🎨 Next.js 14 + Storybook 8 + Tailwind CSS — Starter

A starter project using Next.js, React, Storybook, and Tailwind CSS, with a small utility layer built using CVA, clsx, and tailwind-merge.
Designed for building UI components and design systems.

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
/
├─ .storybook/
├─ src/
│  ├─ app/
│  ├─ components/
│  │   └─ ui/
│  ├─ lib/
│  └─ styles/
└─ package.json
```

---

# 📦 Installation

```bash
npm install
npm run dev         # Next.js → localhost:3000
npm run storybook   # Storybook → localhost:6006
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

# 🛠️ Scripts

```bash
npm run dev
npm run storybook
npm run build
```
