export const STUDENT = {
  nombre: "María González Rojas",
  carne: "2024073529",
  email: "maria.gonzalez@utlm.ac.cr",
  telefono: "+506 8765-4321",
  carrera: "Ingeniería en Computación",
  ingreso: "2022",
  estado: "Activo",
  anio: "IV Año",
  promedio: 87.4,
  creditos: 124,
  saldo: 350,
  matriculados: 5,
};

export const AVAILABLE_COURSES = [
  { codigo: "IC-3001", nombre: "Estructuras de Datos", creditos: 4, horario: "Mar/Jue 10:00-12:00", profesor: "Prof. Luis Hernández", cupos: 8 },
  { codigo: "IC-2010", nombre: "Cálculo III", creditos: 4, horario: "Lun/Mie 08:00-10:00", profesor: "Prof. Ana Solís", cupos: 12 },
  { codigo: "IC-2050", nombre: "Física II", creditos: 4, horario: "Lun/Mie 14:00-16:00", profesor: "Prof. Carlos Mora", cupos: 5 },
  { codigo: "IC-4010", nombre: "Base de Datos I", creditos: 3, horario: "Vie 08:00-11:00", profesor: "Prof. Patricia Vega", cupos: 10 },
  { codigo: "IC-3200", nombre: "Inglés Técnico", creditos: 2, horario: "Mar 16:00-18:00", profesor: "Prof. Jane Smith", cupos: 15 },
  { codigo: "IC-3500", nombre: "Programación Orientada a Objetos", creditos: 4, horario: "Lun/Mie 10:00-12:00", profesor: "Prof. Luis Hernández", cupos: 6 },
  { codigo: "IC-4100", nombre: "Algoritmos", creditos: 4, horario: "Mar/Jue 14:00-16:00", profesor: "Prof. Diego Salas", cupos: 9 },
  { codigo: "IC-4500", nombre: "Redes de Computadores", creditos: 3, horario: "Vie 13:00-16:00", profesor: "Prof. Marcela Ulate", cupos: 7 },
];

export const ENROLLED = [
  { codigo: "IC-2010", nombre: "Cálculo III", creditos: 4 },
  { codigo: "IC-3001", nombre: "Estructuras de Datos", creditos: 4 },
  { codigo: "IC-2050", nombre: "Física II", creditos: 4 },
  { codigo: "IC-4010", nombre: "Base de Datos I", creditos: 3 },
  { codigo: "IC-3200", nombre: "Inglés Técnico", creditos: 2 },
];

export const SCHEDULE = [
  { course: "Cálculo III", code: "IC-2010", room: "A-203", days: [1, 3], start: 8, end: 10, color: "bg-secondary/80" },
  { course: "Estructuras de Datos", code: "IC-3001", room: "B-110", days: [2, 4], start: 10, end: 12, color: "bg-success/80" },
  { course: "Física II", code: "IC-2050", room: "C-105", days: [1, 3], start: 14, end: 16, color: "bg-purple-accent/80" },
  { course: "Base de Datos I", code: "IC-4010", room: "B-220", days: [5], start: 8, end: 11, color: "bg-amber-accent/80" },
  { course: "Inglés Técnico", code: "IC-3200", room: "D-301", days: [2], start: 16, end: 18, color: "bg-teal-accent/80" },
];

export const GRADE_DETAIL = [
  { comp: "Examen Parcial I", peso: 25, nota: 88 },
  { comp: "Proyecto", peso: 30, nota: 92 },
  { comp: "Examen Final", peso: 35, nota: 85 },
  { comp: "Quices", peso: 10, nota: 90 },
];

export const COURSE_GRADES = [
  { codigo: "IC-2010", nombre: "Cálculo III", nota: 86, estado: "Aprobado" },
  { codigo: "IC-3001", nombre: "Estructuras de Datos", nota: 90, estado: "Aprobado" },
  { codigo: "IC-2050", nombre: "Física II", nota: 82, estado: "Aprobado" },
  { codigo: "IC-4010", nombre: "Base de Datos I", nota: 88, estado: "Aprobado" },
  { codigo: "IC-3200", nombre: "Inglés Técnico", nota: 91, estado: "Aprobado" },
];

