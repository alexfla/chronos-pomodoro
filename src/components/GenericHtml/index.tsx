import styles from './index.module.scss';

type GenericHtmlProps = {
    children: React.ReactNode;
};

export function GenericHtml({ children }: GenericHtmlProps) {
    return (
    <div className={styles.genericHtml}>
        {children}
    </div>
   

);
}