import { GetUser } from '@/services/user';
import passport from 'passport'
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";

const JWT_SECRET = 'your-secret-key';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

passport.use('jwt',
  new JwtStrategy(jwtOptions, (jwtPayload, done) => {

    const user = GetUser(jwtPayload.id);

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  })
);

export default passport;