export const CHARGES = [
  { concepto: "Matrícula 2026-I", fecha: "10/01/2026", monto: 200, estado: "Pagado" },
  { concepto: "Curso Cálculo III", fecha: "10/01/2026", monto: 50, estado: "Pagado" },
  { concepto: "Curso Estructuras de Datos", fecha: "10/01/2026", monto: 50, estado: "Pagado" },
  { concepto: "Curso Base de Datos I", fecha: "10/01/2026", monto: 50, estado: "Pendiente" },
  { concepto: "Curso Física II", fecha: "10/01/2026", monto: 50, estado: "Pendiente" },
  { concepto: "Curso Inglés Técnico", fecha: "10/01/2026", monto: 50, estado: "Pendiente" },
  { concepto: "Servicios estudiantiles", fecha: "10/01/2026", monto: 150, estado: "Pagado" },
];

export const ACADEMIC_HISTORY = [
  { periodo: "2024-I", codigo: "IC-1001", nombre: "Introducción a la Programación", creditos: 4, nota: 92, estado: "Aprobado" },
  { periodo: "2024-I", codigo: "MA-1001", nombre: "Cálculo I", creditos: 4, nota: 85, estado: "Aprobado" },
  { periodo: "2024-I", codigo: "FI-1001", nombre: "Física I", creditos: 4, nota: 80, estado: "Aprobado" },
  { periodo: "2024-I", codigo: "EG-1001", nombre: "Comunicación Escrita", creditos: 3, nota: 88, estado: "Aprobado" },
  { periodo: "2024-II", codigo: "IC-1100", nombre: "Programación II", creditos: 4, nota: 90, estado: "Aprobado" },
  { periodo: "2024-II", codigo: "MA-1002", nombre: "Cálculo II", creditos: 4, nota: 84, estado: "Aprobado" },
  { periodo: "2024-II", codigo: "MA-1100", nombre: "Matemática Discreta", creditos: 3, nota: 87, estado: "Aprobado" },
  { periodo: "2024-II", codigo: "EG-1002", nombre: "Filosofía", creditos: 3, nota: 91, estado: "Aprobado" },
  { periodo: "2025-I", codigo: "IC-2001", nombre: "Programación Avanzada", creditos: 4, nota: 89, estado: "Aprobado" },
  { periodo: "2025-I", codigo: "IC-2100", nombre: "Arquitectura de Computadores", creditos: 4, nota: 86, estado: "Aprobado" },
  { periodo: "2025-I", codigo: "MA-2001", nombre: "Álgebra Lineal", creditos: 3, nota: 83, estado: "Aprobado" },
  { periodo: "2025-II", codigo: "IC-2500", nombre: "Sistemas Operativos", creditos: 4, nota: 88, estado: "Aprobado" },
  { periodo: "2025-II", codigo: "IC-2600", nombre: "Ingeniería de Software", creditos: 4, nota: 92, estado: "Aprobado" },
  { periodo: "2025-II", codigo: "MA-2500", nombre: "Estadística", creditos: 3, nota: 85, estado: "Aprobado" },
  { periodo: "2025-II", codigo: "EG-2001", nombre: "Ética Profesional", creditos: 2, nota: 90, estado: "Aprobado" },
];

export const TEACHER_COURSES = [
  { codigo: "IC-3001", nombre: "Estructuras de Datos", horario: "Mar/Jue 10:00-12:00", aula: "B-110", estudiantes: 32 },
  { codigo: "IC-4010", nombre: "Base de Datos I", horario: "Vie 08:00-11:00", aula: "B-220", estudiantes: 28 },
  { codigo: "IC-2001", nombre: "Programación II", horario: "Lun/Mie 14:00-16:00", aula: "A-104", estudiantes: 27 },
];

export const TEACHER_STUDENTS = [
  { carne: "2024073529", nombre: "María González Rojas" },
  { carne: "2024081234", nombre: "Juan Pablo Vargas" },
  { carne: "2024090012", nombre: "Sofía Méndez Castro" },
  { carne: "2023045678", nombre: "Andrés Quesada López" },
  { carne: "2024011223", nombre: "Lucía Ramírez Soto" },
  { carne: "2023099887", nombre: "Daniel Arroyo Núñez" },
  { carne: "2024056789", nombre: "Camila Brenes Gómez" },
  { carne: "2024033445", nombre: "Mateo Rodríguez Pérez" },
];

