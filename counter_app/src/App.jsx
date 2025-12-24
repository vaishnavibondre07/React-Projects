
import { useState } from 'react'
import './App.css'

function App() {

  const [counter, setCounter] = useState(0)
// let counter = 15

const addValue = () =>{ if(counter == 20) return ;
                        setCounter(counter + 1); } 
                  
                        // setCounter((prevCounter) => prevCounter + 1);
                        // setCounter((prevCounter) => prevCounter + 1);
                        // setCounter((prevCounter) => prevCounter + 1);
                        

                        // The above three lines will increment counter by 3
                        // because it uses the previous state value each time.
                        
                        // and if we try to counter + 1 many times the value will be incremented only by 1
                    



const removeValue = () => { if(counter == 0) return;
                            setCounter(counter - 1);}
                            
  return (
    <>
      <h1>Counter App</h1>  
      <h2>Counter Value: {counter}</h2>

      <div className="flex gap-10 mt-5">
      <button className="bg-blue-500 text-white px-4 py-2 rounded gap-10" onClick={addValue}>Add value</button>
      <button className="bg-blue-500 text-white px-4 py-2 rounded gap-10" onClick={removeValue}>Remove Value</button>

      </div>

    </>
  )
}

export default App
