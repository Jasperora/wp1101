import Modal from "antd/lib/modal/Modal";
import { Input } from "antd";
import { useState } from "react";

const ChatModal = ({ visible, onCreate, onCancel }) => {
  const [name, setName] = useState("");
  return (
    <Modal
      visible={visible}
      onOk={() => onCreate({ name })}
      onCancel={onCancel}
    >
      <p>Who do you want to talk to?</p>
      <Input
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
    </Modal>
  );
};

export default ChatModal;
