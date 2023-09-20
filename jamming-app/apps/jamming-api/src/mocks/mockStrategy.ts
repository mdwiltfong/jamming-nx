import passport from 'passport-strategy';
import mockUser from './mockUser';
type strategyCallBack = (
  accessToken,
  refreshToken,
  expires_in,
  profile,
  done
) => void;

class MockStrategy extends passport.Strategy {
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

  public authenticate() {
    console.log('Mock Authenticate');
    this._cb(null, null, null, this._user, (error, user) => {
      this.success(this._user, null);
    });
  }
}

export default MockStrategy;
