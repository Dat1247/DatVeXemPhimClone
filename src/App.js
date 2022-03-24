import "./App.css";
import { createBrowserHistory } from "history";
import { Route, Router, Switch } from "react-router-dom";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import News from "./pages/News/News";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Detail from "./pages/Detail/Detail";
import { CheckoutTemplate } from "./templates/CheckoutTemplate/CheckoutTemplate";
import Checkout from "./pages/Checkout/Checkout";
import { UserTemplate } from "./templates/UserTemplate/UserTemplate";
import Loading from "./components/Loading/Loading";
import Profile from "./pages/Profile/Profile";
import { AdminTemplate } from "./templates/AdminTemplate/AdminTemplate";
import Users from "./pages/Admin/Users/Users";
import Films from "./pages/Admin/Films/Films";
import ShowTime from "./pages/Admin/Showtime/ShowTime";
import AddFilm from "./pages/Admin/Films/AddFilm/AddFilm";
import EditPhim from "./pages/Admin/Films/EditFilm/EditPhim";

export const history = createBrowserHistory();

function App() {
	return (
		<Router history={history}>
			<Loading />
			<Switch>
				<UserTemplate path='/login' exact Component={Login} />
				<UserTemplate path='/register' exact component={Register} />
				<HomeTemplate path='/home' exact Component={Home} />
				<HomeTemplate path='/contact' exact Component={Contact} />
				<HomeTemplate path='/news' exact Component={News} />
				<HomeTemplate path='/' exact Component={Home} />
				<HomeTemplate path='/detail/:id' exact Component={Detail} />
				<HomeTemplate path='/profile' exact Component={Profile} />
				<CheckoutTemplate path='/checkout/:id' exact Component={Checkout} />
				<AdminTemplate path='/admin/users' exact Component={Users} />
				<AdminTemplate path='/admin/films' exact Component={Films} />
				<AdminTemplate path='/admin/films/addfilm' exact Component={AddFilm} />
				<AdminTemplate
					path='/admin/films/edit/:id'
					exact
					Component={EditPhim}
				/>
				<AdminTemplate
					path='/admin/films/showtime/:id'
					exact
					Component={ShowTime}
				/>
			</Switch>
		</Router>
	);
}

export default App;
