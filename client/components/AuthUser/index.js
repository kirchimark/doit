import React,{Component} from 'react';
import classNames from 'classnames';
import './auth.less';
import '../../assets/main.less';

export default class AuthUser extends Component {
    state = {
        email: '',
        password: '',
    }

    onUpdateInput = (name) => (event) => {
        this.setState({[name] : event.target.value});
    }

    onSubmit = (type) => (event) => {
        if (!this.state.email || !this.state.password)  
            return;
        
        
        if (type === 'signup') 
            return this.props.signup(this.state.email, this.state.password);
        
        
        if (type === 'login') 
            return this.props.login(this.state.email , this.state.password);
        
    }

    render() {
        return (<div className={classNames('wrapper' , 'column' , 'centered')}>
                <h3>Login or sign up</h3>

                <section className={classNames('registration')}>
                    <div className={classNames('column')}>
                        <input placeholder='Email' type='email' className={classNames('input')} onChange={this.onUpdateInput('email')}/>
                        <input placeholder='Password' type='password' className={classNames('input')} onChange={this.onUpdateInput('password')} />

                        <div className={classNames('row')}>
                            <button className={classNames('button' , 'signup' )} style={{marginRight: '10%'}} onClick={this.onSubmit('signup')}>Sign Up</button>
                            <button className={classNames('button' , 'login')} onClick={this.onSubmit('login')}>Login</button>
                        </div>
                    </div>
                </section>
            </div>)
    }
}