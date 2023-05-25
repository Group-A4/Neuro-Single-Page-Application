import React from "react";
import styles from "./AddContent.module.css";
import { Link } from "react-router-dom";
import { SERVER_ADDRESS } from "../../../../config/config";
import { useDropzone } from "react-dropzone";
import withAuth from "../../../../WithAuth";

interface FormValues {
  fileName: string;
  contentFile: File;
  professorId: number;
  submitted: boolean;
}

const initialValues: FormValues = {
  fileName: "",
  contentFile: new File([], ""),
  professorId: -1,
  submitted: false,
};

const ContentInput: React.FC<{}> = () => {
  const user = JSON.parse(localStorage.getItem('utilizator') || '{}');
  const token = localStorage.getItem('token');

  const [formValues, setFormValues] = React.useState<FormValues>(initialValues);
  const [message, setMessage] = React.useState<string>("");
  const [uploadStatus, setUploadStatus] = React.useState<"idle" | "pending" | "success" | "error">("idle");

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setFormValues((prevFormValues: FormValues) => ({
      ...prevFormValues,
      contentFile: file,
      fileName: file.name,
      professorId: user.id,
    }));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormValues((prevFormValues: FormValues) => ({
      ...prevFormValues,
      submitted: true,
    }));
    setUploadStatus("pending");

    const url = SERVER_ADDRESS + "/content/create";

    const formData = new FormData();
    formData.append("fileName", formValues.fileName);
    formData.append("contentFile", formValues.contentFile);
    formData.append("professorId", formValues.professorId.toString());

    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          window.confirm("Upload failed!");
          throw new Error("Network response was not ok");
        }
        console.log("Content created successfully!");
        if(window.confirm("Content created successfully!")){
          window.location.reload();
        }
        setUploadStatus("success");
        return response.text();
      })
      .then((text) => {
        if (text.trim().length > 0) {
          return JSON.parse(text);
        } else {
          return {};
        }
      })
      .then((data) => console.log(data))
      .catch((error) => {
        console.error(error);
        setUploadStatus("error");
      });
  };

  React.useEffect(() => {
    if (uploadStatus === "success") {
      setMessage("File uploaded successfully!");
    } else if (uploadStatus === "error") {
      setMessage("Error uploading file. Please try again later.");
    } else {
      setMessage("");
    }
  }, [uploadStatus]);

  return (
    <div className={styles["body"]}>
      <div className={styles["body--text"]}>Add Content</div>
      <form
        id="form-file-upload"
        className={styles["body--form"]}
        onSubmit={handleSubmit}
      >
        <div
          {...getRootProps()}
          className={`${styles["body--content"]} ${
            isDragActive ? styles["drag-active"] : ""
          }`}
        >
          <input {...getInputProps()} accept=".pdf,.ppt,.pptx,.mp3,.mp4,.mkv,.jpg,.jpeg,.png,.bmp,.gif" />
          <div>
            {formValues.fileName && (
              <div className={`${styles["body--content-text"]} ignore`}>
                <p>{formValues.fileName}</p>
              </div>
            )}
            {!formValues.fileName && !isDragActive && (
              <div className={`${styles["body--content-text"]} ignore`}>
                <p>Upload a file</p>
                <p>Drag & Drop or add a file</p>
              </div>
            )}
            {!formValues.fileName && isDragActive && (
              <div className={`${styles["body--content-text"]} ignore`}>
                <p>Drop the file</p>
              </div>
            )}
          </div>
          <button type="button" className={`${styles["body--button--add"]} ignore`}>
            Add file
          </button>
        </div>

        {/* <Link to='/ViewLectureMaterials' className={styles["body--redirect"]}> */}
        <div className={styles['buttons--div']}>
        <button className={styles["body--button--publish"]}>Publish</button>
        <Link to='/ViewContentList' className={styles["body--button"]}>
        <button className={styles["body--button--back"]}>Back</button>
        </Link>
        </div>
        {/* </Link> */}
      </form>
    </div>
  );
};

export default withAuth(ContentInput, [1]);