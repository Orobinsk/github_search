import React, {FC, useContext, useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import {REPOSITORY_ROUTE} from "../../utils/const";
import RepositoriesList from "../../components/RepositoriesList";
import cls from './MainPage.module.scss'
import {observe} from "web-vitals/dist/modules/lib/observe";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {fetchRepositoriesList} from "../../api/api";


// const mockRepository = {
//     id: 1,
//     name: "kafka-streams-machine-learning-examples",
//     full_name: "confluentinc/kafka-streams-examples",
//     owner: {
//         login: "confluentinc",
//         avatar_url: "https://avatars.githubusercontent.com/u/9439498?v=4",
//     },
//     html_url: "https://github.com/confluentinc/kafka-streams-examples",
//     stargazers_count: 10,
//     forks: 3,
// }
// const mockRepository2 = {
//     id: 2,
//     name: "kafka-streams-machine-learning-examples",
//     full_name: "confluentinc/kafka-streams-examples",
//     owner: {
//         login: "confluentinc",
//         avatar_url: "https://avatars.githubusercontent.com/u/9439498?v=4",
//     },
//     html_url: "https://github.com/confluentinc/kafka-streams-examples",
//     stargazers_count: 10,
//     forks: 3,
// }

const MainPage: FC = observer(() => {
    const [searchValue, setSearchValue] = useState<string>('')
    const [repositories, setRepositories] = useState([])
    const throttleInProgress = useRef(false)
    const [loadData, setLoadData] = useState(false)
    const {favorites} = useContext(Context)

  if (loadData){
        fetchRepositoriesList(searchValue)
            .then(data => setRepositories(data.items))
      setLoadData(false)
    }
    // useEffect(() => {
    //
    //     console.log('load data:', searchValue)
    // }, [loadData])

    function handleThrottle() {
        if (throttleInProgress.current) {
            return;
        }
        throttleInProgress.current = true;
        setTimeout(() => {
            setLoadData(true)


                // .catch(err=>alert(err))
            throttleInProgress.current = false;
        }, 3000);
    }

    function handleInput(e: any) {
        setSearchValue(e.target.value)
        handleThrottle()
    }

    return (
        <div>
            <input
                name="searchRepository"
                type="search"
                autoFocus
                value={searchValue}
                onChange={e => handleInput(e)}
            />
            <button onClick={() => console.log(favorites?.repositories)}>
                get favorites
            </button>
            <div className={cls.wrap_lists}>
                <div className={cls.list}>
                    <h1>Список репозиториев:</h1>
                    <RepositoriesList repositories={repositories}/>
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
