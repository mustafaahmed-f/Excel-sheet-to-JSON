import mongoose from "mongoose";

const connection = async function () {
  return await mongoose
    .connect(process.env.LOCAL_DB_URL)
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log("Connection failed !!", err));
};

export default connection;
