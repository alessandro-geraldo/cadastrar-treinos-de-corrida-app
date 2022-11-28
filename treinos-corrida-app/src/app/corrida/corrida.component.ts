import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Corrida } from '../model/corrida';
import {CorridaService} from './corrida.service';
import { Shared } from '../util/Shared';

@Component({
  selector: 'app-corrida',
  templateUrl: './corrida.component.html',
  styleUrls: ['./corrida.component.css']
})
export class CorridaComponent implements OnInit {
  @ViewChild('form') form!: NgForm;

  corrida!: Corrida;
  corridas?: Corrida[];


  isSubmitted!: boolean;
  isShowMessage: boolean = false;
  isSuccess!: boolean;
  message!: string;

  constructor(private corridaService: CorridaService) { }

  ngOnInit(): void {
    Shared.initializeWebStorage(); 
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
    this.corrida = new Corrida(0);
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
  
    onDelete(id: number) {
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
