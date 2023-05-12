import React from "react";
import styles from "./Body.module.css";
import { Link } from "react-router-dom";
import { SERVER_ADDRESS } from "../../../config/config";

interface FormValues {
  fileName: string;
  contentFile: File;
  professorId: number;
  submitted: boolean;
}

const initialValues: FormValues = {
  fileName: "",
  contentFile: new File([], ""),
  professorId: 53,
  submitted: false,
};

const ContentInput: React.FC<{}> = () => {
  const [formValues, setFormValues] = React.useState<FormValues>(initialValues);
  const [dragActive, setDragActive] = React.useState<boolean>(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [message, setMessage] = React.useState<string>("");

  // React.useEffect(() => {
  //   if (formValues.fileName !== "") {
  //     setMessage("File added successfully!");
  //     setTimeout(() => {
  //       setMessage("");
  //     }, 3000);
  //   }
  // }, [formValues.fileName]);

  const handleDrag = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e.target);
    if(e.target.classList. contains('ignore')){
      return;
    }
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFormValues((prevFormValues: FormValues) => ({
        ...prevFormValues,
        contentFile: file,
        fileName: file.name,
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormValues((prevFormValues: FormValues) => ({
        ...prevFormValues,
        contentFile: file,
        fileName: file.name,
      }));
    }
  };

  const onButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormValues((prevFormValues: FormValues) => ({
      ...prevFormValues,
      submitted: true,
    }));

    const url = SERVER_ADDRESS + "/content/create";

    const formData = new FormData();
    formData.append("fileName", formValues.fileName);
    formData.append("contentFile", formValues.contentFile);
    formData.append("professorId", formValues.professorId.toString());

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Content created successfully!");
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
      .catch((error) => console.error(error));
  };

  return (
    <div className={styles["body"]}>
      <div className={styles["body--text"]}>Add Content</div>
      <form
        id="form-file-upload"
        className={styles["body--form"]}
        onSubmit={handleSubmit}
      >
        <input
            id="content-file-input"
            type="file"
            ref={inputRef}
            style={{ display: "none" }}
            onChange={handleChange}
            accept=".pdf,.ppt,.pptx,.mp3,.mp4,.mkv,.jpg,.jpeg,.png,.bmp,.gif"
          />
        <label htmlFor="content-file-input" 
                className={`${styles["body--content"]} ${dragActive ? styles["drag-active"] : ""}`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                >
            <div>
                {formValues.fileName && (
                    <div className={`${styles["body--content-text"]} ignore`}>
                    <p>{formValues.fileName}</p>
                    </div>
                )}
                {!formValues.fileName && !dragActive && (
                    <div className={`${styles["body--content-text"]} ignore`}>
                    <p>Upload a file</p>
                    <p>Drag & Drop or add a file</p>
                    </div>
                )}
                {!formValues.fileName && dragActive && (
                    <div className={`${styles["body--content-text"]} ignore`}>
                    <p>Drop the file</p>
                    </div>
                )}
            </div>
            <button
                    type="button"
                    onClick={onButtonClick}
                    className={`${styles["body--button--add"]} ignore`}
                >
                    Add file
                </button>
        </label>

        <Link to='/ViewLessonMaterials' className={styles["body--redirect"]}>
            <button className={styles["body--button--publish"]}>
                Publish
            </button>
        </Link>
      </form>
    </div>
  );
};

export default ContentInput;
