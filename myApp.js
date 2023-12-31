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
 Person.find({name: personName})
  .then(result => done(null, result))
  .catch(err => done(err))
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: {$in: food}}, (err, result) => {
    if(err) done(err);
    else done(null, result);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, (err, result) => {
    if(err) done(err);
    else done(null, result);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id: personId}, (err, result) => {
    if(err) done(err);
    else {
      result.favoriteFoods.push(foodToAdd);
      result.save((err, result) => {
        if(err) done(err);
        done(null, result);
      });
  }})
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, result) => {
    if(err) done(err);
    else done(null, result);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id: personId}, (err, result) => {
    if(err) done(err);
    else done(null, result);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, result) => {
    if(err) done(err);
    else done(null, result);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: {$in: foodToSearch}})
    .sort({name: 1})
    .limit(2)
    .select({age: 0})
    .exec((err, result) => {
      if(err) done(err);
      else done(null, result);
    })
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
