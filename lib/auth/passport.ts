import { GetUserById } from '@/services/user';
import passport from 'passport'
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { verifyToken } from './jwt';

const JWT_SECRET = 'your-secret-key';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

passport.use('jwt',
  new JwtStrategy(jwtOptions,async (jwtToken, done) => {

    if (verifyToken(jwtToken)) {
      return done(null, false,{message: "Invalid token"});
    }

    const user = GetUserById(jwtToken.id);

    if (!user) {
      return done(null, false);
    }

    return done(null, true);
  })
);

export default passport;
