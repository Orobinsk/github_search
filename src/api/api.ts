export async function fetchRepositoriesList(searchValue:string){
    console.log(searchValue)
    try {

const response = await fetch(`https://api.github.com/search/repositories?q=${searchValue}`)
// const response = await fetch(`https://api.gi.com/search/repositories?q=${searchValue}`)
        return response.json()
    }
    catch (error){
        alert('Произошла ошибка при загрузке данных')
        // return (error.message)
    }
}

export async function fetchRepository(owner:string, repo:string){
    try {
const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`)
        return response.json()
//         console.log(searchValue,'load data')
    }
    catch (error){
        console.log(error)
    }
}
