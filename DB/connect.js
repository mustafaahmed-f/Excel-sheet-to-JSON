import mongoose from "mongoose";

const connection = async function () {
  return await mongoose
    .connect(process.env.DB_URL_ATLAS)
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log("Connection failed !!", err));
};

export default connection;
