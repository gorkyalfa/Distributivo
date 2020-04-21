import { Consulta } from './consulta';
import { TipoEntidad } from './tipoEntidad';

export const CONSULTAS: Consulta[] = [
  {
    id: 1,
    nombre: 'General',
    filtros: [
      {
        id: 1,
        entidad: TipoEntidad.Docente,
        atributo: 'carreraID',
        valor: '1',
      },
    ],
  },
  {
    id: 1,
    nombre: 'Análisis de sistemas',
    filtros: [
      {
        id: 1,
        entidad: TipoEntidad.Docente,
        atributo: 'carreraID',
        valor: '1',
      },
    ],
  },
  {
    id: 1,
    nombre: 'Electrónica',
    filtros: [
      {
        id: 1,
        entidad: TipoEntidad.Docente,
        atributo: 'carreraID',
        valor: '1',
      },
    ],
  },
  {
    id: 2,
    nombre: 'Electricidad',
    filtros: [
      {
        id: 1,
        entidad: TipoEntidad.Docente,
        atributo: 'carreraID',
        valor: '1',
      },
    ],
  },
  {
    id: 3,
    nombre: 'Guía Nacional',
    filtros: [
      {
        id: 1,
        entidad: TipoEntidad.Docente,
        atributo: 'carreraID',
        valor: '1',
      },
    ],
  },
  {
    id: 4,
    nombre: 'Desarrollo de Software',
    filtros: [
      {
        id: 1,
        entidad: TipoEntidad.Docente,
        atributo: 'carreraID',
        valor: '1',
      },
    ],
  },
  {
    id: 5,
    nombre: 'Marketing',
    filtros: [
      {
        id: 1,
        entidad: TipoEntidad.Docente,
        atributo: 'carreraID',
        valor: '1',
      },
    ],
  },
  {
    id: 6,
    nombre: 'Diseño de Modas',
    filtros: [
      {
        id: 1,
        entidad: TipoEntidad.Docente,
        atributo: 'carreraID',
        valor: '1',
      },
    ],
  },
  {
    id: 7,
    nombre: 'Arte Culinario',
    filtros: [
      {
        id: 1,
        entidad: TipoEntidad.Docente,
        atributo: 'carreraID',
        valor: '1',
      },
    ],
  },
];
