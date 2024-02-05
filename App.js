const mongoose = require("mongoose");
const { Schema } = mongoose;
require("dotenv").config();
const dburl = process.env.MONGO_URI;
mongoose
  .connect(dburl)
  .then(() => console.log("database is connected"))
  .catch((err) => console.log(err));

// Setting up schema
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFood: [String],
});

// Creating a model
const Person = mongoose.model("Person", personSchema);

/*___________________________________________________________________________*/
//inserting new document
const person = new Person({
  name: "Ghalia",
  age: 29,
  favoriteFood: ["pasta"],
})
person
  .save()
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
/*__________________________________________________________________________*/
//create list of people 
const arrayOfPeope = [
  {
    name: "Qamar",
    age: 22,
    favoriteFood: [" pizza"],
  },
  {
    name: "zakaria",
    age: 35,
    favoriteFood: ["burrito"],
  },
  {
    name: "Mary",
    age: 25,
    favoriteFood: ["fried chicken"],
  },
];
Person.create(arrayOfPeope)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

/*___________________________________________________________________________*/
// find all documents with name Ghalia 
Person.find({ name: "Ghalia" })
  .then((data) => {
    if (data) {
      console.log(data);
    } else {
      console.log("Ghalia is not found");
    }
  })
  .catch((err) => console.log(err));

  /*________________________________________________________________________________________*/
//find one  document with farvorite food fried chicken
Person.findOne({ favoriteFood: "fried chicken" })
  .then((person) => {
    console.log(person);
  })
  .catch((err) => {
    console.log(err);
  });
/*__________________________________________________________________________________________*/
//find a document by ID
const personId = "65c0d43b2de866af3f7b371b";
Person.findById(personId)
  .then((person) => console.log(person))
  .catch((err) => console.log(err));

/*________________________________________________________________________________________*/
//find and updata a document with the classic method
Person.findById(personId)
  .then((person) => {
    person.favoriteFood.push("hamburger");
    person
      .save()
      .then((person) => console.log(person))
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));

/*___________________________________________________________________________________________*/
//find and update a document
const personName = "qamar";

Person.findOneAndUpdate(
  { name: personName },
  { $set: { age: 20 } },
  { new: true }
)
  .then((person) => console.log(person))
  .catch((err) => console.log(err));
/*____________________________________________________________________________________________*/
//find document by Id and Delete it
Person.findByIdAndDelete(personId)
  .then((person) => console.log(person))
  .catch((err) => consonle.log(err));
/*______________________________________________________________________________________________*/
//delete many document by name Mary
Person.deleteMany({ name:"Mary"})
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

/*____________________________________________________________________________________________*/
// find all the documents with favoriteFood burrito
var foodToSearch = "burrito";
Person.find({ favoriteFood: foodToSearch })
  .sort({ name: 1 })
  .limit(2)
  .select("-age")
  .exec()
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

