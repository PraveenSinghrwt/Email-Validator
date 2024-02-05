import React, { useState } from 'react';
import './App.css';
import Spinner from './Components/Spinner';

export default function App() {
  const [user, setUser] = useState("");
  const [domain, setDomain] = useState("");
  const [score, setScore] = useState("");
  const [state, setState] = useState("");
  const [reason, setReason] = useState("");

  const [spinner, setSpinner] = useState(false);
  const [validate, setValidate] = useState(false);
  const[apiValidation, setApiValidation] = useState(false);
  const [validateError, SetValidateError] = useState(false);

  const validateEmail = async () => {
    setSpinner(true);
    let email = document.getElementById('emailInput').value;
    let api = `https://api.emailvalidation.io/v1/info?apikey=ema_live_rychdrnv69bYU5uYxUYEdCsMuQwEhOTR1gSPTFF6&email=${email}`;

    let res = await fetch(api);

    if(res.state === 429){setApiValidation(true)};

    if(res.status === 404 || res.status === 422){
      setSpinner(false); 
      SetValidateError(true);
      setTimeout(() => {
        SetValidateError(false);
      }, 3000);
    }

    if(res.status === 200)
    {
      let resJson = await res.json();
      console.log(resJson);
  
      setUser(resJson.user);
      setDomain(resJson.domain);
      setScore(resJson.score);
      setState(resJson.state);
      setReason(resJson.reason);
  
      setSpinner(false);
      setValidate(true);
    }
  }

  return (
    <div className='bg-gray-100 min-h-screen flex sm:items-center justify-center'>
      <div style={{ boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px" }} className='bg-white px-8 py-4 h-fit rounded-md w-80 sm:w-96 text-center relative top-20 sm:top-0'>
        <h1 className='font-bold text-xl'>Email Validator</h1>

        <input
          id='emailInput'
          className='mb-4 mt-4 outline-none border border-slate-400 focus:border-slate-600 w-full h-10 pl-4 rounded-md'
          type="email"
          placeholder='Enter email here'
        />
        <button
          id='validateBtn'
          onClick={validateEmail}
          className='bg-blue-500 active:bg-blue-700 text-white p-2 rounded-md w-full'
        >
          Validate
        </button>


        { spinner && <Spinner></Spinner> }
        { apiValidation && <p className=' text-blue-800 font-bold mt-2'>API Key Exhausted!</p>}
        { validateError && <p className=' text-red-600 mt-2'>Validation Error!</p>}

        {
          validate &&
          <div>
            <hr className="my-4 border-t-2 border-gray-300" />
            <div className='mt-4 text-center'>
              <h1 className='text-lg font-semibold text-black'>Validation Results</h1>
              <div className='mt-2'>
                <div className='border border-slate-100 px-5 py-2 mt-[0.1rem] bg-gray-200 rounded-md'>User: {user}</div>
                <div className='border border-slate-100 px-5 py-2 mt-[0.1rem] bg-gray-200 rounded-md'>Domain: {domain}</div>
                <div className='border border-slate-100 px-5 py-2 mt-[0.1rem] bg-gray-200 rounded-md'>Score: {score}</div>
                <div className='border border-slate-100 px-5 py-2 mt-[0.1rem] bg-gray-200 rounded-md'>State: {state}</div>
                <div className='border border-slate-100 px-5 py-2 mt-[0.1rem] bg-gray-200 rounded-md'>Reason: {reason}</div>
              </div>
            </div>
          </div>
        }

      </div>
    </div>
  );
}
