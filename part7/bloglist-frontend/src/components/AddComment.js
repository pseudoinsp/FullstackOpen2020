import React, {useState} from 'react'

const AddComment = ({onSubmit}) => {
    const [comment, setComment] = useState('')

    return (
        <form onSubmit={event => { event.preventDefault(); onSubmit(comment)}}>
                    <input
                        type="text"
                        value={comment}
                        name="comment"
                        onChange={({ target }) => { setComment(target.value) }}
                    />
                <button type="submit">add comment</button>
            </form>
    )
}

export default AddComment