import { useState, useEffect } from "react";
import classes from "./contact-form.module.css";
import Notification from "../ui/notification";

async function sendContactData (contactDetails) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(contactDetails),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();

  if(!response.ok) {
    throw new Error(data.message || 'Something went wrong!')
  }
}

const ContactForm = () => {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [reqStatus, setReqStatus] = useState(''); // pending, success, error
  const [reqError, setReqError] = useState('');

  useEffect(() => {
    if (reqStatus === 'success' || reqStatus === 'error') {
      const timerId = setTimeout(() => {
        setReqStatus('');
        setReqError('');
      }, 3000);

      return () => clearTimeout(timerId)
    }
  }, [reqStatus]);

  async function sendMessageHandle(event) {
    event.preventDefault();

    setReqStatus('pending');
    try {
      await sendContactData({ email, name, message });
      setReqStatus('success');
      setEmail('');
      setName('');
      setMessage('');
    } catch (error) {
      setReqError(error.message);
      setReqStatus('error');
    }
  }

  let notification;

  if(reqStatus === 'pending') {
    notification = {
      status: 'pending',
      title: 'Sending message...',
      message: 'Your message is on its way!'
    }
  }

  if(reqStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Success!',
      message: 'Message sent Successfully!'
    }
  }

  if(reqStatus === 'error') {
    notification = {
      status: 'error',
      title: 'Error!',
      message: reqError
    }
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandle}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input type="text" id="email" required value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea id="message" rows="5" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
        </div>

        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
    </section>
  );
};

export default ContactForm;
