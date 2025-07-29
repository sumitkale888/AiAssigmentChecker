import addImg from '../../../assets/add-svgrepo-com.svg';
// import ClassCard from '../../../shared/components/cards/ClassCard';
import StudentClassCard from "./StudentClassCard"
// import CreateClass from '../../../shared/components/cards/CreateClass';
import useFetch from '../../../shared/hooks/UseFetch';
import JoinClass from './JoinClass';
import { useState } from 'react';

const HomeStudent = () => {
  const { data, refetch } = useFetch<any>({
    method: "GET",
    url: "http://localhost:3000/api/student/class",
  });

  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div>
        <button
          className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-[70px] hover:bg-blue-700 m-4"
          onClick={() => setShowModal(true)}
        >
          Join Class
          <img src={addImg} alt="add" className="w-[15px]" />
        </button>

        <div className="flex flex-wrap gap-4 p-4">
          {data &&
            data.map((item: any) => (
              <StudentClassCard key={item.class_id} {...item} />
            ))}
        </div>

        {showModal && (
          <JoinClass
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

export default HomeStudent;
