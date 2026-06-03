import { TrashIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaltButton";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../templates/MainTemplate";
import styles from './styles.module.css';
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { formatDate } from "../../utils/formatDate";
import { getTaskStatus } from "../../utils/getTaskStatus";
import { sortTasks, type SortTasksOptions } from "../../utils/sortTasks";
import { useEffect, useState } from "react";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";




export function History() {
       const {state, dispatch} = useTaskContext();
       const hasTasks = state.tasks.length > 0; 

       const [sortTasksOptions, setSortTaskOptions] = useState<SortTasksOptions>(() => {
        return {
            tasks: sortTasks({tasks: state.tasks, field: 'startDate', direction: 'desc'}),
            field: 'startDate',
            direction: 'desc'
        };
       },
    );

    useEffect(() => {
        setSortTaskOptions(prevState => ({
            ...prevState,
            tasks: sortTasks({
                tasks: state.tasks,
                field: prevState.field,
                direction: prevState.direction,
            }),
        }));
    }, [state.tasks]);

function handledSortTasks({field}: Pick<SortTasksOptions, 'field'>) {
    const newDirection = sortTasksOptions.direction === 'desc' ? 'asc' : 'desc';

    setSortTaskOptions({
        tasks: sortTasks({
            direction: newDirection,
            tasks: sortTasksOptions.tasks,
            field,
        }),
        direction: newDirection,
        field,
    });
}       

function handLeResetHistory() {
    if (!confirm('Tem certeza que deseja apagar o histórico? Essa ação não pode ser desfeita.')) {
        return
    }
    dispatch({type: TaskActionTypes.RESET_STATE});
    };

    return (
       <MainTemplate>
            <Container>
                 
                <Heading>
                    <span>History</span>
                    {hasTasks && (
                    <span className={styles.buttonContainer}>
                        <DefaultButton icon={< TrashIcon />} color='red' aria-label='Apagar histórico'
                        title='Apagar histórico'
                        onClick={handLeResetHistory}
                        />
                    </span>
                    )}
                </Heading>
            </Container>

            <Container>
               {hasTasks && (               
                <div className={styles.responsiveTable}>
                    <table>
                        <thead>
                            <tr>
                                <th onClick={() => handledSortTasks({field: 'name'})} className={styles.thSort}>Tarefa</th>
                                <th onClick={() => handledSortTasks({field: 'duration'})} className={styles.thSort}>Duração</th>
                                <th onClick={() => handledSortTasks({field: 'startDate'})} className={styles.thSort}>Data</th>
                                <th className={styles.thSort}>Status</th>
                                <th className={styles.thSort}>Tipo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortTasksOptions.tasks.map((task) => {
                                const taskTypeDictionary = {
                                    workTime: 'Foco',
                                    shortBreakTime: 'Descanso curto',
                                    longBreakTime: 'Descanso longo',
                                    
                                };
                                return (
                                <tr key={task.id}>
                                    <td>{task.name}</td>
                                    <td>{task.duration} min</td>
                                    <td>{formatDate(task.startDate)}</td>
                                    <td>{getTaskStatus(task, state.activeTask)}</td>
                                    <td>{taskTypeDictionary[task.type] || task.type}</td>
                                </tr>
                            )})}
                            
                        </tbody>
                    </table>
                </div>
                 )}
                {!hasTasks && (<p style={{ textAlign: 'center', fontWeight: 'bold' }}>Nenhuma tarefa encontrada no histórico.</p>)}
            </Container>
        </MainTemplate>
    );
}

