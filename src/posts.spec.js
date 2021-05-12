import {createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";
import {act} from "@testing-library/react";
import {renderWithRedux} from 'ra-test';
import * as React from "react";
import {DataProviderContext, defaultTheme, List} from "react-admin";
import {PostList} from './posts';

const theme = createMuiTheme(defaultTheme);

describe('PostList', () => {

    const defaultListProps = {
        hasCreate: true,
        hasEdit: true,
        hasList: true,
        hasShow: true,
        resource: 'posts',
        basePath: '/posts',
        syncWithLocation: true
    };

    // Minimum Initial State structure for a List
    const defaultStateForList = {
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

    const Datagrid = () => <div/>;
    const dataProvider = {
        getList: () => Promise.resolve({ data: [{id: "test"}], total: 1 }),
    };

    it('should load PostList data successfully', async() => {

        const {dispatch, reduxStore, ...utils} = renderWithRedux(
          <DataProviderContext.Provider value={dataProvider}>
              <ThemeProvider theme={theme}>
                  <List {...defaultListProps}>
                      <Datagrid/>
                  </List>
              </ThemeProvider>
          </DataProviderContext.Provider>,
          defaultStateForList
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
    });
});
