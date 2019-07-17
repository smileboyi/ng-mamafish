import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { UserWithRole } from './user-with-role.entity';
import { UserPermission } from './user-permission.entity';

@Entity()
export class UserRole {
  constructor(o: object) {
    Object.assign(this, o);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;

  @Column()
  description: string;

  @Column()
  value: number;

  @OneToMany(type => UserPermission, userPermission => userPermission.userRole)
  userPermission: UserPermission[];

  @OneToMany(type => UserWithRole, userWithRole => userWithRole.userRole)
  userWithRole: UserWithRole[];
}
