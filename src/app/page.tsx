import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 gap-8">
      <h1 className="text-xxxxl font-bold text-font-primary">
        Next.js + Storybook + Tailwind
      </h1>
      
      <div className="flex gap-4 flex-wrap justify-center">
        <Button variant="primary" size="medium">
          Primary Button
        </Button>
        <Button variant="secondary" size="medium">
          Secondary Button
        </Button>
        <Button variant="outline" size="medium">
          Outline Button
        </Button>
        <Button variant="ghost" size="medium">
          Ghost Button
        </Button>
      </div>

      <div className="flex gap-4 flex-wrap justify-center">
        <Button variant="primary" size="small">
          Small
        </Button>
        <Button variant="primary" size="medium">
          Medium
        </Button>
        <Button variant="primary" size="large">
          Large
        </Button>
      </div>

      <div className="flex gap-4 flex-wrap justify-center">
        <Button variant="primary" disabled>
          Disabled
        </Button>
        <Button variant="destructive">
          Destructive
        </Button>
        <Button variant="success">
          Success
        </Button>
      </div>
    </div>
  );
}
