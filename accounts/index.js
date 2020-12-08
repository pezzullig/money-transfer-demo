import Db from '../db';

// Account: {
//   id: Number,
//   balance: Number,
// }

// Get a single account by id, or null if it does not exist.
const getAccount = async (id) => {
  const res = await Db.pool().query('SELECT * FROM accounts WHERE id = $1', [id]);
  // Note that this may be null
  return res.rows[0];
};

// send transaction
const transferBalance = async (from, to, amount) => {
  try {
    console.info()
    await Db.pool().query(`BEGIN`);
    get
    console.info(`BEGIN`)
    
    await Db.pool().query(`
    UPDATE accounts SET balance = balance - $2 WHERE id = $1;
    `, [from, amount]);
    console.info(`decrement`)
    
    
    await Db.pool().query(`
    UPDATE accounts SET balance = balance + $2 WHERE id = $1;
    `, [to, amount]);
    console.info(`increment`)
    
    await Db.pool().query(`COMMIT`);
    console.info(`commit`)

  } catch (error) {

    await Db.pool().query(`ROLLBACK`);
    console.error(`rollback`, JSON.stringify(error))

  }
    
  // Note that this may be null
  return;
};

export default {
  getAccount,
  transferBalance,
};
