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

  constructor(private asignaturaDocenteService: AsignaturaDocenteService) {}

  private calcularCabeceras(): void {
    this.encerarCabeceras();
    this.calcularCabeceraVisible();
    this.calcularCabeceraRowSpan();
  }

  private encerarCabeceras(): void {
    this.asignaturas.forEach(a => {
      a.cabeceraVisible = false;
      a.cabeceraRowSpam = 0;
    });
  }

  private calcularCabeceraVisible(): void {
    this.asignaturas.filter(a => a.visible).forEach((actual, indice, arreglo) => {
      if (indice === 0) {
        actual.cabeceraVisible = true;
      } else if (!this.cabecerasIguales(actual, arreglo[indice - 1])) {
        actual.cabeceraVisible = true;
      }
    });
  }

  private cabecerasIguales(actual: Asignatura, anterior: Asignatura): boolean {
    return actual.carreraId === anterior.carreraId
      && actual.nivel === anterior.nivel
      && actual.paralelo === anterior.paralelo;
  }

  private calcularCabeceraRowSpan(): void {
    this.asignaturas.filter(a => a.visible).forEach((actual, indice, arreglo) => {
      const iguales = arreglo.filter(a =>
        a.carreraId === actual.carreraId &&
        a.nivel === actual.nivel &&
        a.paralelo === actual.paralelo
      );
      iguales.forEach(i => i.cabeceraRowSpam = iguales.length);
    });
  }

  getClassName(carreraId: number): string {
    switch (carreraId) {
      case 0:
        return 'fondo-brown';
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

  private nuevoMensaje(tipo: string, mensaje: string): void {
    this.alerts.push({
      type: tipo,
      msg: mensaje,
      timeout: 2000,
    });
  }

  onClosed(dismissedAlert: any): void {
    this.alerts = this.alerts.filter((alert) => alert !== dismissedAlert);
  }

  enlazarAsignaturaDocente(asignaturaId: number, docenteId: number): void {
    const asignatura = this.asignaturas.find((a) => a.id === asignaturaId);
    this.retirarDocenteActual(asignatura);
    const nuevoDocente = this.docentes.find((d) => d.id === docenteId);
    nuevoDocente.horas = nuevoDocente.horas + asignatura.horas;
    asignatura.docenteId = docenteId;
  }

  private retirarDocenteActual(asignatura: Asignatura): void {
    if (asignatura.docenteId !== null) {
      const docenteActual = this.docentes.find((d) => d.id === asignatura.docenteId);
      docenteActual.horas = docenteActual.horas - asignatura.horas;
      asignatura.docenteId = null;
    }
  }

  private llenarConsultas(): void {
    this.asignaturaDocenteService
      .getConsultas()
      .subscribe((consultas) => (this.consultas = consultas));
  }

  private llenarDocentes(): void {
    this.asignaturaDocenteService.getDocentes().subscribe((docentes) => {
      // ordenar por carrera y nombre
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

  private llenarAsignaturas(): void {
    this.asignaturaDocenteService.getAsignaturas().subscribe((asignaturas) => {
      // ordenar por carrera, nivel, paralelo
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

  private aplicarCondicionesDocente(consulta: Consulta): void {
    this.docentes.forEach((value) => (value.visible = false));
    const condicionesDocentes = consulta.filtros.filter((condicion) => condicion.entidad === TipoEntidad.Docente);
    condicionesDocentes.forEach((condicion) => {
      const fi = (value: Docente) => {
        if (value[condicion.atributo].toString() === condicion.valor) {
          value.visible = true;
        }
      };
      this.docentes.forEach(fi);
    });
  }

  private aplicarCondicionesAsignatura(consulta: Consulta): void {
    this.asignaturas.forEach((value) => (value.visible = false));
    const condicionesAsignatura = consulta.filtros.filter((condicion) => condicion.entidad === TipoEntidad.Asignatura);
    condicionesAsignatura.forEach((condicion) => {
      const fi = (value: Asignatura) => {
        if (value[condicion.atributo].toString() === condicion.valor) {
          value.visible = true;
        }
      };
      this.asignaturas.forEach(fi);
    });
  }

  aplicarConsulta(consulta: Consulta, indice: number): void {
    this.nuevoMensaje('info', 'Espere un momento mientras se refresca la pantalla');
    this.indiceConsultaActual = indice;
    this.aplicarCondicionesAsignatura(consulta);
    this.aplicarCondicionesDocente(consulta);
    this.calcularCabeceras();
  }

  asignaturasVisibles(): Asignatura[] {
    return this.asignaturas.filter(a => a.visible === true);
  }

  docentesVisibles(): Docente[] {
    return this.docentes.filter(d => d.visible === true);
  }

  guardar(): void {
    // TODO: actualizar la base de datos con los cambios en asignaturas
    this.nuevoMensaje(
      'warning',
      'El proceso de almacenamiento está en proceso de construcción..'
    );
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
