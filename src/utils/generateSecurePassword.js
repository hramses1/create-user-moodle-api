import crypto from 'crypto'

export default function generateSecurePassword(length = 8) {
    return crypto.randomBytes(length)
                 .toString('base64')  // Convertir a base64 para obtener caracteres legibles
                 .slice(0, length);  // Asegurar la longitud correcta
}