import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as auth_slice_login } from "../../store/auth_slice";
import auth_service_obj from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { set, useForm } from "react-hook-form";
import { Button, Logo, Input_field } from "../index";

function Sign_up() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [errors, set_errors] = useState("");

  const sign_up = async (data) => {
    set_errors("");
    try {
      const created_user_account = await auth_service_obj.create_account(data);
      if (created_user_account) {
        const user_data = auth_service_obj.get_current_user();
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
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign up</h2>
        <p>Already have an account?
            <Link 
            to='/login'
            className="font-medium text-primary transition-all duration-200 hover:underline"
            
             >Login</Link>
        </p>
        {errors && <p className="text-red-600 mt-8 text-center" >{errors}</p>}
        <form onSubmit={handleSubmit(sign_up)} className="mt-8">
            <div className="space-y-5">
                <Input_field
                 label = "name"
                 placeholder = "Enter your name"
                 type = "text"
                 {...register("name" , {
                    required : true,
                    validate:{
                        matchPattern : (value) =>
                             /^[a-zA-Z\s'-]{2,}$/.test(value) || 'Invalid Name format',
                    }
                 })}
                />
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
             >Create an Account - Sign Up</Button>
            </div>

        </form>
      </div>
    </div>
  );
}

export default Sign_up;
