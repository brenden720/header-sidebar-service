const mysql = require('mysql');
const Promise = require('bluebird');
const seedArray = require('./seed.js');

const connection = mysql.createConnection({
  user: 'root',
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

const createTables = () => {
  // creates course table
  return db.queryAsync(`
    CREATE TABLE IF NOT EXISTS Course (
      id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(70),
      description VARCHAR(400),
      tag VARCHAR(13),
      avg_rating DECIMAL(2, 1),
      total_ratings INTEGER(3),
      enrollment INTEGER(3),
      created_by VARCHAR(25),
      last_updated VARCHAR(7),
      language VARCHAR(25),
      img_url VARCHAR(100),
      list_price VARCHAR(7),
      discount_price VARCHAR(7),
      video_hrs DECIMAL(3, 1),
      total_articles INTEGER(3),
      total_downloads INTEGER(3),
      active_coupon VARCHAR(11)
    );`)
    // creates CC table
    .then(() => {
      db.queryAsync(`
        CREATE TABLE IF NOT EXISTS CC (
          id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
          cc_option VARCHAR(15)
      );`);
    })
    .then(() => {
      db.queryAsync(`
        CREATE TABLE IF NOT EXISTS Course_CC (
          course_id INTEGER,
          cc_id INTEGER     
      );`);
    })
    .then(() => {
      db.queryAsync(`
        ALTER TABLE Course_CC ADD FOREIGN KEY (course_id) REFERENCES Course (id);
      `);
    })
    .then(() => {
      db.queryAsync(`
        ALTER TABLE Course_CC ADD FOREIGN KEY (cc_id) REFERENCES Course (id);
      `);
    });
};

const createData = () => {
  const queryStr = 'INSERT INTO Course SET ?';
  for (let i = 0; i < seedArray.length; i += 1) {
    db.queryAsync(queryStr, seedArray[i]);
  }
};

db.queryAsync('CREATE DATABASE IF NOT EXISTS headerSidebar')
  .then(() => console.log(`Connected to CheckoutData database as ID ${db.threadId}`))
  .then(() => db.queryAsync('USE headerSidebar'))
  .then(() => createTables(db))
  .then(() => createData());
