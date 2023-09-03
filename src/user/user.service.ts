import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';
import { CreateUserDto } from './create-user.dto';
import { Model } from 'mongoose';
import { User } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    private readonly httpService: HttpService,
    @Inject('USER_MODEL')
    private userModel: Model<User>,
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

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    await createdUser.save();

    // @todo
    this.sendEmail(createdUser);
    this.sendRabbitEvent(createdUser);

    return createdUser;
  }

  private sendEmail(user: User) {
    // Dummy logic
  }

  private sendRabbitEvent(user: User) {
    // Dummy logic
  }
}
