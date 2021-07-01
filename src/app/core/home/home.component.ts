import { Component, OnInit } from '@angular/core';
import { OperationsService } from 'src/app/services/operations.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private operationsService: OperationsService) {}

  operations = [];
  ngOnInit(): void {
    this.operationsService
      .getOperationsByUserId(5)
      .subscribe((response: any) => {
        this.operations = response.content;
      });
  }
}
