import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    sidebarStatus: {
        activePage: 'Home'
    },
    classesStatus: {
        classesData: ''
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
        }

    }
})

export const { updatesidebarStatus, updateClassesStatus,updateTabStatus } = sharedSlice.actions
export default sharedSlice.reducer