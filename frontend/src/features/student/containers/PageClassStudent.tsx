// import ClassSection from "../../ClassTeacher/components/classSection"
// import ClassWork from "../../ClassTeacher/components/ClassWork"
import ClassPeople from "../../ClassTeacher/components/ClassPeople"
import Tab from "../../ClassTeacher/components/Tab"
import StudentSection from "../components/StudentSection"

import { useDispatch, useSelector } from "react-redux"

const PageClassStudent: React.FC<{ class_id: string }> = ({ class_id }) => {
    const dispatch = useDispatch();
    let currentTab = useSelector((state: any) => state.shared.tabStatus.activeTab);
    return (
        <div className="w-[1000px]">
            <Tab list={[{ item_name: "Section" }, { item_name: "Classwork" }, { item_name: "People" },{ item_name: "Grades" }]} />

            {currentTab === "Section" ? (
                // <ClassSection class_id={String(class_id)} />
                <StudentSection class_id={String(class_id)}/>

            ) : currentTab === "Classwork" ? (
                <StudentSection class_id={String(class_id)}/>
            ) : currentTab === "People" ? (
                // Render People component here
                <ClassPeople class_id={String(class_id)}/>
            ) : null}

        </div>
    )
}

export default PageClassStudent