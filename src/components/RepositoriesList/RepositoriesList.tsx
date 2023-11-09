import React, {FC, useContext} from 'react';
import {useNavigate} from "react-router-dom";
import {REPOSITORY_ROUTE} from "../../utils/const";
import {IRepository} from "../../types/types";
import cls from './RepositoriesList.module.scss'
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import IconEmptyHeart from '../../assets/icons/empty_heart.svg'
import IconFullHeart from '../../assets/icons/full_heart.svg'
import IconStar from '../../assets/icons/star.svg'
import IconFork from '../../assets/icons/forks.svg'

const RepositoriesList: FC<{ repositories: IRepository[] }> = observer(({repositories}) => {
    const navigate = useNavigate()
    const {favorites} = useContext(Context)

    function addFavorites(repo: IRepository) {
        favorites?.setRepository(repo)
    }

    return (
        <>
            {repositories !== undefined && repositories.map(item => (
                <div key={item.id} className={cls.card}>
                    <img className={cls.logo} src={item.owner.avatar_url} alt={item.owner.login}/>
                    <a className={cls.title} href={item.html_url}>{item.full_name}</a>
                    <div className={cls.info_wrap}>
                        <div className={cls.info}>
                            <img className={cls.icon} src={IconFork}/>
                            <p>{item.forks} forks</p>
                        </div>
                        <div className={cls.info}>
                            <img className={cls.icon} src={IconStar}/>
                            <p>{item.stargazers_count} stars</p>
                        </div>
                    </div>
                    <button
                        className={cls.btn}
                        onClick={() => navigate(REPOSITORY_ROUTE + item.full_name)}
                    >
                        Подробнее
                    </button>
                    <button
                        className={cls.btn_like}
                        onClick={() => addFavorites(item)}>
                        {favorites?.repositories.some((repo) => repo.id === item.id) ? (
                            <img src={IconFullHeart} alt="dislike" className={cls.icon}/>
                        ) : (
                            <img src={IconEmptyHeart} alt="like" className={cls.icon}/>
                        )}
                    </button>
                </div>
            ))}
        </>
    );
});

export default RepositoriesList;
