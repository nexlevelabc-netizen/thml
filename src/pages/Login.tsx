import { useState } from "react";
import { useNavigate } from "react-router";
import { trpc } from "@/providers/trpc";

export default function Login() {
  const navigate = useNavigate();
  const utils = trpc.useUtils();
  const login = trpc.auth.login.useMutation({
    onSuccess: async (r) => {
      if (r.success) {
        await utils.invalidate();
        navigate("/admin");
      }
    },
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [failed, setFailed] = useState(false);

  const busy = login.isPending;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setFailed(false);
    login.mutate(
      { username, password },
      {
        onSuccess: (r) => {
          if (!r.success) setFailed(true);
        },
        onError: () => setFailed(true),
      },
    );
  }

  return (
    <main className="sheen min-h-screen bg-black text-[#f7f5f0] flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-[420px]">
          <div className="flex flex-col items-center text-center">
            <img src="/images/logo-horizontal.png" alt="Thames Housing Management Ltd" className="h-16 w-auto" />
            <p className="label text-[#a3a099] mt-10">Admin panel</p>
          </div>

          <form onSubmit={submit} className="mt-10">
            <label className="block">
              <span className="label text-[#a3a099] block mb-2">Username</span>
              <input
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-transparent border-b border-[#3f3e3a] focus:border-[#f7f5f0] outline-none py-3 text-[16px] text-[#f7f5f0] transition-colors"
              />
            </label>
            <label className="block mt-8">
              <span className="label text-[#a3a099] block mb-2">Password</span>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-[#3f3e3a] focus:border-[#f7f5f0] outline-none py-3 text-[16px] text-[#f7f5f0] transition-colors"
              />
            </label>

            {failed && (
              <p className="mt-6 text-[13px] text-[#c96b5a]">
                Incorrect username or password.
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="label !text-[11px] mt-10 w-full py-[15px] bg-[#f7f5f0] text-black hover:bg-[#2b7a66] hover:text-[#f7f5f0] transition-colors duration-300 disabled:opacity-40"
            >
              {busy ? "Signing in" : "Sign in"}
            </button>
          </form>

          <div className="mt-14 pt-6 border-t border-[#33322e] text-center">
            <a href="/" className="label text-[11px] text-[#6e746f] hover:text-[#f7f5f0] transition-colors">
              Back to website
            </a>
          </div>
        </div>
      </div>
      <p className="pb-8 text-center label text-[10px] text-[#6e746f]">
        Thames Housing Management Ltd — a wholly owned trading subsidiary of 25th Avenue Housing Ltd
      </p>
    </main>
  );
}
