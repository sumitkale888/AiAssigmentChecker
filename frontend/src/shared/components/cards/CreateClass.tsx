import { useState } from "react";
import type { FormEvent } from "react";
import useManualFetch from "../../hooks/useManualFetch";

interface CreateClassProps {
  onSuccess: () => void;
  onClose: () => void;
}

const CreateClass = ({ onSuccess, onClose }: CreateClassProps) => {
  const [className, setClassName] = useState('');
  const [section, setSection] = useState('');
  const [subject, setSubject] = useState('');
  const [room, setRoom] = useState('');

  const { execute, data, status, error } = useManualFetch<any>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await execute(
      'http://localhost:3000/api/teacher/classes',
      'POST',
      {
        class_name: className,
        section,
        subject,
        room
      }
    );

    onSuccess();
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-20 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-sm mx-auto p-6 bg-white bg-opacity-80 shadow-md rounded-md"
      >
        <input
          type="text"
          placeholder="Class Name (*required)"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          required
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Section"
          value={section}
          onChange={(e) => setSection(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Create
          </button>
        </div>

        {status === 'loading' && <p className="text-blue-600">Creating...</p>}
        {status === 'error' && (
          <p className="text-red-600">Error: {error?.message}</p>
        )}
      </form>
    </div>
  );
};

export default CreateClass;
