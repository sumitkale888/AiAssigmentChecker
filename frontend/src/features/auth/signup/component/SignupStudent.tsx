import type { FC, FormEvent } from 'react';
import { useState, useEffect } from 'react';
import useManualFetch from '../../../../shared/hooks/useManualFetch';

import { updateAuth } from '../../authSlice';
import { useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';

const SignupStudent: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState<string | null>(null);
    const [lastName, setLastName] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);

    const { execute, data, status, error } = useManualFetch();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await execute(`${import.meta.env.VITE_BACKEND_URL}/auth/signupStudent`, 'POST', {
            first_name: firstName,
            last_name: lastName,
            email,
            password
        });

        if (status !== 'error') {
            // Save student details to localStorage
            const studentData = {
                fullName: `${firstName} ${lastName}`,
                email: email,
                rollNumber: "CS" + Math.floor(Math.random() * 1000000), // example roll number
                phone: "",
                dob: "",
                department: "Computer Science",
                address: "",
                profilePhoto: "https://randomuser.me/api/portraits/men/46.jpg"
            };
            localStorage.setItem("studentProfile", JSON.stringify(studentData));

            dispatch(updateAuth({
                authenticated: true,
                user: studentData.fullName
            }));
            navigate('/student');
        } else {
            console.log(error);
        }
    };

    useEffect(() => {
        if (status === 'success' && data) {
            const studentData = {
                fullName: `${firstName} ${lastName}`,
                email: email,
                rollNumber: "CS" + Math.floor(Math.random() * 1000000),
                phone: "",
                dob: "",
                department: "Computer Science",
                address: "",
                profilePhoto: "https://randomuser.me/api/portraits/men/46.jpg"
            };
            localStorage.setItem("studentProfile", JSON.stringify(studentData));

            dispatch(
                updateAuth({
                    authenticated: true,
                    user: studentData.fullName,
                })
            );
            navigate("/student");
        }
    }, [status, data, dispatch, navigate, firstName, lastName, email]);

    return (
        <div className="flex my-20 justify-center  bg-white-100">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md w-full p-8 bg-white shadow-xl rounded-[2vw] ">
                <span className="font-semibold text-3xl py-3 text-gray-800">For Student</span>
                <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                    First Name
                </label>
                <input
                    type="text"
                    name="firstName"
                    onChange={(e) => setFirstName(e.target.value)}
                    className="border border-gray-300 rounded-[3vw] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                    Last Name
                </label>
                <input
                    type="text"
                    name="lastName"
                    onChange={(e) => setLastName(e.target.value)}
                    className="border border-gray-300 rounded-[3vw] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="text"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 rounded-[3vw] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 rounded-[3vw] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    type='submit'
                    className="bg-blue-600 text-white py-2 rounded-[3vw] hover:bg-blue-800 transition-colors"
                >
                    {
                        status === 'loading' ? (
                            <span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"></span>
                        ) : (
                            'Create'
                        )
                    }
                </button>
                <Link className="text-blue-600 px-24" to={'/auth/signin'}>Already have an account?</Link>
            </form>
        </div>
    );
};

export default SignupStudent;
