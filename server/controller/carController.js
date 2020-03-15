import Car from '../model/carModele';

/**
 * @param {*} req
 * @param {*} res
 */
export const getCars = (req, res) => {
  Car.find({},
      (err, cars) => {
        if (err) return res.status(401).send(err);
        return res.status(200).json(cars);
      }
    )
    .populate('mark')
    .populate('modele')
    .populate('user');
};

/**
 * @param {*} req
 * @param {*} res
 */
export const getCar = (req, res) => {
  Car
    .findOne({
        _id: req.params.id
      },
      (err, car) => {
        if (err) return res.status(401).send(err);
        return res.status(200).json(car);
      }
    ).populate('mark', 'modele', 'user');
};

/**
 * @param {*} req
 * @param {*} res
 */
export const addCar = (req, res) => {
  const newCar = new Car(req.body);
  newCar.save(
    (err, car) => {
      if (err) return res.status(401).send(err);
      return res.status(200).json(car);
    }
  );
};

/**
 * @param {*} req
 * @param {*} res
 */
export const updateCar = (req, res) => {
  Car.findOneAndUpdate({
      _id: req.params.id
    },
    req.body, {
      new: true
    },
    (err, car) => {
      if (err) return res.status(401).send(err);
      return res.status(200).json(car);
    }
  );
};

/**
 * @param {*} req
 * @param {*} res
 */
export const deleteCar = (req, res) => {
  Car.remove({
      _id: req.params.id
    },
    (err, car) => {
      if (err) return res.status(401).send(err);
      return res.status(200).json(car);
    }
  );
};
