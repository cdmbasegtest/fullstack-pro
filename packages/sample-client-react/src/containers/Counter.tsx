import {
  incrementCounter,
  loadCount,
  saveCount,
  Action,
  Store,
} from '@sample-stack/client-redux';
import { connect } from 'react-redux';
import { returntypeof } from 'react-redux-typescript';
import * as redux from 'redux';
import { CounterComponent, ICounterProps } from '../components';

export type CounterOwnProps = {
  label: string;
  store?: Store.Sample;
};

const mapStateToProps = (state: Store.Sample) => ({
  counter: state['@sample-stack/counter'],
  isSaving: state['@sample-stack/isSaving'],
  isLoading: state['@sample-stack/isLoading'],
  error: state['@sample-stack/error'],
});

const mapDispatchToProps = (dispatch: Function) => ({
  increment: (n: number) =>
    dispatch(incrementCounter(n)),
  load: () =>
    dispatch(loadCount(null)),
  save: (value: number) =>
    dispatch(saveCount({ value })),
});

const stateProps = returntypeof(mapStateToProps);
const dispatchProps = returntypeof(mapDispatchToProps);
type StateProps = typeof stateProps;
type DispatchProps = typeof dispatchProps;

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/8787
export const Counter: React.ComponentClass<CounterOwnProps> =
connect<StateProps, DispatchProps, CounterOwnProps>(mapStateToProps, mapDispatchToProps)(CounterComponent);

