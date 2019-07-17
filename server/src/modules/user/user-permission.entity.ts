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
  constructor(o: object) {
    Object.assign(this, o);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  permission: string;

  @Column()
  description: string;

  // ManyToOne时需要通过JoinColumn指定外键，不然会生成中间表
  // 外键user_role_id就是UserRole表的主键
  @ManyToOne(type => UserRole, userRole => userRole.id)
  @JoinColumn({
    name: 'user_role_id',
  })
  @Index('user_permission_user_role_fk_index')
  userRole: UserRole;
}
