import {InputField} from "@/components/molecules/InputField";
import {useAuth} from "@/hooks/useAuth";

export const LoginForm = () => {
  const {
    login,
    username,
    password,
    setUsername,
    setPassword
  } = useAuth();

  return (
    <>
      <form action="#">
        <div className="grid gap-4 mb-4">
          <InputField id="username" label="Username" placeholder="username" required state={username}
                      setState={setUsername}/>
          <InputField id="password" label="Password" placeholder="password" required type="password"
                      state={password} setState={setPassword}/>
        </div>
        <div className={`flex justify-end`}>
          <button type="button"
                  onClick={() => login()}
                  className="text-white inline-flex items-center bg-gray-900 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-gray-900">
            Login
          </button>
        </div>
      </form>
    </>
  )
}
