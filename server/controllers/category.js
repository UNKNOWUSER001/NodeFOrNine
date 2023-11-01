const User = require('../model/db');

exports.list = async (req, res) => {
  try {
    const query = "SELECT * FROM Category";
    const [list] = await User.query(query);

    res.send(list);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};

exports.create =  async (req, res) => {
  try {
    const { name } = req.body;
    const query = 'INSERT INTO Category (name) VALUES (?)';
    const [create] = await User.query(query, [name]);
    res.send(create);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
}

exports.read = async (req, res) => {
  try {
    const id = req.params.id;
    const query = "SELECT * FROM Category WHERE id = ?";
    const [read] = await User.query(query, [id]);
    res.send(read);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
}

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;
    const query = "UPDATE Category SET name = ?  WHERE id = ?";
    const [update] = await User.query(query, [name, id]);
    res.send(update);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
}

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    const query = "DELETE FROM Category WHERE id = ?";
    const [remove] = await User.query(query, [id]);
    res.send(remove);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
}
