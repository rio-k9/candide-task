import { createBrowserHistory } from 'history';
import UserStore from "./user";
const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { IRootStore } from '../types/user';

const stores: IRootStore = {
  userStore: new UserStore(),
  routing: routingStore,
};

export const history = syncHistoryWithStore(browserHistory, routingStore);

export default stores