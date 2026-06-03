import { HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunIcon } from 'lucide-react';
import styles from './styles.module.css';
import {  useEffect, useState } from 'react';
import { RouterLink } from '../RouterLinik';

type AvaiLableThemes = 'dark' | 'light';

export function Menu() {
    const [theme, setTheme] = useState<AvaiLableThemes>(() => {
        const storageTheme = (localStorage.getItem('theme') as AvaiLableThemes) || 'dark';
        return storageTheme;
    });

    const nextThemeIcon = {
        dark: <SunIcon />,
        light: <MoonIcon />
    };


    function handleChangeTheme(
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,

    ) {
        event.preventDefault();

        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
       document.documentElement.setAttribute('data-theme', newTheme);
        
    }

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);


    return (

    <nav className={styles.menu}>
        <RouterLink  className={styles.menuLink} href='/' aria-label='Ir para a home' title='Ir para home'>
            <HouseIcon />
        </RouterLink>
         <a className={styles.menuLink} href="/history" aria-label='Ir para o histórico' title='Ir para o histórico'>
            <HistoryIcon />
        </a>
         <a className={styles.menuLink} href="/settings" aria-label='Ir para as configurações' title='Ir para as configurações'>
            <SettingsIcon />
        </a>
         <a className={styles.menuLink} href="/theme" aria-label='Ir para o tema' title='Ir para o tema'
            onClick={handleChangeTheme}>
            {nextThemeIcon[theme]}
        </a>
        
    </nav>
    )
}
