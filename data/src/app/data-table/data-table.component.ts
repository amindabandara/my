import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-table/data.services';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  comments: any[] = [];
  filteredComments: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  searchText = '';
  sortDirection: { [key: string]: 'asc' | 'desc' } = { id: 'asc', email: 'asc' };

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getComments().subscribe((data: any[]) => {
      this.comments = data;
      this.updateTable();
    });
  }

  get totalPages(): number {
    return Math.ceil(this.comments.length / this.itemsPerPage);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updateTable();
  }

  updateTable() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.filteredComments = this.comments.slice(start, end);
  }

  search(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchText = inputElement.value;
    this.filteredComments = this.comments.filter(comment =>
      comment.body.includes(this.searchText) || 
      comment.email.includes(this.searchText)
    );
  }

  sortBy(column: string) {
    this.sortDirection[column] = this.sortDirection[column] === 'asc' ? 'desc' : 'asc';
    this.comments.sort((a, b) => {
      if (a[column] < b[column]) return this.sortDirection[column] === 'asc' ? -1 : 1;
      if (a[column] > b[column]) return this.sortDirection[column] === 'asc' ? 1 : -1;
      return 0;
    });
    this.updateTable();
  }
}
