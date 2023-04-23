import "./uploadImagesAWS.css";
import Dropzone from "react-dropzone";

export function UploadImagesAWS() {
    return (
        <div className="UploadImagesAWS">
                <div className="box">
                    <Dropzone accept="image/*" onDropAccepted={() => {}}>

                    {dropzoneProps => {
                            return (
                            <div>
                                <p>Drop some files here</p>
                            </div>
                            );
                        }}

                    </ Dropzone>
                </div>
        </div>
    )
}   