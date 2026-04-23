
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import styles from './styles.module.css'



export function CountDown() {
    const {state}  = useTaskContext();
    //console.log(TaskContext);
    
    
    return (
    <div className={styles.container}>
        {state.formattedSecondsRemaining}
    </div>
    );
}
