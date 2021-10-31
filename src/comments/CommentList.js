import React from 'react'
import { Datagrid, List, TextField } from 'react-admin'

const CommentList = props => {
    return (
        <List {...props}>
            <Datagrid rowClick="show">
                <TextField source="full_name" />
            </Datagrid>
        </List>
    )
}

export default CommentList
