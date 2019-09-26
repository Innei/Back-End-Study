const mysql = require('mysql')

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'test'
})

// connection.connect()

const query = function(sql, values) {
  // 返回一个 Promise
  return new Promise((resolve, reject) => {
    connection.getConnection(function(err, connection) {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          // 结束会话
          connection.release()
        })
      }
    })
  })
}

module.exports = { connection, query }
