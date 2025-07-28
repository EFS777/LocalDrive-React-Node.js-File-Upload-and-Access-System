import "./App.scss";
import Header from "./components/header/header";
import Upload from "./components/upload/upload";
import { useEffect, useRef, useState } from "react";
import { FaFolder } from "react-icons/fa";
import { MdLibraryMusic } from "react-icons/md";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { RiFolderImageFill } from "react-icons/ri";
import { FaFolderClosed } from "react-icons/fa6";
import { IoDocument } from "react-icons/io5";
import axios from "axios";
import { Categories } from "./components/categories/categories";
import api from "./utils/api";

export default function App() {
  var tabs = [
    {
      id: 1,
      name: "All",
      icon: <FaFolder />,
      type: "all",
    },
    {
      id: 2,
      name: "Images",
      icon: <RiFolderImageFill />,
      type: "images"
    },
    {
      id: 3,
      name: "Documents",
      icon: <IoDocument />,
      type: "documents"
    },
    {
      id: 4,
      name: "Videos",
      icon: <MdOutlineOndemandVideo />,
      type: "videos"
    },
    {
      id: 5,
      name: "Audio",
      icon: <MdLibraryMusic />,
      type: "audio"
    },
    {
      id: 6,
      name: "Others",
      icon: <FaFolderClosed />,
      type: "others"
    },
  ];

  const [tab, setTab] = useState(0);
  const [files, setFiles] = useState([]);


  const fetcher = async () => {
    try {
      await fetch("url.json?v=" + new Date().getTime())
        .then((e) => e.json())
        .then(async(d) => {
          localStorage.setItem("baseUrl", d.url);
          let data = { type: tabs[tab].type }
          var response = await axios.post(api.getFiles, data, {
            headers: {
              'Content-Type': 'application/json'
            },
          })
          if (response.status === 200) {
            OldData.current = response.data;
            setFiles(response.data);
          }
        })
    } catch (e) {
      alert("Something went wrong");
    }
  }
  useEffect(() => {
    fetcher();
  }, [tab])
  var OldData = useRef([]);
  const Search = (e) => {
    let word = e.target.value;
    if (word === "") {
      setFiles(OldData.current);
      return;
    }
    let filtered = files.filter((e) => e.actualName.toLowerCase().includes(word.toLowerCase()));
    setFiles(filtered);
  }

  return <>
    <Header Search={Search} />
    
    <main>
      <aside>
        <ul style={{ listStyle: "none" }}>
          {tabs.map((item, i) => <li onClick={() => setTab(i)} className={i === tab ? "active" : ""} key={item.name}>{item.icon}&nbsp;&nbsp;{item.name}</li>)}
        </ul>
        <div className="serverIp">Site is available on : {localStorage.getItem("baseUrl")}</div>
      </aside>
      <section>
        <div className="header">
          <h3>{tabs[tab].icon}&nbsp;&nbsp;{tabs[tab].name}</h3>
          {tab === 0 && <Upload refresh={fetcher} />}
        </div>
        <div className="body">
          {
            files.map((item) => <Categories type={item.docType} key={item.name} src={item} />)
          }
        </div>
      </section>
    </main>
  </>
}
