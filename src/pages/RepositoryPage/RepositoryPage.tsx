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
                    <button
                        className={cls.btn}
                        onClick={() => navigate(-1)}
                    >go back</button>
                    {repository && (
                        <>
                            <img className={cls.logo} src={repository.owner.avatar_url} alt={repository.owner.login}/>
                            <a className={cls.title} href={repository.html_url}>{repository.full_name}</a>
                            <table border={1} className={cls.table}>
                                <caption>Description</caption>
                                <tbody>
                                <tr><td>forks</td><td>{repository.forks}</td></tr>
                                <tr><td>stars</td><td>{repository.stargazers_count}</td></tr>
                                <tr><td>login</td><td>{repository.owner.login}</td></tr>
                                <tr><td>description</td><td>{repository.description}</td></tr>
                                <tr><td>watchers</td><td>{repository.watchers}</td></tr>
                                <tr><td>size</td><td>{repository.size}</td></tr>
                                </tbody>
                            </table>
                        </>
                    )}

                </div>
    );
} else return(
    <Loader/>
)

};

export default RepositoryPage;
