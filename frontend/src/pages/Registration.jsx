import Logo from "../assets/onecartlogo.png"
import { useNavigate } from 'react-router-dom'
import google from "../assets/google.png"
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { useContext, useState } from "react";
import { authDataContext } from "../context/authContext";
import axios from "axios"
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase";

function Registration (){
  let [show,setShow] = useState()
  let {serverUrl} = useContext(authDataContext)
  let[name,setName] = useState("")
  let[email,setEmail] = useState("")
  let[password,setPassword] = useState("")
  let navigate = useNavigate()
  const handleSignup = async (e) => {
    e.preventDefault()
    try {
      const result = await axios.post(serverUrl + '/api/auth/registration',{
        name,email,password
      },{withCredentials:true})
      console.log(result.data)
    } catch (error) {
      
    }
  } 

  const googleSignup = async() => {
    try {
      const response = await signInWithPopup(auth, provider)
      let user = response.user
      let name = user.displayName;
      let email = user.email

      const result = await axios.post(serverUrl + "/api/auth/googlelogin",{name,email},
        {withCredentials:true})
        console.log(result.data)

    } catch (error) {
      console.log(error)
    }
  }

  return (
  <div className="w-full h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col items-center justify-start">
    <div className='w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer' onClick={() => navigate("/")}>
    <img className='w-[40px]' src={Logo} alt='' />
    <h1 className='text-[22px] font-sans'>OneCart</h1>
    </div>
    <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]'>
    <span className='text-[25px] font-semibold'>Registration Page</span>
    <span className='text-[16px]'>Welcome to OneCart, Place your order</span>
    </div>
    <div className='max-w-[600px] w-[90%] md:h-[500px] bg-[#00000025] border-[1px] border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center p-6'>
    <form action="" onSubmit={handleSignup} className='w-full flex flex-col items-center justify-center gap-[20px]'>
      <div className='w-full h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] cursor-pointer hover:bg-[#42656c]' onClick={googleSignup}>
        <img src={google} alt="" className='w-[20px]'/>Registration with Google
      </div>
      <div className='w-full flex items-center justify-center gap-[10px] my-4'>
        <div className='flex-grow h-[1px] bg-[#96969635]'></div>
        <span className='mx-2'>OR</span>
        <div className='flex-grow h-[1px] bg-[#96969635]'></div>
      </div>
      <div className='w-full flex flex-col items-center justify-center gap-[15px]'> 
        <input type='text' 
          className='w-[70%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffff] px-[20px] font-semibold focus:outline-none focus:border-blue-500'
          placeholder='UserName'
          required
         onChange={(e)=>setName(e.target.value)} value={name}/>
        <input type='email'
          className='w-[70%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffff] px-[20px] font-semibold focus:outline-none focus:border-blue-500'
          placeholder='Email'
          required 
          onChange={(e)=>setEmail(e.target.value)} value={email}/>

        <div className='relative w-[70%]'>
          <input
            type={show?"text":"password"}
            className='w-full h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffff] px-[20px] font-semibold focus:outline-none focus:border-blue-500 pr-10'
            placeholder='Password'
            required
            onChange={(e)=>setPassword(e.target.value)} value={password}
          />
          { !show && <IoEyeOutline className="absolute right-[4%] top-1/2 -translate-y-1/2 w-[20px] h-[20px] cursor-pointer" onClick={()=>setShow(prev => !prev)}/>}
          { show && <IoEye className="absolute right-[4%] top-1/2 -translate-y-1/2 w-[20px] h-[20px] cursor-pointer"onClick={()=>setShow(prev => !prev)}/>}
        </div>
      </div>
      <button className='w-[70%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mx-[20px] text-[17px] font-semibold hover:bg-[#4a4ae0]'>Create Account</button>
      <p className="flex gap-[10px] p-[5px]">You have any account?<span className="text-[#5555f6cf] text-[17px] font-semibold cursor-pointer hover:text-blue-400" onClick={() => navigate("/login")}>Login</span></p>
    </form>
    </div>
  </div>
  )
}

export default Registration