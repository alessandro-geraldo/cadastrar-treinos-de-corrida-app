import { Corrida } from './../model/corrida';
import { Injectable } from '@angular/core';
import { WebStorageUtil } from 'src/app/util/web-storage-util';
import { Constants} from 'src/app/util/constants';

@Injectable({
  providedIn: 'root',
})
export class CorridaService {
  corridas!: Corrida[];
  constructor() {
    this.corridas = WebStorageUtil.get(Constants.USERS_KEY);
  }

  save(corrida: Corrida) {
    this.corridas = WebStorageUtil.get(Constants.USERS_KEY);
    this.corridas.push(corrida);
    WebStorageUtil.set(Constants.USERS_KEY, this.corridas);
  }

  update(corrida: Corrida) {
    this.corridas = WebStorageUtil.get(Constants.USERS_KEY);
    this.delete(corrida.id);
    this.save(corrida);
  }

  delete(id: number): boolean {
    this.corridas = WebStorageUtil.get(Constants.USERS_KEY);
    this.corridas = this.corridas.filter((u) => {
      return u.id?.valueOf() != id?.valueOf();
    });

    WebStorageUtil.set(Constants.USERS_KEY, this.corridas);
    return true;
  }

  isExist(value: number): boolean {
    this.corridas = WebStorageUtil.get(Constants.USERS_KEY);
    for (let u of this.corridas) {
      if (u.id?.valueOf() == value?.valueOf()) {
        return true;
      }
    }
    return false;
  }

  getUsers(): Corrida[] {
    this.corridas = WebStorageUtil.get(Constants.USERS_KEY);
    return this.corridas;
  }
}
