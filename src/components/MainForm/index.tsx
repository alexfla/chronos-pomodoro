import { useRef } from "react";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycles } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import type { TaskModel } from "../../models/TaskModel";
import { DefaultInput } from "../DefaultInput";
import { Cycles } from "../Cycles/indes";
import { DefaultButton } from "../DefaltButton";
import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { formatSecondsToMinutes } from "../../utils/formatSecondsToMinutes";




export function MainForm() {
    const { state ,setState } = useTaskContext();
    const taskNameInput = useRef<HTMLInputElement>(null);

    //cilcos
    const nextCycle = getNextCycles(state.currentCycle);
    const nexCycleType = getNextCycleType(nextCycle)

    function handleInterruptTask() {
        if (!state.activeTask)
            return;
        const interruptedTask: TaskModel = {
            ...state.activeTask,
            interruptDate: Date.now()
        };

        setState(prevState => {
            const updatedTasks = prevState.tasks.map(task =>
                task.id === interruptedTask.id ? interruptedTask : task
            );
            return {
                ...prevState,
                tasks: updatedTasks,
                activeTask: null,
                secondsRemaining: 0,
                formattedSecondsRemaining: '00:00',
            };
        });
    }

    function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();

        if (taskNameInput.current === null)
            return;

        const taskName = taskNameInput.current.value.trim();
            if (!taskName) {
                alert('Digite o nome da tarefa');
                return;
            }
            const newTask: TaskModel = {
                id: Date.now().toString(),
                name: taskName,
                startDate: Date.now(),
                completeDate: null,
                interruptDate: null,
                duration: state.config[nexCycleType],
                type: nexCycleType
            };
                const secondsRemaining = newTask.duration * 60

            setState(prevState => {
                return {
                    ...prevState,
                    config: { ...prevState.config},
                    activeTask: newTask,
                    currentCycle: nextCycle,
                    secondsRemaining,
                    formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
                    tasks: [...prevState.tasks, newTask]

                };
            });
    }
    return (
 <form onSubmit={handleCreateNewTask} className='form' action=''>
                    <div className='formRow'>
                        <DefaultInput labelText='Task' id='meuInput' type='text' placeholder='Digite algo' 
                            ref={taskNameInput} 
                            disabled={state.activeTask !== null}
                            />
                    </div>

                    <div className='formRow'>
                        <p>
                            Próximo intervalo 25 min 
                        </p>
                    </div>

                    {state.currentCycle > 0 && (
                    <div className='formRow'>
                        <Cycles />
                    </div>
                     )}

                    <div className='formRow'>
                        {!state.activeTask && (
                            <DefaultButton 
                            aria-label='Iniciar nova tarefa'
                            title='Iniciar nova tarefa'
                            type='submit'
                            icon={<PlayCircleIcon />} 
                            key='start-button'
                            />
                        )} 
                      {  (!!state.activeTask && 
                        <DefaultButton 
                            aria-label='Interrromper tarefa atual'
                            title='Interromper tarefa'
                            type='button'
                            color='red'    
                            icon={<StopCircleIcon />}
                            onClick={handleInterruptTask}
                            key='stop-button'
                            />)}
                    </div>

                    
                </form>

    );
}