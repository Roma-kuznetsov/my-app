
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { maxLenghtCreator, reqField } from '../../utils/validators/validator';
import Textarea from '../common/FormsControl/Textarea';

let maxLenghtCreator40 = maxLenghtCreator(40)

const addMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field component={Textarea} validate={[reqField, maxLenghtCreator40]} name="newMessageBody" placeholder='Enter your message' />
      </div>
      <div>
        <button>Send</button>
      </div>
    </form>
  )
}

const MessageReduxForm = reduxForm({ form: 'addMessageFormRedux' })(addMessageForm)

export default MessageReduxForm;

/*    <form onSubmit={props.handleSubmit}>
      <div>
        <Field component="textarea" name="newMessageBody" placeholder='Enter your message' />
      </div>
      <div>
        <button>Send</button>
      </div>
    </form>
    */

