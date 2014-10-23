 /** @jsx React.DOM */

// Functions for working with React-Chosen multiple select elements (React bindings for Chosen JQuery)
$(document).ready(function() {

    // This function takes the curr_state - array of currently selected elements, complement - array of currently
    // unselected elements, params are received during the onChange event
    function updateMultipleSelectState(curr_state, complement, params) {
        // curr_state - the currently selected options, they will be updated
        // complement - the currently unselected options, they will be updated
        var i = 0;
        if (params.selected) {
            curr_state.push(params.selected);
            var comp_length = complement.length;
            for (i = comp_length - 1; i >= 0; i--) {
                if (complement[i] == params.selected) {
                    complement.splice(i, 1);
                }
            }
        }
        else if (params.deselected) {
            var curr_state_length = curr_state.length;
            for (i = curr_state_length - 1; i >= 0; i--) {
                if (curr_state[i] == params.deselected) {
                    curr_state.splice(i, 1);
                }
            }
            complement.push(params.deselected);
        }
        return [curr_state, complement];
    }

    // a simpler version of the function, when updating the complementary array is not needed
    function updateMultipleSelectStateNoComplement(curr_state, params) {
        // curr_state - the currently selected options, they will be updated
        var i = 0;
        if (params.selected) {
            curr_state.push(params.selected);
        }
        else if (params.deselected) {
            var curr_state_length = curr_state.length;
            for (i = curr_state_length - 1; i >= 0; i--) {
                if (curr_state[i] == params.deselected) {
                    curr_state.splice(i, 1);
                }
            }
        }
        return curr_state;
    }

    // Example usage below

    // This is an example multiSelect element
    var multiSelect = React.createClass({
        render: function() {
            var options = this.props.options;
            return this.transferPropsTo(
                <Chosen width="300px" data-placeholder="Select..." multiple>
                    {options.map(function(option) {
                        return <option key = {option.val} value = {option.val}>{option.name}</option>;
                    })}
                </Chosen>
            )
        }
    });

    // An example element which updates the list of currently selected options
    var taskForm = React.createClass({
        getInitialState: function() {
            return {selected_options: []};
        },
        changeHandler: function(e, params) {
            var selected_options = updateMultipleSelectStateNoComplement(this.state.selected_options, params);
            this.setState({
                selected_options: selected_options
            });
        },
        render: function () {
            return (
                <multiSelect
                    options={this.props.options}
                    value={this.state.selected_options}
                    onChange={this.changeHandler}
                />
            );
        }
    });
});