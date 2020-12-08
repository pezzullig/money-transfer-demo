import _ from 'lodash';
import Express from 'express';
import bodyParser from 'body-parser';

import Accounts from './accounts';
import Config from './config';
import Db from './db';
// Start up the database pool
Db.initPool();

// Build a basic express app
const app = Express();
app.use(bodyParser.urlencoded({ extended: true }));
const { port } = Config.server;

// TODO: Consider pulling some logic out of this big file.

// Basic ping endpoint
app.get('/ping', (req, res) => {
  res.json({
    message: 'pong',
  });
});

// Single account endpoint
app.get('/accounts/:id', async (req, res) => {
  // Parse the parameter
  const id = parseInt(req.params.id, 10);
  if (!_.isFinite(id)) {
    res.status(400).json({ message: 'Unable to parse account id' });
    return;
  }

  // Try to fetch it from the database
  let account;
  try {
    account = await Accounts.getAccount(id);
  } catch (e) {
    // Something went wrong, so log it and return a 500
    console.error(e);
    res.status(500).json({ message: 'Unknown error' });
    return;
  }

  // Couldn't find it
  if (!account) {
    res.status(404).json({ message: 'Unable to find that account' });
    return;
  }

  // Return it
  res.json({ data: account });
});

app.post('/transfer/:id', async (req, res) => {
  // Parse the parameter
  const id = parseInt(req.params.id, 10);
  const body = req.body;
  console.log(req.body);
  const to = parseInt(body.to, 10);
  const amount = parseInt(body.amount, 10);

  if (!_.isFinite(id)) {
    res.status(400).json({ message: 'Unable to parse account id' });
    return;
  }

  if (!_.isFinite(to)) {
    res.status(400).json({ message: 'Unable to parse to id' });
    return;
  }

  if (!_.isFinite(amount) && amount > 0 && amount % 1 === 0 && amount.toString() !== amount) {
    res.status(400).json({ message: 'Unable to parse amount id' });
    return;
  }

  try {
    const sender = await Accounts.getAccount(id);
    console.info("sender", sender)
    if (sender && sender.balance < amount && sender.id !== receiver.id) {
      res.status(400).json({ message: 'User does not have sufficient balance' });
    }
    // receiver
    const receiver = await Accounts.getAccount(to);
    console.info("receiver", receiver);
    if (!receiver) {
      res.status(400).json({ message: 'Reciever does not exist' });
    }
    await Accounts.transferBalance(sender.id, receiver.id, amount);


  } catch (e) {
    // Something went wrong, so log it and return a 500
    console.error(e);
    res.status(500).json({ message: 'Unknown error' });
    return;
  }

  // Return it
  res.json({ success: true });
});

// Start it listening.  This is the top level so we can't use await.
app.listen(port, () => console.log(`Moneytransfer app listening on port ${port}!`));
