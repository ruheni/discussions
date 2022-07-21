import type { User } from "@prisma/client";
import { Form, Link } from "@remix-run/react";
import { Menu } from "@headlessui/react";

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
            {!props.user && (
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
            )}
            <Menu as="button" className="relative inline-block">
              <Menu.Button className="p-2.5 text-gray-600 transition bg-gray-100 rounded">
                <span className="sr-only">Toggle menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/d/new"
                        className={`${active ? "bg-pink-500 text-white" : "text-gray-900 cursor-not-allowed"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        New Discussion
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item
                    disabled={true}
                  >
                    {() => (
                      <Link
                        to="/d/new"
                        className="text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm cursor-not-allowed"
                      >
                        New Community
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item
                    disabled={true}
                  >
                    {() => (
                      <Link
                        to={`${props.user?.username}`}
                        className="text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm cursor-not-allowed"
                      >
                        Profile
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Form
                        action="/logout"
                        method="post"
                        className={`${active ? "bg-pink-500 text-white" : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <button type="submit">Logout</button>
                      </Form>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
}
