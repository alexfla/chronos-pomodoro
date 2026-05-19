import { useEffect, useReducer, useState } from "react";
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./TaskContext";


type TaskContextProviderProps = {
    children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
    const [state, setState] = useState(initialTaskState);

    type ActionType = {
        type: string,
        payload?: number;
    }
    const [myState, dispatch] = useReducer((state, action: ActionType) => {
        console.log(state, action);

        switch (action.type) {
          case 'INCREMENT':
            if (!action.payload) return state;
            return { ...state, secondsRemaining: state.secondsRemaining + (action.payload) };
        }
        return state;
     },  
     {
        secondsRemaining: 0,
     }

);

   // useEffect(() =>{
     //   console.log(state)
   // }, [state])
    return  (<TaskContext.Provider
         value={ { state, setState } }>
           <h1>o { JSON.stringify(myState) }</h1>
           <button onClick={() => dispatch({ type: 'INCREMENT', payload: 10 })}>Increment</button>
            </TaskContext.Provider>);
};