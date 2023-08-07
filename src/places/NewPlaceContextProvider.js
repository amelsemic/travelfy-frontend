import { createContext, useEffect, useState} from 'react';
import React from 'react';

export const NewPlaceContext = createContext({
    placeLngLtd: {lng:null, ltd:null},
    setPlace: () => {},
    clearPlace: () => {},
    isValid: false
});

export const NewPlaceContextProvider = (props) =>{

    const [place, setPlace] = useState({lng:null, ltd:null})
    const [placeIsValid, setPlaceIsValid] = useState(false)
    
    useEffect(()=>{
        setPlaceIsValid(!!(place.lng && place.ltd))
    }, [place])
    const setPlaceHandler = (place) => {
        setPlace({lng: place[0], ltd:place[1]})
    }
    const clearPlaceHandler = () =>{
        setPlace({lng:null, ltd:null})
    }


    const ctxValue = {
    placeLngLtd: place,
    setPlace: setPlaceHandler,
    clearPlace: clearPlaceHandler,
    isValid: placeIsValid
    }
    return <NewPlaceContext.Provider value={ctxValue}> {props.children} </NewPlaceContext.Provider>
} 