import { redirect } from "next/navigation";
import { getSession } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Home() {
  const session = await getSession();

  // ログイン済みの場合はダッシュボードへ、未ログインの場合はログインページへ
  if (session) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}
