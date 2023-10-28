require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('connected to DB')).catch(err => console.log(err));
// { useNewUrlParser: true, useUnifiedTopology: true}
let Person = require('./personSchema');

const createAndSavePerson = (done) => {
  const newPerson = new Person({
    name: "Naveen",
    age: 24,
    favoriteFoods: ["chicken","paneer","dal"]
  });
  newPerson.save((err, result) => {
    if(err) done(err);
    else done(null, result);
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople)
    .then(result => done(null, result))
    .catch(err => done(err))
};

const findPeopleByName = (personName, done) => {
  Person.find({name : personName}, (result, err) => {
    if(err) done(err);
    else done(null, result);
  })
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
