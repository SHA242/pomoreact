import React from "react";
import { useState, useEffect } from "react";


const Task = ({title, index, start, seconds, selectedIndex}) =>{
    
    const [clicked, setClicked] = useState(false);
    const [done, setDone] = useState(false)
    useEffect(()=>{
        console.log(index, selectedIndex)
        if (seconds==0 && index == selectedIndex){
            setDone(true)
            console.log(done)
        }
    },[seconds])

    

    const handleClick = () =>{
      setClicked(!clicked);
      start();
    }


    return(
        <>
            <div className={clicked?'Taskcard clicked':'Taskcard'} onClick={()=>{
                handleClick();
            }}>
                <div className='Task-Size-Overlay'>
                    <span className='Task-Size'>{index+1}</span>
                </div>
                <div className='Task-Content'>
                    <span className='Task-Tag'>#Study</span>
                    <div>
                        <span className={done?'Task-Title is-size-5 strikethrough':'Task-Title is-size-5'}>{title}</span>
                    </div>

                </div>

                <button className='button is-white Add-Button'>
                Start
                </button>
                  
                
            </div>
        </>
    )
}

export default Task;