import React, {FC, useContext, useRef, useState} from 'react';
import RepositoriesList from "../../components/RepositoriesList";
import cls from './MainPage.module.scss'
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {fetchRepositoriesList} from "../../api/api";
import ButtonCopy from "../../components/ButtonCopy";


const MainPage: FC = observer(() => {
    const [searchValue, setSearchValue] = useState<string>('')
    const [data, setData] = useState({total_count: null, items: []})
    const throttleInProgress = useRef(false)
    const [loadingData, setLoadingData] = useState(false)
    const {favorites} = useContext(Context)

    if (loadingData) {
        if (searchValue !== '') {
            fetchRepositoriesList(searchValue)
                .then(data => {
                    console.log(data)
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

    function handleInput(e: any) {
        setSearchValue(e.target.value)
        handleThrottle()
    }


    return (
        <div>
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
                <div className={cls.list}>
                    <h2>Список репозиториев:</h2>
                    {data.total_count === 0 &&
                        <h2>Ничего не найдено. Попробуйте изменить критерии поиска</h2>
                    }
                    <RepositoriesList repositories={data.items}/>
                </div>
                {favorites?.repositories.length ?
                    (<div className={cls.list}>
                            <h1>Избранные
                                репозитории:</h1>
                            <RepositoriesList repositories={favorites?.repositories}/>
                        </div>
                    ) : ''
                }
            </div>
        </div>
    );
});

export default MainPage;
