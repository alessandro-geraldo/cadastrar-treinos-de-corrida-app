import { CorridaPromiseService } from './../services/corrida-promise.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Corrida } from '../model/corrida';
import {CorridaService} from '../services/corrida.service';
import { Shared } from '../util/Shared';
import { CorridaStorageService } from './corrida-storage.service';
import { WebStorageUtil } from '../util/web-storage-util';


@Component({
  selector: 'app-corrida',
  templateUrl: './corrida.component.html',
  styleUrls: ['./corrida.component.css'],
  providers: [CorridaStorageService]
})
export class CorridaComponent implements OnInit {
  @ViewChild('form') form!: NgForm;

  corrida!: Corrida;
  corridas?: Corrida[];


  isSubmitted!: boolean;
  isShowMessage: boolean = false;
  isSuccess!: boolean;
  message!: string;

  constructor(
    private corridaService: CorridaStorageService,
    private corridaPromiseService: CorridaPromiseService
    ) { }

  ngOnInit(): void {
    Shared.initializeWebStorage();
    this.corrida = new Corrida('');
    this.corridas = this.corridaService.getUsers();
    this.corridaPromiseService
    .getByCorrida()
    .then((c: Corrida[] | undefined) => {
      this.corrida = c![0];
      localStorage.setItem(this.corrida.id, JSON.stringify(this.corrida));
    })
    .catch((e) => {
      //erro ao pegar do json-server
      this.corrida = WebStorageUtil.get(this.corrida.id);
    }); 
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.corridaService.isExist(this.corrida.id)) {
      this.corridaService.save(this.corrida);
    } else {
      this.corridaService.update(this.corrida);
    }
    this.isShowMessage = true;
    this.isSuccess = true;
    this.message = 'Cadastro realizado com sucesso!';
    this.form.reset();
    this.corrida = new Corrida("");
    this.corridas = this.corridaService.getUsers();
  }

   /**
   * Realiza o clone do objeto, justamente para não refletir as mudanças
   * imediatamente na lista de usuários cadastrados sem pressionar o submit.
   * @param corrida
   */
    onEdit(corrida: Corrida) {
      
      let clone = Corrida.clone(corrida);
      this.corrida = clone;
    }
  
    onDelete(id: string) {
      let confirmation = window.confirm(
        'Você tem certeza que deseja remover ' + id
      );
      if (!confirmation) {
        return;
      }
      let response: boolean = this.corridaService.delete(id);
      this.isShowMessage = true;
      this.isSuccess = response;
      if (response) {
        this.message = 'O item foi removido com sucesso!';
      } else {
        this.message = 'Opps! O item não pode ser removido!';
      }
      this.corridas = this.corridaService.getUsers();
    }

}
