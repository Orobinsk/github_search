import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {fetchRepository} from "../../api/api";
import cls from './RepositoryPage.module.scss'
import {IRepository} from "../../types/types";
import {Loader} from "../../components/Loader/Loader";


const RepositoryPage = () => {
    const {owner, repo} = useParams();
    const [repository, setRepository] = useState<IRepository | null>(null)
    const [loading,setLoading]=useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        if (owner && repo) {
            fetchRepository(owner, repo).then(data => {
                if (data) setRepository(data)
                setLoading(false)
            })
        }
    }, [owner, repo])
if (!loading) {
    return (
                <div className={cls.card}>
                    {repository && (
                        <>
                            <img className={cls.logo} src={repository.owner.avatar_url} alt={repository.owner.login}/>
                            <a className={cls.title} href={repository.html_url}>{repository.full_name}</a>
                            <div className={cls.stars_info}>
                                <p>{repository.forks} forks</p>
                                <p>{repository.stargazers_count} stars</p>
                            </div>
                        </>
                    )}
                    <button onClick={() => navigate(-1)}>go back</button>
                </div>
    );
} else return(
    <Loader/>
)

};

export default RepositoryPage;
