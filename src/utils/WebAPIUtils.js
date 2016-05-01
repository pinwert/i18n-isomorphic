export default {
  getAll: function() {
    return new Promise( ( resolve, reject ) => {
      setTimeout( () => resolve({datos:'aaaa'}), 1000 );
    });
  }
 };
