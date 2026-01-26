import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async register(email: string, password: string, name: string) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    // บันทึกลง db
    const result = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
    if (result != null) {
      return { message: 'บันทึกข้อมูลสำเร็จ!' };
    }
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException();

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException();

    const payload = { uid: user.id, email: user.email, name: user.name };
    return { access_token: this.jwtService.sign(payload) };
  }

  
}
