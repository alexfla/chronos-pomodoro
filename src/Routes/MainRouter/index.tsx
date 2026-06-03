import { BrowserRouter, Route,  Routes } from "react-router";
import { Home } from "../../pages/Home";
import { NotFound } from "../../pages/NotFound";
import { AboutPomodoro } from "../../pages/AboutPomodoro";
import { History } from "../../pages/History";


function ScrollToTop()  {
    window.scrollTo(0, 0);
    return null;
}

export function MainRouter() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about-pomodoro/' element={<AboutPomodoro />} />
                <Route path='/history/' element={<History />} />

                <Route path='*' element={<NotFound />} />
            </Routes>
            <ScrollToTop />
        </BrowserRouter>
    );
}