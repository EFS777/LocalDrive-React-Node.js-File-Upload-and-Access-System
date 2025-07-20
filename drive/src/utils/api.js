var url=localStorage.getItem("baseUrl");

const api={
    getFiles:url+"getFiles",
    Upload:url+"upload",
    files:url+"files/",
    delete:url+"delete/"
}

export default api;