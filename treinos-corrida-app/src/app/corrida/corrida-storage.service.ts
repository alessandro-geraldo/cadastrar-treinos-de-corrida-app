import { BehaviorSubject, Observable } from 'rxjs';
import { Constants } from 'src/app/util/constants';
import { Injectable } from '@angular/core';
import { Corrida } from '../model/corrida';
import { WebStorageUtil } from 'src/app/util/web-storage-util';

@Injectable({
  providedIn: 'root',
})
export class CorridaStorageService {
  corridas!: Corrida[];
  private userSource!: BehaviorSubject<number>;
  constructor() {
 
  }

  save(corrida: Corrida) {
    this.corridas.push(corrida);
  }

  update(corrida: Corrida) {
    this.delete(corrida.id);
    this.save(corrida);
  }

  delete(id: string): boolean {
    this.corridas = this.corridas.filter((c) => {
      return c.id?.valueOf() != id?.valueOf();
    });

    WebStorageUtil.set(Constants.USERS_KEY, this.corridas);
    return true;
  }

  isExist(value: string): boolean {
    for (let u of this.corridas) {
      if (u.id?.valueOf() == value?.valueOf()) {
        return true;
      }
    }
    return false;
  }

  getUsers(): Corrida[] {
    return this.corridas;
  }

  notifyTotalUsers() {
    this.userSource.next(this.getUsers()?.length);
  }

  asObservable(): Observable<number> {
    return this.userSource;
  }
}
