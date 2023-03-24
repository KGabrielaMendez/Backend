
export const API_URL = process.env.REACT_APP_API_URL;
export const ADMIN_ROLE = 1;
export const USER_ROLE = 2;
export const EMPLOYEE_ROLE = 3;

//precio de litro
export const precio_litro= 0.45;


const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Novimbre", "Diciembre"
];

export const getLongMonthName = function (fecha) {
    const date = new Date(fecha)
    return monthNames[date.getMonth()];
};

const dayNames = [
    "Lunes", "Martes", "Miércoles", "Jueves", 
    "Viernes", "Sabado", "Domingo"
];

export const getDayName = function (fecha) {
    const date = new Date(fecha)
    return dayNames[date.getDay()];
}


