import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input 
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ItemModal extends Component {
    state = {
        modal: false,
        name: ''
      };
    
      static propTypes = {
        isAuthenticated: PropTypes.bool
      };
    
      toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
      };
    
      onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };
    
      onSubmit = e => {
        e.preventDefault();
    
        const newItem = {
          name: this.state.name
        };
    
        // Add item via addItem action
        this.props.addItem(newItem);
    
        // Close modal
        this.toggle();
      };


    render() {
        return(
            <div>
                <Button
                color="dark"
                style={{marginBottom: '2rem'}}
                onClick={this.toggle}
                >Add Homework</Button>

                <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                >
                <ModalHeader toggle={this.toggle}>Add to Homework</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="item">Homework</Label>
                            <Input 
                            type="text"
                            name="name"
                            id="Item"
                            placeholder="Add homework"
                            onChange={this.onChange}
                            />
                            <Button
                            color="dark"
                            style={{marginTop: '2rem'}}
                            block
                            >Add Homework</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
                </Modal>
            </div>
        );
    }

}

const mapStateToProps = state => ({
    item: state.item
});

export default connect(mapStateToProps, { addItem })(ItemModal)
