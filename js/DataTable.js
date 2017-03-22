var DataTable = function(){
    var grid = null;
    this.rowModel = null;
    this.gridCollection = null;
    this.sortedBy = null;
};

DataTable.prototype.defineColumns = function(arr){
    console.log('define Columns called');
    if(!arr || arr.length === 0 )
        return Backbone.Model();
    var obj = {};
    arr.forEach(function(val){
                obj[val] = null;
    });
    this.rowModel = Backbone.Model.extend({
        defaults: obj
    });
    this.gridCollection = Backbone.Collection.extend({
        model : this.rowModel        
    });
    this.sortedBy = arr[0];
    grid = new this.gridCollection();
};


DataTable.prototype.insertRows = function(arr){
    console.log('inserting cloumns');
    if(!arr || arr.length === 0)
        return;
    arr.forEach(function(val){
        grid.add(val);
    });
};

DataTable.prototype.show = function(){
    return grid;  
};

DataTable.prototype.sortBy = function(col_name){
    var self = this;
    this.sortedBy = col_name || this.sorted_by;
    grid.comparator = function(row){
        return row.get(self.sortedBy);
    }
    grid.sort();
}

// returns the column name based on which table rows are sorted currently
DataTable.prototype.sortedOn = function(){
    return this.sortedBy;
}

DataTable.prototype.filter = function(col_name, value){
    var filtered = grid.filter(function(model){
        return model.get(col_name) === value;
    });
    
    var retArray = [];
    
    filtered.forEach(function(model){
        retArray.push(model.toJSON());
    });
    
    return retArray;
}

DataTable.prototype.attachEvent = function(eventName,callback){
    if(eventName instanceof Array){
        eventName.forEach(function(val){
            grid.on(val,callBack);
        });
    }
    else{
        grid.on(eventName,callBack);
    }
}

DataTable.prototype.detachEvent = function(eventName,callback){
    if(eventName instanceof Array){
        eventName.forEach(function(val){
           grid.off(val); 
        });
        
    }else{
        grid.off(eventName);   
    }
}

DataTable.prototype.noOfRows = function(){
    return grid.length;
}

DataTable.prototype.getData = function(){
    
    var retArray = [];
    grid.forEach(function(model){
        retArray.push(model.toJSON());
    });
    
    return retArray;
}

DataTable.prototype.deleteAllRows = function(){
    
    grid = new this.gridCollection();
}

DataTable.prototype.deleteColumn = function(col_name){
    grid.forEach(function(model){
        model.unset(col_name);
    });
}

DataTable.prototype.deleteRow = function(){
    
}


