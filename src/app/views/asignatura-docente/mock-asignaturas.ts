import { Asignatura } from './asignatura';

export class GeneradorAsignatura {
  static asignaturas: Asignatura[] = [];

  static crearAsignaturas(): Asignatura[] {
    for (let index = 0; index < 240; index++) {
      GeneradorAsignatura.asignaturas.push({
        id: index,
        nombre: 'Asignatura ' + index,
        horas: 8,
        nivel: 1,
        paralelo: 'A',
        carreraId: index % 8,
        docenteId: null,
      });
    }
    return GeneradorAsignatura.asignaturas;
  }
}
export const ASIGNATURAS: Asignatura[] = GeneradorAsignatura.crearAsignaturas();
