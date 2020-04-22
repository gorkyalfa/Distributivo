import { Asignatura } from './asignatura';

export class GeneradorAsignatura {
  static asignaturas: Asignatura[] = [];
  static paralelos: string[] = ['A', 'B', 'C'];

  static crearAsignaturas(): Asignatura[] {
    for (let index = 0; index < 240; index++) {
      GeneradorAsignatura.asignaturas.push({
        id: index,
        nombre: 'Asignatura ' + index,
        horas: ((index % 4) + 1) * 4,
        nivel: index % 6 + 1,
        paralelo: this.paralelos[index % 3],
        carreraId: index % 8,
        docenteId: null,
        visible: true
      });
    }
    return GeneradorAsignatura.asignaturas;
  }
}
export const ASIGNATURAS: Asignatura[] = GeneradorAsignatura.crearAsignaturas();
