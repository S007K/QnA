// import passport from 'passport';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import { Strategy as GitHubStrategy } from 'passport-github2';
// import userModel from './models/userModel.js';
// import JWT from 'jsonwebtoken'

// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//     try {
//         const user = await userModel.findById(id);
//         done(null, user);
//     } catch (err) {
//         done(err, null);
//     }
// });

// passport.use(
//     new GoogleStrategy(
//         {
//             clientID: "678338798084-j43iebo73g89lplqsn6ant7vkabucj7b.apps.googleusercontent.com",
//             clientSecret: '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',
//             callbackURL: '/auth/google/callback',
//         },
//         async (accessToken, refreshToken, profile, done) => {
//             try {
//                 // Check if user already exists in the database based
//                 let user = await userModel.findOne({ googleId: profile.id });
//                 if (!user) {
//                     // User does not exist, create a new user
//                     user = await new userModel({
//                         googleId: profile.id,
//                         displayName: profile.displayName,
//                         emails: profile.emails.map(email => email.value).join(', '),
//                         picture: profile.photos[0].value
//                     }).save();
//                 }
//                 const token = JWT.sign({ googleId: profile.id }, process.env.JWT_SECRET, { expiresIn: '7d' })
//                 done(null, user, token);
//             } catch (err) {
//                 done(err, null);
//             }
//         }
//     )
// );

// passport.use(
//     new GitHubStrategy(
//         {
//             clientID: "3381983446a40a946ba3",
//             clientSecret: '86dff612b4f90d592d006c4b95ce68be6edf3733',
//             callbackURL: '/auth/github/callback',
//         },
//         async (accessToken, refreshToken, profile, done) => {
//             try {
//                 let user = await userModel.findOne({ githubId: profile.id });
//                 if (!user) {
//                     user = await new userModel({
//                         githubId: profile.id,
//                         displayName: profile.displayName,
//                         username: profile.username,
//                         picture: profile.photos[0].value
//                     }).save();
//                 }
//                 const token = JWT.sign({ googleId: profile.id }, process.env.JWT_SECRET, { expiresIn: '7d' })
//                 done(null, user, token);
//                 console.log(token)
//             } catch (err) {
//                 done(err, null);
//             }
//         }
//     )
// );

// export default passport;
