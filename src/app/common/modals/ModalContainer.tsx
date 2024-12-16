import { observer } from "mobx-react-lite";
import { Modal } from "antd"; // Import Modal from Ant Design
import { useStore } from "../../store/store";


export default observer(function ModalContainer() {
    const { modalStore } = useStore();
    return (
        <Modal
            open={modalStore.modal.open} 
            onCancel={modalStore.closeModal} 
            footer={null} 
            width={300} 
        >
            <div>
                {modalStore.modal.body} 
            </div>
        </Modal>
    );
});
