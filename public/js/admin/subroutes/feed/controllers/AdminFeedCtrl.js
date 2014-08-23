app.controller('AdminFeedCtrl', ['$scope', '$controller', 'Feed',  function ($scope, $controller, Feed) {
  Feed.getAll().then(function(feedItems) {
    var targetType;
    var targetMap = {
      'Category': '/admin/categories/',
      'Company': '/admin/companies/',
      'Opportunity': '/admin/opportunities/',
      'Match': '/admin/matches/',
      'Tag': '/admin/tags',
      'User': '/admin/candidates/'
    };
    $scope.pluralMap = {
      "updated a category": {before: "updated", after: "categories"},
      "created a category": {before: "created", after: "categories"},
      "created a tag": {before: "created", after: "tags"},
      "updated a tag": {before: "updated", after: "tags"},
      "created a company": {before: "created", after: "companies"},
      "updated a company": {before: "updated", after: "companies"},
      "created an opportunity": {before: "created", after: "opportunities"},
      "updated an opportunity": {before: "updated", after: "opportunities"},
      "updated a match": {before: "updated", after: "matches"}
    };
    var feedRows = [];
    var day;
    var row = {};
    for (var i=0; i < feedItems.length; i++){
      day = feedItems[i]['dateid'];
      console.log(day);
      row[day] = row[day] || {dateid: day, date: feedItems[i]['date'], items: []};
      for (var j=0; j < feedItems[i]['items'].length; j++) {
        feedRow = feedItems[i]['items'][j];
        feedRow.userLink = '/admin/candidates/' + feedRow.userid;
        if (feedRow.targetType === 'Tag') {
          feedRow.targetLink = targetMap[feedRow.targetType];
        } else if (feedRow.targetType === 'Match') {
          if (feedRow.actionObject) {
            feedRow.targetLink = targetMap['Opportunity'] + feedRow.actionObject;
          } else {
            feedRow.targetLink = targetMap['Opportunity'] + feedRow.target;
          }
        } else {
          feedRow.targetLink = targetMap[feedRow.targetType] + feedRow.target;
        }
        row[day]['items'].push(feedRow);
        // console.log(feedRows[day]);
      }
    }
    var days = Object.keys(row).sort().reverse();
    for (var k=0; k < days.length; k++) {
      feedRows.push(row[days[k]]);
    }
    // console.log(feedRows);
    $scope.feeditemdetails = feedRows;
  });

}]);
