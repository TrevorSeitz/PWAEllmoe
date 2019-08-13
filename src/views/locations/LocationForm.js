// This is an uncontrolled React form, which is way simpler than
// the normal React controlled form
// https://reactjs.org/docs/uncontrolled-components.html
//
// You can use browser form validation these days, and just
// get the values from the form on submit.

import React from "react";
import { ImageUpload } from "../../actions/ImageUpload";
import { FormRow, FormLabel, TextInput, TextArea } from "../../styles/forms";

class LocationForm extends React.Component {
  onSubmit = event => {
    event.preventDefault();
    const {
      name,
      venue,
      project,
      contactName,
      contactPhoneNumber,
      email,
      description
    } = event.target.elements;
    const values = {
      name: name.value,
      venue: venue.value,
      project: project.value,
      contactName: contactName.value,
      contactPhoneNumber: contactPhoneNumber.value,
      email: email.value,
      desciption: description.value
    };
    this.props.onSubmit(values);
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <FormRow>
          <FormLabel htmlFor="name">Name</FormLabel>
          <TextInput
            type="name"
            name="name"
            defaultValue={this.props.location ? this.props.location.name : ""}
            required
          />
        </FormRow>
        <FormRow>
          <FormLabel htmlFor="venue">Venue Type</FormLabel>
          <TextInput
            type="venue"
            name="venue"
            defaultValue={this.props.location ? this.props.location.venue : ""}
          />
        </FormRow>
        <FormRow>
          <FormLabel htmlFor="project">Project</FormLabel>
          <TextInput
            type="project"
            name="project"
            defaultValue={
              this.props.location ? this.props.location.project : ""
            }
          />
        </FormRow>
        <FormRow>
          <FormLabel htmlFor="contactName">Contact Name</FormLabel>
          <TextInput
            type="contactName"
            name="contactName"
            defaultValue={
              this.props.location ? this.props.location.contactName : ""
            }
          />
        </FormRow>
        <FormRow>
          <FormLabel htmlFor="contactPhoneNumber">
            Contact Phone Number
          </FormLabel>
          <TextInput
            type="contactPhoneNumber"
            name="contactPhoneNumber"
            defaultValue={
              this.props.location ? this.props.location.contactPhoneNumber : ""
            }
          />
        </FormRow>
        <FormRow>
          <FormLabel htmlFor="email">Contact Email</FormLabel>
          <TextInput
            type="email"
            name="email"
            defaultValue={this.props.location ? this.props.location.email : ""}
          />
        </FormRow>
        <FormRow>
          <FormLabel htmlFor="description">Description</FormLabel>
          <TextArea
            type="description"
            name="description"
            defaultValue={
              this.props.location ? this.props.location.description : ""
            }
          />
        </FormRow>
        <FormRow>
          <ImageUpload />
        </FormRow>
        <button type="submit">Save</button>
      </form>
    );
  }
}

export default LocationForm;
