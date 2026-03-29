export function extraerErrores (obj: any){
    const err = obj.error.errors;

    let mensajesError: string [] = [];

    for (let campo in err) {
        const validacionCampo = err[campo].map((mensaje: string) => `${campo}: ${mensaje}`);
        mensajesError = mensajesError.concat(validacionCampo);
        
    }

    return mensajesError;
}