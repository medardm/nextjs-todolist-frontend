import {useReducer, useState} from "react";
import {InputField} from "@/components/form/InputField";

export const LoginModal = () => {
  const [modalOpen, setModalOpen] = useReducer(modalOpen => ! modalOpen,false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      {/*// Modal toggle*/}
      <div className="flex justify-center mx-1">
        <button data-modal-target="loginModal" data-modal-toggle="loginModal"
                className="relative flex rounded-2xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 py-2 px-4 text-gray-800"
                onClick={setModalOpen}
                type="button">
          Login
        </button>
      </div>

      {/*// Main modal*/}
      <div id="loginModal"
           tabIndex={-1}
           aria-hidden="true"
           className={`${modalOpen ? '' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full pt-5 md:pt-10`}>
        <div className="relative p-4 w-full max-w-2xl h-full mx-auto md:h-auto">
          {/*// Modal content*/}
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            {/*// Modal header*/}
            <div
              className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add Product
              </h3>
              <button type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={setModalOpen}
                      data-modal-toggle="loginModal">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd">
                  </path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/*// Modal body*/}
            <form action="#">
              <div className="grid gap-4 mb-4">
                <InputField id="username" label="Username" placeholder="username" required state={username}
                            setState={setUsername}/>
                <InputField id="password" label="Password" placeholder="password" required type="password"
                            state={password} setState={setPassword}/>
              </div>
              <div className={`flex justify-end`}>
                <button type="submit"
                        className="text-white inline-flex items-center bg-gray-900 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-gray-900">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </>
  )
}
