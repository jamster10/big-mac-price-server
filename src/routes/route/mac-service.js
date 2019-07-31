'use strict';


const xss = require('xss');

// sql query for specific country select * from data where country='Argentina' ORDER BY date  desc limit 1

//COuntry count: SELECT COUNT(*) FROM (SELECT DISTINCT country  FROM data) AS TEMP;

//get all countries