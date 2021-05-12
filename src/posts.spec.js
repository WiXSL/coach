import {createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";
import {act} from "@testing-library/react";
import {renderWithRedux} from 'ra-test';
import * as React from "react";
import {useEffect, useState} from "react";
import {DataProviderContext, defaultTheme, List, useDataProvider} from "react-admin";
import {PostList} from './posts';

const theme = createMuiTheme(defaultTheme);

/*const UseGetOne = () => {
    const [data, setData] = useState();
    const [error, setError] = useState();
    const dataProvider = useDataProvider();
    useEffect(() => {
        dataProvider
          .getOne('posts', {id: 1})
          .then(res => setData(res.data))
          .catch(e => setError(e));
    }, [dataProvider]);
    if (error) {
        return <div data-testid="error">{error.message}</div>;
    }
    if (data) {
        return <div data-testid="data">{JSON.stringify(data)}</div>;
    }
    return <div data-testid="loading">loading</div>;
};*/

describe('PostList', () => {
    const defaultProps = {
        hasCreate: true,
        hasEdit: true,
        hasList: true,
        hasShow: true,
        resource: 'posts',
        basePath: '/posts',
        syncWithLocation: true,
        options: {label: 'posts'}
    };

    // Minimum Initial State for a List
    const defaultStateForList = {
        admin: {
            resources: {
                posts: {
                    list: {
                        ids: [],
                        params: {},
                        selectedIds: [],
                        total: 0,
                        cachedRequests: {},
                    },
                },
            },
        },
    };

    it('should load PostList data successfully', async () => {
        const Datagrid = () => <div/>;

        const {dispatch, reduxStore, ...utils} = renderWithRedux(
          <ThemeProvider theme={theme}>
              <List {...defaultProps}>
                  <Datagrid/>
              </List>
          </ThemeProvider>,
          defaultStateForList,
        );

        // waitFor for the dataProvider to return
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve));
        });

        const calls = dispatch.mock.calls.filter(
            call => call[0].type === 'RA/CRUD_GET_LIST_SUCCESS'
        );

        expect(calls).toHaveLength(1);
    });
});

/*
describe('<List />', () => {
    const defaultProps = {
        hasCreate: true,
        hasEdit: true,
        hasList: true,
        hasShow: true,
        resource: 'posts',
        basePath: '/posts',
        history: {},
        location: {},
        match: (() => {}),
        syncWithLocation: true,
    };

    const defaultStateForList = {
        admin: {
            resources: {
                posts: {
                    list: {
                        ids: [],
                        params: {},
                        selectedIds: [],
                        total: 0,
                        cachedRequests: {},
                    },
                },
            },
        },
    };

    it('should render a list page', () => {
        const Datagrid = () => <div>datagrid</div>;

        const { container } = renderWithRedux(
            <ThemeProvider theme={theme}>
                <List {...defaultProps}>
                    <Datagrid />
                </List>
            </ThemeProvider>
        );
        expect(container.querySelectorAll('.list-page')).toHaveLength(1);
    });

    it('should render a toolbar, children and pagination', () => {
        const Filters = () => <div>filters</div>;
        const Pagination = () => <div>pagination</div>;
        const Datagrid = () => <div>datagrid</div>;
        const { queryAllByText, queryAllByLabelText } = renderWithRedux(
            <ThemeProvider theme={theme}>
                <MemoryRouter initialEntries={['/']}>
                    <List
                        filters={<Filters />}
                        pagination={<Pagination />}
                        {...defaultProps}
                    >
                        <Datagrid />
                    </List>
                </MemoryRouter>
            </ThemeProvider>
        );
        expect(queryAllByText('filters')).toHaveLength(2);
        expect(queryAllByLabelText('ra.action.export')).toHaveLength(1);
        expect(queryAllByText('pagination')).toHaveLength(1);
        expect(queryAllByText('datagrid')).toHaveLength(1);
    });

    it('should display aside component', () => {
        const Dummy = () => <div />;
        const Aside = () => <div id="aside">Hello</div>;
        const { queryAllByText } = renderWithRedux(
            <ThemeProvider theme={theme}>
                <List {...defaultProps} aside={<Aside />}>
                    <Dummy />
                </List>
            </ThemeProvider>
        );
        expect(queryAllByText('Hello')).toHaveLength(1);
    });

    it('should render an invite when the list is empty', async () => {
        const Dummy = () => <div />;
        const dataProvider = {
            getList: jest.fn(() => Promise.resolve({ data: [], total: 0 })),
        };
        const { queryAllByText } = renderWithRedux(
            <ThemeProvider theme={theme}>
                <DataProviderContext.Provider value={dataProvider}>
                    <List {...defaultProps}>
                        <Dummy />
                    </List>
                </DataProviderContext.Provider>
            </ThemeProvider>,
            defaultStateForList
        );
        await waitFor(() => {
            expect(queryAllByText('resources.posts.empty')).toHaveLength(1);
        });
    });

    it('should not render an invite when the list is empty with an empty prop set to false', async () => {
        const Dummy = () => <div />;
        const dataProvider = {
            getList: jest.fn(() => Promise.resolve({ data: [], total: 0 })),
        };
        const { queryAllByText } = renderWithRedux(
            <ThemeProvider theme={theme}>
                <DataProviderContext.Provider value={dataProvider}>
                    <List {...defaultProps} empty={false}>
                        <Dummy />
                    </List>
                </DataProviderContext.Provider>
            </ThemeProvider>,
            defaultStateForList
        );
        await waitFor(() => {
            expect(queryAllByText('resources.posts.empty')).toHaveLength(0);
        });
    });

    it('should not render an invite when a filter is active', async () => {
        const Dummy = () => <div />;
        const dataProvider = {
            getList: jest.fn(() => Promise.resolve({ data: [], total: 0 })),
        };
        const { queryAllByText } = renderWithRedux(
            <ThemeProvider theme={theme}>
                <DataProviderContext.Provider value={dataProvider}>
                    <List {...defaultProps} filter={{ foo: 'bar' }}>
                        <Dummy />
                    </List>
                </DataProviderContext.Provider>
            </ThemeProvider>,
            defaultStateForList
        );
        await waitFor(() => {
            expect(queryAllByText('resources.posts.empty')).toHaveLength(1);
        });
    });
});
*/
