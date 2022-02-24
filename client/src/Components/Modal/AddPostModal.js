import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState } from "react";
import { PostContext } from "../../Context/PostContext";
import { useTranslation } from "react-i18next";
const AddPostModal = () => {
  // Contexts
  const { showAddPostModal, setShowAddPostModal, addPost, setShowToast } =
    useContext(PostContext);
  const { t } = useTranslation();
  // State
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    url: "",
    status: `${t("to_learn")}`,
  });

  const { title, description, url } = newPost;

  const onChangeNewPostForm = (event) =>
    setNewPost({ ...newPost, [event.target.name]: event.target.value });

  const closeDialog = () => {
    resetAddPostData();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await addPost(newPost);
    setShowToast({
      show: true,
      message: message ? `${t("add_skills")}` : "",
      type: success ? "success" : "danger",
    });
    resetAddPostData();
  };

  const resetAddPostData = () => {
    setNewPost({
      title: "",
      description: "",
      url: "",
      status: `${t("to_learn")}`,
    });
    setShowAddPostModal(false);
  };

  return (
    <Modal show={showAddPostModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>{t("dont_title")}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder={t("title")}
              name="title"
              required
              aria-describedby="title-help"
              value={title}
              onChange={onChangeNewPostForm}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder={t("description")}
              name="description"
              value={description}
              onChange={onChangeNewPostForm}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder={t("url")}
              name="url"
              value={url}
              onChange={onChangeNewPostForm}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            {t("cancle")}
          </Button>
          <Button variant="primary" type="submit">
            {t("add")}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddPostModal;
