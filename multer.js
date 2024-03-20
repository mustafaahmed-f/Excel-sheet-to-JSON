import multer from "multer";

export const uploadFile = () => {
  const storage = multer.diskStorage({});

  function fileFiltration(req, file, cb) {
    if (
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.mimetype === "application/vnd.ms-excel"
    ) {
      cb(null, true);
    } else {
      cb(new Error("ONLY excel files are allowed !!"), false);
    }
  }

  const upload = multer({ fileFilter: fileFiltration, storage });

  return upload;
};
