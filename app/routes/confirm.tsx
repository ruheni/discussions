import type { LoaderArgs } from "@remix-run/server-runtime";
import { redirect } from "@remix-run/server-runtime";
import { getUserId } from "~/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return null;
};

export default function Confirm() {
  return (
    <div className="mx-4">
      <main className="auth-container">
        <div className="relative my-8 py-4 text-center">
          <h2 className="text-2xl font-medium">📫 Check your inbox</h2>

          <p className="mt-4 text-md text-gray-500">
            If it doesn't appear in your inbox, please check your spam folder
          </p>
        </div>
      </main>
    </div>
  );
}
