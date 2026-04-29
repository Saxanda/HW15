import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { getSecret } from '../utils/jwt';
import { UsersRepository } from '../repositories/UsersRepository';

const usersRepo = new UsersRepository();

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: getSecret(),
        },
        async (payload, done) => {
            const user = await usersRepo.findByEmail(payload.sub);

            if (!user) return done(null, false);

            return done(null, user);
        }
    )
);

export default passport;