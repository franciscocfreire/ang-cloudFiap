import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from "rxjs";

import { Aluno } from './aluno';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  //private domainUrl = 'https://maven-web-app-20190907161829150.azurewebsites.net' 
  private domainUrl = 'https://maven-web-app-20190907161829150.azurewebsites.net/' 
  private alunosUrl = 'aluno';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }

  deleteAluno( aluno : Aluno | number): Observable<Aluno> {
    const id = typeof aluno === 'number' ? aluno : aluno.idAluno;
    const url = `${this.domainUrl}${this.alunosUrl}/${id}`;
  
    return this.http.delete<Aluno>(url).pipe(
      tap(_ => this.log(`Aluno apgado id=${id}`)),
      catchError(this.handleError<Aluno>('aluno Apagado'))
    );
  }

  addAluno( aluno : Aluno): Observable<Aluno> {
    return this.http.post<Aluno>(this.domainUrl + this.alunosUrl, aluno, this.httpOptions)
    .pipe(
      tap((newAluno : Aluno) => this.log(`adicionado Aluno id=${newAluno.idAluno}`)),
      catchError(this.handleError<Aluno>('addAluno'))
    );
  }

  getAlunos(): Observable<Aluno[]> {    
    return this.http.get<Aluno[]>(this.domainUrl + this.alunosUrl)
      .pipe(
        tap(_ => this.log('fetched alunos pegando todos')),
        catchError(this.handleError<Aluno[]>('getAlunos', []))
      );
  }

   /** GET hero by id. Return `undefined` when id not found */
   getAlunoNo404<Data>(id: number): Observable<Aluno> {
    const url = `${this.domainUrl}${this.alunosUrl}/?id=${id}`;
    return this.http.get<Aluno[]>(url)
      .pipe(
        map(alunos => alunos[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} aluno id=${id}`);
        }),
        catchError(this.handleError<Aluno>(`getAluno id=${id}`))
      );
  }


  getAluno(id: number): Observable<Aluno> {
    
    
    const url = `${this.domainUrl}${this.alunosUrl}/${id}`;

    return this.http.get<Aluno>(url).pipe(
      tap(_=> this.log(`fetched aluno idAluno=${id} UM ALUNO`)),
      catchError(this.handleError<Aluno>(`getAluno ERRO id=${id}`))
    );
  }

  updateAluno(aluno: Aluno): Observable<any> {
    return this.http.put(this.domainUrl + this.alunosUrl, aluno, this.httpOptions)
    .pipe(
      tap(_=> this.log(`updated aluno id=${aluno.idAluno}`)),
      catchError(this.handleError<any>('updateAluno'))
    )
  }

  private log(message: string) {
    this.messageService.add(`AlunoService: ${message}`);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error('oi passei aqui');
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
