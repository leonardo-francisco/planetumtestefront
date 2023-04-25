import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InspectionService } from 'src/app/services/inspection.service';

@Component({
  selector: 'app-list-inspections',
  templateUrl: './list-inspections.component.html',
  styleUrls: ['./list-inspections.component.css']
})
export class ListInspectionsComponent implements OnInit {
  displayedColumns: string[] = ['companyId', 'brokerCode', 'productCode', 'productName', 'inspectionNumber',];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(public inspectionService: InspectionService) {
    this.inspectionService.getInspections().subscribe((res) =>{ this.dataSource.data = Object.values(res);})
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

}
