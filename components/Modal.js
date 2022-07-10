export default function Modal({ toggle, offToggle, rank, message, btnText }) {
  console.log(toggle, rank, message, btnText);
  return (
    <div
      className={
        toggle
          ? 'block'
          : 'hidden' +
            ' fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'
      }
      id="my-modal"
    >
      <div className="absolute z-10 left-1/4 top-1/4 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          {rank == 0 ? (
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
          ) : (
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          )}
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {rank != 0 ? 'Notice!' : 'Successful!'}
          </h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500">{message}</p>
          </div>
          <div className="items-center px-4 py-3">
            <button
              onClick={offToggle}
              className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              {btnText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
