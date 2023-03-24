import React from 'react'
import imgError from './../../../assets/noAutorizado.jpg'

const Message = ({ error }) => {
  console.log(error,'------ERROR');
  let messageError;
  try{ 

    messageError = error.response.data.message;
  }catch{
    messageError = "";
  }
 // error.response.data.message
  return (
    <div>
<h2 align="center">
  {error.message} <p/>
      <img
        src={imgError} alt="error" height="200" width="200" 
      />
      <p/>
      
      </h2>
      <h2>{messageError}</h2>

  
    </div>
  )
}


export default Message;