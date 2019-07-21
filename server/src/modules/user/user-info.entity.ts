import {
  Entity,
  Column,
  BeforeInsert,
  OneToMany,
  BeforeUpdate,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsEmail, Length } from 'class-validator';
import * as bcrypt from 'bcryptjs';

import { UserWithRole } from './user-with-role.entity';

@Entity()
export class UserInfo {
  constructor(o: object) {
    Object.assign(this, o);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(2, 15)
  username: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
  })
  avatar: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({
    default: '',
  })
  salt: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (!this.salt) {
      this.salt = bcrypt.genSaltSync(11);
    }
    this.password = bcrypt.hashSync(this.password, this.salt);
  }

  @Column({
    name: 'sign_in_count',
    default: 0,
  })
  signInCount: number;

  @CreateDateColumn({
    name: 'last_sign_in_at',
    type: 'datetime',
  })
  lastSignInAt: Date;

  @Column({
    name: 'last_sign_in_ip',
    nullable: true,
  })
  lastSignInIp: string;

  @Column({
    name: 'layout_config',
    nullable: true,
  })
  layoutConfig: string;

  @Column({
    name: 'theme_color_config',
    nullable: true,
  })
  themeColorConfig: string;

  @CreateDateColumn({
    name: 'created_date',
    type: 'timestamp',
  })
  createdDate: Date;

  // 默认是一个user对应一个role（OneToOne），为了可拓展性，一个user可以有多个role，使用OneToMany
  @OneToMany(type => UserWithRole, userWithRole => userWithRole.userInfo)
  userWithRole: UserWithRole[];
}
