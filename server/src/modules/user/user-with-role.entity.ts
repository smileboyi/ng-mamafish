import {
  Entity,
  ManyToOne,
  Index,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserInfo } from './user-info.entity';
import { UserRole } from './user-role.entity';

@Entity()
export class UserWithRole {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => UserRole, userRole => userRole.role)
  @JoinColumn({
    name: 'user_role_id',
  })
  @Index('user_width_role_user_role_pk_index')
  userRole: UserRole;

  @ManyToOne(type => UserInfo, userInfo => userInfo.id)
  @JoinColumn({
    name: 'user_info_id',
  })
  @Index('user_width_role_user_info_pk')
  userInfo: UserInfo;
}
