import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import ActionButtons from "../ActionButtons/ActionButtons";
import { useTranslation } from "react-i18next";

function SinglePost({ post: { _id, status, title, description, url } }) {
  const { t } = useTranslation();
  return (
    <Card
      className="shadow"
      border={
        status === `${t("learned")}`
          ? "success"
          : status === `${t("learning")}`
          ? "warning"
          : "danger"
      }
    >
      <Card.Body>
        <Card.Title>
          <Row>
            <Col>
              <p className="post-title">{title}</p>
              <Badge
                pill
                bg={
                  status === `${t("learned")}`
                    ? "success"
                    : status === `${t("learning")}`
                    ? "warning"
                    : "danger"
                }
              >
                {status}
              </Badge>
            </Col>
            <Col className="text-right">
              <ActionButtons url={url} _id={_id} />
            </Col>
          </Row>
        </Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default SinglePost;
