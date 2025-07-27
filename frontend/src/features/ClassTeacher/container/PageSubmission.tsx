import React from 'react';
import AssigmnentSumission from "../components/assignment-submission-view/AssigmnentSumission"

const PageSubmission: React.FC<{ class_id: string }> = ({ class_id }) => {
    return (
        <div>
          
            <AssigmnentSumission class_id={class_id} />
            {/* Add your content here */}
        </div>
    );
};

export default PageSubmission;