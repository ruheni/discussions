import type { User } from "@prisma/client";
import { Form, Link } from "@remix-run/react";

type Props = {
  user: User | null;
};

export default function NavBar(props: Props) {
  return (
    <header className="shadow-sm px-6 bg-white">
      <div className="max-w-screen-xl p-4 mx-auto">
        <div className="flex items-center justify-between space-x-4 lg:space-x-10">
          <Link to="/" className="flex lg:w-0 lg:flex-1">
            <span className="w-20 h-10 font-semibold">DisQuss</span>
          </Link>

          <nav className="hidden space-x-8 text-sm font-medium md:flex"></nav>

          {!props.user ? (
            <div className="items-center justify-end flex-1 hidden space-x-4 sm:flex">
              <Link
                className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md"
                to="/login"
              >
                Log in
              </Link>

              <Link
                className="px-5 py-2 text-sm font-medium text-white bg-pink-500 rounded-md"
                to="/join"
              >
                Join
              </Link>
            </div>
          ) : (
            <Form
              action="/logout"
              method="post"
              className="items-center justify-end flex-1 hidden space-x-4 sm:flex"
            >
              <button
                className="px-5 py-2 text-sm font-medium text-gray-500 bg-gray-100 rounded-lg"
                type="submit"
              >
                Logout
              </button>
            </Form>
          )}
        </div>
      </div>
    </header>
  );
}
