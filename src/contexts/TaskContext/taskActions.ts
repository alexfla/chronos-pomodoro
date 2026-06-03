import type { TaskModel } from "../../models/TaskModel";
import type { TaskStateModel } from "../../models/TaskStateModel";


export enum TaskActionTypes {
    START_TASK = 'START_TASK',
    INTERRUPT_TASK = 'INTERRUPT_TASK',
    RESET_STATE = 'RESET_STATE',
    CONT_DOWN = 'CONT_DOWN',
    COMPLETE_TASK = 'COMPLETE_TASK',
    CHANGE_SETTINGS = 'CHANGE_SETTINGS',
}

export type TaskActionWhithPayload = 
| {
    type: TaskActionTypes.START_TASK;
    payload: TaskModel;
}|
{
    type: TaskActionTypes.CONT_DOWN;
    payload: { secondsRemaining: number };
} |
{
    type: TaskActionTypes.CHANGE_SETTINGS;
    payload: TaskStateModel['config'];

};  

export type TaskActionWhithoutPayload = 
|{
    type: TaskActionTypes.RESET_STATE,
    
}| 
{
    type: TaskActionTypes.INTERRUPT_TASK,
   
}|
{
    type: TaskActionTypes.COMPLETE_TASK;
    
};


export type TaskActionModel = | TaskActionWhithPayload | TaskActionWhithoutPayload;

