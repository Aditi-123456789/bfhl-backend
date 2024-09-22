import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/bfhl', (req, res) => {
  const { data, file_b64 } = req.body;
  const user_id = "aditi_123456";
  const email = "ak7937@srmist.edu.in";
  const roll_number = "RA2111003010314";

  const numbers = data.filter(item => !isNaN(item));
  const alphabets = data.filter(item => isNaN(item));

  const lowerAlphabets = alphabets.filter(char => char >= 'a' && char <= 'z');
  const highestLowercaseAlphabet = lowerAlphabets.length ? [lowerAlphabets.sort().pop()] : [];

  let file_valid = false;
  let file_mime_type = null;
  let file_size_kb = 0;

  if (file_b64) {
    file_valid = true;
    file_mime_type = "image/png";
    file_size_kb = Buffer.from(file_b64, 'base64').length / 1024;
  }

  res.json({
    is_success: true,
    user_id,
    email,
    roll_number,
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet,
    file_valid,
    file_mime_type,
    file_size_kb
  });
});
app.get('/bfhl', (req, res) => {
  res.status(200).json({
    operation_code: 1
  });
});
app.get('/', (req, res) => {
  res.json({ message: "Hello From Express App" });
});

// Export the app for Vercel
export default app;
