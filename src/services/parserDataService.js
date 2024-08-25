import formattedFirstname from "../utils/capitalizeFirstLetter.js";

export default function parseUserData(data) {
    return {
        username: data.username.toLowerCase(), // Normaliza el username a minúsculas
        firstname: formattedFirstname(data.firstname),
        lastname: formattedFirstname(data.lastname),
        email: data.email.toLowerCase(), // Normaliza el email a minúsculas
        lang: data.lang.toLowerCase(), // Normaliza el idioma a minuscula
        city: formattedFirstname(data.city),
        country: data.country.toLowerCase(), // Normaliza el país a minuscula
        state: data.state // Mantiene el estado tal cual
    };
}