var table = new DataTable();

table.defineColumns(['title','genere','year']);

table.insertRows([{title : 'abc', genere : 'comedy', year : '2016'},{title : 'def', genere : 'thrill',year : '2003'},{title : 'xyz', genere : 'adventure', year :'2018'},{title : 'something', genere : 'comedy', year : '1996'}]);

table.sortBy('genere');

console.log('sorted on', table.sortedOn());

console.log('final table ',table.show());

var filtered_rows =  table.filter('genere','comedy');

console.log(table.noOfRows());

console.log(filtered_rows);
