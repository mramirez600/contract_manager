import React, { Component } from "react";
import { Consumer } from "../../context";
import TextinputGroup from "../layout/TexInputGroup";
import uuid from "uuid";
import axios from "axios";

class EditContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    showAddContactInfo: false,
    errors: {}
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );

    const contact = res.data;

    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onShowClick = e => {
    this.setState({
      showAddContactInfo: !this.state.showAddContactInfo
    });
  };

  onSubmit = async (dispatch, e) => {
    e.preventDefault();

    const { name, email, phone } = this.state;

    // Check Errors
    if (name === "") {
      this.setState({
        errors: { name: "Name is required." }
      });
      return;
    }

    if (email === "") {
      this.setState({
        errors: { email: "Email is required." }
      });
      return;
    }

    if (phone === "") {
      this.setState({
        errors: { phone: "Phone is required." }
      });
      return;
    }

    const updContact = {
      name,
      email,
      phone
    };

    const { id } = this.props.match.params;
    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      updContact
    );

    dispatch({ type: "UPDATE_CONTACT", payload: res.data });

    // Clear State
    this.setState({
      name: "",
      email: "",
      phone: "",
      errors: {}
    });

    this.props.history.push("/");
  };

  render() {
    const { name, email, phone, showAddContactInfo, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;

          return (
            <div className="card mb-3">
              <div className="card-header">
                Edit Contact{" "}
                {/* <i
                  onClick={this.onShowClick}
                  // Ternary for classname toggle
                  className={
                    showAddContactInfo === false
                      ? "fas fa-plus"
                      : "fas fa-minus"
                  }
                  style={{ cursor: "pointer", float: "right", color: "blue" }}
                /> */}
              </div>
              {/* {showAddContactInfo ? ( */}
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextinputGroup
                    label="Name"
                    name="name"
                    placeholder="Enter Name..."
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextinputGroup
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Enter Email..."
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                    rerquired="none"
                  />
                  <TextinputGroup
                    label="Phone"
                    name="phone"
                    placeholder="Enter Phone..."
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />
                  <input
                    type="submit"
                    value="Update Contact"
                    className="btn btn-light btn-block"
                  />
                </form>
              </div>
              {/* ) : null} */}
            </div>
          );
        }}
      </Consumer>
    );
  }
}
export default EditContact;
