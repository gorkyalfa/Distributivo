export class Asignatura {
    id: number;
    nombre: string;
    horas: number;
    paralelo: string;
    nivel: number;
    carreraId: number;
    docenteId: number;
    visible: boolean = true;
    cabeceraVisible: boolean = true;
    cabeceraRowSpam: number = 1;
}
