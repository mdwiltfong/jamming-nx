import { Strategy } from 'passport-strategy';

type strategyCallBack = (
  accessToken,
  refreshToken,
  expires_in,
  profile,
  done
) => void;

export default class mockStrategy extends Strategy {
  private name: string;
  private callBackStrategy: strategyCallBack;
  private mockUser;
  constructor(name: string, callBackStrategy: strategyCallBack) {
    super();
    this.name = name;
    this.callBackStrategy = callBackStrategy;
  }

  public authenticate(): void {
    this.callBackStrategy(null, null, this.mockUser, null, null);
  }
}
