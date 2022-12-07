import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
  } from '@angular/router';
  
  import { Constants } from 'src/app/util/constants';
  import { Injectable } from '@angular/core';
  import { Corrida } from './../model/corrida';
  import { WebStorageUtil } from 'src/app/util/web-storage-util';
  
  @Injectable()
  export class AuthenticationGuard implements CanActivate {
    constructor(private router: Router) {}
  
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): boolean {
      let url: string = state.url;
      let corrida: Corrida = WebStorageUtil.get(Constants.USERNAME_KEY) as Corrida;
  
      if (!corrida) {
        //redireciona para uma view para explicar o que aconteceu
        this.router.navigateByUrl('/nao-autorizado');
        return false;
      }
  
    //   if (!corrida.isAdmin) {
    //     //redireciona para uma view para explicar o que aconteceu
    //     this.router.navigateByUrl('/nao-autorizado');
    //     return false;
    //   }
  
      return true;
    }
  }
  