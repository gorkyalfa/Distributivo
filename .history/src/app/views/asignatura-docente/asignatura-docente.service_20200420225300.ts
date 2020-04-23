import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ASIGNATURAS } from './mock-asignaturas';
import { DOCENTES } from './mock-docentes';
import { CONSULTAS } from './mock-consultas';
import { Asignatura } from './asignatura';
import { Docente } from './docente';
import { Consulta } from './consulta';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaDocenteService {

  constructor() { }

  getAsignaturas(): Observable<Asignatura[]> {
    // TODO: send the message _after_ fetching the heroes
    // this.messageService.add('HeroService: fetched heroes');
    return of(ASIGNATURAS);
  }

  getDocentes(): Observable<Docente[]> {
    // TODO: send the message _after_ fetching the heroes
    // this.messageService.add('HeroService: fetched heroes');
    return of(DOCENTES);
  }

  getConsultas(): Observable<Consulta[]> {
    // TODO: send the message _after_ fetching the heroes
    // this.messageService.add('HeroService: fetched heroes');
    return of(CONSULTAS);
  }
}
