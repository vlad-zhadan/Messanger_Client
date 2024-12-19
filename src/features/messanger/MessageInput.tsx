import { observer } from "mobx-react-lite";
import { useStore } from "../../app/store/store";
import './Chat.css'
import { Button } from "antd";
import { CloseOutlined, SendOutlined } from '@ant-design/icons';
import FileUploadForm from "./FileUploadForm";
import { useState } from "react";

function MessageInput () {
    const { messageStore, modalStore, fileStore } = useStore();
    const { handleSendMessage,  messageCurrent, handleMessageChange, isEditingMessage, handleSendEdited, setIsEditingMessage} = messageStore;
    const {selectedFile, setSelectedFile, handleSendMessageWithPhoto} = fileStore

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setSelectedFile(file ?? undefined);

        // Generate a preview URL for the file
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        } else {
            setPreviewUrl(null);
        }
    }; 

    const menu = (<div >
                    <p>Preview:</p>
                    <img src={previewUrl} alt="Preview"/>
                    <button
                    onClick={()=> {
                        handleSendMessageWithPhoto()
                        modalStore.closeModal();
                    }}
                        disabled={!selectedFile}
                    >
                        Upload
                    </button>
                    <button
                        disabled={!selectedFile}
                    >
                        Cancel
                    </button>
                </div>
                
            );
    
    if(previewUrl) {
        modalStore.openModal(menu)
    }

    return (
         <div className="mesesageContainer">
            <form onSubmit={isEditingMessage ? handleSendEdited : handleSendMessage} className='messageBox'>
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
                    {isEditingMessage ? (
                        <>
                            <Button
                                htmlType="submit" 
                                className="submitEditedMessage submitButton"
                                icon={<SendOutlined />}
                            />
                            <Button 
                                htmlType="button" 
                                className="cancelSubmit submitButton" 
                                icon={<CloseOutlined />} 
                                onClick={() => setIsEditingMessage(false)}
                                danger 
                            />  
                        </>
                        
                    ) : (
                        <>
                            <Button
                            htmlType="submit" 
                            className="submitMessage submitButton"
                            icon={<SendOutlined />}
                            />
                            {/* <FileUploadForm /> */}
                            <input
                                type="file"
                                id="fileInput"
                                onChange={handleFileChange}

                            />
                        </>
                        
                    )}
                </div>
            </form>
        </div>
    )
}

export default observer(MessageInput)