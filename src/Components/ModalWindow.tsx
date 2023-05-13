import '../Styles/Modal.css'

export const ModalWindow = (props:{
    modal:boolean,
    setModal:React.Dispatch<React.SetStateAction<boolean>>,
    children: React.ReactNode
}) => {
    return (
        <div className={props.modal?"modal-window modal-active":"modal-window"} onClick={()=>props.setModal(false)}>
            <div id='modal-content' onClick={(e)=>e.stopPropagation()}>
                {props.children}
           </div>
        </div>
    );
}