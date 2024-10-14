import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../../domain/model/user.model';
import * as fontawesome from '@fortawesome/free-solid-svg-icons';
import { UserDeleteService } from '../../../../services/user/user-delete.service';
import { UserReadService } from '../../../../services/user/user-read.service';
import { faAddressCard, faPlus } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { IgxExcelExporterOptions, IgxExcelExporterService } from 'igniteui-angular';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'task-sync-user-list',
  standalone: true,
  imports: [
    FontAwesomeModule,
    RouterModule,
    CommonModule,
    MatIconModule,
    MatPaginatorModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  fa = fontawesome;
  faAdd = faPlus;
  faAddressCard = faAddressCard;
  users: User[] = [];
  usersCopy: User[] = [];
  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [3,5, 10, 15];
  searchText: string = "";

  constructor(private userReadService: UserReadService, 
    private userDeleteService: UserDeleteService, 
    private toastrService: ToastrService,
    private excelExporter: IgxExcelExporterService,
    public _MatPaginatorIntl: MatPaginatorIntl
  ) {

  }

  ngOnInit(): void {
    this.loadUsers();
    this.length = this.usersCopy.length;

  }

  async loadUsers() {
    this.users = await this.userReadService.findAll();
    this.usersCopy = this.users;
    this.length = this.users.length;
    this._MatPaginatorIntl.itemsPerPageLabel = "Itens por página";
    this._MatPaginatorIntl.previousPageLabel = "Voltar a página anterior";
    this._MatPaginatorIntl.nextPageLabel = "Próxima pagina";
    this._MatPaginatorIntl.getRangeLabel = (page, pageSize, length) => {
      if (length == 0) {
          return `Nenhum resultado encontrado.`;
      }
      const from = page * pageSize + 1;
      const to = Math.min(from + pageSize - 1, length);
      return `${from} - ${to} de ${length}`;};
    
  }

  async deleteUser(userId: string) {
    try {
      console.log('Iniciando a remocao da pessoa' + userId);
      await this.userDeleteService.delete(userId);
      this.toastrService.success('Pessoa excluida com sucesso');

      await this.loadUsers();
    } catch (error) {
      this.toastrService.error('Não foi possível remover a pessoa');

    }

  }
  gerarPdf() {
    window.print()
  }

  handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.users = this.usersCopy.slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize);
  }

  public exportExcelEventList() {
    this.excelExporter.exportData(this.users, new IgxExcelExporterOptions('ExportedDataFile'));

  }



  search(): void {
    let input = document.getElementById('search') as HTMLInputElement;

    let name = input.value;

    if (this.usersCopy.length <= 0 || this.usersCopy == null)
      return;

    if (name == null || name == undefined || name.length <= 0) {
      this.users = this.usersCopy;
      this.searchText = "";
      return;
    }

    this.searchText = name;
    let users = this.usersCopy.filter((predicate) => predicate.name?.toLocaleLowerCase().includes(name.toLocaleLowerCase()) ||
    predicate.id?.toString().toLocaleLowerCase().includes(name.toLocaleLowerCase()));

    if (users == undefined) {
      this.users = [];
      return;
    }
    this.users = users;
  }

}
