$.ajax({
      url: '/stuff/' + '/moreStuff/' + '/evenMoreStuff/',
      type: 'PUT',
      data: JSON.stringify({ key: val }),
      contentType: 'application/json',
      dataType: 'json'
});
