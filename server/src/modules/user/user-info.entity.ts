import {
  Entity,
  Column,
  BeforeInsert,
  OneToMany,
  BeforeUpdate,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import * as bcrypt from 'bcryptjs';

import { UserWithRole } from './user-with-role.entity';

@Entity()
export class UserInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  salt: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const salt = bcrypt.genSaltSync(11);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
  }

  @Column({
    name: 'sign_in_count',
  })
  signInCount: string;

  @Column({
    name: 'last_sign_in_at',
  })
  lastSignInAt: Date;

  @Column({
    name: 'last_sign_in_ip',
  })
  lastSignInIp: string;

  @Column({
    name: 'layout_config',
  })
  layoutConfig: string;

  @Column({
    name: 'theme_color_config',
  })
  themeColorConfig: string;

  @Column({
    name: 'created_date',
  })
  createdDate: Date;

  @OneToMany(type => UserWithRole, userWithRole => userWithRole.userInfo)
  userWithRole: UserWithRole[];
}
