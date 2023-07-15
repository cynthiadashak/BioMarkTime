const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const authService = require('../services/auth.service');

// Define the LocalStrategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email', // Assuming the login/signup form has an input field with name="email"
      passwordField: 'password', // Assuming the login/signup form has an input field with name="password"
    },
    async (email, password, done) => {
      try {
        // Find the user by email in the database
        const user = await User.findOne({ where: { email } });

        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }

        // Compare the provided password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect password.' });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// Export controller functions
module.exports = {
  getLogin(req, res) {
    // Render the login form
    res.render('auth/login', {title: "Login"});
  },

  postLogin(req, res, next) {
    // Authenticate the user using the local strategy
    passport.authenticate('local', {
      successRedirect: '/dashboard', // Redirect to the dashboard on successful login
      failureRedirect: '/login', // Redirect back to the login page on failed login
      failureFlash: true, // Enable flash messages for displaying error messages
    })(req, res, next);
  },

  logout(req, res) {
    // Logout the user
    req.logout();
    res.redirect('/');
  },

  async getSignup(req, res) {
    // Render the signup form
    res.render('auth/signup', {title: "Signup"});
  },

  async postSignup(req, res) {
    try {
      const { name, email, password } = req.body;

      // Call the signup function from the authService
      await authService.signup(name, email, password);

      req.flash('success', 'Signup successful. You can now log in.');
      res.redirect('/login');
    } catch (error) {
      console.error(error);
      req.flash('error', error.message || 'An error occurred during signup.');
      res.redirect('/signup');
    }
  },
};
