import {useState,useEffect,cloneElement} from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import "./modal.scss";
export default function Modal({ trigger, element }) {
    const [modal, setModal] = useState(false);
    // useEffect(()=>{
    //     document.body.style.ov
    // },[modal])
    return <>
        {
            trigger && cloneElement(trigger, { onClick: () => {
                setModal(true);             
                if(trigger?.props?.onClick!==undefined)trigger.props.onClick();
            } })
        }
        {modal &&
            <section className="modal">
                <div className="modal-body">
                    <IoMdCloseCircleOutline size={27} className="close" onClick={() => {
                        setModal(false);
                    }} />
                    {element}
                </div>
            </section>}
    </>

}