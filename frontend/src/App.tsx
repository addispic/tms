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
} from "./features/users/usersSlice";

// pages
import Authentication from "./pages/Authentication";
import ProtectedPages from "./pages/ProtectedPages";
import DataTable from "./pages/DataTable";

interface Props {
  isAuthenticating: boolean;
  user: IUser | null;
  isAuthenticated: () => void;
}

class App extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount(): void {
    this.props.isAuthenticated();
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
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
