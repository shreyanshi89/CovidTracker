import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{map} from 'rxjs/operators'
import { GlobalDataSummary } from './models/global-data';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private globalDataUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports_us/01-01-2021.csv';

  constructor( private http : HttpClient) { }

  getGlobalData(){

   return this.http.get(this.globalDataUrl , {responseType : 'text'}).pipe(
     map(result=> {

      let data: GlobalDataSummary[] = [];
       let rows= result.split('\n')
       rows.splice(0,1);
       rows.forEach(row=>{
         let cols = row.split(/,(?=\S)/)
         data.push({
           state :cols[1],
           confirmed : +cols[5],
           deaths : +cols[6],
           recovered : +cols[7],
           active : +cols[8]

         })
          })

          console.log(data);
     return [];
  

     })
   )
  
    }
  }
