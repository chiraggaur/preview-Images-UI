import "./App.css";
import React, { useRef, useState } from "react";
import axios from "axios";

function App() {
  const [uploadedImages, setUploadedImages] = useState("");
  const imageRef = useRef("");

  async function handleUpload(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("images", imageRef.current.files[0]);

    try {
      let response = await axios.post(
        "http://localhost:3001/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUploadedImages(response.data);
      // console.log(uploadedImages);
    } catch (error) {
      console.error("Error while submitting form data", error);
    }
  }

  return (
    <div className="App">
      <div className="title-Box">
        <h1 className="title"> Upload Image & Preview Instantly </h1>
      </div>
      <div className="form-Wrapper">
        <form className="formData" encType="multipart/form-data">
          <label htmlFor="inputTag" className="selectImage-icon">
            Select Image
            <br />
            <i className="fa fa-2x fa-camera"></i>
            <input id="inputTag" type="file" name="images" ref={imageRef} />
          </label>
          <button className="upload-Button" onClick={handleUpload}>
            Upload
          </button>
        </form>
      </div>
      <div className="Image-Wrapper">
        {uploadedImages ? (
          <img
            src={uploadedImages.images}
            alt="images"
            className="uploaded-Image"
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
