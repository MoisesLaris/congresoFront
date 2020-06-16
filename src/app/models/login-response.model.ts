

export class LoginResponseModel{
    
        success: boolean;
        token: string;
        tipoUsuario: number;
        message: string;
        user: {
                apellidos: string;
                correo: string;
                grupo: string;
                nombre: string;
                semestre: string;
                sub: string;
                tipoUsuario: number;
        }
}