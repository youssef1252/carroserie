import { login, register, loginRequired, getUsers, updateUser, getUser, deleteUser } from '../controller/userController';
import { getMarks, addMark, getMark, updateMark, deleteMark } from '../controller/markController';
import { getModeles, addModele, getModele, updateModele, deleteModele, getModelesByMarks } from '../controller/modeleController';
import { getCars, addCar, getCar, updateCar, deleteCar } from '../controller/carController';

const routes = (app) => {

  // registration route
  app.route('/auth/register')
    .post(register);

  // login route
  app.route('/auth/login')
    .post(login);

  // get users route
  app.route('/users')
    .get(loginRequired, getUsers);

  // get or update or delete user with id route
  app.route('/user/:id')
    .get(loginRequired, getUser)
    .put(loginRequired, updateUser)
    .delete(loginRequired, deleteUser);

  // get marks or add mark route
  app.route('/marks')
    .get(getMarks)
    .post(addMark);

  // get or update or delete mark with id route
  app.route('/mark/:id')
    .get(getMark)
    .put(updateMark)
    .delete(deleteMark);

  // get marks or add modele route
  app.route('/modeles')
    .get(getModeles)
    .post(addModele);

  app.route('/modeles/:id')
    .get(getModelesByMarks);

  // get or update or delete modele with id route
  app.route('/modele/:id')
    .get(getModele)
    .put(updateModele)
    .delete(deleteModele);

  // get marks or add car route
  app.route('/cars')
    .get(getCars)
    .post(addCar);

  // get or update or delete car with id route
  app.route('/car/:id')
    .get(getCar)
    .put(updateCar)
    .delete(deleteCar);
};

export default routes;
