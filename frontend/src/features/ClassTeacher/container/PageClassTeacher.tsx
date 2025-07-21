import ClassSection from "../components/ClassSection"
import ClassWork from "../components/ClassWork"
import ClassPeople from "../components/ClassPeople"
import Tab from "../components/Tab"

import { useDispatch, useSelector } from "react-redux"

const PageClassTeacher: React.FC<{ class_id: string }> = ({ class_id }) => {
    const dispatch = useDispatch();
    let currentTab = useSelector((state: any) => state.shared.tabStatus.activeTab);
    return (
        <div>
            <Tab list={[{ item_name: "Section" }, { item_name: "Classwork" }, { item_name: "People" }]} />

            {currentTab === "Section" ? (
                <ClassSection class_id={String(class_id)} />
            ) : currentTab === "Classwork" ? (
                <ClassWork class_id={String(class_id)}/>
            ) : currentTab === "People" ? (
                // Render People component here
                <ClassPeople class_id={String(class_id)}/>
            ) : null}

        </div>
    )
}

export default PageClassTeacher