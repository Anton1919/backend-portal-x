import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { UpdateUserInput } from './user.dto';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly defaultUser: User = {
    id: 20342,
    first_name: 'Ангелина',
    last_name: 'Римша',
    middle_name: 'Денисовна',
    email: 'rimshaad@uralsib.ru',
    location: '',
    avatar: null,
    post: '',
    profile_link: '',
    criteria: [
      { title: 'Весь Банк', id: '173529875403470294', access: true },
      { title: 'Внешнее обучение', id: '173409520207787889', access: true },
    ],
    publications_count: 0,
    subscriber_counts: 0,
  };

  async getAll() {
    const user = await this.prisma.user.findFirst();
    if (!user) {
      throw new Error('User not found');
    }
    return {
      ...user,
      location: '',
      avatar: null,
      post: '',
      profile_link: '',
      criteria: [
        { title: 'Весь Банк', id: '173529875403470294', access: true },
        { title: 'Внешнее обучение', id: '173409520207787889', access: true },
      ],
      publications_count: 0,
      subscriber_counts: 0,
    };
  }

  getUser(): User {
    return this.defaultUser;
  }

  updateUser(input: UpdateUserInput): User {
    return {
      ...this.defaultUser,
      ...input,
    };
  }

  updateUserAvatar(avatar: string): User {
    return {
      ...this.defaultUser,
      avatar,
    };
  }

  deleteUser(id: number): boolean {
    return true;
  }
}