export const ADMIN_STUDENTS = [
  { carne: "2024073529", nombre: "María González Rojas", carrera: "Ing. Computación", anio: "IV", estado: "Activo" },
  { carne: "2024081234", nombre: "Juan Pablo Vargas", carrera: "Ing. Computación", anio: "III", estado: "Activo" },
  { carne: "2024090012", nombre: "Sofía Méndez Castro", carrera: "Ing. Industrial", anio: "II", estado: "Activo" },
  { carne: "2023045678", nombre: "Andrés Quesada López", carrera: "Administración", anio: "IV", estado: "Activo" },
  { carne: "2024011223", nombre: "Lucía Ramírez Soto", carrera: "Ing. Computación", anio: "I", estado: "Activo" },
  { carne: "2023099887", nombre: "Daniel Arroyo Núñez", carrera: "Ing. Electromecánica", anio: "III", estado: "Inactivo" },
  { carne: "2024056789", nombre: "Camila Brenes Gómez", carrera: "Diseño Gráfico", anio: "II", estado: "Activo" },
  { carne: "2024033445", nombre: "Mateo Rodríguez Pérez", carrera: "Ing. Computación", anio: "II", estado: "Activo" },
  { carne: "2022087654", nombre: "Valeria Solano Mata", carrera: "Administración", anio: "V", estado: "Activo" },
  { carne: "2023012345", nombre: "Esteban Picado Rojas", carrera: "Ing. Industrial", anio: "III", estado: "Activo" },
  { carne: "2024099001", nombre: "Isabella Cordero Vega", carrera: "Ing. Computación", anio: "I", estado: "Activo" },
  { carne: "2023056677", nombre: "Tomás Alfaro Cruz", carrera: "Ing. Electromecánica", anio: "II", estado: "Inactivo" },
];

export const ADMIN_TEACHERS = [
  { cedula: "1-1234-5678", nombre: "Prof. Luis Hernández Vargas", especialidad: "Estructuras de Datos", cursos: 3, estado: "Activo" },
  { cedula: "2-0876-5432", nombre: "Prof. Ana Solís Mora", especialidad: "Matemática Aplicada", cursos: 2, estado: "Activo" },
  { cedula: "1-0998-7766", nombre: "Prof. Carlos Mora Jiménez", especialidad: "Física", cursos: 2, estado: "Activo" },
  { cedula: "3-0455-3322", nombre: "Prof. Patricia Vega Núñez", especialidad: "Bases de Datos", cursos: 3, estado: "Activo" },
  { cedula: "1-0667-8899", nombre: "Prof. Diego Salas Brenes", especialidad: "Algoritmos", cursos: 2, estado: "Activo" },
  { cedula: "2-0334-1122", nombre: "Prof. Marcela Ulate Soto", especialidad: "Redes", cursos: 2, estado: "Activo" },
  { cedula: "5-0223-4455", nombre: "Prof. Jane Smith", especialidad: "Inglés Técnico", cursos: 4, estado: "Activo" },
  { cedula: "1-0789-9911", nombre: "Prof. Roberto Castillo Ávila", especialidad: "Ing. de Software", cursos: 2, estado: "Inactivo" },
];

