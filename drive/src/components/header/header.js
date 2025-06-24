import "./header.scss";
import { IoSearch } from "react-icons/io5";
import profile from "../../assets/profile.png"
export default function Header({Search}) {
    return <header>
        <nav>
            <h3>Local Drive</h3>
            <div className="searchBox">
                <IoSearch className="searchIcon" size={20} />
                <input onChange={Search} className="search" placeholder="Search Drive" aria-label="Search Drive" />
            </div>
            <img src={profile} width={50} alt="profile" />
        </nav>
    </header>
}