import { useState } from "react";
import { LuUpload } from "react-icons/lu";
import "./upload.scss";
import axios from "axios";
import Modal from "../modal/modal";
import api from "../../utils/api";

export default function Upload({refresh}) {
    const [uploadpercent, setUploadPercent] = useState(0);

    const handleDrop = (e, type) => {
        e.preventDefault();
        const droppedFile = type === "upload" ? e.target.files : e.dataTransfer.files;
        if (droppedFile.length > 0) {
            const newFiles = Array.from(droppedFile);
            console.log(newFiles);
            uploadData(newFiles)
        }
    }

    const uploadData = async (file) => {
        const formData = new FormData();
        formData.append("path", "/");
        file.map((files) => formData.append('uploaded_file', files));
        try {
            var response=await axios.post(api.Upload, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progress) => {
                    let percent = Math.round((progress.loaded * 100) / progress.total);
                    setUploadPercent(percent);
                }
            });
            if(response.status===200){
                refresh();
            }
        } catch (e) {
            alert("Upload Failed");
        }
    }
    return <Modal
        trigger={<button className="addbutton" onClick={()=>{setUploadPercent(0)}} type="button">ADD</button>}
        element={
            <div className="upload" onDrop={(e) => handleDrop(e, "drag")} onDragOver={(e) => e.preventDefault()}>
                {uploadpercent > 0 ? <div style={{ textAlign: 'center' }}>
                    <h3>{uploadpercent === 100 ? "Uploaded" : "Uploading"}</h3>
                    <progress value={uploadpercent} max={100} />
                    <h4>{uploadpercent}%</h4>
                </div> : <><label htmlFor="upload"><LuUpload color="#4259ff" size={32} /></label>
                    <input type="file" hidden={true} id="upload" multiple onChange={(e) => handleDrop(e, "upload")} />
                    <h3>Upload sources</h3>
                    <h5>Drag and drop to upload</h5></>}
            </div>
        }
    />
}