export const ADMIN_COURSES = [
  { codigo: "IC-3001", nombre: "Estructuras de Datos", creditos: 4, docente: "Luis Hernández", cupos: 35, matric: 32, estado: "Activo" },
  { codigo: "IC-2010", nombre: "Cálculo III", creditos: 4, docente: "Ana Solís", cupos: 40, matric: 28, estado: "Activo" },
  { codigo: "IC-2050", nombre: "Física II", creditos: 4, docente: "Carlos Mora", cupos: 30, matric: 25, estado: "Activo" },
  { codigo: "IC-4010", nombre: "Base de Datos I", creditos: 3, docente: "Patricia Vega", cupos: 35, matric: 28, estado: "Activo" },
  { codigo: "IC-3200", nombre: "Inglés Técnico", creditos: 2, docente: "Jane Smith", cupos: 25, matric: 20, estado: "Activo" },
  { codigo: "IC-3500", nombre: "Programación OO", creditos: 4, docente: "Luis Hernández", cupos: 30, matric: 24, estado: "Activo" },
  { codigo: "IC-4100", nombre: "Algoritmos", creditos: 4, docente: "Diego Salas", cupos: 35, matric: 26, estado: "Activo" },
  { codigo: "IC-4500", nombre: "Redes de Computadores", creditos: 3, docente: "Marcela Ulate", cupos: 30, matric: 23, estado: "Activo" },
  { codigo: "IC-2600", nombre: "Ingeniería de Software", creditos: 4, docente: "Roberto Castillo", cupos: 30, matric: 18, estado: "Inactivo" },
  { codigo: "IC-2500", nombre: "Sistemas Operativos", creditos: 4, docente: "Diego Salas", cupos: 30, matric: 22, estado: "Activo" },
];

export const ADMIN_PERIODS = [
  { periodo: "2025-I", inicio: "15/01/2025", fin: "15/05/2025", estado: "Cerrado" },
  { periodo: "2025-II", inicio: "01/08/2025", fin: "30/11/2025", estado: "Cerrado" },
  { periodo: "2026-I", inicio: "15/01/2026", fin: "15/05/2026", estado: "Activo" },
  { periodo: "2026-II", inicio: "01/08/2026", fin: "30/11/2026", estado: "Futuro" },
];

export const PAYMENT_HISTORY = [
  { fecha: "15/06/2026", carne: "2024073529", estudiante: "María González", concepto: "Matrícula 2026-I", monto: 200, metodo: "Tarjeta", estado: "Aprobado", recibo: "R-10234" },
  { fecha: "15/06/2026", carne: "2024081234", estudiante: "Juan Pablo Vargas", concepto: "Curso IC-3001", monto: 50, metodo: "Transferencia", estado: "Aprobado", recibo: "R-10235" },
  { fecha: "14/06/2026", carne: "2024090012", estudiante: "Sofía Méndez", concepto: "Matrícula 2026-I", monto: 200, metodo: "Tarjeta", estado: "Aprobado", recibo: "R-10236" },
  { fecha: "14/06/2026", carne: "2023045678", estudiante: "Andrés Quesada", concepto: "Curso IC-4010", monto: 50, metodo: "Efectivo", estado: "Aprobado", recibo: "R-10237" },
  { fecha: "13/06/2026", carne: "2024011223", estudiante: "Lucía Ramírez", concepto: "Matrícula 2026-I", monto: 200, metodo: "Tarjeta", estado: "Aprobado", recibo: "R-10238" },
  { fecha: "13/06/2026", carne: "2024056789", estudiante: "Camila Brenes", concepto: "Curso IC-2050", monto: 50, metodo: "Transferencia", estado: "Aprobado", recibo: "R-10239" },
  { fecha: "12/06/2026", carne: "2024033445", estudiante: "Mateo Rodríguez", concepto: "Matrícula 2026-I", monto: 200, metodo: "Tarjeta", estado: "Aprobado", recibo: "R-10240" },
  { fecha: "12/06/2026", carne: "2022087654", estudiante: "Valeria Solano", concepto: "Curso IC-3500", monto: 50, metodo: "Efectivo", estado: "Aprobado", recibo: "R-10241" },
  { fecha: "11/06/2026", carne: "2023012345", estudiante: "Esteban Picado", concepto: "Curso IC-4500", monto: 50, metodo: "Transferencia", estado: "Aprobado", recibo: "R-10242" },
  { fecha: "11/06/2026", carne: "2024099001", estudiante: "Isabella Cordero", concepto: "Matrícula 2026-I", monto: 200, metodo: "Tarjeta", estado: "Aprobado", recibo: "R-10243" },
  { fecha: "10/06/2026", carne: "2024073529", estudiante: "María González", concepto: "Servicios estudiantiles", monto: 150, metodo: "Tarjeta", estado: "Aprobado", recibo: "R-10244" },
  { fecha: "10/06/2026", carne: "2024081234", estudiante: "Juan Pablo Vargas", concepto: "Matrícula 2026-I", monto: 200, metodo: "Transferencia", estado: "Aprobado", recibo: "R-10245" },
  { fecha: "09/06/2026", carne: "2024090012", estudiante: "Sofía Méndez", concepto: "Curso IC-3200", monto: 50, metodo: "Tarjeta", estado: "Aprobado", recibo: "R-10246" },
  { fecha: "09/06/2026", carne: "2023045678", estudiante: "Andrés Quesada", concepto: "Matrícula 2026-I", monto: 200, metodo: "Efectivo", estado: "Aprobado", recibo: "R-10247" },
  { fecha: "08/06/2026", carne: "2024056789", estudiante: "Camila Brenes", concepto: "Matrícula 2026-I", monto: 200, metodo: "Tarjeta", estado: "Aprobado", recibo: "R-10248" },
];

