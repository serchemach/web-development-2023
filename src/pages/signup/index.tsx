import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useSignupMutation } from "../store/authApi";

export default function Index() {
    const [username, setUsername] = useState("");
    const [isUsernameError, setIsUsernameError] = useState("");
    
    const [password, setPassword] = useState("");
    const [isPasswordError, setIsPasswordError] = useState("");
    
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");

    const [signup] = useSignupMutation();

    return (
        <Box sx={{
            display: "flex", 
            flexDirection: "column", 
            width: "100vw", height: "100vh",
            alignItems: "center", 
            justifyContent: "center"
            }}>
            <TextField 
                value={username}
                onChange={(ev) => setUsername(ev.target.value)}
                label={"Enter username"}
                error={!!isUsernameError}
                onBlur={()=>{if(username.length < 3){
                    setIsUsernameError("Username is too short");
                }}}
                onFocus={()=>{
                    setIsUsernameError("");
                }}
                helperText={isUsernameError}
            />

            <TextField 
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                label={"Enter password"}
                error={!!isPasswordError}
                onBlur={()=>{
                    if (username.length < 8){
                        setIsPasswordError("Password is too short");
                    }
                    if (password.match(/^[a-zA-Z]+$/g)){
                        setIsPasswordError("Password should only contain only latin symbols and numbers");
                    }
                }}
                onFocus={()=>{
                    setIsPasswordError("");
                }}
                helperText={isPasswordError}
            />

            <TextField 
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                label={"Enter email"}
            />

            <TextField 
                value={nickname}
                onChange={(ev) => setNickname(ev.target.value)}
                label={"Enter nickname"}
            />

            <Button variant="outlined" onClick={()=> {
                if(!isUsernameError && !isPasswordError){
                    signup({username, nickname, email, password}).then((stuff)=>console.log(stuff));
                    console.log(12123);
                }
            }}>Sign up</Button>
        </Box>
    )
}
