export async function fetchRepositoriesList(searchValue:string){
    try {
// const response = await fetch(`https://api.github.com/search/repositories?q=${searchValue}`)
//         return response.json()
        console.log(searchValue,'load data')
    }
    catch (error){
        console.log(error)
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
