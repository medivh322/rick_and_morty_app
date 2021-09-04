import { Button, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../redux/reducers";

const ModalDetail = () => {
    const dispatch = useDispatch();
    const {openDetailModal, detailCharacter} = useSelector(state => state);

    function getValues(obj){
        if(Object.keys(obj).length === 0) return obj;
        let newObj = {};
        Object.keys(obj).forEach(key => {
            newObj[key] = (obj[key] instanceof Object) ? Object.entries(obj[key])[0][1] : obj[key]; 
        });
        return newObj;
    }
    let detailCharacterObj = getValues(detailCharacter);

    return (
        <Modal show={openDetailModal} onHide={() => dispatch(actions.closeModal())}>
            <Modal.Header closeButton>
                <Modal.Title>{detailCharacter.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src={detailCharacter.image} className="detailImg"/>
                <ul className="detaiList">
                    {Object.keys(detailCharacterObj).map((key,i) => 
                        <li className="detailList__item" key={i}>
                            <p>{key}</p>
                            <p>{detailCharacterObj[key]}</p>
                        </li>
                    )}
                </ul>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => dispatch(actions.closeModal())}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalDetail;