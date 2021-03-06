// This is an uncontrolled React form, which is way simpler than
// the normal React controlled form
// https://reactjs.org/docs/uncontrolled-components.html
//
// You can use browser form validation these days, and just
// get the values from the form on submit.

import React from "react";
import Firebase from "firebase/app";
import "firebase/storage";
import shortid from "shortid";
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
// import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
// import FilePondPluginImagePreview from "filepond-plugin-image-preview";
// import { ImageUpload } from "../../actions/ImageUpload";
import { FormRow, FormLabel, TextInput, TextArea } from "../../styles/forms";

export default class LocationForm extends React.Component {
  constructor() {
    super();
    this.state = {
      fileNames: [],
      urls: []
    };
  }
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
      desciption: description.value,
      images: this.state.urls
    };
    console.log(values);
    this.props.onSubmit(values);
  };

  imageUpload = () => {
    // const [files, setFiles] = React.useState(defaultFiles);
    let files = [];
    let fileLocation;
    let fileNames = [];
    return (
      <fragment>
        <FilePond
          files={files}
          labelIdle={
            'Drag & Drop your files or <span class="filepond--label-action"> Browse </span>'
          }
          allowMultiple={true}
          maxFiles={5}
          server={{
            process: (
              _fieldName,
              file,
              _metadata,
              load,
              error,
              progress,
              _abort
            ) => {
              const id = shortid.generate();
              const task = Firebase.storage()
                .ref()
                .child("images/" + id)
                .put(file, {
                  contentType: "image/jpeg"
                });

              task.on(
                Firebase.storage.TaskEvent.STATE_CHANGED,
                snap => {
                  console.log("progress: %o", snap);
                  progress(true, snap.bytesTransferred, snap.totalBytes);
                  fileLocation = snap.ref.name;
                  console.log(snap.ref.name);
                  if (!fileNames.includes(fileLocation)) {
                    fileNames.push(fileLocation);
                  }
                },
                err => {
                  console.log("error: %o", err);
                  error(err.message);
                },
                () => {
                  // let fileLocation = snap.ref.location.path_;
                  this.setState({ fileNames });
                  console.log(
                    "this is the list of file locations: ",
                    fileNames
                  );
                  console.log("DONE");
                  load(id);
                }
              );
            },
            load: (source, load, error, progress, abort) => {
              progress(true, 0, 1024);
              Firebase.storage()
                .ref()
                .child("images/" + source)
                .getDownloadURL()
                .then(url => {
                  let xhr = new XMLHttpRequest();
                  xhr.responseType = "blob";
                  xhr.onload = function(event) {
                    let blob = xhr.response;
                    console.log("loaded URL: %s", url);
                    load(blob);
                  };
                  xhr.open("GET", url);
                  xhr.send();
                  console.log("hello!!!");
                })
                .then(url => {
                  this.setState({
                    fileNames: [...this.state.fileNames, url]
                  });
                })
                .then(() =>
                  console.log("does this catch url?", this.state.filePath)
                )
                .catch(err => {
                  error(err.message);
                  abort();
                });
            }
          }}
        />
        <div>{this.imageDownload()}</div>
      </fragment>
    );
  };

  imageDownload = () => {
    this.state.fileNames.map(file =>
      Firebase.storage()
        .ref()
        .child("images/" + file)
        .getDownloadURL()
        .then(url => {
          if (!this.state.urls.includes(url)) {
            this.setState({
              urls: [...this.state.urls, url]
            });
          }
        })
        .then(console.log("paths array:", this.state.urls))
    );
  };

  render() {
    console.log("fileNames", this.state.fileNames);
    // let fileNames = [];
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
          <FormLabel htmlFor="venue">Venue Type</FormLabel>
          <TextInput
            type="venue"
            name="venue"
            defaultValue={this.props.location ? this.props.location.venue : ""}
          />
          <FormLabel htmlFor="project">Project</FormLabel>
          <TextInput
            type="project"
            name="project"
            defaultValue={
              this.props.location ? this.props.location.project : ""
            }
          />
          <FormLabel htmlFor="contactName">Contact Name</FormLabel>
          <TextInput
            type="contactName"
            name="contactName"
            defaultValue={
              this.props.location ? this.props.location.contactName : ""
            }
          />
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
          <FormLabel htmlFor="email">Contact Email</FormLabel>
          <TextInput
            type="email"
            name="email"
            defaultValue={this.props.location ? this.props.location.email : ""}
          />
          <FormLabel htmlFor="description">Description</FormLabel>
          <TextArea
            type="description"
            name="description"
            defaultValue={
              this.props.location ? this.props.location.description : ""
            }
          />
        </FormRow>
        <FormRow>{this.imageUpload()}</FormRow>
        <button type="submit">Save</button>
      </form>
    );
  }
}
