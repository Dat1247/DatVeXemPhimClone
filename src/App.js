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

export const history = createBrowserHistory();

function App() {
	return (
		<Router history={history}>
			<Switch>
				<UserTemplate path='/login' exact Component={Login} />
				<Route path='/register' exact component={Register} />
				<HomeTemplate path='/home' exact Component={Home} />
				<HomeTemplate path='/contact' exact Component={Contact} />
				<HomeTemplate path='/news' exact Component={News} />
				<HomeTemplate path='/' exact Component={Home} />
				<HomeTemplate path='/detail/:id' exact Component={Detail} />
				<CheckoutTemplate path='/checkout/:id' exact Component={Checkout} />
			</Switch>
		</Router>
	);
}

export default App;
