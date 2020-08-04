
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

// User
exports.UserView = function (reqq, res) {
    try {
        if (reqq.params.Mode == "UserName") {
            var conn = new sql.ConnectionPool(config);
            //5.
            conn.connect(function (err) {
                if (err) res.status(500).send("error");
                var req = new sql.Request(conn);
                req.query("select *from [User] where UserName = '" + reqq.params.Data + "'", function (err, kq) {
                    if (err) res.status(500).send(error);
                    else if (typeof kq.recordset[0] != 'undefined') {
                        res.send(kq.recordset[0]);
                    }
                    else
                        res.status(502).send("error");
                    conn.close();
                })
            }

            );

        }
    } catch (error) {
        res.status(500).send("error");
    }
};



exports.DataView = function (reqq, res) {
    try {
        var listOUT = {
            OTTDK: 0, OTTTK: 0, OTTCK: 0,
            OTLDK: 0, OTLTK: 0, OTLCK: 0,
            XMTDK: 0, XMTTK: 0, XMTCK: 0,
            XMLDK: 0, XMLTK: 0, XMLCK: 0,
            TONGDK: 0, TONGTK: 0, TONGCK: 0,
        };
        var dateFrom = new Date(reqq.params.DateF);
        var dateF =
            ("00" + (dateFrom.getMonth() + 1)).slice(-2) + "/" +
            ("00" + dateFrom.getDate()).slice(-2) + "/" +
            dateFrom.getFullYear() + " " +
            ("00" + dateFrom.getHours()).slice(-2) + ":" +
            ("00" + dateFrom.getMinutes()).slice(-2) + ":" +
            ("00" + dateFrom.getSeconds()).slice(-2);


        var dateEnd = new Date(reqq.params.DateT);
        var dateT =
            ("00" + (dateEnd.getMonth() + 1)).slice(-2) + "/" +
            ("00" + dateEnd.getDate()).slice(-2) + "/" +
            dateEnd.getFullYear() + " " +
            ("00" + dateEnd.getHours()).slice(-2) + ":" +
            ("00" + dateEnd.getMinutes()).slice(-2) + ":" +
            ("00" + dateEnd.getSeconds()).slice(-2);

        var conn = new sql.ConnectionPool(config);
        //5.
        conn.connect(function (err) {
            if (err) res.status(500).send(error);
            var req = new sql.Request(conn);
            //var str = "select *from OUT where TimeEntry >= '" + dateF + "' and TimeEntry <= '" + dateT + "'";
            var str = "select *from OUT";
            req.query(str, function (err, kq) {
                if (err) res.status(500).send(error);
                else if (typeof kq.recordset[0] != 'undefined') {
                    kq.recordset.forEach(k => {
                        if (k.TimeOut < dateFrom) {
                            if (k.VehicleTypeName.toLowerCase() == "oto") {
                                listOUT.OTLDK = listOUT.OTLDK + k.Amount;
                                listOUT.TONGDK = listOUT.TONGDK + k.Amount;
                            }
                            else if (k.VehicleTypeName.toLowerCase() == "xm") {
                                listOUT.XMLDK = listOUT.XMLDK + k.Amount;
                                listOUT.TONGDK = listOUT.TONGDK + k.Amount;
                            }

                        }
                        else if (k.TimeOut >= dateFrom && k.TimeOut <= dateEnd) {
                            if (k.VehicleTypeName.toLowerCase() == "oto") {
                                listOUT.OTLTK = listOUT.OTLTK + k.Amount;
                                listOUT.TONGTK = listOUT.TONGTK + k.Amount;
                            }
                            else if (k.VehicleTypeName.toLowerCase() == "xm") {
                                listOUT.XMLTK = listOUT.XMLTK + k.Amount;
                                listOUT.TONGTK = listOUT.TONGTK + k.Amount;
                            }
                        }
                        if (k.TimeOut <= dateEnd) {
                            if (k.VehicleTypeName.toLowerCase() == "oto") {
                                listOUT.OTLCK = listOUT.OTLCK + k.Amount;
                                listOUT.TONGCK = listOUT.TONGCK + k.Amount;
                            }
                            else if (k.VehicleTypeName.toLowerCase() == "xm") {
                                listOUT.XMLCK = listOUT.XMLCK + k.Amount;
                                listOUT.TONGCK = listOUT.TONGCK + k.Amount;
                            }
                        }

                    })
                    DataView2(reqq, res, listOUT, dateFrom, dateEnd);
                }
                else
                    res.send(listOUT)

                conn.close();
            })
        }

        );


    } catch (error) {
        res.status(500).send("error");
    }
};

var DataView2 = function (reqq, res, listOUT, dateFrom, dateEnd) {
    try {

        var conn = new sql.ConnectionPool(config);
        //5.
        conn.connect(function (err) {
            if (err) res.status(500).send(error);
            var req = new sql.Request(conn);
            //var str = "select *from OUT where TimeEntry >= '" + dateF + "' and TimeEntry <= '" + dateT + "'";
            var str = "select *from Receipt";
            req.query(str, function (err, kq) {
                if (err) res.status(500).send(error);
                else if (typeof kq.recordset[0] != 'undefined') {
                    kq.recordset.forEach(k => {
                        if (k.DateCreate < dateFrom) {
                            if (k.VehicleTypeName.toLowerCase() == "oto") {
                                listOUT.OTTDK = listOUT.OTTDK + k.Amount;
                                listOUT.TONGDK = listOUT.TONGDK + k.Amount;
                            }
                            else if (k.VehicleTypeName.toLowerCase() == "xm") {
                                listOUT.XMTDK = listOUT.XMTDK + k.Amount;
                                listOUT.TONGDK = listOUT.TONGDK + k.Amount;
                            }

                        }
                        else if (k.DateCreate >= dateFrom && k.DateCreate <= dateEnd) {
                            if (k.VehicleTypeName.toLowerCase() == "oto") {
                                listOUT.OTTTK = listOUT.OTTTK + k.Amount;
                                listOUT.TONGTK = listOUT.TONGTK + k.Amount;
                            }
                            else if (k.VehicleTypeName.toLowerCase() == "xm") {
                                listOUT.XMTTK = listOUT.XMTTK + k.Amount;
                                listOUT.TONGTK = listOUT.TONGTK + k.Amount;
                            }
                        }
                        if (k.DateCreate <= dateEnd) {
                            if (k.VehicleTypeName.toLowerCase() == "oto") {
                                listOUT.OTTCK = listOUT.OTTCK + k.Amount;
                                listOUT.TONGCK = listOUT.TONGCK + k.Amount;
                            }
                            else if (k.VehicleTypeName.toLowerCase() == "xm") {
                                listOUT.XMTCK = listOUT.XMTCK + k.Amount;
                                listOUT.TONGCK = listOUT.TONGCK + k.Amount;
                            }
                        }

                    })
                    res.send(listOUT)
                }
                else
                    res.send(listOUT)
                conn.close();
            })
        }

        );


    } catch (error) {
        res.status(500).send("error");
    }
};
