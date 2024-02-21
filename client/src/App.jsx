import React, { useEffect, useState } from 'react'
import ToDo from './components/ToDo'
import axios from 'axios'
import { baseURL } from './utils/constants'
import Popup from './components/Popup'

const App = () => {

  const [toDos,setToDos]=useState([])
  const [input,setInput]=useState("")
  const [updateUI,setUpdateUI]=useState(false)
  const [showPopup,setShowPopup]=useState(false)
  const [popupContent,setPopupContent]=useState({})

  useEffect(()=>{
    axios.get(`${baseURL}/get`)
    .then((res)=>{
      setToDos(res.data)
      // console.log(res.data)
    })
    .catch((err)=>{
      console.log(err);
    })
  },[updateUI])

  const saveToDo=()=>{
    axios.post(`${baseURL}/save`,{toDo:input})
    .then((res)=>{
      // console.log(res.data)
      setUpdateUI((prevState)=>!prevState)
      if(input.length>2)setInput("")
    })
    .catch((err)=>{
      console.log(err);
    })
  }




  return (
    <main>
      <div className='container'>
          <h1 className='title'>Notes App</h1>
          <div className="input_holder">
            <input value={input} onChange={(e)=> setInput(e.target.value)} type="text" placeholder='Add a Note....' />
            <button onClick={saveToDo}>Add</button>
          </div>
          <div className="list">
            {toDos.map(el=> (
              <ToDo 
                key={el._id} 
                id={el._id} 
                text={el.toDo} 
                setUpdateUI={setUpdateUI} 
                setShowPopup={setShowPopup}
                setPopupContent={setPopupContent}
              />
                ))}
          </div>
      </div>
      {showPopup && 
      <Popup 
        setShowPopup={setShowPopup} 
        popupContent={popupContent}
        setUpdateUI={setUpdateUI}
      />}
    </main>
  )
}

export default App