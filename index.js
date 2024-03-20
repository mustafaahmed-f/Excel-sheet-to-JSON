import express from "express";
const app = express();
const port = process.env.PORT || 5000;
const baseURL = "/excelToJSON";
import cors from "cors";
import connection from "./DB/connect.js";
import { config } from "dotenv";
import { uploadFile } from "./multer.js";
import xlsx from "xlsx";
import qAndAModel from "./DB/Model.js";
import { paginationFunction } from "./PaginationFN.js";

app.use(express.json());
app.use(cors());
config();

//========================== Create server ========================

app.listen(port, () => console.log(`Server is running on port ... ${port}`));

//========================== API for test =========================

app.get("/", (req, res) => res.send("Hello !!"));

//========================= Upload API ============================

app.post(
  `${baseURL}/upload`,
  uploadFile().single("excelFile"),
  async (req, res, next) => {
    try {
      const workbook = xlsx.readFile(req.file.path);

      //// Access the first sheet

      const sheetName = workbook.SheetNames[0];

      const sheet = workbook.Sheets[sheetName];

      //// Convert excel file table into array of objects ::

      const data = xlsx.utils.sheet_to_json(sheet);

      const result = await qAndAModel.insertMany(data);

      if (!result)
        return res
          .status(500)
          .json({ message: "Failed to upload file to DB !!" });

      return res
        .status(200)
        .json({ message: "Data has been uploaded successfully !!" });

      //   console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
);

//=================== API to get data ==============================

app.get(`${baseURL}/getData`, async (req, res) => {
  try {
    const { page, size } = req.query;
    const { limit, skip } = paginationFunction({ page, size });
    const data = await qAndAModel.find().limit(limit).skip(skip);
    if (!data)
      return res.status(500).json({ message: "Failed to get data !!" });
    return res.status(200).json({ message: "Done", data });
  } catch (error) {
    console.log(error);
  }
});

//====================== DB connection ============================

connection();
