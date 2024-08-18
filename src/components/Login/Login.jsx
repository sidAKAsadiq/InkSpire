import React, { useState } from "react";
import { Button, Input_field, Logo } from "../index";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import auth_service_obj from "../../appwrite/auth";
import { login as auth_slice_login } from "../../store/auth_slice";
import { useForm } from "react-hook-form";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {register, handleSubmit} = useForm();
  const [errors, set_errors] = useState("");

  async function temphandleLogout() {
    try {
        await auth_service_obj.logout();
        console.log("Logout successful!");
    } catch (error) {
        console.log("Error during logout:", error);
    }
}

//temphandleLogout(); // Call the async function

  async function templogCurrentUser() {
    const currentUser = await auth_service_obj.get_current_user();
    console.log("In here! :", currentUser);
}

templogCurrentUser(); // Call the async function

  const login = async (data) => {
    set_errors("");
    try {
      const session = await auth_service_obj.login(data);
      if (session) {
        const user_data = await auth_service_obj.get_current_user();
        if (user_data) {
          dispatch(auth_slice_login(user_data));
        }
        navigate("/");
      }
    } catch (error) { 
      set_errors(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%"/>
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Login</h2>
        <p>Dont have an account yet?
            <Link 
            to='/signup'
            className="font-medium text-primary transition-all duration-200 hover:underline"
            
             >Sign up</Link>
        </p>
        {errors && <p className="text-red-600 mt-8 text-center" >{errors}</p>}
      
      <form onSubmit={handleSubmit(login)} className="mt-8">
        <div className="space-y-5">
             <Input_field
             label = "Email"
             placeholder = "Enter your email"
             type = "email"
             {...register("email" , {
                required : true,
                validate : {
                    matchPattern : (value) =>
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || 'Invalid email format',
                         }
             })}
             />
             <Input_field
             label = "password"
             placeholder = "Enter your password"
             type = "password"
             {...register("password" , {
                required : true
             })}
             />
             <Button
             type="submit"
             className="w-full"
             >Login</Button>
        </div>
      </form>

      </div>
    </div>
  );
}

export default Login;
