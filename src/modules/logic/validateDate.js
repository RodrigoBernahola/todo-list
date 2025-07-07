import { isValid, parse } from 'date-fns';

export function validateDate(dateString) {

    if (!dateString || dateString.trim() === '') {
        return null;
    }
    // Para input HTML date, el formato yyyy-MM-dd es válido para Date()

    const parsedDate = parse(dateString, 'yyyy-MM-dd', new Date());

    if (!isValid(parsedDate)) {
        return null; // Si no es válida, devolvemos null
    }

    return parsedDate; // Devuelve el objeto Date válido

}