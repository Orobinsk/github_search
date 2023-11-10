export interface IRepository {
    "id": number,
    "name": string,
    "full_name": string,
    "owner": {
        "login": string,
        "avatar_url": string,
    },
    "html_url": string,
    "stargazers_count": number,
    "forks": number,
    "description":string,
    "watchers":number,
    "size":number
}

export interface IRepositoriesFetch {
    "total_count": number,
    "incomplete_results": boolean,
    "items": IRepository[]
}

