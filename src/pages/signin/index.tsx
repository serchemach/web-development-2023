import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useSigninMutation } from "../store/authApi";

export default function Index() {
    const [password, setPassword] = useState("");
    const [isPasswordError, setIsPasswordError] = useState("");
    
    const [email, setEmail] = useState("");

    const [signin] = useSigninMutation();

    return (
        <Box sx={{
            display: "flex", 
            flexDirection: "column", 
            width: "100vw", height: "100vh",
            alignItems: "center", 
            justifyContent: "center"
            }}>

            <TextField 
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                label={"Enter email"}
            />

            <TextField 
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                label={"Enter password"}
                error={!!isPasswordError}
                onBlur={()=>{
                    if (password.match(/^[a-zA-Z]+$/g)){
                        setIsPasswordError("Password should only contain only latin symbols and numbers");
                    }
                }}
                onFocus={()=>{
                    setIsPasswordError("");
                }}
                helperText={isPasswordError}
            />

            <Button variant="outlined" onClick={()=> {
                if(!isPasswordError){
                    signin({email, password}).then((stuff)=>console.log(stuff));
                }
            }}>Sign in</Button>
        </Box>
    )
}
