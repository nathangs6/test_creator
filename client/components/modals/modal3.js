import { useRouter} from 'next/router'
import modalStyles from './modal.module.css'

export default function Modal({ setIsOpen, modalTitle, children }) {
    return (<>
        <div className={modalStyles.darkBG} onClick={() => setIsOpen(false)}/>
        <div className={modalStyles.centered}>
            <div className={modalStyles.modal}>
                <div className={modalStyles.modalHeader}>
                    <h5 className={modalStyles.heading}>
                        {modalTitle}
                    </h5>
                    <button className={modalStyles.closeBtn} onClick={() => setIsOpen(false)}>
                        Close
                    </button>
                </div>
                <div className={modalStyles.modalContent}>
                    {children}
                </div>
                <div className={modalStyles.modalFoot}/>
            </div>
        </div>
    </>)
};
