import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Peer } from "peerjs";

const PeerContext = React.createContext();


export const usePeer = ()=>useContext(PeerContext); 

const PeerWrapper = ({ children }) => {
    const peer = useMemo(() => new Peer());
    const [myId, setMyId] = useState(null);
    const [isCall, setCall] = useState(false);
    useEffect(() => {
        peer.on("open", (id) => {
            console.log(id);
            setMyId(id);
        })
    }, [])
    const handleCall = useCallback(async (remoteId) => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            document.querySelector("#user-1").srcObject = stream;
            const call = peer.call(remoteId, stream);
            call.on("stream", (remoteStream) => {
                setCall(true);
                document.querySelector("#user-2").srcObject = remoteStream;
            })
        } catch (error) {
            console.log(error);
        }
    }, [])
    return (<PeerContext.Provider value={{handleCall,peer,isCall,setCall,myId}}>
        {children}
    </PeerContext.Provider>)
}





export default PeerWrapper;