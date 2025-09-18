
import useFetch from "../../../../shared/hooks/UseFetch";
import AnimatedLoader from "../../../../shared/components/loaders/DefaultLoader";
const AllAttendaceClass:React.FC<{ class_id: string }> = ({ class_id }) => {
        const { data, status } = useFetch({
        method: "GET",
        url: `${import.meta.env.VITE_BACKEND_URL}/teacher/attendance/class/${class_id}`
    });
    
    if (status === "loading") {
        return (<div className=" mt-[300px] ">
            <AnimatedLoader />
        </div>
        );
    }
    if (status === "error") {
        return <div>No attendance data available.</div>;
    }
    return <div>{JSON.stringify(data) || <div>No attendance data available.</div>}</div>
}

export default AllAttendaceClass;