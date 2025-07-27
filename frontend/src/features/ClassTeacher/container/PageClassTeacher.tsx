import ClassSection from "../components/classSection"
import ClassWork from "../components/ClassWork"
import ClassPeople from "../components/ClassPeople"
import Tab from "../components/Tab"
import PageSubmission from "./PageSubmission"

import { useDispatch, useSelector } from "react-redux"

const PageClassTeacher: React.FC<{ class_id: string }> = ({ class_id }) => {
    const dispatch = useDispatch();
    let currentTab = useSelector((state: any) => state.shared.tabStatus.activeTab);
    return (
        <div className="w-[1500px]">
            <Tab list={[{ item_name: "Section" }, { item_name: "Classwork" }, { item_name: "People" },{ item_name: "Grades" }]} />

            {currentTab === "Section" ? (
                <ClassSection class_id={String(class_id)} />
            ) : currentTab === "Classwork" ? (
                <ClassWork class_id={String(class_id)}/>
            ) : currentTab === "People" ? (
                <ClassPeople class_id={String(class_id)} role={"teacher"}/>
            ) : currentTab === "Grades" ? (
                <PageSubmission class_id={String(class_id)} />
            ) : null}

        </div>
    )
}

export default PageClassTeacher