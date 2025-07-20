const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require('cors');
const multer = require('multer');
const { getDb } = require('./mongoDB');
const { ObjectId } = require('mongodb');
const {getLocalIp_assign}=require('./ipAssigner');
const fs = require('fs');
const path = require('path');
app.use(cors());
const port = 3001;

function DocType(ext) {
  const formats = {
    "images": [
      "jpg", "jpeg", "png", "gif", "bmp", "tiff", "svg", "webp", "heif", "ico", "avif", "raw"
    ],
    "audio": [
      "mp3", "wav", "aac", "flac", "ogg", "wma", "m4a", "aiff", "alac", "opus"
    ],
    "documents": [
      "pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt", "rtf", "odt", "ods", "odp", "md", "html", "xml", "csv"
    ],
    "videos": [
      "mp4", "avi", "mov", "wmv", "flv", "mkv", "webm", "3gp", "mpeg", "mpg", "m4v"
    ]
  }
  let docType = Object.keys(formats).find((type) => formats[type].includes(ext));
  return docType === undefined ? "others" : docType;
}

app.use((err, req, res, next) => {
  res.status(400).json({ error: err.message });
});

app.use('/files', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, '../drive/build')));

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: async (req, file, cb) => {
    let createdOn = new Date().toISOString().split('.')[0] + 'Z';
    let data = req?.body;
    let type = file.originalname.split(".");
    let actualName = file.originalname;    
    //let fileSize=(req?.file.size/1024).toFixed(2).toString()+"KB";
    type = type[type.length - 1];
    let name = Date.now() + "." + type;
    let record = {
      name,
      path: data.path,
      createdOn,
      docType: DocType(type),
      actualName,
      type,
      //fileSize
    }

    var db = await getDb();
    await db.collection('filesinfo').insertOne(record);
    cb(null, name);
  }
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../drive/build','index.html'));
});


app.post("/getFiles", async (req, res) => {
  try {
    let type = req.body.type;
    const db = await getDb();
    let doctype = type === "all" ? {} : { docType: type };
    const files = await db.collection('filesinfo').find(doctype).toArray();
    res.status(200).json(files);
    res.end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})

app.post('/upload', upload.array('uploaded_file', 10), (req, res) => {
  res.end();
});

app.delete('/delete/:id/:name', async (req, res) => {
  try {
    var id = req.params.id;
    var name = req.params.name;
    const filepath = path.join(__dirname, 'uploads', name);
    fs.unlink(filepath, async (err) => {
      if (err) {
        res.status(400).json({ error: err.message });
        res.end();
      }
      else {
        const db = await getDb();
        await db.collection('filesinfo').deleteOne({ _id: new ObjectId(id.toString()) });
        res.status(200).send("Deleted");
        res.end();
      }
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
    res.end();
  }
})
app.listen(port, () => {
  getLocalIp_assign();
  console.log("Server started at port:", port);
})
