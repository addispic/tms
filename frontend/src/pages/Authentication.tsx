import { Component, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { RootState } from "../store";

// icons
import { PiUser } from "react-icons/pi";
import { AiOutlineMail } from "react-icons/ai";
import { MdLockOutline } from "react-icons/md";

// utils
import { FormFieldSchema } from "../utils/schema";

// slices
// users
import {
  IUser,
  IError,
  formIdSelector,
  isFormSubmittingSelector,
  errorSelector,
  userSelector,
  formIdToggler,
  resetError,
  login,
  signup,
} from "../features/users/usersSlice";

// errors
export type Errors = {
  username?: string[];
  email?: string[];
  password?: string[];
};

interface State {
  username: string;
  email: string;
  password: string;
  focus: string;
  errors: Errors;
}

interface Props {
  formId: "login" | "signup";
  isFormSubmitting: boolean;
  user: IUser | null;
  error: IError | null;
  formIdToggler: (id: "login" | "signup") => void;
  resetError: () => void;
  login: (data: { username: string; password: string }) => any;
  signup: (data: { username: string; email: string; password: string }) => any;
  navigate: (path: string) => void;
}

class Authentication extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      // local states
      // focus
      focus: "",
      // username
      username: "",
      // email
      email: "",
      // password
      password: "",
      errors: {},
    };
  }

  // form submit handler
  formSubmitHandler = () => {
    const validatedFields = FormFieldSchema.safeParse({
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    });
    if (!validatedFields.success) {
      let fieldErrors = validatedFields.error.flatten().fieldErrors;
      this.setState((prev) => {
        return {
          ...prev,
          errors: fieldErrors,
        };
      });

      if (
        this.props.formId === "login" &&
        !fieldErrors.username &&
        !fieldErrors.password
      ) {
        this.props.login({
          username: this.state.username,
          password: this.state.password,
        });
      } else if (!true && !fieldErrors.email) {
        console.log("You can Rest Your password");
      }
    } else {
      if (true) {
        this.props.signup({
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
        });
      }
    }
  };
  // form id toggler
  toggleForm = (formId: "login" | "signup") => {
    this.props.formIdToggler(formId);
    this.setState((prev) => {
      return {
        ...prev,
        focus: "",
        username: "",
        email: "",
        password: "",
        errors: {},
      };
    });
  };

  componentDidUpdate(prevProps: Props) {
    if (!prevProps.user && this.props.user) {
      console.log("hello update");
      this.props.navigate("/");
    }
  }
  
  render(): ReactNode {
    return (
      <div className="w-screen h-screen overflow-hidden flex items-center justify-center">
        <div className="flex items-center overflow-hidden rounded-2xl border border-neutral-300">
          {/* image */}
          <div className="w-[400px] h-[400px] overflow-hidden bg-neutral-300">
            <img
              className="w-full h-full object-contain object-center"
              src="https://www.compufreak.co.za/wp-content/uploads/2016/10/Tickets_Management.png"
              alt=""
            />
          </div>
          {/* form */}
          <div className="p-5">
            {/* header */}
            <header>
              <h3 className="text-neutral-500 text-lg my-3">
                {this.props.formId === "login"
                  ? "Login"
                  : this.props.formId === "signup"
                  ? "Create an account"
                  : ""}
              </h3>
            </header>
            {/* inputs */}
            <div>
              {/* username */}
              <div className="mb-2.5">
                <div
                  className={`flex items-center gap-x-1.5 pb-1 relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-neutral-300 after:z-0 before:absolute before:left-0 before:bottom-0 before:h-[1px] before:z-10 before:transition-all before:ease-in-out duration-1000 ${
                    this.state.errors?.username?.length ||
                    this.props.error?.flag === "username"
                      ? "before:w-full before:bg-red-500"
                      : this.state.focus === "username" || this.state.username
                      ? "before:w-full before:bg-green-500"
                      : "before:w-0 before:bg-neutral-300"
                  }`}
                >
                  <PiUser
                    className={`transition-colors ease-in-out duration-300 ${
                      this.state.errors?.username?.length ||
                      this.props.error?.flag === "username"
                        ? "text-red-500"
                        : this.state.focus === "username" || this.state.username
                        ? "text-green-600"
                        : "text-neutral-500"
                    }`}
                  />
                  <input
                    className="focus:outline-none focus:ring-0 text-sm min-w-64"
                    type="text"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={(e) => {
                      this.props.resetError();
                      this.setState((prev) => {
                        return {
                          ...prev,
                          username: e.target.value,
                          errors: {
                            ...prev.errors,
                            username: undefined,
                          },
                        };
                      });
                    }}
                    onFocus={() => {
                      this.setState((prev) => {
                        return {
                          ...prev,
                          focus: "username",
                        };
                      });
                    }}
                    onBlur={() => {
                      this.setState((prev) => {
                        return {
                          ...prev,
                          focus: "",
                        };
                      });
                    }}
                  />
                </div>
                {/* errors */}
                {this.state.errors?.username?.length ||
                  (this.props.error?.flag === "username" && (
                    <div className="text-sm text-red-500">
                      <p>{this.props.error.message}</p>
                      {this.state.errors?.username?.map((err) => (
                        <p key={err}>{err}</p>
                      ))}
                    </div>
                  ))}
              </div>
              {/* email */}
              {this.props.formId === "signup" && (
                <div className="mb-2.5">
                  <div
                    className={`flex items-center gap-x-1.5 pb-1 relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-neutral-300 after:z-0 before:absolute before:left-0 before:bottom-0 before:h-[1px] before:z-10 before:transition-all before:ease-in-out duration-1000 ${
                      this.state.errors?.email?.length ||
                      this.props.error?.flag === "email"
                        ? "before:w-full before:bg-red-500"
                        : this.state.focus === "email" || this.state.email
                        ? "before:w-full before:bg-green-500"
                        : "before:w-0 before:bg-neutral-300"
                    }`}
                  >
                    <AiOutlineMail
                      className={`transition-colors ease-in-out duration-300 ${
                        this.state.errors?.email?.length ||
                        this.props.error?.flag === "email"
                          ? "text-red-500"
                          : this.state.focus === "email" || this.state.email
                          ? "text-green-600"
                          : "text-neutral-500"
                      }`}
                    />
                    <input
                      className="focus:outline-none focus:ring-0 text-sm min-w-64"
                      type="text"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={(e) => {
                        this.props.resetError();
                        this.setState((prev) => {
                          return {
                            ...prev,
                            email: e.target.value,
                            errors: {
                              ...prev.errors,
                              email: undefined,
                            },
                          };
                        });
                      }}
                      onFocus={() => {
                        this.setState((prev) => {
                          return {
                            ...prev,
                            focus: "email",
                          };
                        });
                      }}
                      onBlur={() => {
                        this.setState((prev) => {
                          return {
                            ...prev,
                            focus: "",
                          };
                        });
                      }}
                    />
                  </div>
                  {/* errors */}
                  {this.state.errors?.email?.length ||
                    (this.props.error?.flag === "email" && (
                      <div className="text-sm text-red-500">
                        <p>{this.props.error?.message}</p>
                        {this.state.errors?.email?.map((err) => (
                          <p key={err}>{err}</p>
                        ))}
                      </div>
                    ))}
                </div>
              )}
              {/* password */}
              <div className="mb-2.5">
                <div
                  className={`flex items-center gap-x-1.5 pb-1 relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-neutral-300 after:z-0 before:absolute before:left-0 before:bottom-0 before:h-[1px] before:z-10 before:transition-all before:ease-in-out duration-1000 ${
                    this.state.errors?.password?.length ||
                    this.props.error?.flag === "password"
                      ? "before:w-full before:bg-red-500"
                      : this.state.focus === "password" || this.state.password
                      ? "before:w-full before:bg-green-500"
                      : "before:w-0 before:bg-neutral-300"
                  }`}
                >
                  <MdLockOutline
                    className={`transition-colors ease-in-out duration-300 ${
                      this.state.errors?.password?.length ||
                      this.props.error?.flag === "password"
                        ? "text-red-500"
                        : this.state.focus === "password" || this.state.password
                        ? "text-green-600"
                        : "text-neutral-500"
                    }`}
                  />
                  <input
                    className="focus:outline-none focus:ring-0 text-sm min-w-64"
                    type="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={(e) => {
                      this.props.resetError();
                      this.setState((prev) => {
                        return {
                          ...prev,
                          password: e.target.value,
                          errors: {
                            ...prev.errors,
                            password: undefined,
                          },
                        };
                      });
                    }}
                    onFocus={() => {
                      this.setState((prev) => {
                        return {
                          ...prev,
                          focus: "password",
                        };
                      });
                    }}
                    onBlur={() => {
                      this.setState((prev) => {
                        return {
                          ...prev,
                          focus: "",
                        };
                      });
                    }}
                  />
                </div>
                {/* errors */}
                {this.state.errors?.password?.length ||
                  (this.props.error?.flag === "password" && (
                    <div className="text-sm text-red-500">
                      <p>{this.props.error?.message}</p>
                      {this.state.errors?.password?.map((err) => (
                        <p key={err}>{err}</p>
                      ))}
                    </div>
                  ))}
              </div>
              {/* button */}
              <div className="my-5">
                <button
                  onClick={this.formSubmitHandler}
                  className="px-3 py-1 rounded-sm bg-neutral-500 text-white text-sm transition-colors ease-in-out duration-300 hover:bg-neutral-700 hover:text-neutral-200 cursor-pointer"
                >
                  {this.props.isFormSubmitting ? (
                    <div className="mx-3 w-5 aspect-square rounded-full shrink-0 border-2 border-neutral-300 border-r-transparent animate-spin" />
                  ) : (
                    <>
                      {this.props.formId === "login"
                        ? "Login"
                        : this.props.formId === "signup"
                        ? "Sign in"
                        : ""}
                    </>
                  )}
                </button>
              </div>
              {/* link */}
              <div className="text-sm text-neutral-400">
                <p>
                  {this.props.formId === "login"
                    ? "Don't have an account? "
                    : this.props.formId === "signup"
                    ? "Already have an account? "
                    : ""}
                  <button
                    className="cursor-pointer transition-colors ease-in-out duration-300 hover:text-neutral-700"
                    onClick={() => {
                      this.toggleForm(
                        this.props.formId === "login"
                          ? "signup"
                          : this.props.formId === "signup"
                          ? "login"
                          : "login"
                      );
                    }}
                  >
                    {this.props.formId === "login"
                      ? "signup"
                      : this.props.formId === "signup"
                      ? "login"
                      : ""}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Map Redux state to component props
const mapStateToProps = (state: RootState) => ({
  formId: formIdSelector(state),
  isFormSubmitting: isFormSubmittingSelector(state),
  error: errorSelector(state),
  user: userSelector(state),
});

// Map dispatch to props
const mapDispatchToProps = {
  formIdToggler,
  resetError,
  login,
  signup,
};

// Create a functional wrapper to pass `navigate`
const AuthenticationWithNavigate = (props: any) => {
  const navigate = useNavigate();
  return <Authentication {...props} navigate={navigate} />;
};

// exports
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthenticationWithNavigate);
