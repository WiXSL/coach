import React from 'react';
import { ArrayInput, Edit, SimpleFormIterator, TextInput } from 'react-admin';
import { CompactForm, RaBox, RaGrid } from 'ra-compact-ui';

const CommentEdit = props => (
    <Edit {...props}>
        <CompactForm layoutComponents={[RaBox, RaGrid]}>
            <RaBox display="flex" justifyContent="space-around">
                <TextInput source="full_name"/>
                <TextInput source="email"/>
            </RaBox>
            <ArrayInput source="skills">
                <SimpleFormIterator>
                    <TextInput source="name"/>
                </SimpleFormIterator>
            </ArrayInput>
            <TextInput source="description"/>
            <TextInput source="avatar_url"/>
        </CompactForm>
    </Edit>
);

export default CommentEdit;
