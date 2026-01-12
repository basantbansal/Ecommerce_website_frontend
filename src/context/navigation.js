

// Ok , i will not use this Context anymore as i am using the React Route lib from - 'react-router-dom' ... it has its custom navigate and currPaths as Location thingy .. idk check the code 

import {createContext,useState,useEffect} from 'react';

const NavigationContext = createContext();

function NavigationProvider({children}){
    const [currentPath,setCurrentPath]=useState(window.location.pathname)

    useEffect(()=>{
        const handle=()=>{
            setCurrentPath(window.location.pathname);
        }

        window.addEventListener('popstate',handle);

        return ()=>{
            window.removeEventListener('popstate',handle);
        };
    },[]);

    const navigate=(to)=>{
        window.history.pushState({}, '', to);
        setCurrentPath(to);
    }

    return (
        <NavigationContext.Provider value={{navigate,currentPath}}>
            {children}
        </NavigationContext.Provider>
    );
}

export { NavigationProvider };
export default NavigationContext;