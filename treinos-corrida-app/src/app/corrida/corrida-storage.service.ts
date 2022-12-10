import { BehaviorSubject, Observable } from 'rxjs';
import { Constants } from 'src/app/util/constants';
import { Injectable } from '@angular/core';
import { Corrida } from '../model/corrida';
import { WebStorageUtil } from 'src/app/util/web-storage-util';

@Injectable()
export class CorridaStorageService {
  corridas!: Corrida[];
  private corridaSource!: BehaviorSubject<number>;
  constructor() {
    this.corridas = WebStorageUtil.get("runs");
 
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
    this.corridas = WebStorageUtil.get("runs");
    for (let u of this.corridas) {
      if (u.id?.valueOf() == value?.valueOf()) {
        return true;
      }
    }
    return false;
  }

  getUsers(): Corrida[] {   
    return this.corridas = WebStorageUtil.get("runs");
  }

  asObservable(): Observable<number> {
    return this.corridaSource;
  }
}
