import "./categories.scss";
import { MdAudioFile } from "react-icons/md";
import { IoDocumentSharp, IoTrashBin } from "react-icons/io5";
import { BiSolidVideos } from "react-icons/bi";
import { PiCardsFill } from "react-icons/pi";
import { FaCloudDownloadAlt } from "react-icons/fa";
import Modal from "../modal/modal";
import axios from "axios";

const url = "http://localhost:3001/files/";

const Categories = ({ type, src }) => {
    switch (type) {
        case "images":
            return <Images src={src} />
        case "documents":
            return <Documents src={src} />
        case "videos":
            return <Video src={src} />
        case "audio":
            return <Audio src={src} />
        default:
            return <Others src={src} />
    }
}

function Cover({ src }) {
    const download = async (e) => {
        e.stopPropagation();
        const response = await axios.get(url + src.name, { responseType: 'blob' });
        const blob = new Blob([response.data]);
        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = src.actualName;
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
    const trash = async (e) => {
        e.stopPropagation();
        var response = await axios.delete('http://localhost:3001/delete/' + src._id + "/" + src.name, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        if (response.status === 200) {
            alert("Deleted Succesfully");
            window.location.reload();
        }
    }
    return <><div className="cover">
        <FaCloudDownloadAlt onClick={download} color="white" size={35} /><IoTrashBin onClick={trash} color="white" size={35} />
    </div><Tooltip src={src}/></>
}

function Tooltip({ src }) {
    return <div className="tooltip">
        <h6>{src.actualName}</h6>
        <h6>{src.type}</h6>
    </div>
}

function Images({ src }) {
    return <Modal
        trigger={<div className="c_images"><img src={url + src.name} alt="image" /><h6>{src.actualName}<Cover src={src} /></h6>
        </div>}
        element={<img className="actualImage" src={url + src.name} alt="bigImage" />}
    />
}

function Documents({ src }) {
    return <div className="c_documents">
        <IoDocumentSharp size={100} />
        <h6>{src.actualName}</h6>
        <Cover src={src} />
    </div>
}

function Video({ src }) {
    return <Modal
        trigger={<div className="c_video"><BiSolidVideos size={100} /><h6>{src.actualName}</h6><Cover src={src} /></div>}
        element={<video width="320" height="240" controls>
            <source src={url + src.name} type={`video/${src.type}`} />
            Your browser does not support the audio element.
        </video>}
    />
}

function Audio({ src }) {
    return <Modal
        trigger={<div className="c_audio"><MdAudioFile size={100} /><h6>{src.actualName}</h6><Cover src={src} /></div>}
        element={<audio controls>
            <source src={url + src.name} type={`audio/${src.type}`} />
            Your browser does not support the audio element.
        </audio>}
    />

}

function Others({ src }) {
    return <div className="c_Others">
        <PiCardsFill size={100} />
        <h6>{src.actualName}</h6>
        <Cover src={src} />
    </div>
}

export { Categories }