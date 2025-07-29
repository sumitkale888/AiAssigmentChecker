import React from 'react';
import StudentSectionContent from './StudentSectionContent';
import useFetch from '../../../shared/hooks/UseFetch';
// import useFetch from '../../../shared/hooks/UseFetch';


const StudentSection: React.FC<{ class_id: string | undefined }> = ({ class_id }) => {
    const { data, error, status } = useFetch<any>({ method: "GET", url: `/${class_id}` })
    // const { data, error, status } = useFetch<any>({ method: "GET", url: `/${class_id}` })
    return (
        <div>
            {/* {JSON.stringify(data)} */}
            {/* {data && <StudentSectionContent  />} */}
            { <StudentSectionContent class_id={class_id}  />}

        </div>
    );
};

export default StudentSection;