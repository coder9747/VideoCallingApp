import React, { useCallback, useEffect, useRef, useState } from 'react'
import { usePeer } from './PeerContext/PeerContext'

const App = () => {
  const { handleCall, peer,isCall,setCall,myId } = usePeer();
  const [remoteId, setRemoteId] = useState("");
  useEffect(() => {
    peer.on("call", async (call) => {
      console.log("Incomming:call");
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        document.querySelector("#user-1").srcObject = stream;
        call.answer(stream);
        setCall(true)
        call.on("stream",(remoteStream)=>
        {
          document.querySelector("#user-2").srcObject = remoteStream;
        })
      } catch (error) {
        console.log(error);
      }
    })
  }, [peer])
  return (
    <div className='relative'>

   {!isCall &&   <div className='flex flex-col bg-violet-300'>
        <div className='text-center'>
          <h1 className='text-center text-2xl font-bold my-2'>Peer-Peer</h1>
          <p className='text-center text-sm md:text-2xl font-semibold text-slate-800'>My id : {myId ?myId:"Loading"}</p>
          <div className='flex justify-around flex-col px-5'>
            <input value={remoteId} onChange={(e) => setRemoteId(e.target.value)} placeholder='Enter Peer Id' type="text" className='h-9 rounded-xl my-2 outline-none px-2' />
            <button onClick={() => handleCall(remoteId)} className='bg-green-500 w-[100px] md:w-[400px] mx-auto my-2 h-10 rounded-xl'>Call</button>
          </div>
        </div>
      </div>}
      <div className='h-screen w-screen flex border border-red-500'>
        <div className='w-1/2'>
          <video className='w-full h-full flex-grow   bg-green-200' autoPlay muted id='user-1'></video>
        </div>
        <div className='w-1/2'>
          <video className='w-full h-full bg-black' autoPlay muted id='user-2'></video>
        </div>
      </div>

    </div>

  )
}

export default App
