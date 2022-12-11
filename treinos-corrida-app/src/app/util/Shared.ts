import { Constants } from './constants';
import { Corrida } from '../model/corrida';

export class Shared {
  constructor() {}

  /**
	Cadastra uma corrida
	Só realiza o cadastro caso o usuário ainda não esteja salvo no WebStorage.
*/
  public static initializeWebStorage(): void {
    if (localStorage.getItem("") != null){
      return;
    }

    
    }

  
  }

