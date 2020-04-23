import { Consulta } from './consulta';
import { TipoEntidad } from './tipoEntidad';

export const CONSULTAS: Consulta[] = [
  {
    id: 1,
    nombre: 'General',
    filtros: [],
  },
  {
    id: 2,
    nombre: 'Análisis',
    filtros: [
      {
        id: 1,
        entidad: TipoEntidad.Asignatura,
        atributo: 'carreraId',
        valor: '1',
      },
      {
        id: 2,
        entidad: TipoEntidad.Docente,
        atributo: 'carreraId',
        valor: '1',
      },
    ],
  },
  {
    id: 3,
    nombre: 'Electrónica',
    filtros: [
      {
        id: 1,
        entidad: TipoEntidad.Asignatura,
        atributo: 'carreraId',
        valor: '2',
      }
    ],
  },
  {
    id: 4,
    nombre: 'Electricidad',
    filtros: [
      {
        id: 1,
        entidad: TipoEntidad.Asignatura,
        atributo: 'carreraId',
        valor: '3',
      }
    ],
  },
  {
    id: 5,
    nombre: 'Guía Nacional',
    filtros: [
      {
        id: 1,
        entidad: TipoEntidad.Asignatura,
        atributo: 'carreraId',
        valor: '4',
      }
    ],
  },
  {
    id: 6,
    nombre: 'Software',
    filtros: [
      {
        id: 1,
        entidad: TipoEntidad.Asignatura,
        atributo: 'carreraId',
        valor: '5',
      },
    ],
  },
  {
    id: 7,
    nombre: 'Marketing',
    filtros: [
      {
        id: 1,
        entidad: TipoEntidad.Asignatura,
        atributo: 'carreraId',
        valor: '6',
      },
    ],
  },
  {
    id: 8,
    nombre: 'Modas',
    filtros: [
      {
        id: 1,
        entidad: TipoEntidad.Asignatura,
        atributo: 'carreraId',
        valor: '7',
      },
    ],
  },
  {
    id: 7,
    nombre: 'Arte Culinario',
    filtros: [
      {
        id: 1,
        entidad: TipoEntidad.Asignatura,
        atributo: 'carreraId',
        valor: '8',
      },
    ],
  },
];
