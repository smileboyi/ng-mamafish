import {
  Entity,
  ManyToOne,
  Column,
  Index,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserRole } from './user-role.entity';

@Entity()
export class UserPermission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  permission: string;

  @ManyToOne(type => UserRole, userRole => userRole.id)
  @JoinColumn({
    name: 'user_role_id',
  })
  @Index('user_permission_pk_index')
  userRole: UserRole;
}
