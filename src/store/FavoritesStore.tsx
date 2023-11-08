import {makeAutoObservable} from "mobx";
import {IRepository} from "../types/types";

export default class FavoritesStore {
    private _repositories: IRepository[] = []
    constructor() {
        this._repositories = []
        makeAutoObservable(this)
    }
    setRepository(repository: IRepository) {
        const index = this._repositories.findIndex((repo) => repo.id === repository.id);
        if (index === -1) {
            this._repositories.push(repository);
        } else {
            this._repositories.splice(index, 1);
        }
    }

    get repositories(): IRepository[] {
        return this._repositories
    }
}
