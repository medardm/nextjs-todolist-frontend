import {useState} from "react";
import {InputField} from "@/components/molecules/InputField";

export const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  return (
    <>
      <form action="#">
        <div className="grid gap-4 mb-4">
          <InputField id="reg-username" label="Username" placeholder="username" required state={username}
                      setState={setUsername}/>
          <InputField id="email" label="Email" placeholder="test@gmail.com" required state={email}
                      setState={setEmail}/>
          <InputField id="password1" label="Password" placeholder="@asd-xts-gsd@" required type="password"
                      state={password1} setState={setPassword1}/>
          <p className="text-xs text-gray-500">
            Password should be unique, contain at least 8 characters, not entirely numeric and not be too common
            or similar to other personal information.
          </p>
          <InputField id="password2" label="Confirm Password" placeholder="@asd-xts-gsd@" required
                      type="password" state={password2} setState={setPassword2}/>
        </div>

        <div className={`flex justify-end`}>
          <button type="submit"
                  className="text-white inline-flex items-center bg-gray-900 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-gray-900">
            Register
          </button>
        </div>
      </form>
    </>
  )
}
