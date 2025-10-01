const hasLowercase = (password: string): boolean =>{
    return /\p{Ll}/u.test(password);
}


const hasUppercase = (password: string): boolean =>{
    return /\p{Lu}/u.test(password)
}


const hasDigit = (password: string): boolean =>{
    return /\p{Nd}/u.test(password)
}

const hasSymbol = (password: string): boolean =>{
    return /[^\p{L}\p{N}\p{M}\s]/gu.test(password)
}


function countPassed(password: string): number{
    const valdations = [hasDigit, hasLowercase, hasUppercase, hasSymbol];
    const counts = valdations.reduce((acc, fn) => acc + (fn(password) ? 1 : 0), 0) - 1;
    return  Math.max(0, Math.min(counts, 3))
}



export function evaluatePassword(password: string): number {
    let varietyScore = 0;
    let score = 0;
    if (password.length >= 12 ) {
        score = score + 2
    }
    else{
    if (password.length >= 8) {
        score = score + 1

    }
    

}    

varietyScore = countPassed(password);
    return score + varietyScore
}

// Devuelve recomendaciones específicas según lo que le falte a la contraseña
export function getPasswordRecommendations(password: string): string[] {
    const recs: string[] = []

    if (password.length < 8) {
        recs.push('Usa al menos 8 caracteres.')
    } else if (password.length < 12) {
        recs.push('Para mayor seguridad, usa 12+ caracteres.')
    }

    if (!hasLowercase(password)) recs.push('Agrega letras minúsculas (a-z).')
    if (!hasUppercase(password)) recs.push('Agrega letras mayúsculas (A-Z).')
    if (!hasDigit(password)) recs.push('Incluye números (0-9).')
    if (!hasSymbol(password)) recs.push('Incluye símbolos (p. ej., !@#$%).')

    return recs
}