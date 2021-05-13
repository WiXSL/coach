import {createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";
import {act, fireEvent, waitFor} from "@testing-library/react";
import {renderWithRedux} from 'ra-test';
import * as React from "react";
import {DataProviderContext, defaultTheme} from "react-admin";
import {PostEdit, PostList} from './posts';

const theme = createMuiTheme(defaultTheme);

describe('PostList', () => {

    // Required List props
    const defaultListProps = {
        resource: 'posts',
        basePath: '/posts'
    };

    // Minimum Initial State structure for a List
    const defaultListState = {
        admin: {
            resources: {
                posts: {
                    list: {
                        ids: [],
                        params: {},
                        selectedIds: [],
                        total: 0,
                        cachedRequests: {}
                    }
                }
            }
        }
    };

    const dataProvider = {
        getList: () => Promise.resolve({data: [{id: "test"}], total: 1})
    };

    it('should load PostList data successfully', async() => {

        const {dispatch, reduxStore, ...utils} = renderWithRedux(
          <DataProviderContext.Provider value={dataProvider}>
              <ThemeProvider theme={theme}>
                  <PostList {...defaultListProps}/>
              </ThemeProvider>
          </DataProviderContext.Provider>,
          defaultListState
        );

        // waitFor for the dataProvider to return
        await act(async() => {
            await new Promise(resolve => setTimeout(resolve));
        });

        const successfullCall = dispatch.mock.calls.filter(
          call => call[0].type === 'RA/CRUD_GET_LIST_SUCCESS'
        );

        expect(successfullCall).toHaveLength(1);
        expect(successfullCall[0][0].payload.data.length).toBeGreaterThan(0);
        expect(utils.queryAllByText('test')).toHaveLength(1);
    });
});

describe('PostEdit', () => {

    // Required Edit props
    const defaultEditProps = {
        basePath: '/posts/123',
        id: '123',
        resource: 'posts'
    };

    // Minimum Initial State structure for an Edit
    const defaultEditState = {admin: {resources: {posts: {data: {}}}}};

    it('should load a record and pass the result to its child', async() => {
        const dataProvider = {
            getOne: () => Promise.resolve({data: {id: 123, title: 'lorem'}}),
            getList: () => Promise.resolve({data: [], total: 0}) // Needed because of the <ReferenceInput/> In the PostEdit
        };

        const {dispatch, reduxStore, ...utils} = renderWithRedux(
          <ThemeProvider theme={theme}>
              <DataProviderContext.Provider value={dataProvider}>
                  <PostEdit {...defaultEditProps} />
              </DataProviderContext.Provider>,
          </ThemeProvider>,
          defaultEditState
        );

        // waitFor for the dataProvider to return
        await act(async() => {
            await new Promise(resolve => setTimeout(resolve));
        });

        const successfullCall = dispatch.mock.calls.filter(
          call => call[0].type === 'RA/CRUD_GET_ONE_SUCCESS'
        );

        expect(successfullCall).toHaveLength(1);
        expect(successfullCall[0][0].payload.data.title).toBe('lorem');
        expect(utils.queryByDisplayValue('lorem')).not.toBeNull();
    });

    it('should save the edited record when the child calls the save callback', async() => {
        const update = jest.fn().mockImplementationOnce((_, {data}) => Promise.resolve({data}));
        const onSuccess = jest.fn();

        const dataProvider = {
            getOne: () => Promise.resolve({data: {id: 123, title: 'lorem'}}),
            getList: () => Promise.resolve({data: [], total: 0}), // Needed because of the <ReferenceInput/> In the PostEdit
            update
        };

        const {queryByDisplayValue, getByDisplayValue, getByLabelText, getByText} = renderWithRedux(
          <ThemeProvider theme={theme}>
              <DataProviderContext.Provider value={dataProvider}>
                  <PostEdit {...defaultEditProps} undoable={false} onSuccess={onSuccess}/>
              </DataProviderContext.Provider>,
          </ThemeProvider>,
          defaultEditState
        );

        // waitFor for the dataProvider.getOne() return
        await waitFor(() => {
            expect(queryByDisplayValue('lorem')).toBeDefined();
        });

        // change one input to enable the SaveButton (is disabled when the form is pristine)
        fireEvent.change(getByDisplayValue('lorem'), {target: { value: 'ipsum' }});
        fireEvent.click(getByText('ra.action.save'));

        await waitFor(() => {
            expect(update).toHaveBeenCalledWith('posts', {
                id: '123',
                data: {id: 123, title: 'ipsum'},
                previousData: {id: 123, title: 'lorem'}
            });
        });

        await waitFor(() => {
            expect(onSuccess).toHaveBeenCalledWith({
                data: { id: 123, title: 'ipsum' },
            });
        });
    });
});
