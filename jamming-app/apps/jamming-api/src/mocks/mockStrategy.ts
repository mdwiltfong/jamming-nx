import passport from 'passport-strategy';
import mockUser from './mockUser';
import { profile } from 'console';
import util from 'util';
type strategyCallBack = (
  accessToken,
  refreshToken,
  expires_in,
  profile,
  done
) => void;

class Strategy extends passport.Strategy {
  public name;
  private _user;
  private _cb: strategyCallBack;
  constructor(name, strategyCallback) {
    if (!name || name.length === 0) {
      throw new TypeError('DevStrategy requires a Strategy name');
    }
    super();

    this.name = name;
    this._user = mockUser;
    this._cb = strategyCallback;
  }

  authenticate() {
    console.log('Mock Authenticate');
    this._cb(null, null, null, this._user, (error, user) => {
      this.success(user);
    });
  }
}

export default Strategy;
