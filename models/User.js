import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  bookedVisites: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'Residency' },
      date: { type: Date, required: true },
    },
  ],
  favResidenciesID: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Residency' }],
});

const User = mongoose.model('User', userSchema);

export default User;
