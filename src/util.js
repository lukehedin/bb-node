import $ from 'jquery';

export default {
    post: function(url, data, callback) {
        return $.ajax({
            'type': 'POST',
            'url': url,
            'contentType': 'application/json',
            'data': JSON.stringify(data),
            'dataType': 'json',
            'success': callback
        });
    }
};