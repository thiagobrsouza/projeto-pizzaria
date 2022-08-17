import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import prismaClient from "../../prisma";

interface AuthRequest {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({ email, password}: AuthRequest) {
        
        // check if user exists by email
        const user = await prismaClient.user.findFirst({
            where: { email: email }
        });
        
        if (!user) {
            throw new Error('User/password incorrect');
        }
        
        // compare password with database hash password
        const passwordMatch = await compare(password, user.password);

        // check if passwords match
        if (!passwordMatch) {
            throw new Error('User/password incorrect');
        }

        // generate jwt
        const token = sign(
            { name: user.name, email: user.email },
            process.env.JWT_SECRET,
            { subject: user.id, expiresIn: '30d' }
        )

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}

export { AuthUserService };

