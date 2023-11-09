import { useState } from "react";

import styles from './passwordmodal.module.scss';
import ButtonUI from "./buttonui";
import Input from "./input";
import Label from "./label";
import Paragraph from "./paragraph";

// Create a PasswordModal component
function PasswordModal({ isOpen, onClose}) {
    const [password, setPassword] = useState('');
    const [linkVisible, setLinkVisible] = useState(false);

  
    const handleSubmit = async (event) => {
      event.preventDefault();

      try {
        const response = await fetch('/api/passwordCheck', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password }),
        });

        const data = await response.json();

        if (data.success) {
            setLinkVisible(true);
        } else {
            alert('Incorrect password. Please try again.');
        }
    } catch (error) {
        console.error('Error checking password:', error);
        alert('An error occurred. Please try again.');
    }
    };
     
    return (
      <div className={styles.modal_background}>
        <div className={styles.modal}>
        {!linkVisible ? <form onSubmit={handleSubmit}>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <ButtonUI type="button" backgroundColor="blue" onClick={handleSubmit}>
              Submit
            </ButtonUI>
            <ButtonUI icon="close" backgroundColor="blue" clickHandler={onClose} />
          </form>
          :  <Paragraph>
          <a href="https://drive.google.com/drive/folders/1fz0C0C8LD5Q26HOQOfPCojyC6FjRk__K?usp=sharing" target="_blank" rel="noopener noreferrer">
              Click here to access the Google Drive folder
          </a>
      </Paragraph>}
          </div>
      </div>
    );
  }
export default PasswordModal