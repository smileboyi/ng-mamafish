import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { UserWithRole } from './user-with-role.entity';

@Entity()
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;

  @OneToMany(type => UserWithRole, userWithRole => userWithRole.userRole)
  userWithRole: UserWithRole[];
}
