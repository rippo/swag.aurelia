export class Clone {
    
    copy(src) {
    
        var dest = {};
        dest.id = src.id;
        dest.name = src.name;
        dest.image = src.image;
        dest.won = (src.won !== null) ? src.won : false;
        dest.swagThing = src.swagThing;
    
        return dest
        
    } 
    
}