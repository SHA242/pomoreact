import React, { useState, useEffect } from 'react';
import './App.css';
import Task from './Task';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause } from '@fortawesome/free-solid-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const pomSize = 25;
const shortBreakSize = 5
const longBreakSize = 15

const App = () => {
  const [seconds, setSeconds] = useState(pomSize);
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [selectedTask, setSelectedTask] = useState(false)
  const [done, setDone] = useState(false)
  const [breaktime, setBreaktime] = useState(false)
  // Function to handle task submission
  const submitTask = () => {
    if (taskInput.trim() !== '') {
      setTasks([...tasks, taskInput]); // Add new task to tasks array
      setTaskInput(''); // Clear input field
    }
  };

  // Countdown timer effect
  useEffect(() => {

    if (seconds==0 && !done){
      setDone(true);
    }

    const countDown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => clearInterval(countDown); // Cleanup interval on component unmount
  }, [seconds]);

  // Format time utility function
  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  const minutes = Math.floor(seconds / 60);
  const remainSeconds = seconds % 60;

 


  return (
    <div className='columns'>
      {/* Left column for tasks */}
      <div className='column is-one-third Tasks-Container'>
        <div className='container'>
        
          <div className='section Tasks-Section'>
            <div className='container'>


              <div className='container Heading-Container'>
                <h1 className='is-size-1 has-text-centered'>Pomoreact</h1>
                <div>
                  <button class="button Button-Select is-light is-normal is-outlined" onClick={()=>{setSeconds(pomSize)}}>Pomodoro</button>
                  <button class="button Button-Select is-light is-normal is-outlined" onClick={()=>{setSeconds(shortBreakSize)}}>Short Break</button>
                  <button class="button Button-Select is-light is-normal is-outlined" onClick={()=>{setSeconds(longBreakSize)}}>Long Break</button>
                </div>
              </div>


              {/* Display tasks */}
              {tasks.length > 0 && (
                <div className='TaskList'>
                  {tasks.map((task, index) => (
                    <div onClick={()=>{
                        setSelectedTask(index);
                        setDone(false)
                    }}>
                        
                        <Task title={task} index={index} start={()=>{setSeconds(5)}} seconds={seconds}
                        selectedIndex={selectedTask}/>
                    </div>
                  ))}
                </div>
              )}

              {/* Task input and add button */}
              <div className='Taskcard Task-Add'>
                <div className='Task-Size-Overlay'>
                  <span className='Task-Size'>+</span>
                </div>
                <div className='Task-Content'>
                  <span className='Task-Tag'>#Study</span>
                  <input
                    className='Task-Title Task-Input is-size-5'
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    placeholder='Enter task title'
                  />
                </div>
                <button className='button is-white' onClick={submitTask}>
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right column for timer */}
      <div className='column Timer'>
        
          <div className='container'>
            {
              done?(
                <div className='Playing Break'>
                <div className='Pause is-size-1' onClick={()=>{
                  setSeconds(shortBreakSize);
                  setBreaktime(true);
                  }}>
                    <div className='Pause-Container'>
                        <FontAwesomeIcon icon={faPlay} />
                    </div>
                </div>

                <div>
                  <h3>5 MINS</h3>
                  <h1 className='is-size-1'>Let's Break</h1>
                </div>

              </div>
              ):(
                <div className='Playing'>
                <div className='Pause is-size-1'>
                    <div className='Pause-Container'>
                        <FontAwesomeIcon icon={faPause} />
                    </div>
                </div>
    
                <div>
                  <h3>FOCUS ON</h3>
                  <h1 className='is-size-1'>{tasks[selectedTask]?tasks[selectedTask]:"Let's Focus"}</h1>
                </div>
    
              </div>
              )
            }
         

          

          
          <h1 className='Timer-Heading has-text-centered'>
              {formatTime(minutes)}:{formatTime(remainSeconds)}
          </h1>

          <p className='is-size-5'>The Pomodoro Technique is a famous time management method based on 25-minute stretches of focused work broken by five-minute breaks. Longer breaks, typically 15 to 30 minutes, are taken after four consecutive work intervals.</p>
        </div>
      </div>  
    </div>
  );
};

export default App;
