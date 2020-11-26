import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
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
        return this.userRepository.find();
    }

    async findUserById(id: string): Promise<User> {
        const user = this.userRepository.findOne(id);

        if (!user)
            throw new NotFoundException('User not found');

        return user;
    }

    async updateUser(id: string, data: UpdateUserInput): Promise<User> {
        const user = await this.findUserById(id);
        await this.userRepository.update(user, { ...data });
        return this.userRepository.create({ ...user, ...data });
    }

    async deleteUser(id: string): Promise<Boolean> {
        const user = await this.findUserById(id);
        const deleted = await this.userRepository.delete(user);

        if (deleted)
            return true;

        return false;
    }
}
