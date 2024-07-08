import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "../layout/RootLayout.tsx";
import NotFoundPage from "../pages/NotFoundPage";
import Question from "../pages/Question";
import Login from "../pages/Login";
import Header from "../pages/Header";
import Form from "../pages/Form";
import Feedback from "../pages/Feedback";
import LoginUpdate from "../pages/LoginUpdate";

const route = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/admin" element={<RootLayout />}>
                <Route index path="header" element={<Header />} />
                <Route path="form" element={<Form />} />
                <Route index path="feedback" element={<Feedback />} />
                <Route index path="login" element={<LoginUpdate />} />
            </Route>
            <Route path="/question" element={<Question />} />
            <Route path="/">
                <Route index element={<Login />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
        </>
    )
);

export default route;
