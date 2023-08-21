import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private readonly httpService: HttpService) {}

  getUserById(userId) {
    return this.httpService
      .get(`https://reqres.in/api/users/${userId}`, {
        headers: {
          Accept: 'application/json',
        },
      })
      .pipe(map((response) => response.data));
  }
}
