// import { useState } from "react";
// import { LuUpload } from "react-icons/lu";
// import { IoMdCloseCircleOutline } from "react-icons/io";
// import "./upload.scss";
// import axios from "axios";

// export default function Upload() {
//     const [uploadpercent, setUploadPercent] = useState(0);
//     const [modal, setModal] = useState(false);
//     const handleDrop = (e, type) => {
//         e.preventDefault();
//         const droppedFile = type === "upload" ? e.target.files : e.dataTransfer.files;
//         if (droppedFile.length > 0) {
//             const newFiles = Array.from(droppedFile);
//             console.log(newFiles);
//             uploadData(newFiles)
//         }
//     }

//     const uploadData = async (file) => {
//         const formData = new FormData();
//         formData.append("path", "/");
//         file.map((files) => formData.append('uploaded_file', files))
//         try {
//             await axios.post('http://localhost:3001/upload', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 },
//                 onUploadProgress: (progress) => {
//                     let percent = Math.round((progress.loaded * 100) / progress.total);
//                     setUploadPercent(percent);
//                 }
//             })
//         } catch (e) {
//             alert("Upload Failed");
//         }
//     }
//     return <>
//         {modal &&
//             <section className="modal">
//                 <div className="modal-body">
//                     <IoMdCloseCircleOutline size={27} className="close" onClick={() => {
//                         setModal(false);
//                         setUploadPercent(0);
//                     }} />
//                     <div className="upload" onDrop={(e) => handleDrop(e, "drag")} onDragOver={(e) => e.preventDefault()}>
//                         {uploadpercent > 0 ? <div style={{ textAlign: 'center' }}>
//                             <h3>{uploadpercent === 100 ? "Uploaded" : "Uploading"}</h3>
//                             <progress value={uploadpercent} max={100} />
//                             <h4>{uploadpercent}%</h4>
//                         </div> : <><label htmlFor="upload"><LuUpload color="#4259ff" size={32} /></label>
//                             <input type="file" hidden={true} id="upload" multiple onChange={(e) => handleDrop(e, "upload")} />
//                             <h3>Upload sources</h3>
//                             <h5>Drag and drop to upload</h5></>}
//                     </div>
//                 </div>
//             </section>}
//             <button className="addbutton" type="button" onClick={() => { setModal(true); }}>ADD</button>
//     </>
// }

import { useState } from "react";
import { LuUpload } from "react-icons/lu";
import "./upload.scss";
import axios from "axios";
import Modal from "../modal/modal";

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
            var response=await axios.post('http://localhost:3001/upload', formData, {
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
        trigger={<button className="addbutton" onClick={()=>setUploadPercent(0)} type="button">ADD</button>}
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