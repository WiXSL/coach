import * as React from 'react';
import {
    Create,
    Datagrid,
    DateField,
    Edit,
    EditButton,
    Filter,
    List,
    ReferenceField,
    ReferenceInput,
    RichTextField,
    SelectInput,
    Show,
    ShowButton,
    SimpleForm,
    SimpleShowLayout,
    TextField,
    TextInput
} from 'react-admin';

const PostFilter = props => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn/>
        <ReferenceInput
            label="User"
            source="userId"
            reference="users"
            allowEmpty
        >
            <SelectInput optionText="name"/>
        </ReferenceInput>
    </Filter>
);

export const PostList = props => (
    <List {...props} /*filters={<PostFilter/>}*/>
        <Datagrid>
            <TextField source="id"/>
            {/*<ReferenceField label="User" source="userId" reference="users">
                <TextField source="name"/>
            </ReferenceField>*/}
            <TextField source="title"/>
            <EditButton/>
            <ShowButton/>
        </Datagrid>
    </List>
);

const PostTitle = ({ record }) => {
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

export const PostEdit = props => (
    <Edit title={<PostTitle/>} {...props}>
        <SimpleForm>
            <TextInput disabled source="id"/>
            <ReferenceInput label="User" source="userId" reference="users">
                <SelectInput optionText="name"/>
            </ReferenceInput>
            <TextInput source="title"/>
            <TextInput multiline source="body"/>
        </SimpleForm>
    </Edit>
);

export const PostCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput label="User" source="userId" reference="users">
                <SelectInput optionText="name"/>
            </ReferenceInput>
            <TextInput source="title"/>
            <TextInput multiline source="body"/>
        </SimpleForm>
    </Create>
);

export const PostShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="title"/>
            <TextField source="teaser"/>
            <RichTextField source="body"/>
            <DateField label="Publication date" source="created_at"/>
        </SimpleShowLayout>
    </Show>
);
