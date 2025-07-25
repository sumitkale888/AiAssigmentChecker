import { useNavigate } from 'react-router-dom';

interface StudentClassCard{
        teacher_name: string,
        class_id: string,
        class_name: string,
        section:string,
        subject: string,
        room: string,
        description: string,
        uploaded_photo_url: string
}

const StudentClassCard:React.FC<StudentClassCard> = (StudentClassCard)=>{
      const navigate = useNavigate();
      const handleCardClick = () => {
        navigate(`/student/class/${StudentClassCard.class_id}`);
        console.log(`Class ID: ${StudentClassCard.class_id}`);
        
      }

    return(
 <div className="w-72 bg-white rounded-lg border border-gray-300 shadow-md overflow-hidden font-inter cursor-pointer" onClick={handleCardClick}>
      
      <div
        className="relative w-full bg-blue-600 bg-cover bg-center flex flex-col justify-between p-4 text-white"
        style={{
          height: '100px', 
                          
          
          backgroundImage: StudentClassCard.uploaded_photo_url ? `url(${StudentClassCard.uploaded_photo_url})` : 'none',
        }}
      >
        
        <div className="absolute top-2 right-2 flex items-center space-x-2">
         
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-blue-200 opacity-80" 
            style={{ transform: 'rotate(-15deg)' }} 
          >
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 3.694-9.75 8.25 0 1.06.20 2.071.581 3.003L3 15.75l-1.559 1.559A2.25 2.25 0 0 0 1.5 21.75h19.5a2.25 2.25 0 0 0 1.559-4.441L21 15.75l-.331-.747A8.47 8.47 0 0 0 21.75 10.5c0-4.556-4.365-8.25-9.75-8.25ZM6.75 10.5a.75.75 0 0 0 0 1.5h.008a.75.75 0 0 0 0-1.5H6.75Zm.008 2.25a.75.75 0 0 0 0 1.5h.008a.75.75 0 0 0 0-1.5H6.75Zm2.242-2.25a.75.75 0 0 0 0 1.5h.008a.75.75 0 0 0 0-1.5H9Zm.008 2.25a.75.75 0 0 0 0 1.5h.008a.75.75 0 0 0 0-1.5H9Zm2.242-2.25a.75.75 0 0 0 0 1.5h.008a.75.75 0 0 0 0-1.5H11.25Zm.008 2.25a.75.75 0 0 0 0 1.5h.008a.75.75 0 0 0 0-1.5H11.25Zm2.242-2.25a.75.75 0 0 0 0 1.5h.008a.75.75 0 0 0 0-1.5H13.5Zm.008 2.25a.75.75 0 0 0 0 1.5h.008a.75.75 0 0 0 0-1.5H13.5Zm2.242-2.25a.75.75 0 0 0 0 1.5h.008a.75.75 0 0 0 0-1.5H15.75Zm.008 2.25a.75.75 0 0 0 0 1.5h.008a.75.75 0 0 0 0-1.5H15.75Z" clipRule="evenodd" />
          </svg>
          {/* Three Dots Icon (if needed, otherwise remove) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-white"
          >
            <path fillRule="evenodd" d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
          </svg>
        </div>

        {/* Class Name */}
        <h2 className="text-xl font-semibold mt-auto mb-1 ml-2">
          {StudentClassCard.class_name}
        </h2>

        {/* Div below the class name */}
        <div className="w-full h-2"></div> {/* Small div, adjust height as needed */}
      </div>

      {/* Bottom Section - Remaining height, white background */}
      <div className="flex-grow bg-white p-4 flex flex-col justify-end h-[150px]">
        {/* Placeholder for bottom icons (e.g., folder, graph) */}
        <div className="flex justify-end space-x-4 text-gray-500">
          {/* Example icon 1 (Graph/Chart) */}
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path fillRule="evenodd" d="M2.25 11.25A.75.75 0 0 1 3 10.5h18a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75ZM2.25 15.75A.75.75 0 0 1 3 15h18a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75ZM2.25 6.75A.75.75 0 0 1 3 6h18a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75ZM12 3a.75.75 0 0 1 .75.75V20.25a.75.75 0 0 1-1.5 0V3.75A.75.75 0 0 1 12 3Z" clipRule="evenodd" />
          </svg> */}

          {/* Example icon 2 (Folder) */}
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M19.5 9.75A3 3 0 0 0 16.5 6H13.5A3 3 0 0 0 10.5 9.75v4.5A3 3 0 0 0 13.5 18h3a3 3 0 0 0 3-3V9.75Z" />
            <path fillRule="evenodd" d="M2.25 5.25A.75.75 0 0 1 3 4.5h7.5a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75H3a.75.75 0 0 1-.75-.75V5.25ZM2.25 9.75A.75.75 0 0 1 3 9h4.5a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75H3a.75.75 0 0 1-.75-.75V9.75Z" clipRule="evenodd" />
          </svg> */}
        </div>
      </div>
    </div>
    )
}

export default StudentClassCard;