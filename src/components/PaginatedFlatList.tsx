import React from 'react';
import {ActivityIndicator, FlatList, FlatListProps} from 'react-native';
import {View} from 'native-base';

type Status =
  | 'idle'
  | 'fetching'
  | 'fetching_more'
  | 'refreshing'
  | 'fetching_error'
  | 'fetching_more_error'
  | 'retry';
export type Props<T> = {
  getData: (page: number) => Promise<T[]>;
  incrementBy: number;
  LoadingComponent?: FlatListProps<T>['ListEmptyComponent'];
} & Omit<
  FlatListProps<T>,
  'data' | 'refreshing' | 'onRefresh' | 'onEndReached'
>;

type State<T> = {
  status: Status;
  page: number;
  data: T[];
  hasMore: boolean;
};

function getInitialState<T>(): State<T> {
  return {
    page: 0,
    status: 'fetching',
    data: [],
    hasMore: true,
  };
}

export default class PaginatedFlatList<T = any> extends React.Component<
  Props<T>,
  State<T>
> {
  state = getInitialState<T>();

  constructor(props: Props<T>) {
    super(props);
  }

  handleLoadMore = () => {
    if (!this.state.hasMore) {
      return;
    }
    this.setState(curr => ({
      status: 'fetching_more',
      page: curr.page + this.props.incrementBy,
    }));
  };
  handleRefresh = () => {
    this.setState({
      status: 'refreshing',
      page: 0,
    });
  };

  getDataAsync = async (page: number) => {
    const res = await this.props.getData(page);
    if (!Array.isArray(res)) {
      throw Error(
        'prop getData return type must be a Promise wrapping an Array',
      );
    }
    return res;
  };

  componentDidMount() {
    this.getDataAsync(0)
      .then(res => {
        this.setState({
          status: 'idle',
          data: res,
          hasMore: res.length > 0,
        });
      })
      .catch(() => {
        this.setState({status: 'fetching_error'});
      });
  }

  componentDidUpdate(_: Props<T>, prevState: State<T>) {
    const {status, page} = this.state;

    switch (status) {
      case 'fetching_more':
      case 'refreshing':
      case 'retry':
        if (page === prevState.page && status === 'fetching_more') {
          return;
        }
        this.getDataAsync(this.state.page)
          .then(res => {
            this.setState(curr => {
              return {
                status: 'idle',
                data: curr.page === 0 ? res : [...curr.data, ...res],
                hasMore: res.length > 0,
              };
            });
          })
          .catch(() => {
            this.setState({status: 'fetching_more_error'});
          });
        return;
    }
  }

  render() {
    const {data, status} = this.state;
    const {LoadingComponent} = this.props;

    if (status === 'fetching' || status === 'fetching_error') {
      // @ts-ignore
      return LoadingComponent ? <LoadingComponent /> : null;
    }
    return (
      <FlatList
        {...this.props}
        contentContainerStyle={{paddingTop: 24}}
        data={data}
        onEndReachedThreshold={this.props.onEndReachedThreshold ?? 0.5}
        refreshing={status === 'refreshing'}
        onRefresh={this.handleRefresh}
        onEndReached={this.handleLoadMore}
        ListFooterComponent={
          status === 'fetching_more' ? Spinner : this.props.ListFooterComponent
        }
      />
    );
  }
}

const Spinner = () => (
  <View bottom={80} top={20}>
    <ActivityIndicator color="#1d4ed8" size="large" />
  </View>
);
