import { createSlice } from "@reduxjs/toolkit"; 
import { authSlice } from "../../features/auth/authSlice";

const initialState = {
    sidebarStatus:{
      activePage:'Home' 
    },
    classesStatus:{
        classesData:''
    }
}

export const sharedSlice = createSlice({
    name:'sharedSlice',
    initialState,
    reducers:{
        updatesidebarStatus:(state,action)=>{
            state.sidebarStatus={
                activePage:action.payload.activePage
            }
        },
          updateClassesStatus:(state,action)=>{
            state.classesStatus={
                classesData:action.payload.classesData
            }
        }
        
    }
})

export const {updatesidebarStatus,updateClassesStatus} = sharedSlice.actions
export default sharedSlice.reducer