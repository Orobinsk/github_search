import React, {FC, memo, useRef} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {REPOSITORY_ROUTE} from "../const/const";
import {IRepository} from "../types/types";
import cls from './RepositoriesList.module.scss'

const RepositoriesList: FC<{ repositories: IRepository[] }> = memo(({repositories}) => {
const navigate=useNavigate()

    return (
        <>
            {repositories.map(item => (
                <div key={item.id} className={cls.card}>
                    <img className={cls.logo} src={item.owner.avatar_url} alt={item.owner.login}/>
                    <a className={cls.title} href={item.html_url}>{item.full_name}</a>
                    <div className={cls.stars_info}>
                        <p>{item.forks} forks</p>
                        <p>{item.stargazers_count} stars</p>
                    </div>
                    <button
                        className={cls.btn}
                    onClick={()=>navigate(REPOSITORY_ROUTE+item.full_name)}
                    >
                        Подробнее
                    </button>
                </div>
            ))}
        </>
    );
});

export default RepositoriesList;
