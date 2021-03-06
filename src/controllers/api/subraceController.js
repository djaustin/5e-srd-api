const Subrace = require('../../models/subrace');
const Trait = require('../../models/trait');
const Proficiency = require('../../models/proficiency');
const utility = require('./utility');
const SimpleController = require('../simpleController');

const simpleController = new SimpleController(Subrace);

exports.index = async (req, res, next) => await simpleController.index(req, res, next);
exports.show = async (req, res, next) => await simpleController.show(req, res, next);

exports.showTraitsForSubrace = async (req, res, next) => {
  let urlString = '/api/subraces/' + req.params.index;
  await Trait.find({ 'subraces.url': urlString })
    .then(data => {
      res.status(200).json(utility.NamedAPIResource(data));
    })
    .catch(err => {
      next(err);
    });
};

exports.showProficienciesForSubrace = async (req, res, next) => {
  let urlString = '/api/subraces/' + req.params.index;

  await Proficiency.find({ 'races.url': urlString })
    .sort({ index: 'asc' })
    .then(data => {
      res.status(200).json(utility.NamedAPIResource(data));
    })
    .catch(err => {
      next(err);
    });
};
