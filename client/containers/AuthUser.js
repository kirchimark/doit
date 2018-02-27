import AuthUser from '../components/AuthUser';
import {connect} from 'react-redux';
import {signup , login} from '../actions/user';

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
    signup: (email , password) => dispatch(signup(email , password)),
    login: (email, password) => dispatch(login(email , password)),
});

export default connect(mapStateToProps , mapDispatchToProps)(AuthUser);