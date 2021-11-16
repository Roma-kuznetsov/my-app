import React, { useEffect, useState } from "react";

const ProfileStatusWithHoocks = (props) => {

  let [editMode, setEditMode] = useState(false)
  let [status, setStatus] = useState(props.status)

  useEffect(() => {
    setStatus(props.status)
  }, [props.status])

  let activateEditMode = () => {
    setEditMode(true)
  }
  let deActivateEditMode = () => {
    setEditMode(false)
    props.updateStatus(status)
  }
  let onStatusChange = (e) => {
    setStatus(e.currentTarget.value)
  }

  return (
    <div>
      {!editMode &&
        <div>
          <span onDoubleClick={activateEditMode} >{props.status || "Update status"}</span>
        </div>
      }
      {
        editMode &&
        <div>
          <input onChange={onStatusChange} value={status} />
          <button onClick={deActivateEditMode}>save</button>
        </div>
      }
    </div >
  )
}

export default ProfileStatusWithHoocks;