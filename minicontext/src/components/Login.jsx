import React , {useContext, useState} from "react";
import UserContext from "../context/UserContext";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {setUser} = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        setUser({username, password});
    }

    return (
        <div>
          <h2>Login Component</h2>

          <input type="text" 
           value={username}
           onChange={(e) => setUsername(e.target.value)}
           placeholder="username" 
           className="h-5 py-2 px-3"/>

           {"   "}

          <input type="password" 
           value={password}
           onChange={(e) => setPassword(e.target.value)}
           placeholder="password" 
           className="h- py-2 px-3"/>

           {"   "}

           <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default Login;