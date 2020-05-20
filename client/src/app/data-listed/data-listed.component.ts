import { Component, ViewChild, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-data-listed',
  templateUrl: './data-listed.component.html',
  styleUrls: ['./data-listed.component.css']
})
export class DataListedComponent implements OnInit, OnChanges {

  dataSource;
  displayedColumns: string[];
  dataDetails = {
    users: ['name', 'email', 'company', 'active', 'solde', 'actions'],
    cars: ['mark', 'chassis', 'immatriculation', 'circulation', 'moteur', 'actions']
    // cars: ['mark', 'modele', 'chassis', 'immatriculation', 'circulation', 'moteur', 'couleur', 'user', 'actions']
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() data: any[];
  @Input() type: string;

  constructor(
    private userService: UsersService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data.currentValue) {
      console.log(this.data);
      this.createTable(this.data);
    }
  }

  openDialog(data: any): void {
    let dataDisplay = {};
    if (this.type === 'users') {
      dataDisplay = { title: data.name, type: 'user', message: 'Voulez-vous supprimer cette utilisateur?', item: data };
    } else if (this.type === 'cars') {
      const titlePop = data.mark.name + '-' + data.modele.name + ' (' + data.immatriculation + ')';
      dataDisplay = { title: titlePop, type: 'car', message: 'Voulez-vous supprimer cette voiture?', item: data };
    }
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: dataDisplay
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (this.type === 'users') {
          this.removeUser(result);
        }
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  modeEdit(data: any) {
    data.edited = !data.edited;
  }

  edit(event: any, data: any, field: string) {
    if (this.type === 'users') {
      this.editUser(event, data, field);
    }
  }

  private editUser(event: any, data: any, field: string) {
    if (field === 'name') {
      data.name = event;
    }
    if (field === 'email') {
      data.email = event;
    }
    if (field === 'active') {
      data.active = event;
    }
    if (field === 'company') {
      data.company = event;
    }
    this.userService.userUpdate(data).subscribe(u => console.log(u));
  }

  private removeUser(user: any) {
    this.userService.userDelete(user._id).subscribe(response => {
      this.data = this.data.filter(u => u !== user);
      this.createTable(this.data);
    });
  }

  private createTable(data: any[]) {
    this.displayedColumns = this.dataDetails[this.type];
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
