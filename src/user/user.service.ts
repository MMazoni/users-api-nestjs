import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { map } from 'rxjs';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  getUserById(userId) {
    return this.httpService
      .get(`https://reqres.in/api/users/${userId}`, {
        headers: {
          Accept: 'application/json',
        },
      })
      .pipe(map((response) => response.data));
  }

  async createUser(username: string): Promise<User> {
    const user = this.usersRepository.create({ username });
    await this.usersRepository.save(user);

    this.sendEmail(user);
    this.sendRabbitEvent(user);

    return user;
  }

  private sendEmail(user: User) {
    // Dummy logic
  }

  private sendRabbitEvent(user: User) {
    // Dummy logic
  }
}
