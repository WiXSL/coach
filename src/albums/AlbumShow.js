import React from 'react';
import { makeStyles } from '@material-ui/core';
import {
    ArrayField,
    ChipField,
    Datagrid,
    DateField,
    ReferenceField,
    Show,
    SingleFieldList,
    TextField
} from 'react-admin';
import { BoxedShowLayout, RaBox } from 'ra-compact-ui';
import UserChipField from './UserChipField';

const useStyles = makeStyles(theme => ({
    detailsBox: {
        paddingRight: '50px',
        borderRight: 'solid thin',
        marginRight: '50px'
    }
}));

const AlbumShow = props => {
    const classes = useStyles();
    return (
        <Show
            //title={<UserTitle />}
            //aside={<Aside />}
            {...props}
        >
            <BoxedShowLayout>
                <RaBox display="flex">
                    <RaBox display="flex" flexWrap="wrap" flexGrow={4} className={classes.detailsBox}>
                        <RaBox flex="0 0 100%" display="flex" justifyContent="space-between">

                            <ReferenceField label="Client Name" source="client_id" reference="clients">
                                <TextField source="name"/>
                            </ReferenceField>
                            <ChipField source="progressStatus" label="Progress Status"/>
                            <TextField source="priority"/>
                        </RaBox>
                        <RaBox flex="0 0 100%" display="flex" justifyContent="space-between">
                            <DateField source="startDate"/>
                            <TextField source="timeElapsed"/>
                            <DateField source="deadline"/>
                        </RaBox>
                    </RaBox>
                    <RaBox display="inline-flex" flexDirection="column" flexGrow={1}>
                        <ReferenceField label="Project Manager" source="manager_id" reference="staff">
                            <UserChipField source="full_name"/>
                        </ReferenceField>
                        <ReferenceField label="Product Owner" source="product_owner_id" reference="staff">
                            <UserChipField source="full_name"/>
                        </ReferenceField>
                        <ReferenceField label="Marketing Specialist" source="marketing_specialist_id" reference="staff">
                            <UserChipField source="full_name"/>
                        </ReferenceField>
                    </RaBox>
                </RaBox>
                <RaBox flex="0 0 100%" display="flex" mt="20px">
                    <ArrayField source="stages">
                        <Datagrid>
                            <DateField source="date"/>
                            <TextField source="description"/>
                            <ArrayField source="members">
                                <SingleFieldList>
                                    <ReferenceField label="Marketing Specialist" source="staff_id" reference="staff">
                                        <UserChipField source="full_name"/>
                                    </ReferenceField>
                                </SingleFieldList>
                            </ArrayField>
                        </Datagrid>
                    </ArrayField>
                </RaBox>
            </BoxedShowLayout>
        </Show>
    );
};

export default AlbumShow;

