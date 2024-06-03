import {InputField} from "@/components/molecules/InputField";
import {useAuth} from "@/state-management/zustand/features/auth/hooks/useAuth";
import {CheckboxField} from "@/components/molecules/CheckboxField";
import {useInput} from "@/hooks/useInput";
import {config} from "@/config";

export const LoginForm = () => {
  const {
    login,
  } = useAuth();

  const [usernameProps] = useInput(config.TEST_USER)
  const [passwordProps] = useInput(config.TEST_USER_PASSWORD)
  const [rememberMeProps] = useInput(false)

  return (
    <>
      <form action="#">
        <div className="grid gap-4 mb-4">
          <InputField id="username" label="Username" placeholder="username" required {...usernameProps} />
          <InputField id="password" label="Password" placeholder="password" required type="password" {... passwordProps}/>
          <CheckboxField id={'remember_me'} label='Remember me'  {...rememberMeProps}/>
        </div>
        <div className={`flex justify-end`}>
          <button type="button"
                  onClick={() => login(usernameProps.state, passwordProps.state, rememberMeProps.state)}
                  className="text-white inline-flex items-center bg-gray-900 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-gray-900">
            Login
          </button>
        </div>
      </form>
    </>
  )
}
