'use client'
import { TextField } from "@/node_modules/@mui/material/index";
import React, {useState, ChangeEvent} from "react";

export default function Home() {
  const [userInput, setuserInput] = useState<string>('');
  const inputHandler = (event : ChangeEvent<HTMLInputElement>) => {
    setuserInput(event.target.value);
  }


  return (
    <div>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" 
        value = {userInput} 
        onChange={inputHandler} />
        {userInput}
    </div>
    
  );
}
