import type { FC, FormEvent } from 'react';
import { useState } from 'react';
import useManualFetch from '../../../../shared/hooks/useManualFetch';


import { updateAuth } from '../../authSlice';
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const SignupTeacher: FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState<string | null>(null);
    const [lastName, setLastName] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);

    const { execute,data, status, error } = useManualFetch()
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await execute(`${import.meta.env.VITE_BACKEND_URL}/auth/signupTeacher`, 'POST', { first_name: firstName, last_name: lastName, email, password }).then();
        if (status !== 'error') {
            console.log('authenticating')
            dispatch(updateAuth({
                authenticated: true,
                user: firstName +' ' + lastName
            }))
            navigate("/teacher")
        }else{
            console.log(error)
        }
    }

    useEffect(() => {
        if (status === 'success' && data) {
            dispatch(
                updateAuth({
                    authenticated: true,
                    user: `${firstName} ${lastName}`,
                })
            );
            navigate("/teacher");
        }
    }, [status, data, dispatch, navigate]);

    return (
        <div className="flex my-20 justify-center  ">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md w-full p-8 bg-white shadow-xl rounded-[2vw]">
                <span className="font-semibold  text-gray-800  text-3xl py-3">For Teacher</span>
                <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                    First Name
                </label>
                <input
                    type="text"
                    name="firstName"
                    onChange={(e) => setFirstName(e.target.value)}
                    className="border border-gray-300 rounded-[2vw] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                    Last Name
                </label>
                <input
                    type="text"
                    name="lastName"
                    onChange={(e) => setLastName(e.target.value)}
                    className="border border-gray-300 rounded-[2vw] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="text"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 rounded-[2vw] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    type="text"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 rounded-[2vw] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    // onClick={handleSubmit}
                    type='submit'
                    className="bg-blue-600 text-white py-2 rounded-[2vw] hover:bg-blue-800 transition-colors"
                >
                                {
          status === 'loading' ? (
            <span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"></span>
          ) : (
            'Create'
          )
        }
                </button>
                <Link  className="text-blue-600 px-24" to={'/auth/signin'}>Already have an account?</Link>
            </form>
        </div>

    )

}

export default SignupTeacher;