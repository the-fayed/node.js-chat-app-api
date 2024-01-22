import { IUser } from '../../modules/users/user.interface';

export class SanitizeData {
  sanitizeUser (user: IUser) {
    return {
      id: user._id,
      username: user.username,
      avatar: user.avatar,
    }
  }
}
