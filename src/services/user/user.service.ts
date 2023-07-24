import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SystemRole } from 'src/database/collections/user/role.schema';
import { User } from 'src/database/collections/user/user.schema';
import { UserInput } from 'src/models/user.model';
import { SystemRole as SystemRoleInput } from 'src/models/role.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(SystemRole.name) private roleModel: Model<SystemRole>,
    private jwtService: JwtService,
  ) {}

  async getUsers() {
    return await this.userModel.find();
  }

  async createUser(user: UserInput) {
    // encrypt password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    return await this.userModel.create({
      ...user,
      password: hashedPassword,
    });
  }

  async createRole(role: SystemRoleInput) {
    return await this.roleModel.create(role);
  }

  async getRoleById(id: string) {
    return await this.roleModel.findById(id);
  }

  async login(username: string, password: string) {
    const user = await this.userModel.findOne({
      $or: [{ email: username }, { username }],
    });

    if (!user) {
      throw new HttpException(
        'Wrong username or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new HttpException(
        'Wrong username or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = await this.jwtService.signAsync(
      { id: user._id },
      {
        secret: jwtConstants.secret,
      },
    );

    return {
      token,
    };
  }
}
