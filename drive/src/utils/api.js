import Upload from "../components/upload/upload";

const url="http://192.168.0.7:3001/";

const api={
    getFiles:url+"getFiles",
    Upload:url+"upload",
    files:url+"files/",
    delete:url+"delete/"
}

export default api;