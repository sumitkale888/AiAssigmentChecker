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
    role:"student" |"teacher";
}

const ClassPeople: React.FC<ClassPeopleProps> = ({ class_id,role }) => {
    const { data, error, status } = useFetch({
    const { data, status } = useFetch({
        method: "GET",
        url: `http://localhost:3000/api/${role}/class/students/${class_id}`
        url: `process.env.BACKEND_URL/${role}/class/students/${class_id}`
    });
    if (status === "loading") {
        return <div>Loading...</div>;
    }
    if (status === "error") {
        return <div>Error loading data.</div>;
    }
    return (
        <div>
            {Array.isArray(data) && <PeopleList users={data as User[]} />}
        </div>
    );
}

export default ClassPeople