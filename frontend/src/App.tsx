import { Component, ReactNode } from "react";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";

// store
import { RootState } from "./store";

// slices
// users
import {
  IUser,
  isAuthenticatingSelector,
  userSelector,
  isAuthenticated,
  getUsers,
} from "./features/users/usersSlice";
// profiles
import { getProfiles } from "./features/profiles/profilesSlice";
// tickets
import {getTickets} from './features/tickets/ticketsSlice';

// pages
import Authentication from "./pages/Authentication";
import ProtectedPages from "./pages/ProtectedPages";
import DataTable from "./pages/DataTable";

interface Props {
  isAuthenticating: boolean;
  user: IUser | null;
  isAuthenticated: () => void;
  getUsers: () => void;
  getProfiles: () => void;
  getTickets: () => void;
}

class App extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount(): void {
    this.props.isAuthenticated();
    this.props.getUsers();
    this.props.getProfiles();
    this.props.getTickets();
  }
  render(): ReactNode {
    return (
      <div className="w-screen h-screen overflow-hidden bg-neutral-50">
        <Routes>
          <Route element={<ProtectedPages />} path="/">
            <Route element={<DataTable />} index></Route>
            <Route element={<DataTable />} path="/members"></Route>
          </Route>
          <Route element={<Authentication />} path="/authentication"></Route>
        </Routes>
      </div>
    );
  }
}

// Map Redux state to component props
const mapStateToProps = (state: RootState) => ({
  isAuthenticating: isAuthenticatingSelector(state),
  user: userSelector(state),
});

// Map dispatch to props
const mapDispatchToProps = {
  isAuthenticated,
  getUsers,
  getProfiles,
  getTickets
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
