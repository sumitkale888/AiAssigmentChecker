import ClassSection from "../components/classSection"
import ClassWork from "../components/ClassWork"
import ClassPeople from "../components/ClassPeople"
import Tab from "../components/Tab"

import { useDispatch, useSelector } from "react-redux"

const PageClassTeacher: React.FC<{ class_id: string }> = ({ class_id }) => {
    const dispatch = useDispatch();
    let currentTab = useSelector((state: any) => state.shared.tabStatus.activeTab);
    return (
        <div className="w-[1000px]">
            <Tab list={[{ item_name: "Section" }, { item_name: "Classwork" }, { item_name: "People" },{ item_name: "Grades" }]} />

            {currentTab === "Section" ? (
                <ClassSection class_id={String(class_id)} />
            ) : currentTab === "Classwork" ? (
                <ClassWork class_id={String(class_id)}/>
            ) : currentTab === "People" ? (
                // Render People component here
                <ClassPeople class_id={String(class_id)} role={"teacher"}/>
            ) : null}

        </div>
    )
}

export default PageClassTeacher