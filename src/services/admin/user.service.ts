import { UserRepository } from "../../repositories/user.repository";
import bcryptjs from "bcryptjs";
import { HttpError } from "../../errors/http-error";
import { CreateUserDto } from "../../dtos/user.dto";

let userRepository = new UserRepository();

export class AdminUserService  {
    async createUser(data: CreateUserDto){
        const checkEmail = await userRepository.getUserByEmail(data.email);
        if(checkEmail){
            throw new HttpError(403, "Email already in use");
        }
        const checkUsername = await userRepository.getUserByUsername(data.username);
        if(checkUsername){
            throw new HttpError(403, "Username already in use");
        }
        // hash / encrypt password, to not store plain text password - security risk
        const hashedPassword = await bcryptjs.hash(data.password, 10); // 10 - complexity 
        data.password = hashedPassword; // update the password with hashed one
        const newUser = await userRepository.createUser(data);
        return newUser;
    }

    async getUserById(id: string) {
        const user = await userRepository.getUserById(id);
        if(!user) throw new HttpError(404, "User not found");
        return user;
    }

    async getAllUsers(){
        const users = await userRepository.getAllUsers();
        // transform / map data if needed
        return users;
    }

    async updateOneUser(id: string, data: CreateUserDto){
        const user = await userRepository.updateOneUser(id, data);
        return user;
    }

    async deleteOneUser(id: string){
        const user = await userRepository.deleteOneUser(id);
        return user;
    }
}