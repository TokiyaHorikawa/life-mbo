import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LoginForm } from "../login-form";
import { signIn } from "@/lib/actions/auth";
import { vi } from "vitest";

// モックの設定
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
  }),
}));

vi.mock("@/lib/actions/auth", () => ({
  signIn: vi.fn(),
}));

describe("LoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("フォームが正しくレンダリングされること", () => {
    render(<LoginForm />);

    expect(screen.getByText("アカウントへログイン")).toBeInTheDocument();
    expect(screen.getByLabelText("メールアドレス")).toBeInTheDocument();
    expect(screen.getByLabelText("パスワード")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "ログイン" })
    ).toBeInTheDocument();
  });

  it("バリデーションエラーが表示されること", async () => {
    render(<LoginForm />);

    // 空の値でフォームを送信
    fireEvent.click(screen.getByRole("button", { name: "ログイン" }));

    await waitFor(() => {
      expect(
        screen.getByText("有効なメールアドレスを入力してください")
      ).toBeInTheDocument();
      expect(
        screen.getByText("パスワードは6文字以上である必要があります")
      ).toBeInTheDocument();
    });
  });

  it("ログイン成功時にダッシュボードへリダイレクトすること", async () => {
    // モックの戻り値を設定
    (signIn as any).mockResolvedValue({ success: true });

    render(<LoginForm />);

    // フォームに値を入力して送信
    fireEvent.change(screen.getByLabelText("メールアドレス"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("パスワード"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "ログイン" }));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });
  });

  it("ログイン失敗時にエラーメッセージが表示されること", async () => {
    // モックの戻り値を設定
    (signIn as any).mockResolvedValue({
      success: false,
      error: "メールアドレスまたはパスワードが正しくありません",
    });

    render(<LoginForm />);

    // フォームに値を入力して送信
    fireEvent.change(screen.getByLabelText("メールアドレス"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("パスワード"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "ログイン" }));

    await waitFor(() => {
      expect(
        screen.getByText("メールアドレスまたはパスワードが正しくありません")
      ).toBeInTheDocument();
    });
  });
});
