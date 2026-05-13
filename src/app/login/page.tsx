import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const PASSWORD = process.env.SITE_PASSWORD ?? "Maverick";

async function authenticate(formData: FormData) {
  "use server";

  const submitted = formData.get("password");
  if (typeof submitted === "string" && submitted === PASSWORD) {
    const store = await cookies();
    store.set("site_auth", "ok", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    redirect("/");
  }

  redirect("/login?error=1");
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const hasError = params?.error === "1";

  return (
    <main className="flex min-h-screen items-center justify-center bg-black p-6 text-white">
      <form
        action={authenticate}
        className="flex w-full max-w-sm flex-col items-center gap-7 text-center"
      >
        <h1 className="font-[family-name:var(--font-instrument-serif)] text-[clamp(2rem,5vw,3rem)] leading-tight">
          Enter to continue.
        </h1>
        <div className="flex w-full flex-col gap-3">
          <input
            type="password"
            name="password"
            autoFocus
            required
            autoComplete="current-password"
            placeholder="Password"
            className="font-inter-display w-full rounded-full border border-white/15 bg-[#262626] px-5 py-2.5 text-base text-white outline-none placeholder:text-white/40 focus:border-white/35"
          />
          <button
            type="submit"
            className="font-inter-display inline-flex items-center justify-center rounded-full bg-[#f50] px-5 py-2.5 text-base font-medium text-black"
          >
            Enter
          </button>
        </div>
        {hasError && (
          <p className="font-inter-display text-sm text-white/65">
            Wrong password. Try again.
          </p>
        )}
      </form>
    </main>
  );
}
