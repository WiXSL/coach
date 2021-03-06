import * as React from 'react';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import { Admin, ListGuesser, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

import { PostCreate, PostEdit, PostList, PostShow } from './posts';
import { UserList } from './users';
import Dashboard from './Dashboard';
import authProvider from './authProvider';
//import {CommentEdit, CommentList, CommentShow} from "./comments";
//import {AlbumList, AlbumShow} from "./albums";
//import dataProvider from "./dataProvider";

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const App = () => {
    return (
        <Admin
            disableTelemetry
            dataProvider={dataProvider}
            authProvider={authProvider}
            dashboard={Dashboard}
        >
            <Resource
                name="posts"
                icon={PostIcon}
                list={PostList}
                edit={PostEdit}
                create={PostCreate}
                show={PostShow}
            />
            <Resource
                name="users"
                icon={UserIcon}
                list={UserList}
            />
            <Resource
                name="comments"
                list={ListGuesser}
            />
        </Admin>
    );
};
export default App;
