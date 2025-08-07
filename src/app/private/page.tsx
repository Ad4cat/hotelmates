// pages/admin/create.tsx
"use client";
import { useState } from "react";

export default function CreateAdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const createAdmin = async () => {
    setLoading(true);
    setMessage(null);
    const res = await fetch("/api/create-admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const body = await res.json();
    if (!res.ok) {
      setMessage(`作成失敗: ${body.error}`);
    } else {
      setMessage(`管理者作成成功: ${body.user.id}`);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4 max-w-md mx-auto p-4">
      <h2 className="text-xl font-semibold">管理者アカウント作成</h2>
      <input
        className="border px-2 py-1 w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="メールアドレス"
      />
      <input
        className="border px-2 py-1 w-full"
        value={password}
        onChange={(e) => setPass(e.target.value)}
        placeholder="パスワード"
        type="password"
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={createAdmin}
        disabled={loading}
      >
        {loading ? "作成中…" : "管理者作成"}
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}
