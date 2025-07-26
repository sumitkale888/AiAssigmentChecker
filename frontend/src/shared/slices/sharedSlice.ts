import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    sidebarStatus: {
        activePage: 'Home'
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
        points: 0
    },
    AssignmentUploadHadle: {
        ReadyToUpload: false
    }
}

export const sharedSlice = createSlice({
    name: 'sharedSlice',
    initialState,
    reducers: {
        updatesidebarStatus: (state, action) => {
            state.sidebarStatus = {
                activePage: action.payload.activePage
            }
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
                points: action.payload.points
            }
        },
        updateAssignmentUploadHadle: (state, action) => {
            state.AssignmentUploadHadle = {
                ReadyToUpload: action.payload.upload
            }

        }
    }
})

export const {
    updatesidebarStatus,
    updateClassesStatus, updateTabStatus,
    updateCurrentClass,
    updateAssignmentCreateStatus,
    updateAssignmentUploadHadle
} = sharedSlice.actions
export default sharedSlice.reducer