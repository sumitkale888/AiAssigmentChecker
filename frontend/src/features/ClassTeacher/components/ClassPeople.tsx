import useFetch from "../../../shared/hooks/UseFetch"
import PeopleList from "./PeopleList"

// Define the User type or import it from the appropriate module
interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    url_dp: string;
    // Add other relevant fields here
}

interface ClassPeopleProps {
    class_id: string;
}

const ClassPeople: React.FC<ClassPeopleProps> = ({ class_id }) => {
    const { data, error, status } = useFetch({
        method: "GET",
        url: `http://localhost:3000/api/teacher/class/students/${class_id}`
    });
    return (
        <div>
            {Array.isArray(data) && <PeopleList users={data as User[]} />}
        </div>
    );
}

export default ClassPeople