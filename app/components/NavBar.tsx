import type { User } from "@prisma/client";
import { Form, Link } from "@remix-run/react";

type Props = {
  user: User | null;
};

export default function NavBar(props: Props) {
  return (
    <header className="bg-white">
      <div className="flex items-center h-16 max-w-screen-xl gap-8 px-4 mx-auto sm:px-6 lg:px-8">
        <Link to="/" className="block">
          <span className="w-20 h-10 font-semibold py-2">💬 DisQuss</span>
        </Link>

        <div className="flex items-center justify-end flex-1 md:justify-between">
          <nav className="hidden md:block" aria-labelledby="header-navigation">
            <h2 className="sr-only" id="header-navigation">
              Header navigation
            </h2>

            <ul className="flex items-center gap-6 text-sm"></ul>
          </nav>

          <div className="flex items-center gap-4">
            {!props.user ? (
              <div className="items-center justify-end flex-1 space-x-4 sm:flex">
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
      </div>
    </header>
  );
}
