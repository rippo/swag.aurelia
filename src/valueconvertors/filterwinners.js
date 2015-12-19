export class filterWinnersValueConverter {
  toView(array) {

    //console.log("filter winners called");
 
    return array.filter(function(val, index, a) {
      return (val.WonSwag === false);
    });   
    
  }
}