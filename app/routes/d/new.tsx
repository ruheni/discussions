export default function NewDiscussion() {
  return (
    <main className="m-2">
      <div className="page-container">
        <form>
          <div className="mb-4 w-full bg-gray-50 rounded-lg border border-gray-200">
            <div className="py-2 px-4 bg-white rounded-t-lg ">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                id="comment"
                rows="4"
                className="px-0 w-full text-sm text-gray-900 bg-white border-0 "
                placeholder="Write a comment..."
                required=""
              ></textarea>
            </div>
            <div className="flex justify-between items-center py-2 px-3 border-t">
              <button
                type="submit"
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
              >
                Post comment
              </button>
              <div className="flex pl-0 space-x-1 sm:pl-2"></div>
            </div>
          </div>
        </form>
        <p className="ml-auto text-xs text-gray-500">
          Remember, contributions to this topic should follow our{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Community Guidelines
          </a>
          .
        </p>
      </div>
    </main>
  );
}
