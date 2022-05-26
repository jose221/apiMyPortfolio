class DBHelper{
    static excludeAttributes(excludes = [],obj){
        for (const exclude of excludes) {
            if(obj[exclude]){
                delete obj[exclude];
            }
        }
        return obj;
    }
}
module.exports  = DBHelper;
