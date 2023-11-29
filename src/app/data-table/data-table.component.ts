import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  pageSize = 10
  pageNumber = 1
  pageArray: number[] = []
  filteredList: any[] = []
  filterText = ""
  data: any

  constructor(public httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.getPostData().then((data: any) => {
      console.log(data)
      this.data = data
      this.filterList();
      this.setpageNumbers()
    })
  }
  
  setpageNumbers(){
    this.pageArray = []
    let pageArrayCount = 0
    this.filteredList.forEach((eachItem, eachItemIndex) => {
      if(eachItemIndex % 10 == 0){
        pageArrayCount = pageArrayCount + 1
        this.pageArray.push(pageArrayCount)
      }
    })
  }
  
  getPaginatedList(){
    return this.filteredList?.slice((this.pageNumber - 1) * this.pageSize, ((this.pageNumber - 1) * this.pageSize) + 10)
  }

  filterList(){
    if(this.filterText != ""){
      this.filteredList = this.data.posts.filter((f: any) => f.body.includes(this.filterText) || f.title.includes(this.filterText) || f.tags.includes(this.filterText))
    }
    else{
      this.filteredList = this.data.posts;
    }

    this.setpageNumbers()
  }
}
