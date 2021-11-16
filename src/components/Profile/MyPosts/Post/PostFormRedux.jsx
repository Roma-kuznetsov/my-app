import React from "react";
import { Field, reduxForm } from 'redux-form';
import { maxLenghtCreator, reqField } from "../../../../utils/validators/validator";
import Textarea from "../../../common/FormsControl/Textarea";

const maxLenght10 = maxLenghtCreator(40)

const PostFormRedux = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field component={Textarea} name="NewPostText" validate={[reqField, maxLenght10]} />
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  )
}
const PostReduxForm = reduxForm({ form: 'addPostFormRedux' })(PostFormRedux)


export default PostReduxForm;