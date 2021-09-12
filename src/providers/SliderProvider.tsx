import React from 'react';
import {Slide, Box} from 'native-base';

type State = {
  open?: 'server-error';
};
const SliderContext = React.createContext<
  // eslint-disable-next-line prettier/prettier
  {open: (status: State['open']) => void} | undefined
>(undefined);
let openNotification: (status: State['open']) => void;

class SliderProvider extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      open: undefined,
    };
    // Hack to access this function outside react components
    openNotification = this.open;
  }

  showServerError = () => {
    this.setState({open: 'server-error'});
  };

  open = (status: State['open']) => {
    const {open} = this.state;

    if (open === status) {
      return;
    }
    this.setState({open: status});
  };
  render() {
    const {open} = this.state;
    return (
      <SliderContext.Provider value={{open: this.open}}>
        {this.props.children}
        <Slide in={open === 'server-error'} placement="top">
          <Box
            pt={10}
            pb={5}
            px={10}
            _text={{
              color: 'white',
            }}
            bg="rose.700"
            rounded="md">
            Service is unavailable at the moment !
          </Box>
        </Slide>
      </SliderContext.Provider>
    );
  }
}

export {SliderProvider, openNotification};
