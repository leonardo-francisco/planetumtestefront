import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Inspection } from "../models/inspection";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class InspectionService{
  constructor(private http: HttpClient) { }

  readonly baseURL = 'https://localhost:7014/gateway/inspection'
  readonly baseURL2 = 'https://localhost:7014/gateway/create-inspection'

  httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json', 'Accept': 'application/json', 'Access-Control-Allow-Origin' : '*'})
  }

  getInspections(): Observable<any> {
    const url = `${this.baseURL}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.get<Inspection[]>(url, { headers });
  }

  addInspection(inspection: Inspection): Observable<Inspection> {
    const url = `${this.baseURL2}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.post<Inspection>(url, inspection, { headers });
  }

}
