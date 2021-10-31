import React from 'react';
import { Datagrid, DateField, List, ReferenceField, TextField } from 'react-admin';

const AlbumList = props => (
    <List {...props}>
        <Datagrid rowClick="show">
            <TextField source="id"/>
            <TextField source="name"/>
            <TextField source="progressStatus"/>
            <TextField source="priority"/>
            <DateField source="startDate"/>
            <TextField source="timeElapsed"/>
            <DateField source="deadline"/>
            <ReferenceField source="client_id" reference="clients">
                <TextField source="name"/>
            </ReferenceField>
            <ReferenceField source="manager_id" reference="staff">
                <TextField source="full_name"/>
            </ReferenceField>
            <ReferenceField source="product_owner_id" reference="staff">
                <TextField source="full_name"/>
            </ReferenceField>
            <ReferenceField source="marketing_specialist_id" reference="staff">
                <TextField source="full_name"/>
            </ReferenceField>
        </Datagrid>
    </List>
);

export default AlbumList;
