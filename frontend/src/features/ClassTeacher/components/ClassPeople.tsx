import useFetch from "../../../shared/hooks/UseFetch"
import PeopleList from "./PeopleList"
import AnimatedLoader from "../../../shared/components/loaders/DefaultLoader"
import CircularLoader from "../../../shared/components/loaders/CircularLoader"
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
    const { data, status } = useFetch({
        method: "GET",
        url: `${import.meta.env.VITE_BACKEND_URL}/${role}/class/students/${class_id}`
    });
    if (status === "loading") {
        return (<div className=" mt-[300px] ">
            <AnimatedLoader />
        </div>
        );
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