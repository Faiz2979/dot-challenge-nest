import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {

    profile() {
        return { message: 'This action returns user profile' };
    }
}
