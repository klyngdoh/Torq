module.exports = {
  calculateRating : function(comments) {
    if(comments.length == 0)
      return 0;
    return comments.map(function(comment) {
      return comment.rating
    }).reduce(function (sum, val) { return sum + val}) / comments.length;
  }
}
