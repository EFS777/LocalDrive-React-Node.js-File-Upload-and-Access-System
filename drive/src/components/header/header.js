import "./header.scss";
import Images from "../../utils/images";
export default function Header({Search}) {
    return <header>
        <nav>
            <h3>Local Drive</h3>
            <div className="searchBox">
                <img src={Images.search} alt="search" />
                <input onChange={Search} className="search" placeholder="Search Drive" aria-label="Search Drive" />
            </div>
            <img src={Images.profile} width={50} alt="profile" />
        </nav>
    </header>
}