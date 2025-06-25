import { useState, useEffect, cloneElement } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import "./modal.scss";
export default function Modal({ trigger, element, inital = false, callback }) {
    const [modal, setModal] = useState(inital);
    function Close() {
        setModal(false);
        if(callback)callback(false);
    }
    return <>
        {
            trigger && cloneElement(trigger, {
                onClick: () => {
                    setModal(true);
                    if (trigger?.props?.onClick !== undefined) trigger.props.onClick();
                }
            })
        }
        {modal &&
            <section className="modal" onClick={Close}>
                <IoMdCloseCircleOutline size={27} className="m_close" onClick={Close} />
                <div className="modal-body" onClick={(e)=>e.stopPropagation()}>
                    <IoMdCloseCircleOutline size={27} className="d_close" onClick={() => {
                        setModal(false);
                    }} />
                    {element}
                </div>
            </section>}
    </>

}