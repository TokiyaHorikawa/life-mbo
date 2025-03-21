import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Hello World!</CardTitle>
          <CardDescription>Next.js + Supabase + shadcn/ui</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full">Click me!</Button>
        </CardContent>
      </Card>
    </div>
  );
}
