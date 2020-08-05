
let config = {
    user: "sa",
    password: "sa123456@",
    server: "localhost",
    database: "HITParking24102019",
    "options": {
    "enableArithAbort": true
    },
    };
    
    //SQL
    var sql = require("mssql");
    
    exports.getUser = function(UserName, Res) {
        //4.
        var conn = new sql.ConnectionPool(config);
        //5.
        conn.connect(function (err){
            if(err) Res = false;
            var req = new sql.Request(conn);
            req.query("select *from [User] where UserName = '"+UserName+"'", function(err, kq){
                if(err) Res = false;
                else if(typeof kq.recordset[0] != 'undefined')
                {
                       Res = kq.recordset[0];
                }          
                else
                    Res = false;
                conn.close();
            })
        }
    
        );
    };
    
   // test("quanly",)
    