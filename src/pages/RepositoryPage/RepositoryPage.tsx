import React, {useEffect, useState} from 'react';
import {Params, useNavigate, useParams} from "react-router-dom";
import {fetchRepository} from "../../api/api";
import cls from './RepositoryPage.module.scss'
import {REPOSITORY_ROUTE} from "../../utils/const";
import {IRepository} from "../../types/types";

const initialRepositoryState = {
    id: 0,
    name: "",
    full_name: "",
    owner: {
        login: "",
        avatar_url: "",
    },
    html_url: "",
    stargazers_count: 0,
    forks: 0,
};

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

const RepositoryPage = () => {
    const {owner,repo} = useParams();
    const [repository,setRepository]=useState<IRepository>(mockRepository)
    const navigate = useNavigate();

    useEffect(()=>{
        if (owner && repo){
            // fetchRepository(owner,repo).then(data => setRepository(data))
        }
    },[])

    return (
        <div className={cls.card}>
            <img className={cls.logo} src={repository.owner.avatar_url} alt={repository.owner.login}/>
            <a className={cls.title} href={repository.html_url}>{repository.full_name}</a>
            <div className={cls.stars_info}>
                <p>{repository.forks} forks</p>
                <p>{repository.stargazers_count} stars</p>
            </div>
            <button onClick={() => navigate(-1)}>go back</button>
        </div>
    );
};

export default RepositoryPage;
