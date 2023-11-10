import {MAIN_ROUTE, REPOSITORY_ROUTE} from "./utils/const";
import MainPage from "./pages/MainPage/MainPage";
import RepositoryPage from "./pages/RepositoryPage/RepositoryPage";

export const routes=[
    {
        path: MAIN_ROUTE,
        element: <MainPage/>
    },
    {
        path: REPOSITORY_ROUTE + ':owner/:repo',
        element: <RepositoryPage/>
    },
]
