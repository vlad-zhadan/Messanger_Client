import { observer } from "mobx-react-lite";
import { useStore } from "../../app/store/store";
import './Chat.css'
import { Button, Upload } from "antd";
import { CloseOutlined, SendOutlined, UploadOutlined } from '@ant-design/icons';
import FileUploadForm from "./FileUploadForm";
import { useEffect, useRef, useState } from "react";

function FileInput () {
    const { messageStore, fileStore } = useStore();
    const { messageCurrentWithMedia, handleMessageChangeMedia, isEditingMessage, setIsEditingMessage} = messageStore;
    const {handleSendMessageWithPhoto} = fileStore

    return (
         <div className="mesesageContainer">
            <form onSubmit={ handleSendMessageWithPhoto} 
                className='messageBox'
            >
                <div className="messageBoxText">
                    <label htmlFor="messageTextMedia"></label>
                    <input
                    type="text"
                    id="messageTextMedia"
                    value={messageCurrentWithMedia?.text}
                    onChange={handleMessageChangeMedia}
                    placeholder="Type a message..."
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

                    

                </div>
            </form>
        </div>
    )
}

export default observer(FileInput)