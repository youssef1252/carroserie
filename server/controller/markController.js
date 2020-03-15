import Mark from '../model/markModel';

/**
 * @param {*} req
 * @param {*} res
 */
export const getMarks = (req, res) =>
{
  Mark.find(
    {},
    (err, marks) =>
    {
      if (err) return res.status(401).send(err);
      return res.status(200).json(marks);
    }
  );
};

/**
 * @param {*} req
 * @param {*} res
 */
export const getMark = (req, res) =>
{
  Mark.findOne(
    {
      _id: req.params.id,
      active: true
    },
    (err, mark) =>
    {
      if (err) return res.status(401).send(err);
      return res.status(200).json(mark);
    }
  );
};

/**
 * @param {*} req
 * @param {*} res
 */
export const addMark = (req, res) =>
{
  const newMark = new Mark(req.body);
  newMark.save(
    (err, mark) =>
    {
      if (err) return res.status(401).send(err);
      return res.status(200).json(mark);
    }
  );
};

/**
 * @param {*} req
 * @param {*} res
 */
export const updateMark = (req, res) =>
{
  Mark.findOneAndUpdate(
    {
      _id: req.params.id
    },
    req.body,
    {
      new: true
    },
    (err, mark) =>
    {
      if (err) return res.status(401).send(err);
      return res.status(200).json(mark);
    }
  );
};

/**
 * @param {*} req
 * @param {*} res
 */
export const deleteMark = (req, res) =>
{
  Mark.remove(
    {
      _id: req.params.id
    },
    (err, mark) =>
    {
      if (err) return res.status(401).send(err);
      return res.status(200).json(mark);
    }
  );
};
