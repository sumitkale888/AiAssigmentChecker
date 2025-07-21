import useFetch from "../../../shared/hooks/UseFetch"


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
            {JSON.stringify(data)}

        </div>
    );
}

export default ClassPeople