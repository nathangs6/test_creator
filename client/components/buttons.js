import buttonStyles from './buttons.module.css';

export function ModalButton({ setOpen, action }) {
    if (action === "confirm") {
        return <ModalConfirmButton setOpen={setOpen}/>
    };
    if (action === "delete") {
        return <ModalDeleteButton setOpen={setOpen}/>
    };
    if (action === "cancel") {
        return <ModalCancelButton setOpen={setOpen}/>
    };
    return <div></div>
}

export function ModalConfirmButton({ setOpen }) {
    return (<input
        className={buttonStyles.modalConfirm}
        value="Confirm"
        type="submit"/>);
};

export function ModalCancelButton({ setOpen }) {
    return (<button
        className={buttonStyles.modalCancel}
        onClick={() => setOpen(false)}
        type="button">
        Cancel
    </button>);
}

export function ModalDeleteButton({ setOpen }) {
    return (<input
        className={buttonStyles.modalDelete}
        value="Delete"
        type="submit"/>);
};
