import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async createUser(data: CreateUserInput): Promise<User> {
        const user = await this.userRepository.create(data);
        const userSaved = this.userRepository.save(user);

        if (!userSaved) {
            throw new InternalServerErrorException('Problema para criar o usuário');
        }

        return userSaved;
    }

    async findAllUser(): Promise<User[]> {
        const users = this.userRepository.find();
        return users;
    }
}
