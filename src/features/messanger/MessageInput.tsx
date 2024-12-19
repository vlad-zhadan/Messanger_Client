import { observer } from "mobx-react-lite";
import { useStore } from "../../app/store/store";
import './Chat.css'
import { Button, Upload } from "antd";
import { CloseOutlined, SendOutlined, UploadOutlined } from '@ant-design/icons';
import FileUploadForm from "./FileUploadForm";
import { useEffect, useRef, useState } from "react";
import FileInput from "./FileInput";

function MessageInput () {
    const { messageStore, modalStore, fileStore } = useStore();
    const { handleSendMessage,  messageCurrent, handleMessageChange, isEditingMessage, handleSendEdited, setIsEditingMessage} = messageStore;
    const {selectedFile, setSelectedFile, handleSendMessageWithPhoto, setIsUploadingFile, isUploadingFile} = fileStore

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleSendMessageWithFile = (info: any) => {
        const file = info.file.originFileObj || info.file;

        if (!file) {
            setSelectedFile(undefined);
            setPreviewUrl(null);
            return;
        }

        setSelectedFile(file);

        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }

        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
          modalStore.openModal(menu)
        setIsUploadingFile(true)
       
         
    };



    const menu = (<div className="previewContainer">
                    <div className="previewContent">
                            <div className="imageConteiner">
                                <img src={previewUrl} alt="Preview" className="imgContainer"/>
                            </div>
                            <div className="inputContainer">
                                <FileInput />
                            </div>  
                    </div>
                </div>
                
            );

    useEffect(() => {
    if (previewUrl) {
        modalStore.openModal(menu);
    }

    // Cleanup function to revoke the object URL when modal closes or component unmounts
    return () => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
    };
}, [previewUrl, modalStore]);


    return (
         <div className="mesesageContainer">
            <form onSubmit={ isEditingMessage ? handleSendEdited : handleSendMessage} 
                className='messageBox'
            >
                <div className="messageBoxText">
                    <label htmlFor="messageText"></label>
                    <input
                    type="text"
                    id="messageText"
                    value={messageCurrent?.text}
                    onChange={handleMessageChange}
                    placeholder="Type a message..."
                    required
                    autoComplete="off" 
                    />
                </div>
                <div className="messageBoxButtons">
                    <Button
                            htmlType="submit" 
                            className="submitMessage submitButton"
                            icon={<SendOutlined />}
                    />
                    {isEditingMessage && (
                        <>
                            <Button 
                                htmlType="button" 
                                className="cancelSubmit submitButton" 
                                icon={<CloseOutlined />} 
                                onClick={() => setIsEditingMessage(false)}
                                danger 
                            />  
                        </>   
                    ) }

                    {!isEditingMessage &&(
                        <Upload
                                accept="*/*" 
                                beforeUpload={() => false}
                                onChange={handleSendMessageWithFile} 
                                showUploadList={false}
                                className="submitButton"
                            >
                                <Button className="submitButton" icon={<UploadOutlined />}></Button>
                            </Upload>
                    )}

                </div>
            </form>
        </div>
    )
}

export default observer(MessageInput)