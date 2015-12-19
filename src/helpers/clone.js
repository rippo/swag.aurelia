export class Clone {
    
    copy(src) {
    
        var dest = {};
        dest.memberId = src.memberId;
        dest.name = src.name;
        dest.image = src.image;
    
        return dest
        
    } 
    
}