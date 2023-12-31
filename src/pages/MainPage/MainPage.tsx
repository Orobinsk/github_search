import React, {FC, useContext, useRef, useState} from 'react';
import RepositoriesList from "../../components/RepositoriesList/RepositoriesList";
import cls from './MainPage.module.scss'
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {fetchRepositoriesList} from "../../api/api";
import ButtonCopy from "../../components/ButtonCopy";
import {IRepositoriesFetch} from "../../types/types";
import Pagination from "../../components/Pagination";


const MainPage: FC = observer(() => {
    const [searchValue, setSearchValue] = useState<string>('')
    const [data, setData] = useState<IRepositoriesFetch>({total_count: -1, items: [], incomplete_results: false})
    const throttleInProgress = useRef(false)
    const [loadingData, setLoadingData] = useState(false)
    const {favorites} = useContext(Context)
    const [currentPage, setCurrentPage] = useState(1)

    if (loadingData) {
        if (searchValue !== '') {
            fetchRepositoriesList(searchValue, currentPage)
                .then(data => {
                    if (data) setData(data)
                })
        }
        setLoadingData(false)
    }

    function handleThrottle() {
        if (throttleInProgress.current) {
            return;
        }
        throttleInProgress.current = true;
        setTimeout(() => {
            setLoadingData(true)
            throttleInProgress.current = false;
        }, 2000);
    }

    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchValue(e.target.value)
        setCurrentPage(1);
        handleThrottle()
    }


    return (
        <>
            <h1>Поиск GitHub</h1>
            <input
                name="searchRepository"
                type="search"
                autoFocus
                value={searchValue}
                onChange={e => handleInput(e)}
            />
            <ButtonCopy searchValue={searchValue}/>
            <div className={cls.wrap_lists}>
                <div>
                    {data.total_count === 0 &&
                        <h2>Ничего не найдено. Попробуйте изменить критерии поиска</h2>
                    }
                    {data.total_count > 0 &&
                        (<>
                            <h2>Список репозиториев:</h2>
                            <RepositoriesList repositories={data.items}/>
                        </>)}
                </div>
                {favorites?.repositories.length ?
                    (<div>
                            <h2>Избранные
                                репозитории:</h2>
                            <RepositoriesList repositories={favorites?.repositories}/>
                        </div>
                    ) : ''
                }
            </div>
            {data.total_count>1&&
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    total_count={data.total_count}
                    setLoadingData={setLoadingData}
                />
            }
        </>
    );
});

export default MainPage;
