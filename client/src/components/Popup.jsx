import React, { useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { baseURL } from '../utils/constants'
import axios from 'axios'

const Popup = ({setShowPopup,popupContent,setUpdateUI}) => {
    const [input,setInput]=useState(popupContent.text)
    const updateTodo=()=>{
        axios.put(`${baseURL}/update/${popupContent.id}`,{toDo:input})
        .then((res)=>{
            console.log(res.data)
            setUpdateUI((prevState)=>!prevState)
            setShowPopup(false)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    return (
        <div className='backdrop'>
            <div className="popup">
                <RxCross1 className='cross' onClick={()=>setShowPopup(false)}/>
                <h1>Update Todo</h1>
                <div className="popup__input_holder">
                    <input value={input} onChange={(e)=> setInput(e.target.value)} type="text" placeholder='Update Note....' />
                    <button onClick={updateTodo}>Update</button>
                </div>
            </div>
        </div>
    )
}

export default Popup