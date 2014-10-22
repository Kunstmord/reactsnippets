/** @jsx React.DOM */

// A mixin for loading data from multiple URLs into an object's state
$(document).ready(function() {
    var getMultipleDataMixin = {
        loadDataFromServer: function() {
            var self_react = this;
            var requests = []; // hold ajax request
            var all_data = {};
            var urls = this.props.urls;
            var urls_len = urls.length;
            for (var i = 0; i < urls_len; i++) {
                requests.push($.ajax(urls[i][0]));
            }
            $.when.apply($, requests).done(function () {
                $.each(arguments, function (i, data) {
                    all_data[urls[i][1]] = data[0];
                });
                self_react.setState({data: all_data});
            });
        },
        getInitialState: function() {
            return {data: []};
        },
        componentDidMount: function() {
            this.loadDataFromServer();
        }
    };

    var Box = React.createClass({
        mixins: [getMultipleDataMixin],
        render: function () {
            return (
                <div className="Box">
                    Whatever
                </div>
            );
        }
    });

    // Example usage below, the data from the url /api/countries can be accessed via this.state.countries and so on
    React.renderComponent(
        <Box urls={[["/api/countries/", "countries"], ["/api/cities", "cities"]]} />,
        document.getElementById('content_container')
    );
});