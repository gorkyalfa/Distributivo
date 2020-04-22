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

  aplicarConsulta(consulta: Consulta, indice: number): void {
    this.add('info', 'Espere un momento mientras se refresca la pantalla');
    this.indiceConsultaActual = indice;
    this.aplicarCondicionesAsignatura(consulta);
    this.aplicarCondicionesDocente(consulta);
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
    this.add(
      'warining',
      'El proceso de almacenamiento está en proceso de construcción..'
    );
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
