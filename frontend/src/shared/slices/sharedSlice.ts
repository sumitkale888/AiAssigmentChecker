import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sidebarStatus: {
        activePage: 'Home',
        isOpen: false,
    },
    classesStatus: {
        classesData: ''
    },
    currentClass: {
        class_id: '',
    },
    tabStatus: {
        activeTab: 'Section'
    },
    assignmentCreateStatus: {
        title: '',
        description: '',
        evaluation_guideline: '',
        points: 100,
        deadline: '',
    },
    assignmentUploadHandle: {
        ReadyToUpload: false,
        assignment_id:""
    }
}

export const sharedSlice = createSlice({
    name: 'sharedSlice',
    initialState,
    reducers: {
        updatesidebarStatus: (state, action) => {
            state.sidebarStatus.activePage= action.payload.activePage;
        },
         toggleSidebar: (state) => {
         state.sidebarStatus.isOpen = !state.sidebarStatus.isOpen;
        },
         openSidebar: (state) => {
        state.sidebarStatus.isOpen = true;
         },
         closeSidebar: (state) => {
         state.sidebarStatus.isOpen = false;
         },
        updateClassesStatus: (state, action) => {
            state.classesStatus = {
                classesData: action.payload.classesData
            }
        },
        updateTabStatus: (state, action) => {
            console.log('Tab status updated:', action.payload.activePage);
            state.tabStatus = {
                activeTab: action.payload.activePage
            }
        },
        updateCurrentClass: (state, action) => {
            state.currentClass = {
                class_id: action.payload.class_id
            }
        },
        updateAssignmentCreateStatus: (state, action) => {
            state.assignmentCreateStatus = {
                title: action.payload.title,
                description: action.payload.description,
                evaluation_guideline: action.payload.evaluation_guideline,
                points: action.payload.points,
                deadline:action.payload.deadline
            }
        },
        updateAssignmentUploadHandle: (state, action) => {
            state.assignmentUploadHandle = {
                ReadyToUpload: action.payload.ReadyToUpload,
                assignment_id:action.payload.assignment_id
            }
        }
    }
})

export const {
    updatesidebarStatus,
     toggleSidebar,
    openSidebar,
    closeSidebar,
    updateClassesStatus, updateTabStatus,
    updateCurrentClass,
    updateAssignmentCreateStatus,
    updateAssignmentUploadHandle
} = sharedSlice.actions
export default sharedSlice.reducer