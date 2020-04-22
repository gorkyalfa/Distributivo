import { Docente } from './docente';

export class GeneradorDocente {
  static docentes: Docente[] = [];

  static crearDocentes(): Docente[] {
    for (let index = 0; index < 100; index++) {
      GeneradorDocente.docentes.push({
        id: index,
        nombre: 'Docente ' + index,
        horas: 0,
        carreraId: index % 8,
        visible: true
      });
    }
    return GeneradorDocente.docentes;
  }
}
export const DOCENTES: Docente[] = GeneradorDocente.crearDocentes();
