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
  public docentes: Docente[] = [];
  public asignaturas: Asignatura[] = [];
  public consultas: Consulta[] = [];
  public indiceConsultaActual = 0;
  alerts: any[] = [];

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
      .subscribe((consultas) => (this.consultas = consultas));
  }

  llenarDocentes() {
    this.asignaturaDocenteService.getDocentes().subscribe((docentes) => {
      this.docentes = docentes.sort((d1, d2) => {
        let resultado = d1.carreraId - d2.carreraId;
        if (resultado === 0) {
          if (d1.nombre < d2.nombre) {
            resultado = -1;
          } else if (d1.nombre > d2.nombre) {
            resultado = 1;
          }
        }
        return resultado;
      });
    });
  }

  llenarAsignaturas() {
    this.asignaturaDocenteService.getAsignaturas().subscribe((asignaturas) => {
      this.asignaturas = asignaturas.sort((a1, a2) => {
        let resultado = a1.carreraId - a2.carreraId;
        if (resultado === 0) {
          resultado = a1.nivel - a2.nivel;
          if (resultado === 0) {
            if (a1.paralelo < a2.paralelo) {
              resultado = -1;
            } else if (a1.paralelo > a2.paralelo) {
              resultado = 1;
            }
          }
        }
        return resultado;
      });
    });
  }

  aplicarConsulta(consulta: Consulta, indice: number) {
    this.add('info', 'Espere un momento mientras se refresca la pantalla');

    this.indiceConsultaActual = indice;

    this.asignaturas.forEach((value) => (value.visible = false));
    this.docentes.forEach((value) => (value.visible = false));

    const condicionesAsignatura = consulta.filtros.filter(
      (condicion) => condicion.entidad === TipoEntidad.Asignatura
    );
    condicionesAsignatura.forEach((condicion) => {
      const fi = (value: Asignatura) => {
        if (value[condicion.atributo].toString() === condicion.valor) {
          value.visible = true;
        }
      };
      this.asignaturas.forEach(fi);
    });

    const condicionesDocentes = consulta.filtros.filter(
      (condicion) => condicion.entidad === TipoEntidad.Docente
    );
    condicionesDocentes.forEach((condicion) => {
      const fi = (value: Docente) => {
        if (value[condicion.atributo].toString() === condicion.valor) {
          value.visible = true;
        }
      };
      this.docentes.forEach(fi);
    });
  }

  getClassName(carreraId: number): string {
    switch (carreraId) {
      case 0:
        return 'fondo-darkorange';
      case 1:
        return 'fondo-orange';
      case 2:
        return 'fondo-lawngreen';
      case 3:
        return 'fondo-palegreen';
      case 4:
        return 'fondo-coral';
      case 5:
        return 'fondo-cornflowerblue';
      case 6:
        return 'fondo-mediumorchid';
      case 7:
        return 'fondo-paleturquoise';
      case 8:
        return 'fondo-yellow';
      case 9:
        return 'fondo-deeppink';
    }
    return '';
  }

  guardar() {
    // TODO: actualizar la base de datos con los cambios en asignaturas
    this.add('warining', 'El proceso de almacenamiento está en proceso de construcción..');
  }

  mostrar(indice: number): boolean {
    if (indice === 0) {
      return true;
    }
    if (
      this.asignaturas[indice].carreraId ===
        this.asignaturas[indice - 1].carreraId &&
      this.asignaturas[indice].nivel === this.asignaturas[indice - 1].nivel &&
      this.asignaturas[indice].paralelo ===
        this.asignaturas[indice - 1].paralelo
    ) {
      return false;
    }
    return true;
  }

  extenderFilas(indice: number) {
    return this.asignaturas.filter(
      (a) =>
        a.carreraId === this.asignaturas[indice].carreraId &&
        a.nivel === this.asignaturas[indice].nivel &&
        a.paralelo === this.asignaturas[indice].paralelo
    ).length;
  }

  add(tipo: string, mensaje: string): void {
    this.alerts.push({
      type: tipo,
      msg: mensaje,
      timeout: 3000,
    });
  }

  onClosed(dismissedAlert: any): void {
    this.alerts = this.alerts.filter((alert) => alert !== dismissedAlert);
  }

  ngOnInit(): void {
    this.llenarConsultas();
    this.llenarDocentes();
    this.llenarAsignaturas();
    this.aplicarConsulta(
      this.consultas[this.indiceConsultaActual],
      this.indiceConsultaActual
    );
  }
}
