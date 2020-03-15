import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/userModel';
import config from '../config';

/**
 * @param {*} req
 * @param {*} res
 */
export const getUsers = (req, res) =>
{
  User.find(
    {},
    (err, users) =>
  {
    if (err) return err.status(401).send(err);
    res.status(200).json(users);
  })
  .select('name email typeUser active solde company picture phone created')
  .sort('-created');
};

/**
 * @param {*} req
 * @param {*} res
 */
export const getUser = (req, res) =>
{
  User.findById(
    req.params.id,
    (err, user) =>
    {
      if (err) return err.status(401).send(err);
      return res.status(200).json(user);
    }
  );
};

/**
 * @param {*} req
 * @param {*} res
 */
export const register = (req, res) =>
{
  const newUser = new User(req.body);
  newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
  newUser.save(
    (err, user) =>
    {
      if (err) return res.status(401).send({err});
      user.hashPassword = undefined;
      return res.status(200).json(user);
    }
  );
};

/**
 * @param {*} req
 * @param {*} res
 */
export const updateUser = (req, res) =>
{
  User.findOneAndUpdate(
    {
      _id: req.params.id
    },
    req.body,
    {
      new: true
    },
    (err, user) =>
    {
      if (err) return res.status(401).send(err);
      res.status(200).json(user);
    }
  );
};

/**
 * @param {*} req
 * @param {*} res
 */
export const deleteUser = (req, res) =>
{
  User.remove(
    {
      _id: req.params.id
    },
    (err, user) =>
    {
      if (err) return res.status(401).send(err);
      return res.status(200).json(user);
    }
  );
};

/**
 * @param {*} req
 * @param {*} res
 */
export const login = (req, res) =>
{
  User.findOne(
    {
      email: req.body.email,
      active: true,
      typeUser: 'admin'
    }, (err, user) =>
    {
      if (err) throw err;
      if (!user) return res.status(401).json({message: 'Authentication failed. No user found!'});
      if (user) {
        if (!user.comparePassword(req.body.password, user.hashPassword)) return res.status(401).json({message: 'Authentication failed. Wrong password!'});
        let tokens = jwt.sign({
          email: user.email,
          name: user.name,
          _id: user._id,
          userType: user.userType,
          active: user.active,
          picture: user.picture,
          solde: user.solde,
          created: user.created
        }, config.secret, {
          expiresIn: config.expire
        });
        return res.json({
          token: tokens,
          name: user.name,
          email: user.email,
          picture: user.picture,
          solde: user.solde,
          created: user.created
        });
      }
    }
  );
};

/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const loginRequired = (req, res, next) =>
{
  if (req.user) {
    next();
  } else {
    return res.status(401).json({message: 'Unauthorized user!'});
  }
};
