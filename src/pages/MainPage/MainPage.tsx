import React, {FC, useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import {REPOSITORY_ROUTE} from "../../const/const";
import RepositoriesList from "../../components/RepositoriesList";
import cls from './MainPage.module.scss'


const mockRepository = {
    id: 1,
    name: "kafka-streams-machine-learning-examples",
    full_name: "confluentinc/kafka-streams-examples",
    owner: {
        login: "confluentinc",
        avatar_url: "https://avatars.githubusercontent.com/u/9439498?v=4",
    },
    html_url: "https://github.com/confluentinc/kafka-streams-examples",
    stargazers_count: 10,
    forks: 3,
}
const mockRepository2 = {
    id: 2,
    name: "kafka-streams-machine-learning-examples",
    full_name: "confluentinc/kafka-streams-examples",
    owner: {
        login: "confluentinc",
        avatar_url: "https://avatars.githubusercontent.com/u/9439498?v=4",
    },
    html_url: "https://github.com/confluentinc/kafka-streams-examples",
    stargazers_count: 10,
    forks: 3,
}

const MainPage: FC = () => {
    const [searchValue, setSearchValue] = useState<string>('')
    const [repositories, setRepositories] = useState([mockRepository,mockRepository2])
    const throttleInProgress = useRef(false);
const [loadData,setLoadData]=useState(false)

    useEffect(() => {
        // fetchData(searchValue).then(data => console.log(data))
        console.log('load data:',searchValue )
    }, [loadData])


    function handleThrottle(){
        if(throttleInProgress.current){ return; }
        throttleInProgress.current = true;
        // console.log('load data2:',searchValue )
        setTimeout(() => {
            setLoadData((prev)=>!prev)
            throttleInProgress.current = false;
        }, 3000);
    }

    function handleInput(e:any){
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
                // onChange={e => setSearchValue(e.target.value)}
                onChange={e => handleInput(e)}
            />
            <div className={cls.wrap_lists}>
                <div className={cls.list}>
                    <h1>Список репозиториев:</h1>
                    <RepositoriesList repositories={repositories}/>
                </div>
                <div className={cls.list}>
                    <h1>Избранные
                        репозитории:</h1>
                    <RepositoriesList repositories={repositories}/>
                </div>
            </div>


        </div>
    );
};

export default MainPage;
