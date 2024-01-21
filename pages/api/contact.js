import { MongoClient } from 'mongodb';

async function handlers(req, res) {
  if (req.method === "POST") {
    let client;
    const { email, name, message } = req.body;

    if (!email || !email.includes('@') || !name || name.trim() === '' || !message || message.trim() === '') {
      res.status(422).json({
        message: "Invalid input!",
      });
      return;
    }

    const newMessage = {
      email, name, message
    }

    try {
     client = await MongoClient.connect('mongodb+srv://mtuser123:mtuser123@sandbox.ay8lw.mongodb.net/my-site');
    } catch (error) {
      res.status(500).json({ message: 'Could not connect to DB.' });
      return;
    }

    const db = client.db();

    try {
      const result = await db.collection('messages').insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({ message: 'Storing message failed!' });
      return;
    }

    client.close();

    res.status(201).json({
      message: 'Successfully stored message!', message: newMessage
    });
  }
}

export default handlers;
