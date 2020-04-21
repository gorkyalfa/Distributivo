import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Asignatura } from './asignatura';
import { Docente } from './docente';
import { Consulta } from './consulta';
import { TipoEntidad } from './tipoEntidad';
import { AsignaturaDocenteService } from './asignatura-docente.service';

@Component({
  templateUrl: 'asignatura-docente.component.html',
  styleUrls: ['./asignatura-docente.component.css'],
})
export class AsignaturaDocenteComponent implements OnInit {
  public docentesTodos: Docente[] = [];
  public asignaturasTodos: Asignatura[] = [];
  public consultasTodos: Consulta[] = [];

  public docentes: Docente[] = [];
  public asignaturas: Asignatura[] = [];

  public consultaActual = 0;

  constructor(
    @Inject(DOCUMENT) public document: any,
    private asignaturaDocenteService: AsignaturaDocenteService
  ) {}

  asignar(asignaturaId: number, docenteId: number) {
    const asignatura = this.asignaturas.filter((x) => x.id === asignaturaId)[0];
    const nuevoDocente = this.docentes.filter((d) => d.id === docenteId)[0];

    if (asignatura.docenteId !== null) {
      const antiguoDocente = this.docentes.filter(
        (d) => d.id === asignatura.docenteId
      )[0];
      antiguoDocente.horas = antiguoDocente.horas - asignatura.horas;
    }
    asignatura.docenteId = docenteId;
    nuevoDocente.horas = nuevoDocente.horas + asignatura.horas;
  }

  llenarConsultas(): void {
    this.asignaturaDocenteService
      .getConsultas()
      .subscribe((consultas) => (this.consultasTodos = consultas));
  }

  llenarDocentes() {
    this.asignaturaDocenteService
      .getDocentes()
      .subscribe((docentes) => (this.docentesTodos = docentes));
  }

  llenarAsignaturas() {
    this.asignaturaDocenteService
      .getAsignaturas()
      .subscribe((asignaturas) => (this.asignaturasTodos = asignaturas));
  }

  aplicarConsulta(consulta: Consulta, indice: number) {
    this.consultaActual = indice;

    this.asignaturas = this.asignaturasTodos;
    this.docentes = this.docentesTodos;

    consulta.filtros
      .filter((f) => f.entidad === TipoEntidad.Asignatura)
      .forEach((f) => {
        const fi = (value: Asignatura, index: number, array: Asignatura[]) =>
          value[f.atributo].parseString() === f.valor;
        this.asignaturas = this.asignaturas.filter(fi);
      });
  }

  ngOnInit(): void {
    this.llenarConsultas();
    this.llenarDocentes();
    this.llenarAsignaturas();
    this.aplicarConsulta(
      this.consultasTodos[this.consultaActual],
      this.consultaActual
    );
  }
}
