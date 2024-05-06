import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-clients";
import { useAppContext } from "../Contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type RegisterFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Register = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { showToast } = useAppContext();
    const { register, watch, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();
    const mutation = useMutation(apiClient.register, {
        onSuccess: async () => {
            showToast({ message: "Registration Successful!!", type: "SUCCESS" });
            await queryClient.invalidateQueries("validateToken");
            navigate("/");
        },
        onError: (error: any) => {
            showToast({ message: error.message, type: "ERROR" });
        },
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

    return (
        <form className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg" onSubmit={onSubmit}>
            <h1 className="text-3xl font-bold text-center mb-6">Create An Account</h1>

            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">First Name</span>
                        </label>
                        <input
                            type="text"
                            className={`input border-2 border-black-300 input-bordered w-full ${errors.firstName ? 'input-error' : ''}`}
                            {...register("firstName", { required: "This field is required" })}
                        />
                        {errors.firstName && <span className="label-text-alt text-red-500">{errors.firstName.message}</span>}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Last Name</span>
                        </label>
                        <input
                            type="text"
                            className={`input border-2 border-black-300 input-bordered w-full ${errors.lastName ? 'input-error' : ''}`}
                            {...register("lastName", { required: "This field is required" })}
                        />
                        {errors.lastName && <span className="label-text-alt text-red-500">{errors.lastName.message}</span>}
                    </div>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        className={`input border-2 border-black-300 input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                        {...register("email", { required: "This field is required" })}
                    />
                    {errors.email && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type="password"
                        className={`input border-2 border-black-300 input-bordered w-full ${errors.password ? 'input-error' : ''}`}
                        {...register("password", {
                            required: "This field is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters"
                            }
                        })}
                    />
                    {errors.password && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Confirm Password</span>
                    </label>
                    <input
                        type="password"
                        className={`input border-2 border-black-300 input-bordered w-full ${errors.confirmPassword ? 'input-error' : ''}`}
                        {...register("confirmPassword", {
                            validate: (val) => {
                                if (!val) return "Password is required";
                                if (watch("password") !== val) return "Your Password does not match";
                            }
                        })}
                    />
                    {errors.confirmPassword && <span className="label-text-alt text-red-500">{errors.confirmPassword.message}</span>}
                </div>

                <span className="text-sm">
                    Already registered? <Link to="/signin" className="hover:underline text-blue-600">Sign In here</Link>
                </span>
                <button className="mt-4 bg-blue-500 text-white p-2 font-bold hover:bg-blue-700 w-full">Create Account</button>
            </div>
        </form>
    );
}

export default Register;
