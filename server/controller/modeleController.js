import Modele from '../model/modeleModel';

/**
 * @param {*} req
 * @param {*} res
 */
export const getModeles = (req, res) =>
{
  Modele.find(
    {},
    (err, modeles) =>
    {
      if (err) return res.status(401).send(err);
      return res.status(200).json(modeles);
    }
  )
  .populate('mark');
};

/**
 * @param {*} req
 * @param {*} res
 */
export const getModele = (req, res) =>
{
  Modele
  .findOne(
    {
      _id: req.params.id,
      active: true
    },
    (err, modele) =>
    {
      if (err) return res.status(401).send(err);
      return res.status(200).json(modele);
    }
  ).populate('mark');
};

/**
 * @param {*} req
 * @param {*} res
 */
export const addModele = (req, res) =>
{
  const newModele = new Modele(req.body);
  newModele.save(
    (err, modele) =>
    {
      if (err) return res.status(401).send(err);
      return res.status(200).json(modele);
    }
  );
};

/**
 * @param {*} req
 * @param {*} res
 */
export const updateModele = (req, res) =>
{
  Modele.findOneAndUpdate({
      _id: req.params.id
    },
    req.body,
    {
      new: true
    },
    (err, modele) =>
    {
      if (err) return res.status(401).send(err);
      return res.status(200).json(modele);
    }
  );
};

/**
 * @param {*} req
 * @param {*} res
 */
export const deleteModele = (req, res) =>
{
  Modele.remove(
    {
      _id: req.params.id
    },
    (err, modele) =>
    {
      if (err) return res.status(401).send(err);
      return res.status(200).json(modele);
    }
  );
};

/**
 * @param {*} req
 * @param {*} res
 */
export const getModelesByMarks = (req, res) => {
  Modele
    .find({
        mark: req.params.id,
        active: true
      },
      (err, modele) => {
        if (err) return res.status(401).send(err);
        return res.status(200).json(modele);
      }
    ).populate('mark');
};
