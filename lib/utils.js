// utilities for app

// MySQL command call
const sqlCall = (sql, params) => {
  console.log("inside sqlCall");
  console.log(sql);
  console.log(params);
  connex2sql.query(sql, params,
    (err,res) => {
      console.log("inside sqlCall.query");
      console.log(err);
      console.log(res);
      if (err){
        res.status(500).json({error: err.message});
        return;
      }
      res.json({
        message: "success",
        data: res
      });
    });
 };

 
module.exports = sqlCall