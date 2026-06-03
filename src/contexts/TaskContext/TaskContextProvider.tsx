import { useEffect, useReducer, useRef } from "react";
import { taskReducer } from "./taskReduce";
import { initialTaskState } from "./initialTaskState";
import { TimerWorkerManager } from "../../workes/TimerWorkerManager";
import { TaskActionTypes } from "./taskActions";
import { TaskContext } from "./TaskContext";
import { loadBeep } from "../../utils/loadBeep";
import type { TaskStateModel } from "../../models/TaskStateModel";



type TaskContextProviderProps = {
    children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {

    const [state, dispatch] = useReducer(taskReducer, initialTaskState, () => {
        const storegeState = localStorage.getItem('state');
       
        if (storegeState === null) return initialTaskState;

         const parsedStorageState = JSON.parse(storegeState) as TaskStateModel;

            return {
                ...parsedStorageState,
                activeTask: null,
                secondsRemaining: 0,
                formattedSecondsRemaining: '00:00',
            
            };
                
       
    });

    const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);              
                
    const worker = TimerWorkerManager.getInstance();

    worker.onmessage(e => {
        const contDownSeconds = e.data;
                
        if (contDownSeconds <= 0) {
            
            if(playBeepRef.current) {
                playBeepRef.current();
                playBeepRef.current = null;
            }
           dispatch({ 
            type: TaskActionTypes.COMPLETE_TASK, });
            worker.terminate();
        } else {
            dispatch({ 
                type: TaskActionTypes.CONT_DOWN, payload: { secondsRemaining: contDownSeconds }, });
        }

    });



    useEffect(() => {
        localStorage.setItem('state', JSON.stringify(state));

        if(!state.activeTask) {
            //console.log('Worker terminado por falta de active task');
            worker.terminate();
        }

        document.title = `${state.formattedSecondsRemaining} - Chromos Pomodoro`;

        worker.postMessage(state);
    }, [worker, state]);

    useEffect(() => {
        if (state.activeTask && playBeepRef.current === null) {
            playBeepRef.current = loadBeep(); 
          
        }   else { playBeepRef.current = null; }
    }, [state.activeTask]);

    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    );

}