export const MONTHLY_INCOME = [
  { mes: "Ene", ingresos: 95000 },
  { mes: "Feb", ingresos: 108000 },
  { mes: "Mar", ingresos: 112000 },
  { mes: "Abr", ingresos: 98000 },
  { mes: "May", ingresos: 117000 },
  { mes: "Jun", ingresos: 124500 },
];

export const INCOME_BY_CONCEPT = [
  { name: "Matrícula", value: 68000 },
  { name: "Cursos", value: 42000 },
  { name: "Otros servicios", value: 14500 },
];

export const ENROLLMENT_TREND = [
  { mes: "Jul'25", est: 1180 }, { mes: "Ago'25", est: 1195 }, { mes: "Sep'25", est: 1200 },
  { mes: "Oct'25", est: 1198 }, { mes: "Nov'25", est: 1205 }, { mes: "Dic'25", est: 1190 },
  { mes: "Ene'26", est: 1220 }, { mes: "Feb'26", est: 1232 }, { mes: "Mar'26", est: 1235 },
  { mes: "Abr'26", est: 1238 }, { mes: "May'26", est: 1240 }, { mes: "Jun'26", est: 1240 },
];

export const REVENUE_BY_PERIOD = [
  { periodo: "2024-II", ingresos: 218000 },
  { periodo: "2025-I", ingresos: 232000 },
  { periodo: "2025-II", ingresos: 241000 },
  { periodo: "2026-I", ingresos: 248000 },
];

export const STUDENTS_BY_CAREER = [
  { name: "Ing. Computación", value: 420 },
  { name: "Ing. Industrial", value: 280 },
  { name: "Administración", value: 240 },
  { name: "Ing. Electromecánica", value: 180 },
  { name: "Diseño Gráfico", value: 120 },
];

export const PERFORMANCE_BY_FACULTY = [
  { facultad: "Ingeniería", promedio: 84 },
  { facultad: "Ciencias Económicas", promedio: 82 },
  { facultad: "Diseño", promedio: 86 },
  { facultad: "Ciencias Básicas", promedio: 79 },
];

export const ACADEMIC_INDICATORS = [
  { carrera: "Ing. Computación", matric: 420, promedio: 84.2, aprob: 91, deser: 4.2 },
  { carrera: "Ing. Industrial", matric: 280, promedio: 82.1, aprob: 88, deser: 5.1 },
  { carrera: "Administración", matric: 240, promedio: 83.5, aprob: 90, deser: 4.8 },
  { carrera: "Ing. Electromecánica", matric: 180, promedio: 80.4, aprob: 86, deser: 6.0 },
  { carrera: "Diseño Gráfico", matric: 120, promedio: 86.0, aprob: 93, deser: 3.5 },
];

export const FINANCIAL_INDICATORS = [
  { concepto: "Matrícula", presupuesto: 240000, real: 248000 },
  { concepto: "Pagos de cursos", presupuesto: 170000, real: 165000 },
  { concepto: "Servicios estudiantiles", presupuesto: 60000, real: 64500 },
  { concepto: "Donaciones", presupuesto: 25000, real: 19000 },
  { concepto: "Investigación", presupuesto: 80000, real: 82000 },
];
