import { useState } from "react";
import type { FormEvent } from "react";
import useManualFetch from "../../../shared/hooks/useManualFetch";

interface CreateClassProps {
    onSuccess: () => void;
    onClose: () => void;
}

const JoinClass = ({ onSuccess, onClose }: CreateClassProps) => {
    const [joiningCode, setJoiningCode] = useState('');

    const { execute, data, status, error } = useManualFetch<any>();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await execute(
            'http://localhost:3000/api/student/class/join',
            'POST',
            {
                joining_code: joiningCode
            }
        );

        onSuccess();
    };

    return (
        <div className="fixed inset-0  flex justify-center items-center p-4 z-50">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 p-8 bg-white rounded-[3vw] shadow-xl w-full max-w-md border border-gray-200"
            >
                <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">Join Class</h2>

                <input
                    type="text"
                    placeholder="Joining Code (*required)"
                    value={joiningCode}
                    onChange={(e) => setJoiningCode(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-[3vw] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-500"
                />

                <div className="flex justify-end gap-3 mt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-[3vw] hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-500 text-white rounded-[3vw] hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Join
                    </button>
                </div>

                {status === 'loading' && <p className="text-blue-600 text-center mt-4 text-sm font-medium">Creating class...</p>}
                {status === 'error' && (
                    <p className="text-red-600 text-center mt-4 text-sm font-medium">Error: {error?.message || 'Failed to create class.'}</p>
                )}
            </form>
        </div>
    );
};

export default JoinClass;
