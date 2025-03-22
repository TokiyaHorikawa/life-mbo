import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession, signOut } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "ダッシュボード",
  description: "アカウントダッシュボード",
};

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const user = session.user;

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">ダッシュボード</h1>

      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">プロフィール情報</h2>
        <div className="space-y-2">
          <p>
            <span className="font-medium">メールアドレス:</span> {user.email}
          </p>
          <p>
            <span className="font-medium">ユーザーID:</span> {user.id}
          </p>
        </div>
      </div>

      <form action={signOut}>
        <Button type="submit" variant="destructive">
          ログアウト
        </Button>
      </form>
    </div>
  );
}
