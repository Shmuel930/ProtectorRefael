// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.


var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var DEBUG = ((typeof cordova) === 'undefined');


function progressShow() {

    if (!_.isEmpty(window.cordova)) {
        SpinnerPlugin.activityStart("Generating PDF...", {
            dimBackground: true
        });
    }

};

function progressHide() {
    if (!_.isEmpty(window.cordova)) {
        SpinnerPlugin.activityStop();
    }
};

function success(msg) {
    debugger;
    $('#baseH').html('base64:' + msg.replace('\n', ''));
    
    $.post("http://localhost:3000/save", {
        pdfData: msg
    })
        .done(function (data) {
            alert("Data Loaded: " + data);
        });

    progressHide();
};

function failure(err) {
    console.error('->', err);
    console.alert('An error has ocurred: ', err);

    progressHide();
};

var HomeView = Backbone.View.extend({

    initialize: function () {
        this.$button = this.$el.find('#generate');
        this.$url = this.$el.find('#url');
        this.$urlShare = this.$el.find('#url-share');
        this.$raw = this.$el.find('#rawhtml');
        this.$html = this.$el.find('#html');
        this.$display = this.$el.find('#display');

        this.success = success.bind(this);
        this.failure = failure.bind(this);
    },

    events: {
        'click #generate': 'makePDFBase64',
    },

    makePDFBase64: function (e) {
        navigator.notification.alert("sldkasdlas");
        e.preventDefault();
        progressShow();
        /* generate pdf using url. */
        pdf.htmlToPDF({
            url: "http:\\www.google.com",
            documentSize: "A4",
            landscape: "portrait",
            type: "base64"
        }, this.success, this.failure);
    },
});

var DemoRouter = Backbone.Router.extend({
    routes: {
        '*path': 'index',
    },

    index: function () {
        new HomeView({
            el: $('.starter-template')
        });
    }
});


if (DEBUG) {
    console.log('start app..');

    new DemoRouter();
    Backbone.history.start();
} else {
    document.addEventListener('deviceready', function () {

        console.log('start app..');

        new DemoRouter();
        Backbone.history.start();
    }, false);

}

