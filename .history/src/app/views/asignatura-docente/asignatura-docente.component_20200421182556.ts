import { Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Asignatura } from "./asignatura";
import { Docente } from "./docente";
import { Consulta } from "./consulta";
import { TipoEntidad } from "./tipoEntidad";
import { AsignaturaDocenteService } from "./asignatura-docente.service";

@Component({
  templateUrl: "asignatura-docente.component.html",
  styleUrls: ["./asignatura-docente.component.css"],
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
    this.asignaturaDocenteService.getDocentes().subscribe(
      (docentes) =>
        (this.docentesTodos = docentes.sort((d1, d2) => {
          let resultado = d1.carreraId - d2.carreraId;
          if (resultado === 0) {
            if (d1.nombre < d2.nombre) {
              resultado = -1;
            } else if (d1.nombre > d2.nombre) {
              resultado = 1;
            }
          }
          return resultado;
        }))
    );
  }

  llenarAsignaturas() {
    this.asignaturaDocenteService.getAsignaturas().subscribe((asignaturas) => {
      this.asignaturasTodos = asignaturas;
      this.asignaturasTodos.sort((a, b) => {
        let resultado = a.carreraId - b.carreraId;
        if (resultado === 0) {
          resultado = a.nivel - b.nivel;
          if (resultado === 0) {
            if (a.paralelo < a.paralelo) {
              resultado = -1;
            } else if (a.paralelo > a.paralelo) {
              resultado = 1;
            }
          }
        }
        return resultado;
      });
    });
  }

  aplicarConsulta(consulta: Consulta, indice: number) {
    this.consultaActual = indice;

    this.asignaturas = this.asignaturasTodos;
    this.docentes = this.docentesTodos;

    consulta.filtros
      .filter((f) => f.entidad === TipoEntidad.Asignatura)
      .forEach((f) => {
        const fi = (value: Asignatura, index: number, array: Asignatura[]) =>
          value[f.atributo].toString() === f.valor;
        this.asignaturas = this.asignaturas.filter(fi);
      });

    consulta.filtros
      .filter((f) => f.entidad === TipoEntidad.Docente)
      .forEach((f) => {
        const fi = (value: Docente, index: number, array: Docente[]) =>
          value[f.atributo].toString() === f.valor;
        this.docentes = this.docentes.filter(fi);
      });
  }

  getClassName(carreraId: number): string {
    switch (carreraId) {
      case 0:
        return "fondo-darkorange";
      case 1:
        return "fondo-orange";
      case 2:
        return "fondo-lawngreen";
      case 3:
        return "fondo-palegreen";
      case 4:
        return "fondo-coral";
      case 5:
        return "fondo-cornflowerblue";
      case 6:
        return "fondo-mediumorchid";
      case 7:
        return "fondo-paleturquoise";
      case 8:
        return "fondo-yellow";
      case 9:
        return "fondo-deeppink";
    }
    return "";
  }

  guardar() {
    this.asignaturas.forEach(
      (cambio) =>
        (this.asignaturasTodos.find(
          (destino) => destino.id === cambio.id
        ).docenteId = cambio.docenteId)
    );

    this.docentes.forEach(
      (cambio) =>
        (this.docentesTodos.find((destino) => destino.id === cambio.id).horas =
          cambio.horas)
    );

    // TODO: actualizar la base de datos con los cambios en asignaturas
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
