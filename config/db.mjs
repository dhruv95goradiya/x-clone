import mongoose from 'mongoose';

export const connectDB = () => {
  mongoose.connect('mongodb://127.0.0.1:27017/x_clone')
    .then(() => console.log("Connected to MongoDB!"))
    .catch(err => console.error("Connection error:", err));
};

//separate config file can be maintain once the config params increases
export const num_of_sentences_limit = 2;
export const secretKey = 'secretKey';
export const consider_email_as_username = false; //validate username as email