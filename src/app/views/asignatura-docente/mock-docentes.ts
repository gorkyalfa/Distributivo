import { Docente } from './docente';

export class GeneradorDocente {
  static docentes: Docente[] = [];

  static crearDocentes(): Docente[] {
    for (let index = 0; index < 30; index++) {
      GeneradorDocente.docentes.push({
        id: index,
        nombre: 'D' + index,
        horas: 0,
        carreraId: 0,
      });
    }
    return GeneradorDocente.docentes;
  }
}
export const DOCENTES: Docente[] = GeneradorDocente.crearDocentes();
