const gameModel = require('../models/game.model');
const slugify = require('slugify');
const { randomString } = require('../utils/randomString');
var _ = require('lodash');

exports.createGame = async (req, res) => {
  try {
    res.json(
      await new gameModel({
        idgame: randomString(5).toUpperCase(),
        target: [
          { x: 300, y: 300, size: 100 },
          { x: 500, y: 300, size: 150 },
          { x: 500, y: 500, size: 200 },
          { x: 300, y: 500, size: 300 },
        ],
      }).save()
    );
  } catch (err) {
    console.log(err);
    res.status(400).send('Create Game failed');
  }
};

exports.getGame = async (req, res) => {
  // console.log(req.params.id);
  try {
    res.json(await gameModel.findById(req.params.id));
  } catch (err) {
    console.log(err);
    res.status(404).send('not Found game');
  }
};

exports.shooting = async (req, res) => {
  try {
    let oldGame = await gameModel.findById(req.params.id);
    let targetClone = [...oldGame.target];
    const _idTarget = req.body._idTarget;
    console.log(targetClone);

    const i = targetClone.findIndex((item) => {
      return item._id.toString() === _idTarget;
    });
    console.log(i);

    targetClone.splice(i, 1);

    targetClone.push({
      x: _.random(0, 600),
      y: _.random(0, 600),
      size: _.random(100, 600),
    });
    await oldGame.updateOne(
      {
        target: targetClone,
      },
      { new: true }
    );
    res.json(await gameModel.findById(req.params.id));
  } catch (err) {
    console.log('not Found game');
    res.status(404).send('not Found game');
  }
};
