import { useRouter } from 'next/router'; // might not be needed
import modalStyles from './modal.module.css';
import { ModalButton } from '../buttons.js';
import buttonStyles from '../buttons.module.css';

export function BigModal({ setOpen, modalTitle, action, handleSubmit, children }) {
    return (<>
        <div className={modalStyles.modalBackground} onClick={() => setOpen(false)}/>
        <form onSubmit={e => handleSubmit(e)}>
            <div className={`${modalStyles.bigModal} ${modalStyles.centre}`}>
                <div className={modalStyles.modalHeader}>
                    <h5 className={modalStyles.heading}>
                        {modalTitle}
                    </h5>
                    <button className={modalStyles.headerClose} onClick={() => setOpen(false)}>
                        Close
                    </button>
                </div>
                <div className={modalStyles.modalContent}>
                    {children}
                </div>
                <div className={modalStyles.modalFooter}>
                    <ModalButton setOpen={setOpen} action={action}/>
                    <ModalButton setOpen={setOpen} action="cancel"/>
                </div>
            </div>
        </form>
    </>)
};

export function SmallModal({ setOpen, modalTitle, action, handleSubmit, children }) {
    return (<>
        <div className={modalStyles.modalBackground} onClick={() => setOpen(false)}/>
        <form onSubmit={e => handleSubmit(e)}>
            <div className={`${modalStyles.smallModal} ${modalStyles.centre}`}>
                <div className={modalStyles.smallModalHeader}>
                    <h5 className={modalStyles.smallHeading}>
                        {modalTitle}
                    </h5>
                    <button className={modalStyles.smallHeaderClose} onClick={() => setOpen(false)}>
                        Close
                    </button>
                </div>
                <div className={modalStyles.smallModalContent}>
                    {children}
                </div>
                <div className={modalStyles.modalFooter}>
                    <ModalButton setOpen={setOpen} action={action}/>
                    <ModalButton setOpen={setOpen} action="cancel"/>
                </div>
            </div>
        </form>
    </>)
};
