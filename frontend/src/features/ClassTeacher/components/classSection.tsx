import useFetch from "../../../shared/hooks/UseFetch"
import SectionContent from "./SectionContent"
const classSection: React.FC<{ class_id: string | undefined }> = ({ class_id }) => {
    const { data, error, status } = useFetch<any>({ method: "GET", url: `http://localhost:3000/api/class/classInfo/${class_id}` })
    return (
        <div>
            {/* {JSON.stringify(data)} */}
            {data && <SectionContent classInfo={data}/>}

        </div>
    )
}

export default classSection