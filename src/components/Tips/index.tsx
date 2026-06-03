import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";

export function Tips() {

    const { state } = useTaskContext();
    const nextCycle = getNextCycle(state.currentCycle);
    const nextCycleType = getNextCycleType(nextCycle);

    // Tips
  const tipsForWhenActiveTask = {
    workTime: <span>Foque por {state.config.workTime} minutos</span>,
    shortBreakTime: <span>Descanse por {state.config.shortBreakTime} minutos</span>,
    longBreakTime: <span>Descanso Longo</span>
  };

    const tipsForNoActiveTask = {
    workTime: <span>Próximo ciclo é de {state.config.workTime} minutos</span>,
    shortBreakTime: <span>Próximo descanso é de {state.config.shortBreakTime} minutos</span>,
    longBreakTime: <span>Próximo ciclo é de {state.config.longBreakTime} minutos</span>
  };


return (
<>
    {!!state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
        {!state.activeTask && tipsForNoActiveTask[nextCycleType]}
</>

);

}        