import addImg from '../../../../assets/add-svgrepo-com.svg';
import ClassCard from '../../cards/ClassCard';
import CreateClass from '../../cards/CreateClass';
import useFetch from '../../../hooks/UseFetch';
import { useState } from 'react';

const HomeTeacher = () => {
  const { data,  refetch } = useFetch<any>({
    method: "GET",
    url: `${import.meta.env.VITE_BACKEND_URL}/teacher/classes`
  });

  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div>
        <button
          className="flex items-center gap-2 px-6 py-3  bg-blue-500 text-white rounded-[70px] hover:bg-blue-700 m-4 "
          onClick={() => setShowModal(true)}
        >
          Create Class
          <img src={addImg} alt="add" className="w-[15px]" />
        </button>

        <div className="flex flex-wrap gap-4 p-4">
          {data &&
            data.map((item: any) => (
              <ClassCard key={item.class_id} classNameText={item.class_name} class_id={item.class_id} />
            ))}
        </div>

        {showModal && (
          <CreateClass
            onClose={() => setShowModal(false)}
            onSuccess={() => {
              setShowModal(false);
              refetch(); // ✅ reload classes
            }}
          />
        )}
      </div>
    </div>
  );
};

export default HomeTeacher;
