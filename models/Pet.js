import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
  name: String,
  species: String,
  birthDate: Date,
  adopted: Boolean
});

const Pet = mongoose.model('Pet', petSchema);
export default Pet;
