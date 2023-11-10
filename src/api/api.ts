import {IRepositoriesFetch, IRepository} from "../types/types";

export async function fetchRepositoriesList(searchValue: string, page?:number): Promise<IRepositoriesFetch | null> {
    try {
        const response = await fetch(`https://api.github.com/search/repositories?q=${searchValue}&page=${page || 1}`);
        if (response.status === 403) {
            alert('Слишком частое обращение к серверу. Подождите 1 минуту');
        } else if (response.status >= 200 && response.status < 300) {
            return response.json();
        }
    } catch (error) {
        alert('Произошла ошибка при загрузке данных');
    }
    return null;
}

export async function fetchRepository(owner: string, repo: string): Promise<IRepository | null> {
    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`)
        if (response.status === 403) {
            alert('Слишком частое обращение к серверу. Подождите 1 минуту');
        } else if (response.status >= 200 && response.status < 300) {
            return response.json();
        }
    } catch (error) {
        alert('Произошла ошибка при загрузке данных')
    }
    return null;
}
