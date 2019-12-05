import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { routeurls } from '../../routeurls/routeurls';
import { Observable,of } from 'rxjs';
import { map,catchError,retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SalesVoucherService {

  constructor(private http:HttpClient) { }

  Add(formval : any): Observable<any>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'});
      let options = { headers: headers };
    //let header = headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    return this.http.post(routeurls.BASE_API_URL + routeurls.SALES_VOUCHER_API_BASE_URL,formval,options)
  }
  getAll(): Observable<any> {
    return this.http.get<any>(routeurls.BASE_API_URL + routeurls.SALES_VOUCHER_API_BASE_URL).pipe(
      retry(3),
      map(res => {
        //console.log(res);
        if (!res) {
          throw new Error('Value expected!');
        }
        //console.log(res);
        return res;
      }),
      catchError(err => of([]))
    );//.pipe(map(response => response as productmodels));//.subscribe(result => {console.log(result);});
  }
  getbystudent(clientName: any): Observable<any> {
    return this.http.get<any>(routeurls.BASE_API_URL + routeurls.SALES_VOUCHER_API_BASE_URL + "/getbystudent", { params: new HttpParams().set('studentname', clientName) }).pipe(
      retry(3),
      map(res => {
        //console.log(res);
        if (!res) {
          throw new Error('Value expected!');
        }
        //console.log(res);
        return res;
      }),
      catchError(err => of([]))
    );
  }
  getbyclientstudent(clientName: any,student): Observable<any> {
    return this.http.get<any>(routeurls.BASE_API_URL + routeurls.SALES_VOUCHER_API_BASE_URL + "/getbyclientstudent", { params: new HttpParams().set('studentname', student).set('client', clientName)  }).pipe(
      retry(3),
      map(res => {
        console.log(res);
        if (!res) {
          throw new Error('Value expected!');
        }
        console.log(res);
        return res;
      }),
      catchError(err => of([]))
    );
  }
  getbygroup(gr:any): Observable<any> {
    //console.log(gr.toString());
    return this.http.get<any>(routeurls.BASE_API_URL + routeurls.SALES_VOUCHER_API_BASE_URL + "/getbygroup", { params: new HttpParams().set('group', gr.toString()) })
    .pipe(
      retry(3),
      map(res => {
        //console.log(res);
        if (!res) {
          throw new Error('Value expected!');
        }
        //console.log(res);
        return res;
      }),
      catchError(err => of([]))
    );//.pipe(map(response => response as productmodels));//.subscribe(result => {console.log(result);});
  }
  getbydate(dat1,dat2): Observable<any> {

    return this.http.get<any>(routeurls.BASE_API_URL + routeurls.SALES_VOUCHER_API_BASE_URL + "/getbydate", { params: new HttpParams().set('date1', dat1).set('date2',dat2) })
    .pipe(
      retry(3),
      map(res => {
        if (!res) {
          throw new Error('Value expected!');
        }
        return res;
      }),
      catchError(err => of([]))
    );
  }
  getbydateclient(dat1,dat2, client): Observable<any> {
    return this.http.get<any>(routeurls.BASE_API_URL + routeurls.SALES_VOUCHER_API_BASE_URL + "/getbydateclient", { params: new HttpParams().set('date1', dat1).set('date2',dat2).set('client',client) })
    .pipe(
      retry(3),
      map(res => {
        if (!res) {
          throw new Error('Value expected!');
        }
        return res;
      }),
      catchError(err => of([]))
    );
  }
  getbydateemployee(dat1,dat2, employee): Observable<any> {
    return this.http.get<any>(routeurls.BASE_API_URL + routeurls.SALES_VOUCHER_API_BASE_URL + "/getbydateemployee", { params: new HttpParams().set('date1', dat1).set('date2',dat2).set('employee',employee) })
    .pipe(
      retry(3),
      map(res => {
        if (!res) {
          throw new Error('Value expected!');
        }
        return res;
      }),
      catchError(err => of([]))
    );
  }
  getbydateclientstudent(dat1,dat2, client,student): Observable<any> {
    return this.http.get<any>(routeurls.BASE_API_URL + routeurls.SALES_VOUCHER_API_BASE_URL + "/getbydateclientstudent", { params: new HttpParams().set('date1', dat1).set('date2',dat2).set('client',client).set('student',student) })
    .pipe(
      retry(3),
      map(res => {
        if (!res) {
          throw new Error('Value expected!');
        }
        return res;
      }),
      catchError(err => of([]))
    );
  }
  getbyid(id: any): Observable<any> {
    return this.http.get<any>(routeurls.BASE_API_URL + routeurls.SALES_VOUCHER_API_BASE_URL + "/getbyid", { params: new HttpParams().set('id', id) })
    .pipe(
      retry(3),
      map(res => {
        //console.log(res);
        if (!res) {
          throw new Error('Value expected!');
        }
        //console.log(res);
        return res;
      }),
      catchError(err => of([]))
    );
  }
  update(id: any, obj: any): Observable<any> {
    obj.Id = id;
    //console.log(obj);
    return this.http.put<any>(routeurls.BASE_API_URL + routeurls.SALES_VOUCHER_API_BASE_URL , obj)
    .pipe(
      retry(3),
      map(res => {
        //console.log(res);
        if (!res) {
          throw new Error('Value expected!');
        }
        //console.log(res);
        return res;
      }),
      catchError(err => of([]))
    );
  }
  delete(id: any): Observable<any> {
    return this.http.delete<any>(routeurls.BASE_API_URL + routeurls.SALES_VOUCHER_API_BASE_URL, { params: new HttpParams().set('id', id) });
  }
}
