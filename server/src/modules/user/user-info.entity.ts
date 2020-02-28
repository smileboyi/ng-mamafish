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
  constructor(o: Partial<UserInfo>) {
    Object.assign(this, o);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(2, 15)
  username: string;

  @Column()
  @Length(8, 30)
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
    // 哈希密码比较长(固定长)，通过length比较判断密码是否加密过
    if (this.password.length <= 30) {
      if (!this.salt) {
        this.salt = bcrypt.genSaltSync(11);
      }
      this.password = bcrypt.hashSync(this.password, this.salt);
    }
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

  @CreateDateColumn({
    name: 'created_date',
    type: 'timestamp',
  })
  createdDate: Date;

  // 默认是一个user对应一个role（OneToOne），为了可拓展性，一个user可以有多个role，使用OneToMany
  @OneToMany(type => UserWithRole, userWithRole => userWithRole.userInfo, {
    cascade: true,
  })
  userWithRole: UserWithRole[];
}
