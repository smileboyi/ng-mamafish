import {
  Entity,
  Column,
  BeforeInsert,
  OneToMany,
  BeforeUpdate,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsEmail } from 'class-validator';
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
    const hash = bcrypt.hashSync(this.password, this.salt);
    this.password = hash;
  }

  @Column({
    name: 'sign_in_count',
  })
  signInCount: string;

  @CreateDateColumn({
    name: 'last_sign_in_at',
    type: 'datetime',
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

  @CreateDateColumn({
    name: 'created_date',
    type: 'timestamp',
  })
  createdDate: Date;

  // 默认是一个user对应一个role（OneToOne），为了可拓展性，一个user可以有多个role，使用OneToMany
  @OneToMany(type => UserWithRole, userWithRole => userWithRole.userInfo)
  userWithRole: UserWithRole[];
}
