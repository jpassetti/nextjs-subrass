import { useState } from "react";

import styles from './passwordmodal.module.scss';
import ButtonUI from "./buttonui";
import Input from "./input";
import Label from "./label";

// Create a PasswordModal component
function PasswordModal({ isOpen, onClose, onPasswordSubmit }) {
    const [password, setPassword] = useState('');
  
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
          // If the password is correct, navigate to the Google Drive folder
          const link = document.createElement('a');
          link.href = 'https://drive.google.com/drive/folders/1C6xiwHqxHxAEhfVABVyv9LBVYNQAt-MJ';
          link.target = '_blank';  // Optional: to open in a new tab
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          onClose(); // Close the modal
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
          <form onSubmit={handleSubmit}>
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
          </div>
      </div>
    );
  }
export default PasswordModal