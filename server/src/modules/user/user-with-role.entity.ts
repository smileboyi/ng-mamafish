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
  constructor(o: object) {
    Object.assign(this, o);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => UserRole, userRole => userRole.id)
  @JoinColumn({
    name: 'user_role_id',
  })
  @Index('user_width_role_user_role_fk_index')
  userRole: UserRole;

  @ManyToOne(type => UserInfo, userInfo => userInfo.id)
  @JoinColumn({
    name: 'user_info_id',
  })
  @Index('user_width_role_user_info_fk_index')
  userInfo: UserInfo;
}
