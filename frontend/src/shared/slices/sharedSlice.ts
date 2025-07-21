import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    sidebarStatus: {
        activePage: 'Home'
    },
    classesStatus: {
        classesData: ''
    },
    currentClass:{
        class_id: '',
    },
    tabStatus: {
        activeTab: 'Section'
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
        }
    }
})

export const { updatesidebarStatus, updateClassesStatus,updateTabStatus, updateCurrentClass } = sharedSlice.actions
export default sharedSlice.reducer